import { resolve as resolvePath } from "path";

import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import commonjs from '@rollup/plugin-commonjs';
const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'lib/main.ts',
	output: [
		{
			name: 'flyapi',
			file: 'dist/main.umd.cjs',
			format: 'umd'
		},
		{
			file: 'dist/main.js',
			format: 'esm',
			sourcemap: 'inline'
		},
	],
	plugins: [
		commonjs(),
		resolve(),
		typescript(),
		babel({
			babelHelpers: 'bundled',
			extensions: ['.ts'],
			include: resolvePath('lib', '**', '*.ts')
		}),
		isProduction && (await import('@rollup/plugin-terser')).default(),
	]
}
