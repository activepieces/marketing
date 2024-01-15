const colors = require('tailwindcss/colors')

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { // Using https://uicolors.app/create on our primary #6e41e2
          50: '#f4f4fe',
          100: '#eceafd',
          200: '#dcd8fc',
          300: '#c0b9f9',
          400: '#a191f4',
          500: '#8365ed',
          600: '#6e41e2',
          700: '#6132cf',
          800: '#512aad',
          900: '#45248e',
          950: '#281560',
          DEFAULT: '#6e41e2'
        },
        secondary: colors.teal
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'infinite-scroll-30': 'infinite-scroll 30s linear infinite',
        'infinite-scroll-right-30': 'infinite-scroll-right 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      }                    
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

