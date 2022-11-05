module.exports = {
  content: [
    '*.hbs',
    '**/*.{html,hbs}',
  ], 
  theme: {
    screens: {
      'xs': {'max': "575px"},
      'sm': {'min': '576px', 'max': "767px"},
      'md': {'min': '768px', 'max': "991px"},
      'lg': {'min': '992px', 'max': "1199px"},
      'xl': {'min': '1200px', 'max': "1399px"},
      '2xl': {'min': '1400px'},
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'primary': 'rgb(23, 157, 125)',
      'secondary': '#696b6b',
      'inherit': 'inherit',
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen 2xl': {
            maxWidth: '1400px',
          },
        }
      })
    },
    require('tailwindcss/colors'),
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
