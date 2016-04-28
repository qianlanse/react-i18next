import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import npm from 'rollup-plugin-npm';
import commonjs from 'rollup-plugin-commonjs';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';
const compress = argv.uglify;

const babelOptions = {
  exclude: 'node_modules/**',
  presets: ['es2015-rollup', 'stage-0'],
  babelrc: false
};

const dest = {
  amd: `dist/amd/react-i18next${compress ? '.min' : ''}.js`,
  umd: `dist/umd/react-i18next${compress ? '.min' : ''}.js`,
  iife: `dist/iife/react-i18next${compress ? '.min' : ''}.js`
}[format];

export default {
  entry: 'src/index.js',
  format,
  external: ['react'],
  plugins: [
    babel(babelOptions),
    npm({ jsnext: true }),
    commonjs()
  ].concat(compress ? uglify() : []),
  moduleName: 'react-i18next',
  moduleId: 'react-i18next',
  dest
};
