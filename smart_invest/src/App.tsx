import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter, RouterProvider, Outlet, useRoutes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormPage from "./pages/formPage/FormPage";
import { NavbarProvider } from "./contexts/NavbarContext";


/*
the main component of the application
it renders the navbar, the menu, main section and the footer 
it also renders the routes based on the url
*/


const queryClient = new QueryClient(); // create a new query client instance from react-query

interface LayoutProps {
  showMenu: boolean;
}

const Layout: React.FC<LayoutProps> = ({ showMenu }) => { // Layout component to render the navbar, menu, main section and the footer
  const routes = useRoutes([ 
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  // Check if the current route is the home page
  const isHome = window.location.pathname === '/';

  const renderMenu = showMenu && !isHome ? (
    <div className="menuContainer">
      <Menu />
    </div>
  ) : null;

  return (
    <div className="main">
      {/* Wrap the application with the QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
      <NavbarProvider>
        <Navbar />
        
        <div className="container">
          {renderMenu}
          <div className="contentContainer">
            {routes || <Outlet />}
          </div>
        </div>
        <Footer />
        </NavbarProvider>
      </QueryClientProvider>
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
        path:"/reset-password/:uid/:token",
        element: <FormPage/>
      },
      {
        path:"/confirm-email/:key",
        element: <FormPage/>
      },
    ],
  },
  {
    path:"/login",
    element: <Login/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
