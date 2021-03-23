const path = require('path')
const { RollupOptions } = require('rollup')
const rollupTypescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { eslint } = require('rollup-plugin-eslint')
const { DEFAULT_EXTENSIONS } = require('@babel/core')
const pkg = require('./package.json')

// rollup 配置项
module.exports = {
  input: path.join(__dirname, '/src/index.ts'),
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(path.join(__dirname, '/lib'), 'index.js'),
      format: 'cjs',
      name: 'CratoswUtil',
    },
    // 输出 es 规范的代码
    {
      file: path.join(path.join(__dirname, '/lib'), 'index.esm.js'),
      format: 'es',
      name: 'CratoswUtil',
    },
    {
      file: path.join(path.join(__dirname, '/lib'), 'index.umd.js'),
      format: 'umd',
      name: 'CratoswUtil',
      sourcemap: false,
    },
  ],
  external: Object.keys(pkg.Pedependencies || {}).concat(), // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  // plugins 需要注意引用顺序
  plugins: [
    // 验证导入的文件
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'lib/**', '*.js'],
    }),

    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),

    // 配合 commnjs 解析第三方模块
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    }),
  ],
}
