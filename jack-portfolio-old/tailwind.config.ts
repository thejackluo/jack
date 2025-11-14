import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'dual': ['Dual-300', 'sans-serif'],
        'elianto': ['Elianto-Regular', 'serif'],
        'ppstellar': ['PP Stellar', 'sans-serif'],
        'stellar': ['Stellar', 'sans-serif'],
      },
      colors: {
        'glass': {
          'light': 'rgba(255, 255, 255, 0.1)',
          'medium': 'rgba(255, 255, 255, 0.25)',
          'dark': 'rgba(255, 255, 255, 0.05)',
        },
        'gradient': {
          'start': '#000000',
          'middle': '#14123c',
          'purple': '#1f062a',
          'blue': '#142a53',
          'navy': '#001131',
        },
      },
      backdropBlur: {
        'glass': '50px',
        'strong': '100px',
      },
      boxShadow: {
        'glass': 'inset 0px 5px 10px -5px #ffffff, inset 0px 50px 50px rgba(255, 255, 255, 0.25), inset 0px 0px 40px rgba(255, 255, 255, 0.1)',
        'glass-strong': 'inset 0px 5px 10px -5px #ffffff, inset 0px 98px 100px rgba(255, 255, 255, 0.1), inset 0px 0px 40px rgba(255, 255, 255, 0.1)',
        'glow': '0px 0px 20px rgba(255, 255, 255, 0.5)',
        'glow-strong': '0px 0px 40px rgba(255, 255, 255, 0.5)',
      },
      filter: {
        'glow': 'drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5))',
        'glow-strong': 'drop-shadow(0px 0px 40px rgba(255, 255, 255, 0.5))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(255, 255, 255, 1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config 