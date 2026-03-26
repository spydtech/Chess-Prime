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



// //testing
// // context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import authService from '../services/authService';
// import profileService from '../services/profileService';
// import api from '../services/api';
// import { io } from 'socket.io-client';

// //const SOCKET_URL = 'http://localhost:5000'; // Replace with your actual socket URL
// const SOCKET_URL = 'https://api.chessverss.com'; // Replace with your production socket URL

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

//   // ✅ FIX: Added token to the context value
//   const value = {
//     user,
//     loading,
//     error,
//     socket,
//     profileCompletion,
//     token: authService.getToken(), // ✅ Token is now exposed
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



// import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
// import authService from '../services/authService';
// import profileService from '../services/profileService';
// import api from '../services/api';
// import { io } from 'socket.io-client';

// const SOCKET_URL = 'https://api.chessverss.com';

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
//   const [profileCompletion, setProfileCompletion] = useState(0);
  
//   const socketRef = useRef(null);
//   const initAttempted = useRef(false);

//   // Initialize socket connection
//   const initializeSocket = (userData, token) => {
//     if (!userData || !token) return null;
    
//     // Close existing socket
//     if (socketRef.current) {
//       socketRef.current.close();
//     }
    
//     const userId = userData._id || userData.id;
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket'],
//       withCredentials: true,
//       query: {
//         userId: userId,
//         token: token
//       },
//       reconnection: true,
//       reconnectionAttempts: 5
//     });
    
//     newSocket.on('connect', () => {
//       console.log('Socket connected');
//       newSocket.emit('authenticate', { userId, token });
//     });
    
//     newSocket.on('connect_error', (err) => {
//       console.error('Socket connection error:', err);
//     });
    
//     socketRef.current = newSocket;
//     setSocket(newSocket);
    
//     return newSocket;
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       // Prevent double initialization
//       if (initAttempted.current) return;
//       initAttempted.current = true;
      
//       const storedUser = authService.getCurrentUserFromStorage();
//       const token = authService.getToken();

//       console.log('AuthProvider - Stored user:', storedUser);
//       console.log('AuthProvider - Token exists:', !!token);
//       console.log('AuthProvider - Is authenticated:', authService.isAuthenticated());

//       if (storedUser && token && authService.isAuthenticated()) {
//         try {
//           // Verify the token and get fresh user data
//           const response = await authService.getCurrentUser();
//           console.log('AuthProvider - User data from API:', response);
          
//           // Set the user from the API response
//           const userData = response.user || response;
//           setUser(userData);
          
//           // Fetch profile completion (with error handling)
//           try {
//             const completion = await profileService.getProfileCompletion();
//             setProfileCompletion(completion.completion);
//           } catch (profileError) {
//             console.error('Error fetching profile completion:', profileError);
//             // Don't fail auth if profile completion fails
//             setProfileCompletion(0);
//           }
          
//           // Initialize socket connection
//           initializeSocket(userData, token);
//         } catch (error) {
//           console.error('AuthProvider - Error fetching user:', error);
//           // Only logout if it's an auth error
//           if (error.response?.status === 401) {
//             authService.logout();
//             setUser(null);
//           } else {
//             // For other errors, keep the stored user but log error
//             console.warn('Keeping stored user despite API error');
//             setUser(storedUser);
//           }
//         }
//       } else {
//         console.log('No valid stored session found');
//         // Clear invalid session data
//         if (storedUser && !authService.isAuthenticated()) {
//           authService.logout();
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
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
//       initializeSocket(userData_, token);
      
//       return userData_;
//     } catch (error) {
//       console.error('Register error:', error);
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
//         setProfileCompletion(0);
//       }
      
//       // Initialize socket connection
//       const token = authService.getToken();
//       initializeSocket(userData, token);
      
//       // Important: Return user data to allow navigation
//       return userData;
//     } catch (error) {
//       console.error('Login error:', error);
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
//     if (socketRef.current) {
//       socketRef.current.close();
//       socketRef.current = null;
//     }
//     authService.logout();
//     setUser(null);
//     setSocket(null);
//     setProfileCompletion(0);
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
//     token: authService.getToken(),
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



// import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
// import authService from '../services/authService';
// import profileService from '../services/profileService';
// import api from '../services/api';
// import { io } from 'socket.io-client';

// const SOCKET_URL = 'https://api.chessverss.com';

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
//   const [profileCompletion, setProfileCompletion] = useState(0);
  
//   const socketRef = useRef(null);
//   const initAttempted = useRef(false);

//   // Initialize socket connection with better error handling
//   const initializeSocket = (userData, token) => {
//     if (!userData || !token) {
//       console.log('Cannot initialize socket: missing user data or token');
//       return null;
//     }
    
//     // Close existing socket
//     if (socketRef.current) {
//       console.log('Closing existing socket connection');
//       socketRef.current.close();
//     }
    
//     const userId = userData._id || userData.id;
//     console.log('Initializing socket connection for user:', userId);
    
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//       query: {
//         userId: userId,
//         token: token
//       },
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       timeout: 20000
//     });
    
//     newSocket.on('connect', () => {
//       console.log('✅ Socket connected successfully');
//       newSocket.emit('authenticate', { userId, token });
//     });
    
//     newSocket.on('authenticated', (data) => {
//       console.log('✅ Socket authenticated:', data);
//     });
    
//     newSocket.on('connect_error', (err) => {
//       console.error('❌ Socket connection error:', err.message);
//     });
    
//     newSocket.on('disconnect', (reason) => {
//       console.log('Socket disconnected:', reason);
//     });
    
//     socketRef.current = newSocket;
//     setSocket(newSocket);
    
//     return newSocket;
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       // Prevent double initialization
//       if (initAttempted.current) return;
//       initAttempted.current = true;
      
//       const storedUser = authService.getCurrentUserFromStorage();
//       const token = authService.getToken(); // This should now work

//       console.log('AuthProvider - Stored user:', storedUser);
//       console.log('AuthProvider - Token exists:', !!token);
//       console.log('AuthProvider - Is authenticated:', authService.isAuthenticated());

//       if (storedUser && token && authService.isAuthenticated()) {
//         try {
//           // Add delay to ensure everything is ready
//           await new Promise(resolve => setTimeout(resolve, 100));
          
//           // Verify the token and get fresh user data
//           const response = await authService.getCurrentUser();
//           console.log('AuthProvider - User data from API:', response);
          
//           // Set the user from the API response
//           const userData = response.user || response;
//           setUser(userData);
          
//           // Update localStorage with latest user data
//           localStorage.setItem('user', JSON.stringify(userData));
          
//           // Fetch profile completion with error handling
//           try {
//             const completion = await profileService.getProfileCompletion();
//             console.log('Profile completion:', completion);
//             setProfileCompletion(completion.completion || 0);
//           } catch (profileError) {
//             console.error('Error fetching profile completion:', profileError);
//             setProfileCompletion(0);
//           }
          
//           // Initialize socket connection after a delay
//           setTimeout(() => {
//             initializeSocket(userData, token);
//           }, 500);
          
//         } catch (error) {
//           console.error('AuthProvider - Error fetching user:', error);
//           // Only logout if it's an auth error
//           if (error.response?.status === 401) {
//             console.log('Authentication failed, logging out');
//             authService.logout();
//             setUser(null);
//           } else {
//             // For other errors, keep the stored user but log error
//             console.warn('Keeping stored user despite API error');
//             setUser(storedUser);
            
//             // Still try to initialize socket
//             setTimeout(() => {
//               initializeSocket(storedUser, token);
//             }, 500);
//           }
//         }
//       } else {
//         console.log('No valid stored session found');
//         // Clear invalid session data
//         if (storedUser && !authService.isAuthenticated()) {
//           authService.logout();
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
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
//       initializeSocket(userData_, token);
      
//       return userData_;
//     } catch (error) {
//       console.error('Register error:', error);
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
      
//       // Wait a bit before fetching profile completion
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       // Fetch profile completion after login with better error handling
//       try {
//         const completion = await profileService.getProfileCompletion();
//         console.log('Profile completion after login:', completion);
//         setProfileCompletion(completion.completion || 0);
//       } catch (profileError) {
//         console.error('Error fetching profile completion:', profileError);
//         setProfileCompletion(0);
//       }
      
//       // Initialize socket connection
//       const token = authService.getToken();
//       setTimeout(() => {
//         initializeSocket(userData, token);
//       }, 500);
      
//       // Important: Return user data to allow navigation
//       return userData;
//     } catch (error) {
//       console.error('Login error:', error);
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
//     if (socketRef.current) {
//       socketRef.current.close();
//       socketRef.current = null;
//     }
//     authService.logout();
//     setUser(null);
//     setSocket(null);
//     setProfileCompletion(0);
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
//     token: authService.getToken(),
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



import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import authService from '../services/authService';
import profileService from '../services/profileService';
import api from '../services/api';
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://api.chessverss.com';

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
  
  const socketRef = useRef(null);
  const initAttempted = useRef(false);

  const initializeSocket = (userData, token) => {
    if (!userData || !token) {
      console.log('Cannot initialize socket: missing user data or token');
      return null;
    }
    
    if (socketRef.current) {
      console.log('Closing existing socket connection');
      socketRef.current.close();
    }
    
    const userId = userData._id || userData.id;
    console.log('Initializing socket connection for user:', userId);
    
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      query: {
        userId: userId,
        token: token
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });
    
    newSocket.on('connect', () => {
      console.log('✅ Socket connected successfully');
      newSocket.emit('authenticate', { userId, token });
    });
    
    newSocket.on('authenticated', (data) => {
      console.log('✅ Socket authenticated:', data);
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
    });
    
    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
    
    socketRef.current = newSocket;
    setSocket(newSocket);
    
    return newSocket;
  };

  useEffect(() => {
    const initAuth = async () => {
      // Prevent double initialization
      if (initAttempted.current) return;
      initAttempted.current = true;
      
      const storedUser = authService.getCurrentUserFromStorage();
      const token = authService.getToken();

      console.log('AuthProvider - Stored user:', storedUser);
      console.log('AuthProvider - Token exists:', !!token);
      console.log('AuthProvider - Is authenticated:', authService.isAuthenticated());

      // If we have stored user and token, try to validate
      if (storedUser && token && authService.isAuthenticated()) {
        try {
          // Add small delay
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Try to get fresh user data
          const response = await authService.getCurrentUser();
          console.log('AuthProvider - User data from API:', response);
          
          const userData = response.user || response;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Fetch profile completion (non-critical)
          try {
            const completion = await profileService.getProfileCompletion();
            console.log('Profile completion:', completion);
            setProfileCompletion(completion.completion || 0);
          } catch (profileError) {
            console.error('Error fetching profile completion:', profileError);
            setProfileCompletion(0);
          }
          
          // Initialize socket
          setTimeout(() => {
            initializeSocket(userData, token);
          }, 500);
          
        } catch (error) {
          console.error('AuthProvider - Error fetching user:', error);
          
          // Check if it's a network error or auth error
          const isAuthError = error.response?.status === 401;
          const isNetworkError = !error.response;
          
          if (isAuthError) {
            console.log('Authentication failed - token invalid/expired');
            authService.logout();
            setUser(null);
            
            // Only redirect if we're on a protected page
            const currentPath = window.location.pathname;
            const isProtectedPage = !currentPath.includes('/login') && 
                                    !currentPath.includes('/register') && 
                                    currentPath !== '/';
            
            if (isProtectedPage) {
              window.location.href = '/login';
            }
          } else if (isNetworkError) {
            console.warn('Network error - keeping stored user for now');
            setUser(storedUser);
          } else {
            // For other errors, keep stored user
            console.warn('Keeping stored user despite API error');
            setUser(storedUser);
          }
        }
      } else {
        console.log('No valid stored session found');
        // Clear any invalid data
        if (storedUser && !authService.isAuthenticated()) {
          authService.logout();
        }
        setUser(null);
      }
      
      setLoading(false);
    };

    initAuth();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
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
      
      const token = authService.getToken();
      initializeSocket(userData_, token);
      
      return userData_;
    } catch (error) {
      console.error('Register error:', error);
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
      
      // Wait a bit before fetching profile completion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Fetch profile completion after login
      try {
        const completion = await profileService.getProfileCompletion();
        console.log('Profile completion after login:', completion);
        setProfileCompletion(completion.completion || 0);
      } catch (profileError) {
        console.error('Error fetching profile completion:', profileError);
        setProfileCompletion(0);
      }
      
      // Initialize socket connection
      const token = authService.getToken();
      setTimeout(() => {
        initializeSocket(userData, token);
      }, 500);
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
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
      
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update chess experience');
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await profileService.updateProfile(profileData);
      
      const updatedUser = response.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
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
      logout();
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
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    authService.logout();
    setUser(null);
    setSocket(null);
    setProfileCompletion(0);
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
    profileCompletion,
    token: authService.getToken(),
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