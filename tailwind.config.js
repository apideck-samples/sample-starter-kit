const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './node_modules/@apideck/components/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      fontFamily: {
        sans: ['var(--font-basier-circle)', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...colors,
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
        secondary: colors.cyan,

        // main: '#6255E1',
        // 'main-dark': '#5148DE',
        // 'main-light': '$8E7FF4',
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
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ]
}
