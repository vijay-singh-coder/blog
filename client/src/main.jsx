import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/dashboard.jsx';
import ViewBlog from './pages/viewblog.jsx';
import EditBlog from './pages/editblog.jsx';
import Home from './pages/home.jsx';
import NavBar from './components/navBar.jsx';
import Layout from './components/Layout.jsx';
import PrivateRoute from './utils/privateRoute.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "view/:id", element: <ViewBlog /> },
          { path: "edit/:id", element: <EditBlog /> },
        ],
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
    </RouterProvider>
  </QueryClientProvider>
)
