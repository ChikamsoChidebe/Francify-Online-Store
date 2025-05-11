import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './tailwind.css';
import './styles/main.css';
import './styles/components.css';
import AuthProvider from './context/AuthContext';
import { ProductProvider } from './context/ProductContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
);