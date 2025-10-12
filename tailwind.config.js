/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        'dark-violet': {
          900: '#2D0C57',
          800: '#3A1073',
          700: '#480CA8',
          600: '#560BAD',
          500: '#7209B7',
          400: '#9D4EDD',
          300: '#C77DFF',
          200: '#D8B4FE',
          100: '#E9D5FF',
        },
        accent: {
          500: '#F72585',
          400: '#FF5CAA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.dark-violet.400"), 0 0 20px theme("colors.dark-violet.300")',
      },
    },
  },
  plugins: [],
};