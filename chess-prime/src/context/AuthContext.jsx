// import React, { createContext, useState, useContext, useEffect } from 'react';
// import authService from '../services/authService';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Check if user is already logged in
//     const initAuth = async () => {
//       const storedUser = authService.getCurrentUserFromStorage();
//       const token = authService.getToken();

//       if (storedUser && token) {
//         try {
//           // Verify token by fetching current user
//           const userData = await authService.getCurrentUser();
//           setUser(userData.user);
//         } catch (error) {
//           // Token is invalid or expired
//           authService.logout();
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();
//   }, []);

//   const register = async (userData) => {
//     try {
//       setError(null);
//       const response = await authService.register(userData);
//       setUser(response.user);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Registration failed');
//       throw error;
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       setError(null);
//       const response = await authService.login(credentials);
//       setUser(response.user);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       throw error;
//     }
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//   };

//   const forgotPassword = async (email) => {
//     try {
//       setError(null);
//       const response = await authService.forgotPassword(email);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to process request');
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     register,
//     login,
//     logout,
//     forgotPassword,
//     isAuthenticated: authService.isAuthenticated()
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import api from '../services/api';
import { io } from 'socket.io-client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const initAuth = async () => {
  //     const storedUser = authService.getCurrentUserFromStorage();
  //     const token = authService.getToken();

  //     if (storedUser && token) {
  //       try {
  //         const userData = await authService.getCurrentUser();
  //         setUser(userData);
  //       } catch (error) {
  //         authService.logout();
  //         setUser(null);
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   initAuth();
  // }, []);


   useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getCurrentUserFromStorage();
      const token = authService.getToken();

      if (storedUser && token) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.user);
          
          // Initialize socket connection
          const newSocket = io('http://localhost:5000', {
            transports: ['websocket'],
            withCredentials: true
          });
          
          newSocket.on('connect', () => {
            newSocket.emit('authenticate', { userId: response.user.id, token });
          });
          
          setSocket(newSocket);
        } catch (error) {
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
        const newSocket = io('http://localhost:5000', {
        transports: ['websocket'],
        withCredentials: true
      });
      
      newSocket.on('connect', () => {
        newSocket.emit('authenticate', { userId: response.user.id, token: response.token });
      });
      
      setSocket(newSocket);
      return response.user;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
       const newSocket = io('http://localhost:5000', {
        transports: ['websocket'],
        withCredentials: true
      });
      
      newSocket.on('connect', () => {
        newSocket.emit('authenticate', { userId: response.user.id, token: response.token });
      });
      
      setSocket(newSocket);
      return response.user;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const updateChessExperience = async (experienceId) => {
    try {
      setError(null);
      const response = await api.put('/auth/chess-experience', { 
        chessExperience: experienceId 
      });
      
      // Update user in state and localStorage
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update chess experience');
      throw error;
    }
  };

  const logout = () => {
      if (socket) {
      socket.close();
    }
    authService.logout();
    setUser(null);
    setSocket(null);
  };

  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to process request');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
     socket,
    register,
    login,
    logout,
    forgotPassword,
    updateChessExperience,
    isAuthenticated: authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};