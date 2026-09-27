import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //  resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'), // Yeh '@' ko 'src' folder se connect kar dega
  //   },
  // },
})
