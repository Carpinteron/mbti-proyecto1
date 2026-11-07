import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { ConfirmProvider } from './context/ConfirmContext';
import { CollectionProvider } from './context/CollectionContext';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('The root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ConfirmProvider>
          <CollectionProvider>
            <App />
          </CollectionProvider>
        </ConfirmProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
