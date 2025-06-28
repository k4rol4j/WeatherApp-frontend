import React from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App'
import 'leaflet/dist/leaflet.css'
import '@mantine/core/styles/baseline.css'
import '@mantine/core/styles/default-css-variables.css'
import '@mantine/core/styles/global.css'

const root = createRoot(document.getElementById('root')!)
root.render(
    <React.StrictMode>
        <MantineProvider >
            <App />
        </MantineProvider>
    </React.StrictMode>
)

export {}
