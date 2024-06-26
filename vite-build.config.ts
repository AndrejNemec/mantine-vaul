import react from '@vitejs/plugin-react'
import postCSSPresetMantine from 'postcss-preset-mantine'
import postCSSSimpleVars from 'postcss-simple-vars'
import { preserveDirectives } from 'rollup-plugin-preserve-directives'
import type { UserConfigExport } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import tsconfigPaths from 'vite-tsconfig-paths'

const buildOutputDir = 'dist'
const rootDir = './src/lib'
const entryFile = `${rootDir}/index.ts`

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      externalizeDeps({
        include: [],
      }),
      preserveDirectives(),
      tsconfigPaths(),
      dts({
        outDir: `${buildOutputDir}/esm`,
        entryRoot: rootDir,
        include: rootDir,
        compilerOptions: {
          module: 99,
          declarationMap: false,
        },
      }),
      dts({
        outDir: `${buildOutputDir}/cjs`,
        entryRoot: rootDir,
        include: rootDir,
        compilerOptions: {
          module: 1,
          declarationMap: false,
        },
      }),
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      postcss: {
        plugins: [
          postCSSPresetMantine(),
          postCSSSimpleVars({
            variables: {
              'mantine-breakpoint-xs': '36em',
              'mantine-breakpoint-sm': '48em',
              'mantine-breakpoint-md': '62em',
              'mantine-breakpoint-lg': '75em',
              'mantine-breakpoint-xl': '88em',
            },
          })
        ],
      }
    },
    build: {
      outDir: buildOutputDir,
      minify: true,
      sourcemap: true,
      lib: {
        entry: entryFile,
        formats: ['es', 'cjs'],
        fileName: (format) => {
          if (format === 'cjs') return 'cjs/[name].cjs'
          return 'esm/[name].js'
        },
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          exports: 'named',
        },
      }
    }
  })
}
// https://vitejs.dev/config/
export default app
