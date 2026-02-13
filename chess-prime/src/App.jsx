import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ErrorElement } from "./error/ErrorElement";
import ChessversLanding from "./components/ChessversLanding";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChessversLanding />,
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