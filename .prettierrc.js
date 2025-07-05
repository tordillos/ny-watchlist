/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: 'es5',
  semi: false,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 80,
  plugins: ['prettier-plugin-tailwindcss'],
}
