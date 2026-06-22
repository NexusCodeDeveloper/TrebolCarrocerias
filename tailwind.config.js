/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trebol: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#0D7C3E',
          600: '#0B6B35',
          700: '#095A2C',
          800: '#074A23',
          900: '#05391A',
        },
        dark: {
          950: '#000000',
          900: '#050505',
          800: '#0A0A0A',
          700: '#111111',
          600: '#1A1A1A',
        },
        amarillo: '#FFD100',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(13, 124, 62, 0.3)',
        'glow': '0 0 30px rgba(13, 124, 62, 0.4)',
        'glow-lg': '0 0 60px rgba(13, 124, 62, 0.5)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.3)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
