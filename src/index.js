import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Search from './view/Search';
import Calalogs from './view/Catalogs';
import CatalogTerms from './view/CatalogTerms';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/catalog",
    element: <Calalogs />
  },
  {
    path: "/terms",
    element: <CatalogTerms />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} basename='/' />
  // <React.StrictMode>
  // </React.StrictMode>
);

reportWebVitals();
