import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.ts',
  output: {
    file: 'index.js',
    format: 'iife', // immediately-invoked function expression - for <script> tags
    sourcemap: true
  },
  sourcemap: true,
  plugins: [
    typescript(),
    resolve({ jsnext: true }),
    commonjs({
      namedExports: {
        './node_modules/mithril/mithril.js': ['route'],
        './node_modules/kefir/dist/kefir.js': ['fromEvents']
      }
    }),
    terser({ sourcemap: true })
  ],
  globals: {},
  external: []
}
