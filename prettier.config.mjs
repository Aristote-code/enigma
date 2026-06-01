let options = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 100,
  endOfLine: 'lf',
  overrides: [
    {
      files: '**/*.json',
      options: { parser: 'json' },
    },
  ],
}

const sortImportsOptions = {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '', '^(@|\\.{1,2})/(.*)$'],
}

if (process.env.SORT_IMPORTS !== 'false') {
  options = { ...options, ...sortImportsOptions }
}

export default options
