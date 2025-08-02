/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Always dark mode, no need for darkMode: 'class'
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ffaa',
          50: '#e0fff5',
          100: '#b3ffe6',
          200: '#80ffd6',
          300: '#4dffc7',
          400: '#1affb7',
          500: '#00ffaa',
          600: '#00cc88',
          700: '#009966',
          800: '#007744',
          900: '#003322',
        },
        secondary: {
          DEFAULT: '#ff00e6',
          50: '#fff0fe',
          100: '#ffd1fc',
          200: '#ffa3fa',
          300: '#ff75f7',
          400: '#ff47f5',
          500: '#ff00e6',
          600: '#cc00b8',
          700: '#99008a',
          800: '#66005c',
          900: '#33002e',
        },
        accent: {
          DEFAULT: '#5046ff',
          50: '#f0eeff',
          100: '#d1ccff',
          200: '#a39aff',
          300: '#7568ff',
          400: '#6257ff',
          500: '#5046ff',
          600: '#4038cc',
          700: '#302a99',
          800: '#201c66',
          900: '#100e33',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        popover: 'rgb(var(--popover) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--popover-foreground) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--destructive-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}