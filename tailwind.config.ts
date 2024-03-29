import type { Config } from 'tailwindcss';
const tailwindColors = require('./node_modules/tailwindcss/colors');

// https://stackoverflow.com/a/73057959
const safeList: string[] = [];
const safeColors: string[] = ['teal', 'blue', 'amber', 'red'];
const deprecated: string[] = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'];

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

export default {
  content: ['./layout/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: safeList,
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
