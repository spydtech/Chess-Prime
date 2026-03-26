// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import { ErrorElement } from "./error/ErrorElement";
// import Register from "./components/Register";
// import RegisterForm from "./components/RegisterForm";
// import Login from "./components/Login";
// import ChessExperience from "./components/ChessExperience";
// import TimeControlPage from "./components/controlPage/TimeControlPage";
// import Dashboard from "./components/Dashboard";
// import DashboardLayout from "./components/DashboardLayout";
// import ChessversLanding from "./components/ChessversLanding";
// import GamePage from "./components/pagescomponents/gamePages/GamePage";
// import ChessAcademySlider from "./components/ChessAcademySlider";
// import Boardstyle from "./components/BoardStyle"
// import Tournamentdashboard from "./components/MainPage"
// import Puzzles from "./components/pagescomponents/Puzzles";
// import Profile from "./components/Profile";
// import EditProfile from "./components/EditProfile";
// import { AppProviders } from "./Provider/AppProviders";
// import PuzzleAdmin from "./components/pagescomponents/gamePages/PuzzleAdmin";
// import Social from "./components/pagescomponents/Social";




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
//       path: "/social",
//       element: <Social />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/board-style",
//       element: <Boardstyle />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/puzzles",
//       element: <Puzzles />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/tournament",
//       element: <Tournamentdashboard />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/profile",
//       element: (
//        // <DashboardLayout>
//           <Profile />
//        // </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/edit-profile",
//       element: (
//         <DashboardLayout>
//           <EditProfile />
//         </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/puzzlesAdmin",
//       element: <PuzzleAdmin />,
//       errorElement: <ErrorElement />,
//     },
//     {
//       path: "/time-control",
//       element: (
//         <DashboardLayout>
//           <TimeControlPage />
//         </DashboardLayout>
//       ),
//       errorElement: <ErrorElement />,
//     },
//     // Keep the existing dynamic route for mode-based games
//     {
//       path: "/game/:mode/:timeControl?",
//       element: <GamePage />,
//       errorElement: <ErrorElement />,
//     },
//     // 🔥 ADD THIS NEW ROUTE FOR SPECIFIC GAME IDs (for lobby auto-start)
//     {
//       path: "/game/:gameId",
//       element: <GamePage />,
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

//   return (
//     <AppProviders>
//       <RouterProvider router={router} />
//     </AppProviders>
//   );
// }

// export default App;
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import Boardstyle from "./components/BoardStyle";
import Tournamentdashboard from "./components/MainPage";
import Puzzles from "./components/pagescomponents/Puzzles";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import { AppProviders } from "./Provider/AppProviders";
import PuzzleAdmin from "./components/pagescomponents/gamePages/PuzzleAdmin";
import Social from "./components/pagescomponents/Social";
import { useAuth } from "./context/AuthContext"; 

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Wrapper component that provides auth context to routes
const AppRoutes = () => {
  const { loading } = useAuth();
  
  // Don't render routes until auth is initialized
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading your chess experience...</div>
      </div>
    );
  }
  
  const router = createBrowserRouter([
    // Public routes
    {
      path: "/",
      element: (
        <PublicRoute>
          <ChessversLanding />
        </PublicRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/register-form",
      element: (
        <PublicRoute>
          <RegisterForm />
        </PublicRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/chess-learning",
      element: (
        <PublicRoute>
          <ChessAcademySlider />
        </PublicRoute>
      ),
      errorElement: <ErrorElement />,
    },
    
    // Protected routes (require authentication)
    {
      path: "/chess-experience",
      element: (
        <ProtectedRoute>
          <ChessExperience />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/social",
      element: (
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/board-style",
      element: (
        <ProtectedRoute>
          <Boardstyle />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/puzzles",
      element: (
        <ProtectedRoute>
          <Puzzles />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/tournament",
      element: (
        <ProtectedRoute>
          <Tournamentdashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/edit-profile",
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <EditProfile />
          </DashboardLayout>
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/puzzlesAdmin",
      element: (
        <ProtectedRoute>
          <PuzzleAdmin />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/time-control",
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <TimeControlPage />
          </DashboardLayout>
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    // Game routes (protected)
    {
      path: "/game/:mode/:timeControl?",
      element: (
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/game/:gameId",
      element: (
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <div className="flex-1 p-10 text-white">Settings Page Content</div>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      errorElement: <ErrorElement />,
    },
    
    // Catch all - redirect to login or home based on auth state
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;