module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-unused-vars': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'error',
  },
  ignorePatterns: ['.eslintrc.js'],
};
