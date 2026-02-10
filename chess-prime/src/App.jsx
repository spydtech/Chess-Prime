import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ErrorElement } from "./error/ErrorElement";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Welcome to Chess Game</div>,
      errorElement: <ErrorElement />,
    },
    {
      path: "/signin",
      element: <div>Sign In Page</div>,
      errorElement: <ErrorElement />,
    },
    {
      path: "/register",
      element: <div>Register Page</div>,
      errorElement: <ErrorElement />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;