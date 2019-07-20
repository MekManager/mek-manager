const commonjs = require("rollup-plugin-commonjs");
const resolve = require('rollup-plugin-node-resolve');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/core-js/client/shim.min.js',
      { pattern: 'build/**/specs/*.spec.js' }
    ],
    preprocessors: {
      'build/**/specs/*.spec.js': ['rollup'],
    },
    reporters: ["dots"],
    rollupPreprocessor: {
      plugins: [
        commonjs(),
        resolve({
          mainFields: ['module', 'main', 'jsnext:main'],
        }),
      ],
      output: {
        format: 'iife',
        name: 'mekManager',
        sourcemap: 'inline',
        exports: 'named',
        globals: {
          chai: 'chai',
          mocha: 'mocha',
        }
      },
      external: ['mocha', 'chai'],
    }
  })
}
