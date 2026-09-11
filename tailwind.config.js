/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: '#071C38',
        deep: '#06162C',
        blue: '#0B3B78',
        sky: '#21A8FF',
        muted: '#B7C3D4'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
};
