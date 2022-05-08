module.exports = {
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: "./",
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    "import/prefer-default-export": 0
  },
};
