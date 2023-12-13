# Frontend  smart invest

## Project setup





1.clone the project 



2.Node js is the runtime environment for javascript 

install node.js from https://nodejs.org/en/download/

or type in terminal

```bash
sudo apt install nodejs
```
3.check version

```bash
node -v
```

install npm (node package manager) 

```bash
sudo apt install npm
```

install scss 

```bash
npm install -g sass
```
navigate to the project folder to
install dependencies

```bash
npm install

cd smart_invest

npm install
```

4. run the project

```bash
npm run dev
```

start the browser on the url provided by the terminal

probably:

http://localhost:5173/



-----------------------------------------
## Project structure

### src folder

contains the source code of the project

#### src/components

contains the components of the project:
- Header
- Footer
- menu
- navbar
- charts
- login form
- user form (registration)

and any other component that will be added

every component has its own folder with the following structure

- component_name
    - component_name.tsx
    - component_name.scss

#### src/pages

contains the pages of the project:
- Home
- About
- Contact

and any other page that will be added

every page has its own folder with the following structure

- page_name
    - page_name.tsx
    - page_name.scss

#### public

contains the public files of the project:
- images
- fonts
- icons

and any other public file that will be added


#### src/styles

contains the global styles of the project:
- global.scss
- variables.scss

and any other global style that will be added

#### src/node_modules

contains the dependencies of the project

#### src/index.html

contains the html file of the project

#### src/index.tsx

contains the entry point of the project

#### src/App.tsx

contains the main component of the project

#### src/App.scss

contains the main styles of the project

#### src/App.test.tsx

contains the test file of the project

#### src/vite-env.d.ts

contains the environment variables of the project

#### src/tsconfig.json

contains the typescript configuration of the project

#### src/package.json and src/package-lock.json

contains the dependencies of the project




## Routing

### react-router-dom

in app.tsx we have the following code to handle routing

```typescript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
```

```typescript

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// code omitted for brevity

const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
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

```

