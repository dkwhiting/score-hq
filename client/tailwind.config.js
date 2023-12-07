/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {transitionProperty: {
      'height': 'height'
      },
      flex: {
        '1.5': '1.5 1.5 0%',
        '2': '2 2 0%'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

