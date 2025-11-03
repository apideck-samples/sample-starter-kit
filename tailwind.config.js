/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './node_modules/@apideck/components/**/*.js',
    './node_modules/@apideck/react-vault/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      fontFamily: {
        sans: ['var(--font-basier-circle)', ...defaultTheme.fontFamily.sans],
        'basier-circle': ['var(--font-basier-circle)', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: colors.slate,
        primary: {
          50: '#f6f7fe',
          100: '#f2f3fd',
          200: '#e0e1fa',
          300: '#c9c8f4',
          400: '#8E7FF4',
          500: '#6255E1',
          600: '#5148DE',
          700: '#5148DE',
          800: '#5922b9',
          900: '#5a1aa8'
        },
        ui: {
          200: '#878ac6',
          300: '#545592',
          400: '#414386',
          500: '#292d6a',
          600: '#21255c',
          700: '#080b4b',
          800: '#04072d'
        },
        'apideck-primary': '#8a13f2',
        'apideck-secondary': '#5c51ce',
        background: '#130E2E'
      },
      maxWidth: {
        '8xl': '94rem',
        '9xl': '100rem'
      },
      maxHeight: {
        128: '32rem'
      },
      width: {
        88: '22rem'
      },
      height: {
        88: '22rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
