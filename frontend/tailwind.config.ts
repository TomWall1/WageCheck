import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep teal (#004D40 palette)
        brand: {
          50:  '#E0F2EF',
          100: '#B2DFDB',
          200: '#80CBC4',
          400: '#26A69A',
          500: '#00897B',
          600: '#004D40',
          700: '#00695C',
          900: '#003128',
        },
        // Warning / accent — warm amber-orange (#FFB74D palette)
        warning: {
          50:  '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          400: '#FFA726',
          600: '#FB8C00',
          700: '#E65100',
          800: '#BF360C',
        },
        // Danger — red (unchanged)
        danger: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        // Success — green (unchanged)
        success: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          600: '#16A34A',
          700: '#15803D',
        },
        // Gray — shifted to blue-grey (--secondary palette)
        gray: {
          50:  '#ECEFF1',
          100: '#CFD8DC',
          200: '#B0BEC5',
          300: '#90A4AE',
          400: '#78909C',
          500: '#546E7A',
          600: '#546E7A',
          700: '#37474F',
          800: '#263238',
          900: '#1A2327',
        },
        // Amber — mapped to accent palette (for StepResults amber- classes)
        amber: {
          50:  '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          400: '#FFA726',
          800: '#E65100',
          900: '#BF360C',
        },
      },
      fontFamily: {
        sans:  ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
