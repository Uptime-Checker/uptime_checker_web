/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'border-teal-400',
    'border-red-400',
    'border-amber-400',
    'text-teal-500',
    'text-red-500',
    'text-amber-500',
    'text-teal-50',
    'bg-red-50',
    'bg-amber-50',
    'bg-teal-100',
    'bg-red-100',
    'bg-amber-100',
    'hover:bg-teal-50',
    'hover:bg-red-50',
    'hover:bg-amber-50',
  ],
  plugins: [require('@tailwindcss/forms')],
};
