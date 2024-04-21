import React from 'react'
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { App } from './App';

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <MantineProvider>
            <App />
        </MantineProvider>
    </React.StrictMode>,
);