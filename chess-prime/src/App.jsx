import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ErrorElement } from "./error/ErrorElement";
import Register from "./components/Register";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import ChessExperience from "./components/ChessExperience";
import TimeControlPage from "./components/controlPage/TimeControlPage";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import ChessversLanding from "./components/ChessversLanding";
import GamePage from "./components/pagescomponents/gamePages/GamePage";
import ChessAcademySlider from "./components/ChessAcademySlider";
import Boardstyle from "./components/BoardStyle"
import Tournamentdashboard from "./components/MainPage"
import Puzzles from "./components/pagescomponents/Puzzles";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChessversLanding />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/register-form",
      element: <RegisterForm />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/login",
      element: <Login />,
      // errorElement: <ErrorElement />,
    },
    {
      path: "/chess-learning",
      element: <ChessAcademySlider />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/chess-experience",
      element: <ChessExperience />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/board-style",
      element: <Boardstyle />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/puzzles",
      element: <Puzzles />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/tournament",
      element: <Tournamentdashboard />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/time-control",
      element: (
        <DashboardLayout>
          <TimeControlPage />
        </DashboardLayout>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/game/:mode/:timeControl?",
      element: <GamePage />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/profile",
      element: (
        <DashboardLayout>
          <div className="flex-1 p-10 text-white">Profile Page Content</div>
        </DashboardLayout>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/settings",
      element: (
        <DashboardLayout>
          <div className="flex-1 p-10 text-white">Settings Page Content</div>
        </DashboardLayout>
      ),
      errorElement: <ErrorElement />,
    }
  ]);

  // Wrap RouterProvider with AuthProvider
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import { ErrorElement } from "./error/ErrorElement";
// import Register from "./components/Register";
// import RegisterForm from "./components/RegisterForm";
// import Login from "./components/Login";
// import ChessExperience from "./components/ChessExperience";
// import TimeControlPage from "./components/controlPage/TimeControlPage";
// import Dashboard from "./components/Dashboard"; // Import the new Dashboard component
// import DashboardLayout from "./components/DashboardLayout"; // Optional: import layout
// import ChessversLanding from "./components/ChessversLanding"; // Import the landing page
// import GamePage from "./components/pagescomponents/gamePages/GamePage";
// import ChessAcademySlider from "./components/ChessAcademySlider";
// import Boardstyle from "./components/BoardStyle"
// import Tournamentdashboard from "./components/MainPage"
// import Puzzles from "./components/pagescomponents/Puzzles";



// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <ChessversLanding />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/register-form",
//       element: <RegisterForm />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/login",
//       element: <Login />,
//       // errorElement: <ErrorElement />,
//     },

//     {
//       path: "/chess-learning",
//       element: <ChessAcademySlider />,
//       errorElement: <ErrorElement />,

//     },
//     {
//       path: "/chess-experience",
//       element: <ChessExperience />,
//       errorElement: <ErrorElement />,
//     },
//     {
//           path: "/board-style",
//           element: <Boardstyle />,
//           errorElement: <ErrorElement />,
//         },
//         {
//           path: "/puzzles",
//           element: <Puzzles />,
//           errorElement: <ErrorElement />,
//         },
//         {
//           path: "/tournament-dashboard",
//           element: <Tournamentdashboard />,
//           errorElement: <ErrorElement />,
//         },
//     {
//       path: "/dashboard",
//       element: <Dashboard />, // Using the combined Dashboard component
//       errorElement: <ErrorElement />,
//     },
//     // Option 2: If you want to use the layout for multiple pages
//     {
//       path: "/time-control",
//       element: (
//         <DashboardLayout>
//           <TimeControlPage />
//         </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     },
//      {
//       path: "/game/:mode/:timeControl?",
//       element: <GamePage />,
//       errorElement: <ErrorElement />,
//     },
    
//     // You can add more routes that use the same layout
//     {
//       path: "/profile",
//       element: (
//         <DashboardLayout>
//           <div className="flex-1 p-10 text-white">Profile Page Content</div>
//         </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/settings",
//       element: (
//         <DashboardLayout>
//           <div className="flex-1 p-10 text-white">Settings Page Content</div>
//         </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     }
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;