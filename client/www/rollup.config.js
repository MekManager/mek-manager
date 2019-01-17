import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'iife', // immediately-invoked function expression - for <script> tags
    name: 'mekManager',
    sourcemap: true
  },
  sourcemap: true,
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
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
