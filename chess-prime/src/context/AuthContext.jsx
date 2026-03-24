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

// const SOCKET_URL = 'http://localhost:5000'; // Replace with your actual socket URL


// import React, { createContext, useState, useContext, useEffect } from 'react';
// import authService from '../services/authService';
// import profileService from '../services/profileService';
// import api from '../services/api';
// import { io } from 'socket.io-client';

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
//   const [socket, setSocket] = useState(null);
//    const [profileCompletion, setProfileCompletion] = useState(0);

//   // useEffect(() => {
//   //   const initAuth = async () => {
//   //     const storedUser = authService.getCurrentUserFromStorage();
//   //     const token = authService.getToken();

//   //     if (storedUser && token) {
//   //       try {
//   //         const userData = await authService.getCurrentUser();
//   //         setUser(userData);
//   //       } catch (error) {
//   //         authService.logout();
//   //         setUser(null);
//   //       }
//   //     }
//   //     setLoading(false);
//   //   };

//   //   initAuth();
//   // }, []);


//    useEffect(() => {
//     const initAuth = async () => {
//       const storedUser = authService.getCurrentUserFromStorage();
//       const token = authService.getToken();

//       if (storedUser && token) {
//         try {
//           const response = await authService.getCurrentUser();
//           setUser(response.user);
//           // Fetch profile completion
//           try {
//             const completion = await profileService.getProfileCompletion();
//             setProfileCompletion(completion.completion);
//           } catch (profileError) {
//             console.error('Error fetching profile completion:', profileError);
//           }
          
//           // Initialize socket connection
//         // Initialize socket connection
//           const newSocket = io(SOCKET_URL, {
//             transports: ['websocket'],
//             withCredentials: true
//           });
          
//           newSocket.on('connect', () => {
//             newSocket.emit('authenticate', { userId: response.id, token });
//           });
          
//           setSocket(newSocket);
//         } catch (error) {
//           authService.logout();
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);
//   const register = async (userData) => {
//     try {
//       setError(null);
//       const response = await authService.register(userData);
//       setUser(response.user);
//        // Initialize socket connection
//           const newSocket = io(SOCKET_URL, {
//             transports: ['websocket'],
//             withCredentials: true
//           });
      
//       newSocket.on('connect', () => {
//         newSocket.emit('authenticate', { userId: response.user.id, token: response.token });
//       });
      
//       setSocket(newSocket);
//       return response.user;
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
//       // Fetch profile completion after login
//       try {
//         const completion = await profileService.getProfileCompletion();
//         setProfileCompletion(completion.completion);
//       } catch (profileError) {
//         console.error('Error fetching profile completion:', profileError);
//       }
      
//       // Initialize socket connection
//           const newSocket = io(SOCKET_URL, {
//             transports: ['websocket'],
//             withCredentials: true
//           });
      
//       newSocket.on('connect', () => {
//         newSocket.emit('authenticate', { userId: response.user.id, token: response.token });
//       });
      
//       setSocket(newSocket);
//       return response.user;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       throw error;
//     }
//   };

//   const updateChessExperience = async (experienceId) => {
//     try {
//       setError(null);
//       const response = await api.put('/auth/chess-experience', { 
//         chessExperience: experienceId 
//       });
      
//       // Update user in state and localStorage
//       setUser(response.data.user);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
      
//       return response.data;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update chess experience');
//       throw error;
//     }
//   };


//    // Profile Methods
//   const updateProfile = async (profileData) => {
//     try {
//       setError(null);
//       const response = await profileService.updateProfile(profileData);
      
//       // Update user in state and localStorage
//       setUser(response.user);
//       localStorage.setItem('user', JSON.stringify(response.user));
      
//       // Update profile completion
//       try {
//         const completion = await profileService.getProfileCompletion();
//         setProfileCompletion(completion.completion);
//       } catch (profileError) {
//         console.error('Error fetching profile completion:', profileError);
//       }
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update profile');
//       throw error;
//     }
//   };

//   const changeName = async (newName) => {
//     try {
//       setError(null);
//       const response = await profileService.changeName(newName);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, name: response.name };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change name');
//       throw error;
//     }
//   };

//   const changePassword = async (passwordData) => {
//     try {
//       setError(null);
//       const response = await profileService.changePassword(passwordData);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change password');
//       throw error;
//     }
//   };

//   const changeEmail = async (newEmail) => {
//     try {
//       setError(null);
//       const response = await profileService.changeEmail(newEmail);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, email: response.email };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change email');
//       throw error;
//     }
//   };

//   const toggleKidMode = async () => {
//     try {
//       setError(null);
//       const response = await profileService.toggleKidMode();
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, kidMode: response.kidMode };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to toggle kid mode');
//       throw error;
//     }
//   };

//   const updateSettings = async (settings) => {
//     try {
//       setError(null);
//       const response = await profileService.updateSettings(settings);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, settings: response.settings };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update settings');
//       throw error;
//     }
//   };

//   const closeAccount = async (password) => {
//     try {
//       setError(null);
//       const response = await profileService.closeAccount(password);
//       logout(); // Logout after closing account
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to close account');
//       throw error;
//     }
//   };

//   const refreshProfileCompletion = async () => {
//     try {
//       const completion = await profileService.getProfileCompletion();
//       setProfileCompletion(completion.completion);
//       return completion.completion;
//     } catch (error) {
//       console.error('Error refreshing profile completion:', error);
//       throw error;
//     }
//   };

//   // const updateChessExperience = async (experienceId) => {
//   //   try {
//   //     setError(null);
//   //     const response = await api.put('/auth/chess-experience', { 
//   //       chessExperience: experienceId 
//   //     });
      
//   //     // Update user in state and localStorage
//   //     setUser(response.data.user);
//   //     localStorage.setItem('user', JSON.stringify(response.data.user));
      
//   //     return response.data;
//   //   } catch (error) {
//   //     setError(error.response?.data?.message || 'Failed to update chess experience');
//   //     throw error;
//   //   }
//   // };


//   const logout = () => {
//       if (socket) {
//       socket.close();
//     }
//     authService.logout();
//     setUser(null);
//     setSocket(null);
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
//      socket,
//      profileCompletion,
//     register,
//     login,
//     logout,
//     forgotPassword,
//     updateChessExperience,
//      updateProfile,
//     changeName,
//     changePassword,
//     changeEmail,
//     toggleKidMode,
//     updateSettings,
//     closeAccount,
//     refreshProfileCompletion,
//     isAuthenticated: authService.isAuthenticated()
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// // context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import authService from '../services/authService';
// import profileService from '../services/profileService';
// import api from '../services/api';
// import { io } from 'socket.io-client';

// const SOCKET_URL = 'http://localhost:5000'; // Replace with your actual socket URL

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
//   // const [socket, setSocket] = useState(null);
//   const [profileCompletion, setProfileCompletion] = useState(0);

//   useEffect(() => {
//     const initAuth = async () => {
//       const storedUser = authService.getCurrentUserFromStorage();
//       const token = authService.getToken();

//       console.log('AuthProvider - Stored user:', storedUser);
//       console.log('AuthProvider - Token exists:', !!token);

//       if (storedUser && token) {
//         try {
//           // Verify the token and get fresh user data
//           const response = await authService.getCurrentUser();
//           console.log('AuthProvider - User data from API:', response);
          
//           // Set the user from the API response
//           const userData = response.user || response;
//           setUser(userData);
          
//           // Fetch profile completion
//           try {
//             const completion = await profileService.getProfileCompletion();
//             setProfileCompletion(completion.completion);
//           } catch (profileError) {
//             console.error('Error fetching profile completion:', profileError);
//           }
          
//           // Initialize socket connection
//           const newSocket = io(SOCKET_URL, {
//             transports: ['websocket'],
//             withCredentials: true,
//             query: {
//               userId: userData._id || userData.id,
//               token: token
//             }
//           });
          
//           newSocket.on('connect', () => {
//             console.log('Socket connected in AuthProvider');
//             newSocket.emit('authenticate', { 
//               userId: userData._id || userData.id, 
//               token 
//             });
//           });
          
//           setSocket(newSocket);
//         } catch (error) {
//           console.error('AuthProvider - Error fetching user:', error);
//           authService.logout();
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();

//     return () => {
//       if (socket) {
//         socket.close();
//       }
//     };
//   }, []);

//   const register = async (userData) => {
//     try {
//       setError(null);
//       const response = await authService.register(userData);
//       console.log('Register response:', response);
      
//       const userData_ = response.user || response;
//       setUser(userData_);
      
//       // Initialize socket connection
//       const token = authService.getToken();
//       const newSocket = io(SOCKET_URL, {
//         transports: ['websocket'],
//         withCredentials: true,
//         query: {
//           userId: userData_._id || userData_.id,
//           token: token
//         }
//       });
      
//       newSocket.on('connect', () => {
//         newSocket.emit('authenticate', { 
//           userId: userData_._id || userData_.id, 
//           token 
//         });
//       });
      
//       setSocket(newSocket);
//       return userData_;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Registration failed');
//       throw error;
//     }
//   };

//   const login = async (credentials) => {
//     try {
//       setError(null);
//       const response = await authService.login(credentials);
//       console.log('Login response:', response);
      
//       const userData = response.user || response;
//       setUser(userData);
      
//       // Fetch profile completion after login
//       try {
//         const completion = await profileService.getProfileCompletion();
//         setProfileCompletion(completion.completion);
//       } catch (profileError) {
//         console.error('Error fetching profile completion:', profileError);
//       }
      
//       // Initialize socket connection
//       const token = authService.getToken();
//       const newSocket = io(SOCKET_URL, {
//         transports: ['websocket'],
//         withCredentials: true,
//         query: {
//           userId: userData._id || userData.id,
//           token: token
//         }
//       });
      
//       newSocket.on('connect', () => {
//         newSocket.emit('authenticate', { 
//           userId: userData._id || userData.id, 
//           token 
//         });
//       });
      
//       setSocket(newSocket);
//       return userData;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       throw error;
//     }
//   };

//   const updateChessExperience = async (experienceId) => {
//     try {
//       setError(null);
//       const response = await api.put('/auth/chess-experience', { 
//         chessExperience: experienceId 
//       });
      
//       // Update user in state and localStorage
//       const updatedUser = response.data.user;
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response.data;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update chess experience');
//       throw error;
//     }
//   };

//   // Profile Methods
//   const updateProfile = async (profileData) => {
//     try {
//       setError(null);
//       const response = await profileService.updateProfile(profileData);
      
//       // Update user in state and localStorage
//       const updatedUser = response.user;
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       // Update profile completion
//       try {
//         const completion = await profileService.getProfileCompletion();
//         setProfileCompletion(completion.completion);
//       } catch (profileError) {
//         console.error('Error fetching profile completion:', profileError);
//       }
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update profile');
//       throw error;
//     }
//   };

//   const changeName = async (newName) => {
//     try {
//       setError(null);
//       const response = await profileService.changeName(newName);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, name: response.name };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change name');
//       throw error;
//     }
//   };

//   const changePassword = async (passwordData) => {
//     try {
//       setError(null);
//       const response = await profileService.changePassword(passwordData);
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change password');
//       throw error;
//     }
//   };

//   const changeEmail = async (newEmail) => {
//     try {
//       setError(null);
//       const response = await profileService.changeEmail(newEmail);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, email: response.email };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to change email');
//       throw error;
//     }
//   };

//   const toggleKidMode = async () => {
//     try {
//       setError(null);
//       const response = await profileService.toggleKidMode();
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, kidMode: response.kidMode };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to toggle kid mode');
//       throw error;
//     }
//   };

//   const updateSettings = async (settings) => {
//     try {
//       setError(null);
//       const response = await profileService.updateSettings(settings);
      
//       // Update user in state and localStorage
//       const updatedUser = { ...user, settings: response.settings };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
      
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to update settings');
//       throw error;
//     }
//   };

//   const closeAccount = async (password) => {
//     try {
//       setError(null);
//       const response = await profileService.closeAccount(password);
//       logout(); // Logout after closing account
//       return response;
//     } catch (error) {
//       setError(error.response?.data?.message || 'Failed to close account');
//       throw error;
//     }
//   };

//   const refreshProfileCompletion = async () => {
//     try {
//       const completion = await profileService.getProfileCompletion();
//       setProfileCompletion(completion.completion);
//       return completion.completion;
//     } catch (error) {
//       console.error('Error refreshing profile completion:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     if (socket) {
//       socket.close();
//     }
//     authService.logout();
//     setUser(null);
//     setSocket(null);
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
//     socket,
//     profileCompletion,
//     register,
//     login,
//     logout,
//     forgotPassword,
//     updateChessExperience,
//     updateProfile,
//     changeName,
//     changePassword,
//     changeEmail,
//     toggleKidMode,
//     updateSettings,
//     closeAccount,
//     refreshProfileCompletion,
//     isAuthenticated: authService.isAuthenticated()
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



//testing
// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import profileService from '../services/profileService';
import api from '../services/api';
import { io } from 'socket.io-client';

//const SOCKET_URL = 'http://localhost:5000'; // Replace with your actual socket URL
const SOCKET_URL = 'https://api.chessverss.com'

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
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getCurrentUserFromStorage();
      const token = authService.getToken();

      console.log('AuthProvider - Stored user:', storedUser);
      console.log('AuthProvider - Token exists:', !!token);

      if (storedUser && token) {
        try {
          // Verify the token and get fresh user data
          const response = await authService.getCurrentUser();
          console.log('AuthProvider - User data from API:', response);
          
          // Set the user from the API response
          const userData = response.user || response;
          setUser(userData);
          
          // Fetch profile completion
          try {
            const completion = await profileService.getProfileCompletion();
            setProfileCompletion(completion.completion);
          } catch (profileError) {
            console.error('Error fetching profile completion:', profileError);
          }
          
          // Initialize socket connection
          const newSocket = io(SOCKET_URL, {
            transports: ['websocket'],
            withCredentials: true,
            query: {
              userId: userData._id || userData.id,
              token: token
            }
          });
          
          newSocket.on('connect', () => {
            console.log('Socket connected in AuthProvider');
            newSocket.emit('authenticate', { 
              userId: userData._id || userData.id, 
              token 
            });
          });
          
          setSocket(newSocket);
        } catch (error) {
          console.error('AuthProvider - Error fetching user:', error);
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
      console.log('Register response:', response);
      
      const userData_ = response.user || response;
      setUser(userData_);
      
      // Initialize socket connection
      const token = authService.getToken();
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        withCredentials: true,
        query: {
          userId: userData_._id || userData_.id,
          token: token
        }
      });
      
      newSocket.on('connect', () => {
        newSocket.emit('authenticate', { 
          userId: userData_._id || userData_.id, 
          token 
        });
      });
      
      setSocket(newSocket);
      return userData_;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      
      const userData = response.user || response;
      setUser(userData);
      
      // Fetch profile completion after login
      try {
        const completion = await profileService.getProfileCompletion();
        setProfileCompletion(completion.completion);
      } catch (profileError) {
        console.error('Error fetching profile completion:', profileError);
      }
      
      // Initialize socket connection
      const token = authService.getToken();
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        withCredentials: true,
        query: {
          userId: userData._id || userData.id,
          token: token
        }
      });
      
      newSocket.on('connect', () => {
        newSocket.emit('authenticate', { 
          userId: userData._id || userData.id, 
          token 
        });
      });
      
      setSocket(newSocket);
      return userData;
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
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update chess experience');
      throw error;
    }
  };

  // Profile Methods
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await profileService.updateProfile(profileData);
      
      // Update user in state and localStorage
      const updatedUser = response.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update profile completion
      try {
        const completion = await profileService.getProfileCompletion();
        setProfileCompletion(completion.completion);
      } catch (profileError) {
        console.error('Error fetching profile completion:', profileError);
      }
      
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };

  const changeName = async (newName) => {
    try {
      setError(null);
      const response = await profileService.changeName(newName);
      
      // Update user in state and localStorage
      const updatedUser = { ...user, name: response.name };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change name');
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setError(null);
      const response = await profileService.changePassword(passwordData);
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
      throw error;
    }
  };

  const changeEmail = async (newEmail) => {
    try {
      setError(null);
      const response = await profileService.changeEmail(newEmail);
      
      // Update user in state and localStorage
      const updatedUser = { ...user, email: response.email };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change email');
      throw error;
    }
  };

  const toggleKidMode = async () => {
    try {
      setError(null);
      const response = await profileService.toggleKidMode();
      
      // Update user in state and localStorage
      const updatedUser = { ...user, kidMode: response.kidMode };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to toggle kid mode');
      throw error;
    }
  };

  const updateSettings = async (settings) => {
    try {
      setError(null);
      const response = await profileService.updateSettings(settings);
      
      // Update user in state and localStorage
      const updatedUser = { ...user, settings: response.settings };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update settings');
      throw error;
    }
  };

  const closeAccount = async (password) => {
    try {
      setError(null);
      const response = await profileService.closeAccount(password);
      logout(); // Logout after closing account
      return response;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to close account');
      throw error;
    }
  };

  const refreshProfileCompletion = async () => {
    try {
      const completion = await profileService.getProfileCompletion();
      setProfileCompletion(completion.completion);
      return completion.completion;
    } catch (error) {
      console.error('Error refreshing profile completion:', error);
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

  // ✅ FIX: Added token to the context value
  const value = {
    user,
    loading,
    error,
    socket,
    profileCompletion,
    token: authService.getToken(), // ✅ Token is now exposed
    register,
    login,
    logout,
    forgotPassword,
    updateChessExperience,
    updateProfile,
    changeName,
    changePassword,
    changeEmail,
    toggleKidMode,
    updateSettings,
    closeAccount,
    refreshProfileCompletion,
    isAuthenticated: authService.isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};