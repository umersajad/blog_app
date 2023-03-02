/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#39B54A",
        secondary: '#111827'
      },
      fontFamily:{
        Poppins: "'Poppins', sans-serif",
        Quicksand: "'Quicksand', sans-serif"
      },
      boxShadow: {
        blocks: '0 0 1px rgb(0 0 0 / 2%), 0 4px 8px rgb(0 0 0 / 2%), 0 16px 24px rgb(0 0 0 / 2%), 0 24px 32px rgb(0 0 0 / 2%)',
      }
    },
  },
  plugins: [],
}
