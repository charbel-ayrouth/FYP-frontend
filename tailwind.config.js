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
        primary: '#0077C8',
        primaryLight: '#007FD4',
        primaryDark: '#005187',
        //
        accent: '#FDB813',
        accentLight: '#FFB914',
        accentDark: '#BD890F',
        //
        lightGrey: '#F2F2F2',
        darkGrey: '#2C3E50',
        darkerGrey: '#333333',
      },
    },
  },
  plugins: [],
}
