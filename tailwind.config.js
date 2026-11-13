/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: 'var(--color-parchment)',
        'soft-paper': 'var(--color-soft-paper)',
        'warm-mist': 'var(--color-warm-mist)',
        ash: 'var(--color-ash)',
        graphite: 'var(--color-graphite)',
        ink: 'var(--color-ink)',
        'pure-black': 'var(--color-pure-black)',
        'deep-teal': 'var(--color-deep-teal)',
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        background: 'var(--color-background)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        input: 'var(--color-input)',
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
