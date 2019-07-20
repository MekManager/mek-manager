import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.ts',
  treeshake: true, // ensure this is always on, don't rely on defaults
  output: {
    file: './dist/index.js',
    format: 'iife', // immediately-invoked function expression - for <script> tags
    globals: {},
    name: 'mekManager',
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    resolve({ mainFields: ['module', 'main', 'jsnext:main'] }),
    commonjs({
      namedExports: {
        './node_modules/mithril/mithril.js': ['route'],
        './node_modules/kefir/dist/kefir.js': ['fromEvents']
      }
    }),
    terser({ sourcemap: true })
  ],
  external: []
}
