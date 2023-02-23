/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      title: ['Exo', 'sans-serif'],
      subtitle: ['Mukta Vaani', 'sans-serif'],
      body: ['Work Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
