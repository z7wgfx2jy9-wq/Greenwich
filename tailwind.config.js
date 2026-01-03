/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        solanaTeal: '#00f5a0',
        solanaPurple: '#6b5bff',
        solanaMagenta: '#ff3e9e'
      },
      backgroundImage: {
        'solana-radial':
          'radial-gradient(circle at top, rgba(0,245,160,0.25), transparent 60%), radial-gradient(circle at bottom, rgba(255,62,158,0.2), transparent 60%)'
      },
      boxShadow: {
        'glow-teal': '0 0 40px rgba(0,245,160,0.45)',
        'glow-magenta': '0 0 40px rgba(255,62,158,0.45)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        snow: {
          '0%': { transform: 'translateY(-10vh)' },
          '100%': { transform: 'translateY(110vh)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 1 }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-subtle': 'float-subtle 12s ease-in-out infinite',
        'snow-slow': 'snow 18s linear infinite',
        'snow-medium': 'snow 14s linear infinite',
        'snow-fast': 'snow 10s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
