import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { App } from './App'
import { VaulContent } from '../lib'

const container = document.getElementById('app')!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                components: {
                    VaulContent: VaulContent.extend({
                        
                    })
                },
                defaultRadius: 'xl',
            }}
        >
            {/* eslint-disable-next-line react/no-unknown-property */}
            <main data-mantine-vaul-wrapper="">
                <App />
            </main>
        </MantineProvider>
    </React.StrictMode>,
)