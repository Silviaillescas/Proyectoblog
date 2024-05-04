// main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa correctamente createRoot
import App from './App'; // Asegúrate que la ruta a App es correcta

// Busca el elemento raíz en tu HTML
const container = document.getElementById('root');
const root = createRoot(container); // Crea la raíz utilizando el nuevo método

// Renderiza tu aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
