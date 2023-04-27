import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Search from './view/Search';
import Calalogs from './view/Catalogs';
import CatalogTerms from './view/CatalogTerms';
import Admin from './view/Admin';

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
  },
  {
    path: "/admin",
    element: <Admin />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} basename='/' />
  // <React.StrictMode>
  // </React.StrictMode>
);

reportWebVitals();
