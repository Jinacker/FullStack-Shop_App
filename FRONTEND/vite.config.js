import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint" // eslint 설정 적용

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
})


//npm install -D eslint@^9 eslint-plugin-react-hooks eslint-plugin-react-refresh globals @eslint/js
// eslint 설치. => 내꺼 강의 보다 최신버전이라 좀 다름..
