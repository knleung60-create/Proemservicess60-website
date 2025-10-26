import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// 我們不再需要 'path'，但需要 'url' 來處理路徑
import { fileURLToPath, URL } from 'url' 

// https://vite.dev/config/
export default defineConfig({
  
  // 1. 為了 GitHub Pages 部署，我們新增了 'base' 屬性
  // 確保 / 開頭和 / 結尾
  base: '/Proemservicess60-website/',

  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      // 2. 這裡我們修正了 'alias' 的寫法
      // 這是 Vite (ES Modules) 中設定路徑別名的正確方式
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})