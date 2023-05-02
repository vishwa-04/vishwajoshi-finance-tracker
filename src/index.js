import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import './index.css';
import App from './App'
import ShowTable from './pages/Component/showTable';
import reportWebVitals from './reportWebVitals';
import ViewTransaction from './pages/Component/transaction';
import UpdateTransaction from './pages/Component/update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/showTable",
    element:<ShowTable/>
  },
  {
    path: `/transaction/:id`,
    element:<ViewTransaction/>
  },
  {
    path: `/update/:id`,
    element:<UpdateTransaction/>
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
reportWebVitals();
