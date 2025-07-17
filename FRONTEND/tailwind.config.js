/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // ✅ 정확한 확장자만 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind css 사용법 #######

// npm install -D tailwindcss@3.4.17 postcss autoprefixer => 이렇게 설치
// npx tailwindcss init -p  => 이거 실행

