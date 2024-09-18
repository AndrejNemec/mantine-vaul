import '@mantine/code-highlight/styles.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { VaulContent } from '../lib'
import { App } from './App'
import './style.css'

const container = document.getElementById('app')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        scale: 1,
        components: {
          VaulContent: VaulContent.extend({})
        },
        defaultRadius: 'xl'
      }}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <main data-mantine-vaul-wrapper='' data-vaul-drawer-wrapper=''>
        <App />
      </main>
    </MantineProvider>
  </React.StrictMode>
)
