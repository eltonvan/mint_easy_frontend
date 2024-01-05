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
import FormPage from "./pages/formPage/FormPage";

/*
the main component of the application
it renders the navbar, the menu, main section and the footer 
it also renders the routes based on the url
*/


const queryClient = new QueryClient() // create a new query client instance from react-query


function App() {
const Layout = ({ showMenu }) => { // Layout component to render the navbar, menu, main section and the footer
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
         {/* Wrap the application with the QueryClientProvider */}
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
  

    const router = createBrowserRouter([ // create the router
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
          {
            path:"/reset-password/:uid/:token",
            element: <FormPage/>
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
