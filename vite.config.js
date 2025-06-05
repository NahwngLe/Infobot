/// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ReactCompilerConfig = {
  sources: (filename) => {
    return filename.indexOf('src') !== -1;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  }),],
  test: {
    globals: true,
    environment: 'jsdom', // dùng DOM giả lập
    setupFiles: './src/setupTests.js' // (tùy chọn) nơi khai báo custom matcher, v.v.
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1/:8000',  // Địa chỉ của FastAPI
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
