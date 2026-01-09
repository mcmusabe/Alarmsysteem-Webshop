/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          dark: '#181818',
          light: '#242424',
        },
        accent: {
          DEFAULT: '#1DCF8E',
          dark: '#00AD74',
          light: '#5AE4AA',
        },
        gray: {
          50: '#F7F7F7',
          100: '#EDEDED',
          200: '#DBDBDB',
          300: '#C7C7C7',
          400: '#ADADAD',
          500: '#919191',
          600: '#787878',
          700: '#5E5E5E',
          800: '#3B3B3B',
          900: '#242424',
        },
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        black: '900',
      },
    },
  },
  plugins: [],
}
