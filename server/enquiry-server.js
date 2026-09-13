import http from 'node:http'
import { access, mkdir, rename, unlink } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import ExcelJS from 'exceljs'
import nodemailer from 'nodemailer'

const port = Number(process.env.PORT || 8787)
const recordsDirectory = path.resolve(process.env.RECORDS_DIR || path.join(process.cwd(), '..', 'records'))
const workbookPath = path.join(recordsDirectory, process.env.WORKBOOK_FILENAME || 'client-enquiries.xlsx')
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || 'http://127.0.0.1:5173,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
)
const recipients = (process.env.MAIL_RECIPIENTS || 'sales@proemservices60.com,proemservice60@gmail.com')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean)
const emailMode = process.env.EMAIL_MODE || 'smtp'
const rateLimit = new Map()
let workbookQueue = Promise.resolve()

const columns = [
  { header: '提交編號', key: 'submissionId', width: 38 },
  { header: '提交時間（香港）', key: 'createdAt', width: 24 },
  { header: '類型', key: 'type', width: 14 },
  { header: '姓名', key: 'name', width: 24 },
  { header: '電話', key: 'phone', width: 20 },
  { header: '電郵', key: 'email', width: 32 },
  { header: '服務項目', key: 'service', width: 30 },
  { header: '預約日期', key: 'date', width: 18 },
  { header: '服務地址', key: 'address', width: 45 },
  { header: '訊息／備註', key: 'message', width: 70 },
  { header: '電郵狀態', key: 'emailStatus', width: 22 }
]

function writeJson(response, status, payload, origin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
  if (origin && allowedOrigins.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers.Vary = 'Origin'
  }
  response.writeHead(status, headers)
  response.end(JSON.stringify(payload))
}

function clean(value, maximum = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maximum) : ''
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character])
}

function validate(payload) {
  const enquiry = {
    type: payload.type === 'booking' ? 'booking' : 'contact',
    name: clean(payload.name, 120),
    phone: clean(payload.phone, 60),
    email: clean(payload.email, 254),
    service: clean(payload.service, 160),
    date: clean(payload.date, 40),
    address: clean(payload.address, 400),
    message: clean(payload.message, 5000)
  }

  if (!enquiry.name || !enquiry.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    throw new Error('請輸入有效的姓名和電郵地址。')
  }
  if (enquiry.type === 'booking' && (!enquiry.phone || !enquiry.service || !enquiry.date || !enquiry.address)) {
    throw new Error('請填寫所有預約必填資料。')
  }
  if (enquiry.type === 'contact' && !enquiry.message) {
    throw new Error('請輸入訊息內容。')
  }
  return enquiry
}

function hongKongTimestamp() {
  return new Intl.DateTimeFormat('zh-HK', {
    timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(new Date())
}

async function saveWorkbook(record) {
  await mkdir(recordsDirectory, { recursive: true })
  const workbook = new ExcelJS.Workbook()
  try {
    await access(workbookPath)
    await workbook.xlsx.readFile(workbookPath)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }

  let worksheet = workbook.getWorksheet('客戶查詢')
  if (!worksheet) {
    worksheet = workbook.addWorksheet('客戶查詢', { views: [{ state: 'frozen', ySplit: 1 }] })
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF111827' } }
    worksheet.autoFilter = { from: 'A1', to: 'K1' }
  }
  // Column keys are not stored in XLSX files, so restore them after every load.
  worksheet.columns = columns

  const row = worksheet.addRow(record)
  row.alignment = { vertical: 'top', wrapText: true }
  const temporaryPath = `${workbookPath}.${randomUUID()}.tmp`
  await workbook.xlsx.writeFile(temporaryPath)
  try {
    await rename(temporaryPath, workbookPath)
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

async function updateEmailStatus(submissionId, emailStatus) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(workbookPath)
  const worksheet = workbook.getWorksheet('客戶查詢')
  let matchingRow
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && row.getCell(1).value === submissionId) matchingRow = row
  })
  if (!matchingRow) return
  matchingRow.getCell(11).value = emailStatus
  const temporaryPath = `${workbookPath}.${randomUUID()}.tmp`
  await workbook.xlsx.writeFile(temporaryPath)
  await rename(temporaryPath, workbookPath)
}

function createEmail(record) {
  const typeLabel = record.type === 'booking' ? '服務預約' : '網站查詢'
  const fields = [
    ['提交編號', record.submissionId], ['提交時間', record.createdAt], ['姓名', record.name],
    ['電話', record.phone || '—'], ['電郵', record.email], ['服務項目', record.service || '—'],
    ['預約日期', record.date || '—'], ['服務地址', record.address || '—'], ['訊息／備註', record.message || '—']
  ]
  const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<h2>${typeLabel}</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${fields
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`
  return { subject: `[匠一機電] ${typeLabel}－${record.name}`, text, html }
}

async function sendEmail(record) {
  if (emailMode === 'log') return '預覽模式（未發送）'
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM']
  const missing = required.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Missing email settings: ${missing.join(', ')}`)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  })
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: recipients,
    replyTo: record.email,
    ...createEmail(record)
  })
  return `已發送至 ${recipients.join(', ')}`
}

async function parseBody(request) {
  const chunks = []
  let length = 0
  for await (const chunk of request) {
    length += chunk.length
    if (length > 64 * 1024) throw new Error('提交內容過大。')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function isRateLimited(request) {
  const key = request.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const recent = (rateLimit.get(key) || []).filter((time) => now - time < 10 * 60 * 1000)
  recent.push(now)
  rateLimit.set(key, recent)
  return recent.length > 10
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin
  if (origin && !allowedOrigins.has(origin)) return writeJson(response, 403, { error: '不允許的網站來源。' })
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': origin || '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    })
    return response.end()
  }
  if (request.method === 'GET' && request.url === '/health') {
    return writeJson(response, 200, { ok: true, emailMode, workbook: path.basename(workbookPath) }, origin)
  }
  if (request.method !== 'POST' || request.url !== '/api/enquiries') {
    return writeJson(response, 404, { error: '找不到此服務。' }, origin)
  }
  if (isRateLimited(request)) return writeJson(response, 429, { error: '提交次數過多，請稍後再試。' }, origin)

  try {
    const payload = await parseBody(request)
    if (clean(payload.website, 200)) return writeJson(response, 200, { message: '您的資料已成功提交。' }, origin)
    const enquiry = validate(payload)
    const record = {
      ...enquiry,
      submissionId: randomUUID(),
      createdAt: hongKongTimestamp(),
      emailStatus: '處理中'
    }

    const submissionJob = workbookQueue.catch(() => {}).then(async () => {
      await saveWorkbook(record)
      try {
        record.emailStatus = await sendEmail(record)
        await updateEmailStatus(record.submissionId, record.emailStatus)
      } catch (error) {
        await updateEmailStatus(record.submissionId, `發送失敗：${clean(error.message, 160)}`)
        throw error
      }
    })
    workbookQueue = submissionJob.catch(() => {})
    await submissionJob

    const message = emailMode === 'log'
      ? '預覽模式：資料已寫入測試記錄，但未發送電郵。'
      : '您的資料已成功提交，我們將盡快聯絡您。'
    return writeJson(response, 200, { message, submissionId: record.submissionId }, origin)
  } catch (error) {
    console.error(error)
    const clientError = ['請輸入', '提交內容'].some((prefix) => error.message.startsWith(prefix))
    return writeJson(response, clientError ? 400 : 500, {
      error: clientError ? error.message : '暫時未能提交，請致電或直接電郵聯絡我們。'
    }, origin)
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`Enquiry service listening on port ${port}`)
  console.log(`Workbook: ${workbookPath}`)
  console.log(`Email mode: ${emailMode}`)
})
