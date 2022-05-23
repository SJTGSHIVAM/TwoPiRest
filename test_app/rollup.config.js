import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-import-css';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const { TARGET_ENV } = process.env;
export default {
  input: "./src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "iife",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": JSON.stringify(
        TARGET_ENV === "production" ? "production" : "development"
      ),
    }),
    nodeResolve(),
    commonjs(),
    babel({
      extensions: [".js", ".ts", ".tsx"],
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
    }),
    css(),
    typescript(),
    livereload(),
    serve({
      port: 30000,
      historyApiFallback: true,
      file: "dist/index.html",
    }),
  ],
};
