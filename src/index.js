import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Search from './view/Search';
import Calalogs from './view/Catalogs';

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
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  // <React.StrictMode>
  // </React.StrictMode>
);

reportWebVitals();
