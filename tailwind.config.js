module.exports = {
  content: [
    '*.hbs',
    '**/*.{html,hbs}',
  ], 
  theme: {
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'primary': '#E58948',
      'secondary': '#253268',
      'backdrop': 'rgba(0, 0, 0, 0.5)',
      'gray': '#4E5965',
      'lightGray': '#E0E4E8',
      'inherit': 'inherit',
    },
    fontFamily: {
      'source': ['"Source Serif Pro", serif'],
      'inter': ['"Inter", sans-serif'],
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
          minWidth: '320px',
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
