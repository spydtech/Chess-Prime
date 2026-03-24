// // context/SocketContext.js
// import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const { user, token } = useAuth();
  
//   const eventListeners = useRef(new Map());

//   useEffect(() => {
//     if (!user || !token) {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//         setConnected(false);
//       }
//       return;
//     }

//     const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//       query: {
//         userId: user._id || user.id,
//         token: token
//       }
//     });

//     newSocket.on('connect', () => {
//       console.log('Socket connected:', newSocket.id);
//       setConnected(true);
      
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Socket disconnected');
//       setConnected(false);
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//     });

//     // Replay any existing event listeners
//     eventListeners.current.forEach((callback, event) => {
//       newSocket.on(event, callback);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, [user, token]);

//   const on = useCallback((event, callback) => {
//     if (!socket) {
//       eventListeners.current.set(event, callback);
//       return;
//     }
    
//     if (eventListeners.current.has(event)) {
//       socket.off(event, eventListeners.current.get(event));
//     }
    
//     socket.on(event, callback);
//     eventListeners.current.set(event, callback);
//   }, [socket]);

//   const off = useCallback((event, callback) => {
//     if (!socket) {
//       eventListeners.current.delete(event);
//       return;
//     }
    
//     if (callback) {
//       socket.off(event, callback);
//       if (eventListeners.current.get(event) === callback) {
//         eventListeners.current.delete(event);
//       }
//     } else {
//       socket.off(event);
//       eventListeners.current.delete(event);
//     }
//   }, [socket]);

//   const emit = useCallback((event, data, callback) => {
//     if (!socket || !connected) {
//       console.warn('Socket not connected, cannot emit:', event);
//       if (callback) callback({ error: 'Socket not connected' });
//       return false;
//     }
    
//     if (callback) {
//       socket.emit(event, data, callback);
//     } else {
//       socket.emit(event, data);
//     }
//     return true;
//   }, [socket, connected]);

//   const value = {
//     socket,
//     connected,
//     emit,
//     on,
//     off
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };



//testing
// context/SocketContext.js
// import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const { user, token } = useAuth();
  
//   const eventListeners = useRef(new Map());

//   useEffect(() => {
//     if (!user || !token) {
//       console.log('No user or token, closing socket if exists');
//       if (socket) {
//         socket.close();
//         setSocket(null);
//         setConnected(false);
//       }
//       return;
//     }

//     const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    
//     console.log('Initializing socket connection for user:', user._id || user.id);
    
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//       query: {
//         userId: user._id || user.id,
//         token: token
//       },
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000
//     });

//     newSocket.on('connect', () => {
//       console.log('✅ Socket connected successfully with ID:', newSocket.id);
//       setConnected(true);
      
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('disconnect', (reason) => {
//       console.log('❌ Socket disconnected:', reason);
//       setConnected(false);
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//       setConnected(false);
//     });

//     newSocket.on('reconnect', (attemptNumber) => {
//       console.log('Socket reconnected after', attemptNumber, 'attempts');
//       setConnected(true);
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     // Replay any existing event listeners
//     eventListeners.current.forEach((callback, event) => {
//       console.log('Replaying listener for event:', event);
//       newSocket.on(event, callback);
//     });

//     setSocket(newSocket);

//     return () => {
//       console.log('Cleaning up socket connection');
//       newSocket.close();
//     };
//   }, [user, token]);

//   const on = useCallback((event, callback) => {
//     console.log('Registering listener for event:', event);
//     if (!socket) {
//       console.log('Socket not available, storing listener for later');
//       eventListeners.current.set(event, callback);
//       return;
//     }
    
//     if (eventListeners.current.has(event)) {
//       socket.off(event, eventListeners.current.get(event));
//     }
    
//     socket.on(event, callback);
//     eventListeners.current.set(event, callback);
//   }, [socket]);

//   const off = useCallback((event, callback) => {
//     console.log('Removing listener for event:', event);
//     if (!socket) {
//       eventListeners.current.delete(event);
//       return;
//     }
    
//     if (callback) {
//       socket.off(event, callback);
//       if (eventListeners.current.get(event) === callback) {
//         eventListeners.current.delete(event);
//       }
//     } else {
//       socket.off(event);
//       eventListeners.current.delete(event);
//     }
//   }, [socket]);

//   const emit = useCallback((event, data, callback) => {
//     if (!socket || !connected) {
//       console.warn('Socket not connected, cannot emit:', event);
//       if (callback) callback({ error: 'Socket not connected' });
//       return false;
//     }
    
//     console.log('Emitting event:', event, data);
//     if (callback) {
//       socket.emit(event, data, callback);
//     } else {
//       socket.emit(event, data);
//     }
//     return true;
//   }, [socket, connected]);

//   const value = {
//     socket,
//     connected,
//     emit,
//     on,
//     off
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// context/SocketContext.js
// import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const { user, token } = useAuth();
  
//   const eventListeners = useRef(new Map());
//   const socketRef = useRef(null);

//   // Initialize socket connection when user is available
//   useEffect(() => {
//     // Don't initialize if no user or token
//     if (!user || !token) {
//       console.log('No user or token, closing socket if exists');
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//         setSocket(null);
//         setConnected(false);
//       }
//       return;
//     }

//     // Don't create multiple socket connections
//     if (socketRef.current) {
//       console.log('Socket already exists, checking connection status');
//       if (socketRef.current.connected) {
//         setConnected(true);
//       }
//       return;
//     }

//     const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    
//     console.log('Initializing socket connection for user:', user._id || user.id);
    
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//       auth: {
//         token: token
//       },
//       query: {
//         userId: user._id || user.id,
//         token: token
//       },
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000
//     });

//     socketRef.current = newSocket;

//     newSocket.on('connect', () => {
//       console.log('✅ Socket connected successfully with ID:', newSocket.id);
//       setConnected(true);
      
//       // Emit authentication after connection
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('authenticated', (data) => {
//       console.log('✅ Socket authenticated:', data);
//     });

//     newSocket.on('disconnect', (reason) => {
//       console.log('❌ Socket disconnected:', reason);
//       setConnected(false);
      
//       // Attempt to reconnect if disconnected
//       if (reason === 'io server disconnect' || reason === 'transport close') {
//         setTimeout(() => {
//           if (socketRef.current && !socketRef.current.connected) {
//             socketRef.current.connect();
//           }
//         }, 1000);
//       }
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//       setConnected(false);
//     });

//     newSocket.on('reconnect', (attemptNumber) => {
//       console.log('Socket reconnected after', attemptNumber, 'attempts');
//       setConnected(true);
      
//       // Re-authenticate after reconnection
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('reconnect_attempt', (attemptNumber) => {
//       console.log('Socket reconnection attempt:', attemptNumber);
//     });

//     newSocket.on('reconnect_error', (error) => {
//       console.error('Socket reconnection error:', error);
//     });

//     newSocket.on('reconnect_failed', () => {
//       console.error('Socket reconnection failed');
//       setConnected(false);
//     });

//     // Replay any existing event listeners
//     eventListeners.current.forEach((callback, event) => {
//       console.log('Replaying listener for event:', event);
//       newSocket.on(event, callback);
//     });

//     setSocket(newSocket);

//     return () => {
//       console.log('Cleaning up socket connection');
//       if (socketRef.current) {
//         socketRef.current.removeAllListeners();
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//       setSocket(null);
//       setConnected(false);
//     };
//   }, [user?._id, user?.id, token]); // Depend on user ID and token, not the entire user object

//   const on = useCallback((event, callback) => {
//     console.log('Registering listener for event:', event);
    
//     // Store listener
//     eventListeners.current.set(event, callback);
    
//     // If socket exists, register immediately
//     if (socketRef.current) {
//       // Remove old listener if exists
//       socketRef.current.off(event);
//       // Add new listener
//       socketRef.current.on(event, callback);
//       console.log(`✅ Listener registered for event: ${event}`);
//     } else {
//       console.log(`📝 Stored listener for event: ${event} (socket not ready)`);
//     }
//   }, []);

//   const off = useCallback((event, callback) => {
//     console.log('Removing listener for event:', event);
    
//     if (callback) {
//       // Remove specific callback
//       if (socketRef.current) {
//         socketRef.current.off(event, callback);
//       }
//       // Remove from stored listeners if matches
//       const storedCallback = eventListeners.current.get(event);
//       if (storedCallback === callback) {
//         eventListeners.current.delete(event);
//       }
//     } else {
//       // Remove all callbacks for this event
//       if (socketRef.current) {
//         socketRef.current.off(event);
//       }
//       eventListeners.current.delete(event);
//     }
//   }, []);

//   const emit = useCallback((event, data, callback) => {
//     if (!socketRef.current || !connected) {
//       console.warn('Socket not connected, cannot emit:', event);
      
//       // Try to reconnect if socket exists but not connected
//       if (socketRef.current && !connected) {
//         console.log('Attempting to reconnect...');
//         socketRef.current.connect();
//       }
      
//       if (callback) callback({ error: 'Socket not connected' });
//       return false;
//     }
    
//     console.log('Emitting event:', event, data);
//     if (callback) {
//       socketRef.current.emit(event, data, callback);
//     } else {
//       socketRef.current.emit(event, data);
//     }
//     return true;
//   }, [connected]);

//   // Helper to manually reconnect
//   const reconnect = useCallback(() => {
//     if (socketRef.current && !connected) {
//       console.log('Manually reconnecting socket...');
//       socketRef.current.connect();
//     }
//   }, [connected]);

//   const value = {
//     socket: socketRef.current,
//     connected,
//     emit,
//     on,
//     off,
//     reconnect
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


// //testing 2
// // context/SocketContext.js
// import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
// import { io } from 'socket.io-client';
// import { useAuth } from './AuthContext';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [connected, setConnected] = useState(false);
//   const { user, token } = useAuth(); // ✅ Now token is available from AuthContext
  
//   const socketRef = useRef(null);
//   const eventListeners = useRef(new Map());
//   const reconnectAttemptsRef = useRef(0);
//   const maxReconnectAttempts = 10;
//   const initAttemptRef = useRef(false);

//   console.log('🔷 SocketProvider - Rendering, user:', user?._id, 'token exists:', !!token);

//   // Initialize socket connection when user is available
//   useEffect(() => {
//     console.log('🔷 SocketProvider useEffect - Starting, user:', user?._id, 'token:', !!token);
    
//     // Don't initialize if no user or token
//     if (!user || !token) {
//       console.log('🔌 SocketContext - No user or token, closing socket if exists');
//       if (socketRef.current) {
//         socketRef.current.removeAllListeners();
//         socketRef.current.close();
//         socketRef.current = null;
//         setConnected(false);
//       }
//       initAttemptRef.current = false;
//       reconnectAttemptsRef.current = 0;
//       return;
//     }

//     // Prevent multiple initialization attempts
//     if (initAttemptRef.current && socketRef.current) {
//       console.log('🔌 SocketContext - Socket already initialized, checking connection status');
//       if (!socketRef.current.connected) {
//         console.log('🔌 SocketContext - Socket exists but not connected, attempting to connect...');
//         socketRef.current.connect();
//       }
//       return;
//     }

//     initAttemptRef.current = true;

//     const SOCKET_URL = 'http://localhost:5000';
//     //const SOCKET_URL = 'https://api.chessverss.com';
    
//     console.log('🔌 SocketContext - Initializing socket connection for user:', user._id || user.id);
    
//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       withCredentials: true,
//       auth: {
//         token: token
//       },
//       query: {
//         userId: user._id || user.id,
//         token: token
//       },
//       reconnection: true,
//       reconnectionAttempts: maxReconnectAttempts,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000,
//       forceNew: true,
//       autoConnect: true
//     });

//     socketRef.current = newSocket;

//     newSocket.on('connect', () => {
//       console.log('✅ SocketContext - Socket connected successfully with ID:', newSocket.id);
//       setConnected(true);
//       reconnectAttemptsRef.current = 0;
      
//       // Emit authentication after connection
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('authenticated', (data) => {
//       console.log('✅ SocketContext - Socket authenticated:', data);
//     });

//     newSocket.on('disconnect', (reason) => {
//       console.log('❌ SocketContext - Socket disconnected:', reason);
//       setConnected(false);
//     });

//     newSocket.on('connect_error', (error) => {
//       console.error('❌ SocketContext - Socket connection error:', error.message);
//       setConnected(false);
//       reconnectAttemptsRef.current++;
      
//       if (reconnectAttemptsRef.current > maxReconnectAttempts) {
//         console.log('❌ SocketContext - Max reconnection attempts reached, stopping');
//         newSocket.close();
//       }
//     });

//     newSocket.on('reconnect', (attemptNumber) => {
//       console.log('✅ SocketContext - Socket reconnected after', attemptNumber, 'attempts');
//       setConnected(true);
//       reconnectAttemptsRef.current = 0;
      
//       // Re-authenticate after reconnection
//       newSocket.emit('authenticate', {
//         userId: user._id || user.id,
//         token: token
//       });
//     });

//     newSocket.on('reconnect_attempt', (attemptNumber) => {
//       console.log('🔄 SocketContext - Socket reconnection attempt:', attemptNumber);
//     });

//     newSocket.on('reconnect_error', (error) => {
//       console.error('❌ SocketContext - Socket reconnection error:', error);
//     });

//     newSocket.on('reconnect_failed', () => {
//       console.error('❌ SocketContext - Socket reconnection failed');
//       setConnected(false);
//     });

//     // Replay any existing event listeners
//     eventListeners.current.forEach((callback, event) => {
//       console.log('📢 SocketContext - Replaying listener for event:', event);
//       newSocket.on(event, callback);
//     });

//     return () => {
//       console.log('🔌 SocketContext - Cleaning up socket connection');
//       if (socketRef.current) {
//         socketRef.current.removeAllListeners();
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//       setConnected(false);
//       initAttemptRef.current = false;
//       reconnectAttemptsRef.current = 0;
//     };
//   }, [user?._id, user?.id, token]); // ✅ Proper dependency array

//   const on = useCallback((event, callback) => {
//     console.log('📢 SocketContext - Registering listener for event:', event);
    
//     // Store listener
//     eventListeners.current.set(event, callback);
    
//     // If socket exists, register immediately
//     if (socketRef.current) {
//       // Remove old listener if exists
//       socketRef.current.off(event);
//       // Add new listener
//       socketRef.current.on(event, callback);
//       console.log(`✅ SocketContext - Listener registered for event: ${event}`);
//     } else {
//       console.log(`📝 SocketContext - Stored listener for event: ${event} (socket not ready)`);
//     }
//   }, []);

//   const off = useCallback((event, callback) => {
//     console.log('🔇 SocketContext - Removing listener for event:', event);
    
//     if (callback) {
//       // Remove specific callback
//       if (socketRef.current) {
//         socketRef.current.off(event, callback);
//       }
//       // Remove from stored listeners if matches
//       const storedCallback = eventListeners.current.get(event);
//       if (storedCallback === callback) {
//         eventListeners.current.delete(event);
//       }
//     } else {
//       // Remove all callbacks for this event
//       if (socketRef.current) {
//         socketRef.current.off(event);
//       }
//       eventListeners.current.delete(event);
//     }
//   }, []);

//   const emit = useCallback((event, data, callback) => {
//     if (!socketRef.current) {
//       console.warn('❌ SocketContext - Socket not initialized, cannot emit:', event);
//       if (callback) callback({ error: 'Socket not initialized' });
//       return false;
//     }
    
//     if (!connected) {
//       console.warn('❌ SocketContext - Socket not connected, cannot emit:', event);
//       if (callback) callback({ error: 'Socket not connected' });
//       return false;
//     }
    
//     console.log('📤 SocketContext - Emitting event:', event, data);
//     if (callback) {
//       socketRef.current.emit(event, data, callback);
//     } else {
//       socketRef.current.emit(event, data);
//     }
//     return true;
//   }, [connected]);

//   // Helper to manually reconnect
//   const reconnect = useCallback(() => {
//     if (socketRef.current) {
//       console.log('🔄 SocketContext - Manually reconnecting socket...');
//       socketRef.current.connect();
//     } else {
//       console.log('❌ SocketContext - Socket not initialized, cannot reconnect');
//     }
//   }, []);

//   const value = {
//     socket: socketRef.current,
//     connected,
//     emit,
//     on,
//     off,
//     reconnect
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


// testing 3
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const { user, token, loading } = useAuth(); // ✅ Added loading state
  
  const socketRef = useRef(null);
  const eventListeners = useRef(new Map());
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  const initAttemptRef = useRef(false);

  // ✅ Better logging - shows user state more clearly
  console.log('🔷 SocketProvider - Rendering, user:', user?._id || user?.id || 'not loaded', 
              'token exists:', !!token, 
              'loading:', loading);

  // Initialize socket connection when user is available
  useEffect(() => {
    const userId = user?._id || user?.id;
    
    console.log('🔷 SocketProvider useEffect - Starting', {
      hasUser: !!user,
      userId: userId,
      hasToken: !!token,
      loading: loading
    });
    
    // Don't initialize if still loading or no user/token
    if (loading) {
      console.log('🔌 SocketContext - Still loading auth, waiting...');
      return;
    }
    
    if (!user || !token) {
      console.log('🔌 SocketContext - No user or token, closing socket if exists');
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.close();
        socketRef.current = null;
        setConnected(false);
      }
      initAttemptRef.current = false;
      reconnectAttemptsRef.current = 0;
      return;
    }

    // Prevent multiple initialization attempts
    if (initAttemptRef.current && socketRef.current) {
      console.log('🔌 SocketContext - Socket already initialized, checking connection status');
      if (!socketRef.current.connected) {
        console.log('🔌 SocketContext - Socket exists but not connected, attempting to connect...');
        socketRef.current.connect();
      }
      return;
    }

    if (!userId) {
      console.error('❌ SocketContext - No user ID found in user object:', user);
      return;
    }

    initAttemptRef.current = true;

    //const SOCKET_URL = 'http://localhost:5000';
    const SOCKET_URL = 'https://api.chessverss.com';
    
    console.log('🔌 SocketContext - Initializing socket connection for user:', userId);
    
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      auth: {
        token: token
      },
      query: {
        userId: userId,
        token: token
      },
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: true,
      autoConnect: true
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ SocketContext - Socket connected successfully with ID:', newSocket.id);
      setConnected(true);
      reconnectAttemptsRef.current = 0;
      
      // Emit authentication after connection
      newSocket.emit('authenticate', {
        userId: userId,
        token: token
      });
    });

    newSocket.on('authenticated', (data) => {
      console.log('✅ SocketContext - Socket authenticated:', data);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ SocketContext - Socket disconnected:', reason);
      setConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ SocketContext - Socket connection error:', error.message);
      setConnected(false);
      reconnectAttemptsRef.current++;
      
      if (reconnectAttemptsRef.current > maxReconnectAttempts) {
        console.log('❌ SocketContext - Max reconnection attempts reached, stopping');
        newSocket.close();
      }
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('✅ SocketContext - Socket reconnected after', attemptNumber, 'attempts');
      setConnected(true);
      reconnectAttemptsRef.current = 0;
      
      // Re-authenticate after reconnection
      newSocket.emit('authenticate', {
        userId: userId,
        token: token
      });
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log('🔄 SocketContext - Socket reconnection attempt:', attemptNumber);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('❌ SocketContext - Socket reconnection error:', error);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('❌ SocketContext - Socket reconnection failed');
      setConnected(false);
    });

    // Replay any existing event listeners
    eventListeners.current.forEach((callback, event) => {
      console.log('📢 SocketContext - Replaying listener for event:', event);
      newSocket.on(event, callback);
    });

    return () => {
      console.log('🔌 SocketContext - Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.close();
        socketRef.current = null;
      }
      setConnected(false);
      initAttemptRef.current = false;
      reconnectAttemptsRef.current = 0;
    };
  }, [user?._id, user?.id, token, loading]); // ✅ Added loading to dependencies

  const on = useCallback((event, callback) => {
    console.log('📢 SocketContext - Registering listener for event:', event);
    
    // Store listener
    eventListeners.current.set(event, callback);
    
    // If socket exists, register immediately
    if (socketRef.current) {
      // Remove old listener if exists
      socketRef.current.off(event);
      // Add new listener
      socketRef.current.on(event, callback);
      console.log(`✅ SocketContext - Listener registered for event: ${event}`);
    } else {
      console.log(`📝 SocketContext - Stored listener for event: ${event} (socket not ready)`);
    }
  }, []);

  const off = useCallback((event, callback) => {
    console.log('🔇 SocketContext - Removing listener for event:', event);
    
    if (callback) {
      // Remove specific callback
      if (socketRef.current) {
        socketRef.current.off(event, callback);
      }
      // Remove from stored listeners if matches
      const storedCallback = eventListeners.current.get(event);
      if (storedCallback === callback) {
        eventListeners.current.delete(event);
      }
    } else {
      // Remove all callbacks for this event
      if (socketRef.current) {
        socketRef.current.off(event);
      }
      eventListeners.current.delete(event);
    }
  }, []);

  const emit = useCallback((event, data, callback) => {
    if (!socketRef.current) {
      console.warn('❌ SocketContext - Socket not initialized, cannot emit:', event);
      if (callback) callback({ error: 'Socket not initialized' });
      return false;
    }
    
    if (!connected) {
      console.warn('❌ SocketContext - Socket not connected, cannot emit:', event);
      if (callback) callback({ error: 'Socket not connected' });
      return false;
    }
    
    console.log('📤 SocketContext - Emitting event:', event, data);
    if (callback) {
      socketRef.current.emit(event, data, callback);
    } else {
      socketRef.current.emit(event, data);
    }
    return true;
  }, [connected]);

  // Helper to manually reconnect
  const reconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('🔄 SocketContext - Manually reconnecting socket...');
      socketRef.current.connect();
    } else {
      console.log('❌ SocketContext - Socket not initialized, cannot reconnect');
    }
  }, []);

  const value = {
    socket: socketRef.current,
    connected,
    emit,
    on,
    off,
    reconnect
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};