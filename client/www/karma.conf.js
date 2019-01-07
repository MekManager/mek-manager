const commonjs = require("rollup-plugin-commonjs");
// NOTE: tsc produces mostly browser compatible code, buble cleans up the rough
// edges. Mostly import and export keywords.
const buble = require("rollup-plugin-buble");

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
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
        commonjs({
          namedExports: {
            './node_modules/mithril/mithril.js': ['route'],
            './node_modules/kefir/dist/kefir.js': ['fromEvents'],
            './node_modules/mocha/index.js': ['describe', 'it'],
            './node_modules/chai/index.js': ['expect'],
          }
        }),
        buble(),
      ],
      output: {
        format: 'iife',
        name: 'mekManager',
        sourcemap: 'inline',
        globals: {
          chai: 'chai',
          mocha: 'mocha',
        }
      },
      external: ['mocha', 'chai'],
    }
  })
}