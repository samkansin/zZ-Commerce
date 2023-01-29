/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-green': '#5FC7AC',
        'light-gray': '#EFF1F4',
        'link-green': '#079569',
      },
      fontFamily:{
        'semi': ['SFCompactSemi'],
      },
    },
  },
  plugins: [],
}
