/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: ['Open Sans', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
      accent: ['Lato', 'sans-serif'],
    },
    extend: {
      colors: {
        deepBlue: '#002147',
        lightBlue: '#4d8fb9',
        brightYellow: '#f0c808',
        lightGray: '#f5f5f5',
        darkGray: '#444444',
        blueGray: '#6D7E99', // 30
        coral: '#FF7F50', // 10
      },
    },
  },
  plugins: [],
}
