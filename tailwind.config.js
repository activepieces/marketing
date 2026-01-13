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
      screens: {
        '3xl': '1920px',
      },
      fontFamily: {
        'libre-baskerville': ['Libre Baskerville', 'serif'],
        'instrument': ['Instrument Serif', 'serif'],
        'space': ['Space Grotesk', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      filter: {
        'invert-0': 'invert(0)',
        'brightness-0': 'brightness(0)',
      },
      aria: {
        current: 'current="true"'
      },
      colors: {
        ...colors,
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
        secondary: colors.teal,
        rose: colors.rose
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'infinite-scroll-30': 'infinite-scroll 30s linear infinite',
        'infinite-scroll-right-30': 'infinite-scroll-right 30s linear infinite',
        'border': 'border 8s linear infinite',
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
        'border': {
          to: { '--border-angle': '360deg' },
        }
      }                    
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  safelist: [
    { pattern: /^bg-/, variants: ['hover', 'focus'] },
  ],
}

