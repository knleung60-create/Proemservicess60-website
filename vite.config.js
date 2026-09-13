import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'url' 

// https://vite.dev/config/
export default defineConfig({
  
  // 確保 / 開頭和 / 結尾，並與你的儲存庫名稱 100% 一致
  base: '/',

  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8787'
    }
  },
  
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
