/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#090A0E',
        'obsidian-card': '#12131A',
        'obsidian-elevated': '#191B24',
        'obsidian-border': '#252736',
        'obsidian-border-light': '#36394C',
        'neon-violet': '#A855F7',
        'street-gold': '#D4AF37', // Metallic gold matching Vice City 3D sign
        'street-gold-light': '#F7E7A9',
        'chrome-silver': '#E2E8F0',
        'muted-silver': '#94A3B8',
        'whatsapp-green': '#25D366'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['Cinzel', 'serif']
      },
      boxShadow: {
        'gold-glow': '0 0 25px -4px rgba(212, 175, 55, 0.35)',
        'neon': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}

