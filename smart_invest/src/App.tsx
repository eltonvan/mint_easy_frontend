import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, RouterProvider, Outlet, useRoutes } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axiosInstance from './axiosInstance';



const queryClient = new QueryClient()


function App() {




const Layout = ({ showMenu }) => {
    const routes = useRoutes([
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/users/:id',
        element: <User />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
    ]);
  
    // Check if the current route is the home page
    const isHome = window.location.pathname === '/';
  
    return (
      <div className="main">
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="container">
          {/* render the Menu based on the route */}
          {isHome ? null : (
            <div className="menuContainer">
              <Menu />
            </div>
          )}
          <div className="contentContainer">
            
              {routes || <Outlet />} {/* Render the route element or Outlet */}
            
          </div>
        </div>
        </QueryClientProvider>
        <Footer />
      </div>
    );
  };
  

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout showMenu={false} />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/users/:id",
            element: <User />,
          },
          {
            path: "/products/:id",
            element: <Product />,
          },
        ],
      },
      {
        path:"/login",
        element: <Login/>
      },
  
    ]);

  return <RouterProvider router={router} />;
}

export default App;
