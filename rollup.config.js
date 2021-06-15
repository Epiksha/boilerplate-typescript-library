import typescript from 'rollup-plugin-typescript2'
import eslint from '@rollup/plugin-eslint';
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        eslint(),
        typescript({
            typescript: require('typescript'),
        }),
        uglify(),
    ],
}