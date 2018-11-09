module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'on',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'on',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'max-len': ["error", { "code": 130 }],
    "no-console": 0,
  }
};