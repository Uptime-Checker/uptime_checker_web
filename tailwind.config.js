/** @type {import('tailwindcss').Config} */

// https://stackoverflow.com/a/73057959
const colorSafeList = [];
const safeColors = ['teal', 'blue', 'amber', 'red'];
const deprecated = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const tailwindColors = require('./node_modules/tailwindcss/colors');

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName) || !safeColors.includes(colorName)) {
    continue;
  }
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const pallette = tailwindColors[colorName];

  if (typeof pallette === 'object') {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`);
        colorSafeList.push(`bg-${colorName}-${shade}`);
        colorSafeList.push(`hover:bg-${colorName}-${shade}`);
        colorSafeList.push(`border-${colorName}-${shade}`);
      }
    });
  }
}

module.exports = {
  content: ['./layout/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: colorSafeList,
  plugins: [require('@tailwindcss/forms')],
};
