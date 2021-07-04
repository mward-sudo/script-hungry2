/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderStyles: {
      styles: true, // defaults to false
      colors: true, // defaults to false
    },
    extend: {
      colors: {
        red: colors.red,
      },
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      headingVwL: '8vw',
      headingVwS: '3vw',
    },
    fontFamily: {
      display: ['"Proza Libre"', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwindcss-border-styles')(),
    plugin(function ({ addVariant, e }) {
      addVariant('hover', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`hover${separator}${className}`)}:hover`
        })
      })
    }),
  ],
}
