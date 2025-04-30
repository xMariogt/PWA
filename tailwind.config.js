/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      color: {
        'custom-red': '#CB2127',
        'custom-brown': '#F8A41C',
        'custom-green': '#ABB94B',
      }
    },
  },  
  plugins: [],
}

