/** @type {import("tailwindcss").Config} */

// https://stackoverflow.com/a/73057959
const safeList = [];
const safeColors = ['teal', 'blue', 'amber', 'red'];
const deprecated = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];
const tailwindColors = require('./node_modules/tailwindcss/colors');

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName) || !safeColors.includes(colorName)) {
    continue;
  }
  const shades = [50, 100, 200, 300, 400, 500];
  const palette = tailwindColors[colorName];

  if (typeof palette === 'object') {
    shades.forEach((shade) => {
      if (shade in palette) {
        safeList.push(`text-${colorName}-${shade}`);
        safeList.push(`bg-${colorName}-${shade}`);
        safeList.push(`hover:bg-${colorName}-${shade}`);
        safeList.push(`border-${colorName}-${shade}`);
      }
    });
  }
}

for (let index = 1; index <= 100; index++) {
  safeList.push(`w-[${index}%]`);
}

module.exports = {
  content: ['./layout/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: safeList,
  plugins: [require('@tailwindcss/forms')],
};
