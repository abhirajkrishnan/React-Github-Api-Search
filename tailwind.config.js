module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      'body':['"Open Sans"','"sans-serif"']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
