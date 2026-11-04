/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#faf8f5',
        'soft-paper': '#fdfbfa',
        'warm-mist': '#d1d1cd',
        ash: '#92918b',
        graphite: '#72706b',
        ink: '#27251e',
        'pure-black': '#000000',
        'deep-teal': '#016a71',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro Text"', '-apple-system', 'sans-serif'],
        display: ['"SF Pro Display"', '-apple-system', 'sans-serif'],
        text: ['"SF Pro Text"', '-apple-system', 'sans-serif'],
        rounded: ['"SF Pro Rounded"', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
        tealGlow: '0 0 0 1px rgba(1, 106, 113, 0.4)',
      },
      borderRadius: {
        btn: '6px',
        inp: '12px',
        card: '16px',
        chip: '9999px',
      },
      maxWidth: {
        reading: '900px',
      }
    },
  },
  plugins: [],
}
