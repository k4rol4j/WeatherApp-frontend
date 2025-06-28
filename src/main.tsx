import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import '@mantine/core/styles.css';
import './index.css';
import 'leaflet/dist/leaflet.css';

const root = createRoot(document.getElementById('root')!);

root.render(
    <MantineProvider defaultColorScheme="light">
        <App />
    </MantineProvider>
);

export {};
