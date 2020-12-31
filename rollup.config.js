import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-porter'
import minimist from 'minimist'

import { terser } from 'rollup-plugin-terser'

const argv = minimist(process.argv.slice(2))

const config = {
  input: 'src/index.ts',
  output: {
    name: 'VuetifyProLayout',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'vuetify/lib': 'Vuetify'
    }
  },
  external: ['vue', 'vuetify/lib', '@vue/composition-api', '@mdi/js'],
  plugins: [
    vue({
      css: false,
      compileTemplate: true
    }),
    css({ dest: 'dist/vuetify-pro-layout.css' }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    typescript(),
    buble({
      objectAssign: 'Object.assign',
      transforms: { asyncAwait: false }
    })
  ]
}

if (argv.format === 'iife') {
  // config.plugins.push()
  config.plugins.push(terser())
}
export default config
