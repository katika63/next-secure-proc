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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cyber: {
          dark: '#030712',
          bg: '#050b14',
          card: '#0a1124',
          border: '#1e2942',
          blue: '#0066ff',
          cyan: '#00d8ff',
          accent: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
}