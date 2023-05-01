import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Search from './view/Search';
import Field from './view/Field';
import FieldTerms from './view/FieldTerms';
import Admin from './view/Admin';
import TermExtract from './view/TermExtract';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/term",
    element: <Search />
  },
  {
    path: "/term/ai",
    element: <Search />
  },
  {
    path: "/field",
    element: <Field />
  },
  {
    path: "/terms",
    element: <FieldTerms />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/extract",
    element: <TermExtract />
  },
  {
    path: "/extract/add",
    element: <TermExtract />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} basename='/' />
  // <React.StrictMode>
  // </React.StrictMode>
);

reportWebVitals();
