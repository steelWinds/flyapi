import { resolve as resolvePath } from 'path';
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/main.ts',
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
		alias({
      entries: [
				{
          find: 'src',
          replacement: 'src'
        }
      ],
    }),
		commonjs(),
		resolve(),
		typescript({
			exclude: resolvePath('src', '__tests__', '**', '*.spec.ts')
		}),
		babel({
			babelHelpers: 'bundled',
			extensions: ['.ts'],
			include: resolvePath('src', '**', '*.ts')
		}),
		isProduction && (await import('@rollup/plugin-terser')).default(),
	]
}
