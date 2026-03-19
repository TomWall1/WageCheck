import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EEF4FB',
          100: '#D5E4F4',
          200: '#ABCAE9',
          400: '#5892CF',
          500: '#3575B9',
          600: '#1B5A9C',
          700: '#13447A',
          900: '#0B2649',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#FBBF24',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
        },
        danger: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        success: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          600: '#16A34A',
          700: '#15803D',
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
