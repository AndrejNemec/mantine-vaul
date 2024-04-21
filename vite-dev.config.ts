import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import postCSSPresetMantine from 'postcss-preset-mantine'
import postCSSSimpleVars from 'postcss-simple-vars'

export default defineConfig({
  plugins: [react()],
  css: {
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
  }
})
