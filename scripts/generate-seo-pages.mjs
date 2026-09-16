import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const origin = 'https://www.proemservices60.com'
const outputDir = fileURLToPath(new URL('../dist/', import.meta.url))
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')

const pages = [
  ['services', '香港機電、安全及環保服務｜匠一機電工程', '瀏覽匠一機電工程的香港機電工程、安全及環保服務，包括驗樓、水錶申請、村屋供水、WR1、FIOU安全審核及環保牌照。'],
  ['booking', '預約香港機電工程服務｜匠一機電工程', '網上預約匠一機電工程的驗樓、水務、電力、安全及環保專業服務，我們會盡快聯絡確認。'],
  ['contact', '聯絡匠一機電工程｜香港機電服務查詢', '聯絡匠一機電工程有限公司，查詢香港驗樓、水錶、供水、WR1、安全主任及環保服務。']
]

const services = [
  ['professional-inspection', '專業驗樓', '全面的樓宇結構及機電系統檢查，確保安全合規'],
  ['water-meter-application', '申請水錶', '協助申請新水錶安裝，處理所需手續及現場跟進'],
  ['village-water-supply', '村屋供水', '香港村屋供水系統設計、安裝及維護服務'],
  ['water-meter-separation', '分拆水錶', '為多戶住宅提供獨立水錶分拆服務'],
  ['saltwater-toilet', '改用咸水沖廁', '協助改裝鹹水沖廁系統，節省食水資源'],
  ['wr1-certification', '簽發WR1', '由合資格電業承辦商檢查固定電力裝置及簽發WR1證明書'],
  ['water-safety-application', '樓宇水安全申請', '協助申請樓宇水安全計劃及相關認證'],
  ['part-time-safety-environmental-officer', '兼職安全主任 / 環保主任', '提供香港工地兼職安全主任及環保主任服務'],
  ['fiou-safety-audit', 'FIOU安全審核 / 查核', '專業工地安全審核、合規查核及改善建議'],
  ['mobile-aluminium-scaffold-form', '流動鋁架表格簽發', '流動鋁合金通架檢查及安全表格簽發服務'],
  ['confined-space-service', '密閉空間服務', '密閉空間風險評估、工作監督及安全支援'],
  ['environmental-permit-application', '環保牌照申請', '協助香港工程項目辦理環保牌照及許可證申請'],
  ['safety-environmental-documents', '安全環保文件制定', '制定香港工程項目適用的安全及環保管理文件'],
  ['safety-environmental-meetings-consultation', '安全環保會議及諮詢', '提供安全環保會議支援、專業意見及合規諮詢']
]

for (const [slug, name, description] of services) {
  pages.push([
    `services/${slug}`,
    `${name}｜香港專業服務｜匠一機電工程`,
    `${description}。匠一機電工程為香港住宅、村屋、商業及工程項目提供專業可靠的${name}服務。`,
    name
  ])
}

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

for (const [path, title, description, serviceName] of pages) {
  const url = `${origin}/${path}`
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=").*?(" \/>)/s, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=").*?(" \/>)/s, `$1${url}$2`)
    .replace(/(<link rel="alternate" hreflang="zh-HK" href=").*?(" \/>)/s, `$1${url}$2`)
    .replace(/(<link rel="alternate" hreflang="x-default" href=").*?(" \/>)/s, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=").*?(" \/>)/s, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=").*?(" \/>)/s, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=").*?(" \/>)/s, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=").*?(" \/>)/s, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=").*?(" \/>)/s, `$1${escapeHtml(description)}$2`)

  if (serviceName) {
    const schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceName,
      description,
      url,
      areaServed: { '@type': 'AdministrativeArea', name: '香港' },
      provider: { '@id': `${origin}/#business` }
    })
    html = html.replace('</head>', `    <script type="application/ld+json">${schema}</script>\n  </head>`)
  }

  const pageDirectory = join(outputDir, ...path.split('/'))
  await mkdir(pageDirectory, { recursive: true })
  await writeFile(join(pageDirectory, 'index.html'), html)
  await writeFile(join(outputDir, `${path}.html`), html)
}

console.log(`Generated ${pages.length} search-friendly route pages.`)
