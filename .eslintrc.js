module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    createDefaultProgram: true,
    project: ['./tsconfig.json'],
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'eslint-comments',
    'jest',
    'unicorn',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    // custom rules
    'prettier/prettier': 'error',

    'class-methods-use-this': 'off',
    'no-extend-native': 0,
    // 禁止直接使用 prototype => off
    'no-prototype-builtins': 0,
    // 操作符换行 => off
    'operator-linebreak': 0,
    // 实参不允许修改 => off
    'no-param-reassign': 0,
    // i++ => off
    'no-plusplus': 0,
    // 直接使用全局变量 => off
    'no-restricted-globals': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-unused-vars': 0,
    // 禁止循环引用
    'import/no-cycle': 2,
    // 对一些特殊路径解析
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/', '^@@/'],
        caseSensitive: true,
        commonjs: true,
      },
    ],
    // 顺序的 import
    'import/order': 2,
    // 必须优先 export default
    'import/prefer-default-export': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 2,
  },
}
