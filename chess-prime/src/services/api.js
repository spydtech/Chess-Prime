// import axios from 'axios';

// //const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://api.chessverss.com/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Important for CORS
//   timeout: 10000,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('Token added to request:', token.substring(0, 20) + '...');
//     } else {
//       console.log('No token found in localStorage');
//     }
//     console.log(`${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout');
//       return Promise.reject({ message: 'Request timeout. Please try again.' });
//     }
    
//     if (!error.response) {
//       console.error('Network error - backend not reachable');
//       return Promise.reject({ 
//         message: 'Cannot connect to server. Please check if backend is running.' 
//       });
//     }
    
//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       console.log('401 Unauthorized - clearing token');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       // Only redirect if not already on login page
//       if (!window.location.pathname.includes('/login')) {
//         window.location.href = '/login';
//       }
//     }
    
//     console.error('Response error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;


// import axios from 'axios';

// //const API_URL = 'http://localhost:5000/api';
// const API_URL = 'https://api.chessverss.com/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Important for CORS
//   timeout: 10000,
// });

// // Flag to prevent multiple redirects
// let isRedirecting = false;

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('Token added to request:', token.substring(0, 20) + '...');
//     } else {
//       console.log('No token found in localStorage');
//     }
//     console.log(`${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout');
//       return Promise.reject({ message: 'Request timeout. Please try again.' });
//     }
    
//     if (!error.response) {
//       console.error('Network error - backend not reachable');
//       return Promise.reject({ 
//         message: 'Cannot connect to server. Please check if backend is running.' 
//       });
//     }
    
//     // Handle 401 Unauthorized - but don't redirect for auth endpoints
//     if (error.response?.status === 401) {
//       const isAuthEndpoint = error.config.url.includes('/auth/');
      
//       // Don't clear token for login/register failures
//       if (!isAuthEndpoint) {
//         console.log('401 Unauthorized on non-auth endpoint - clearing token');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         // Only redirect if not already on login page and not already redirecting
//         if (!window.location.pathname.includes('/login') && 
//             !window.location.pathname.includes('/register') && 
//             !isRedirecting) {
//           isRedirecting = true;
//           window.location.href = '/login';
//           setTimeout(() => {
//             isRedirecting = false;
//           }, 1000);
//         }
//       } else {
//         console.log('401 on auth endpoint - not redirecting');
//       }
//     }
    
//     console.error('Response error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;





// import axios from 'axios';

// const API_URL = 'https://api.chessverss.com/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   timeout: 30000,
// });

// // Helper function to decode and log token
// const debugToken = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const payload = JSON.parse(atob(base64));
//     console.log('📝 Token payload:', {
//       userId: payload.userId || payload.user_id || payload.id,
//       exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'No expiry',
//       iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'No issued at',
//       isExpired: payload.exp ? payload.exp * 1000 < Date.now() : false
//     });
//     return payload;
//   } catch (e) {
//     console.error('❌ Failed to decode token:', e);
//     return null;
//   }
// };

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('✅ Token added to request:', config.url);
      
//       // Debug token on first request of the session
//       if (!window._tokenDebugged) {
//         debugToken(token);
//         window._tokenDebugged = true;
//       }
//     } else {
//       console.log('⚠️ No token found for request:', config.url);
//     }
//     console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   async (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('❌ Request timeout');
//       return Promise.reject({ message: 'Request timeout. Please try again.' });
//     }
    
//     if (!error.response) {
//       console.error('❌ Network error - backend not reachable');
//       return Promise.reject({ 
//         message: 'Cannot connect to server. Please check if backend is running.' 
//       });
//     }
    
//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       const url = error.config?.url || '';
//       const isLoginRequest = url.includes('/login');
//       const isRegisterRequest = url.includes('/register');
//       const isGameRequest = url.includes('/games/') || url.includes('/game/');
//       const isProfileRequest = url.includes('/profile/');
//       const isComputerRequest = url.includes('/computer/');
//       const isUserRequest = url.includes('/users/');
//       const isLobbyRequest = url.includes('/lobby/');
//       const isQuickMatchRequest = url.includes('/quick-match/');
//       const isPuzzleRequest = url.includes('/puzzles/');
//       const isAuthRequest = url.includes('/auth/');
      
//       console.log('🔐 401 Unauthorized:', {
//         url,
//         isGameRequest,
//         isProfileRequest,
//         isComputerRequest,
//         isAuthRequest,
//         responseData: error.response?.data
//       });
      
//       // CRITICAL: For auth endpoints, we must reject the promise, not resolve with fake data
//       if (isAuthRequest || url === '/auth/me' || url === '/auth/verify') {
//         console.log('🔐 Auth endpoint failed - token is invalid');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         // Only redirect if not already on login/register page
//         if (!window.location.pathname.includes('/login') && 
//             !window.location.pathname.includes('/register')) {
//           window.location.href = '/login';
//         }
        
//         // Reject with the actual error
//         return Promise.reject(error);
//       }
      
//       // For data endpoints, we can optionally return empty data
//       if (isGameRequest || isProfileRequest || isComputerRequest) {
//         console.log('⚠️ 401 on data endpoint, returning empty data');
//         // Return empty data to prevent UI errors
//         return Promise.resolve({ 
//           data: { 
//             games: [], 
//             success: true, 
//             completion: 0,
//             user: null 
//           },
//           _isFallback: true // Add marker to identify fallback data
//         });
//       }
      
//       // For all other cases, clear token and redirect
//       console.log('🔐 Clearing token due to 401 on critical endpoint');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       if (!window.location.pathname.includes('/login') && 
//           !window.location.pathname.includes('/register')) {
//         window.location.href = '/login';
//       }
      
//       return Promise.reject(error);
//     }
    
//     console.error('❌ Response error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;




// import axios from 'axios';

// const API_URL = 'https://api.chessverss.com/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   timeout: 30000,
// });

// // Helper function to decode and log token
// const debugToken = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const payload = JSON.parse(atob(base64));
//     console.log('📝 Token payload:', {
//       userId: payload.userId || payload.user_id || payload.id || payload.sub,
//       exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'No expiry',
//       iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'No issued at',
//       isExpired: payload.exp ? payload.exp * 1000 < Date.now() : false
//     });
//     return payload;
//   } catch (e) {
//     console.error('❌ Failed to decode token:', e);
//     return null;
//   }
// };

// // Flag to prevent multiple redirects
// let isRedirecting = false;

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('✅ Token added to request:', config.url);
      
//       // Debug token on first request of the session
//       if (!window._tokenDebugged && config.url !== '/auth/login' && config.url !== '/auth/register') {
//         debugToken(token);
//         window._tokenDebugged = true;
//       }
//     } else {
//       console.log('⚠️ No token found for request:', config.url);
//     }
//     console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   async (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('❌ Request timeout');
//       return Promise.reject({ message: 'Request timeout. Please try again.' });
//     }
    
//     if (!error.response) {
//       console.error('❌ Network error - backend not reachable');
//       return Promise.reject({ 
//         message: 'Cannot connect to server. Please check if backend is running.' 
//       });
//     }
    
//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       const url = error.config?.url || '';
//       const isLoginRequest = url.includes('/login');
//       const isRegisterRequest = url.includes('/register');
//       const isAuthRequest = url.includes('/auth/');
      
//       console.log('🔐 401 Unauthorized:', {
//         url,
//         isAuthRequest,
//         responseData: error.response?.data
//       });
      
//       // For auth endpoints, reject and let the component handle it
//       if (isLoginRequest || isRegisterRequest) {
//         console.log('🔐 Auth endpoint failed - invalid credentials');
//         return Promise.reject(error);
//       }
      
//       // For /auth/me endpoint, clear token and redirect
//       if (url === '/auth/me') {
//         console.log('🔐 Token validation failed - clearing session');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         if (!window.location.pathname.includes('/login') && 
//             !window.location.pathname.includes('/register') && 
//             !isRedirecting) {
//           isRedirecting = true;
//           window.location.href = '/login';
//           setTimeout(() => {
//             isRedirecting = false;
//           }, 1000);
//         }
        
//         return Promise.reject(error);
//       }
      
//       // For profile completion endpoint, return default value instead of failing
//       if (url.includes('/profile/completion')) {
//         console.log('⚠️ Profile completion 401 - returning default value');
//         return Promise.resolve({ 
//           data: { completion: 0 },
//           _isFallback: true
//         });
//       }
      
//       // For other endpoints, return empty data to prevent UI crashes
//       console.log('⚠️ 401 on data endpoint, returning empty data');
//       return Promise.resolve({ 
//         data: { success: true, games: [], users: [] },
//         _isFallback: true
//       });
//     }
    
//     console.error('❌ Response error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;




// import axios from 'axios';

// const API_URL = 'https://api.chessverss.com/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
//   timeout: 30000,
// });

// // Helper function to decode and log token
// const debugToken = (token) => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const payload = JSON.parse(atob(base64));
//     console.log('📝 Token payload:', {
//       userId: payload.userId || payload.user_id || payload.id || payload.sub,
//       exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'No expiry',
//       iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'No issued at',
//       isExpired: payload.exp ? payload.exp * 1000 < Date.now() : false
//     });
//     return payload;
//   } catch (e) {
//     console.error('❌ Failed to decode token:', e);
//     return null;
//   }
// };

// // Flag to prevent multiple redirects
// let isRedirecting = false;

// // Request interceptor - FIXED: Ensure token is properly formatted
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Make sure token is a string and properly formatted
//       const cleanToken = token.trim();
//       config.headers.Authorization = `Bearer ${cleanToken}`;
//       console.log('✅ Token added to request:', config.url);
//       console.log('🔑 Authorization header:', config.headers.Authorization.substring(0, 50) + '...');
      
//       // Debug token on first request of the session
//       if (!window._tokenDebugged && !config.url.includes('/login') && !config.url.includes('/register')) {
//         debugToken(cleanToken);
//         window._tokenDebugged = true;
//       }
//     } else {
//       console.log('⚠️ No token found for request:', config.url);
//     }
//     console.log(`📤 ${config.method.toUpperCase()} request to ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log(`✅ Response from ${response.config.url}:`, response.status);
//     return response;
//   },
//   async (error) => {
//     if (error.code === 'ECONNABORTED') {
//       console.error('❌ Request timeout');
//       return Promise.reject({ message: 'Request timeout. Please try again.' });
//     }
    
//     if (!error.response) {
//       console.error('❌ Network error - backend not reachable');
//       return Promise.reject({ 
//         message: 'Cannot connect to server. Please check if backend is running.' 
//       });
//     }
    
//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       const url = error.config?.url || '';
//       const isLoginRequest = url.includes('/login');
//       const isRegisterRequest = url.includes('/register');
//       const isAuthRequest = url.includes('/auth/');
//       const isProfileRequest = url.includes('/profile/');
      
//       console.log('🔐 401 Unauthorized:', {
//         url,
//         isAuthRequest,
//         responseData: error.response?.data
//       });
      
//       // For login/register, just reject
//       if (isLoginRequest || isRegisterRequest) {
//         console.log('🔐 Auth endpoint failed - invalid credentials');
//         return Promise.reject(error);
//       }
      
//       // For /auth/me endpoint, clear token and redirect
//       if (url === '/auth/me') {
//         console.log('🔐 Token validation failed - clearing session');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
        
//         if (!window.location.pathname.includes('/login') && 
//             !window.location.pathname.includes('/register') && 
//             !isRedirecting) {
//           isRedirecting = true;
//           window.location.href = '/login';
//           setTimeout(() => {
//             isRedirecting = false;
//           }, 1000);
//         }
        
//         return Promise.reject(error);
//       }
      
//       // For profile endpoints, return default data
//       if (isProfileRequest) {
//         console.log('⚠️ Profile endpoint 401 - returning default data');
        
//         // Return appropriate default data based on endpoint
//         if (url.includes('/me')) {
//           return Promise.resolve({ 
//             data: null,
//             _isFallback: true
//           });
//         }
//         if (url.includes('/completion')) {
//           return Promise.resolve({ 
//             data: { completion: 0 },
//             _isFallback: true
//           });
//         }
//         return Promise.resolve({ 
//           data: { success: true },
//           _isFallback: true
//         });
//       }
      
//       // For other endpoints, return empty data to prevent UI crashes
//       console.log('⚠️ 401 on data endpoint, returning empty data');
//       return Promise.resolve({ 
//         data: { success: true, games: [], users: [], data: [] },
//         _isFallback: true
//       });
//     }
    
//     console.error('❌ Response error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default api;






import axios from 'axios';

const API_URL = 'https://api.chessverss.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000,
});

// Flag to prevent multiple redirects
let isRedirecting = false;

// Helper function to decode and log token
const debugToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    console.log('📝 Token payload:', {
      userId: payload.userId || payload.user_id || payload.id || payload.sub,
      exp: payload.exp ? new Date(payload.exp * 1000).toISOString() : 'No expiry',
      iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'No issued at',
      isExpired: payload.exp ? payload.exp * 1000 < Date.now() : false
    });
    return payload;
  } catch (e) {
    console.error('❌ Failed to decode token:', e);
    return null;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token is expired
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          console.log('⚠️ Token expired, removing it');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          // Don't add expired token to headers
          return config;
        }
      } catch (e) {
        console.error('❌ Failed to parse token:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return config;
      }
      
      // Make sure token is a string and properly formatted
      const cleanToken = token.trim();
      config.headers.Authorization = `Bearer ${cleanToken}`;
      
      // Debug token on first request of the session
      if (!window._tokenDebugged && !config.url.includes('/login') && !config.url.includes('/register')) {
        debugToken(cleanToken);
        window._tokenDebugged = true;
      }
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Request timeout');
      return Promise.reject({ message: 'Request timeout. Please try again.' });
    }
    
    if (!error.response) {
      console.error('❌ Network error - backend not reachable');
      return Promise.reject({ 
        message: 'Cannot connect to server. Please check if backend is running.' 
      });
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      const url = originalRequest?.url || '';
      const isLoginRequest = url.includes('/login');
      const isRegisterRequest = url.includes('/register');
      const isAuthMeRequest = url === '/auth/me';
      const isRefreshTokenRequest = url.includes('/auth/refresh-token');
      
      console.log('🔐 401 Unauthorized:', {
        url,
        isAuthMeRequest,
        responseData: error.response?.data
      });
      
      // For login/register, just reject
      if (isLoginRequest || isRegisterRequest) {
        return Promise.reject(error);
      }
      
      // For refresh token request, clear everything and redirect
      if (isRefreshTokenRequest) {
        console.log('🔐 Refresh token failed - clearing session');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register') && 
            !isRedirecting) {
          isRedirecting = true;
          window.location.href = '/login';
          setTimeout(() => {
            isRedirecting = false;
          }, 1000);
        }
        
        return Promise.reject(error);
      }
      
      // Try to refresh token for other endpoints
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            console.log('🔄 Attempting to refresh token...');
            const response = await axios.post(`${API_URL}/auth/refresh-token`, {
              refreshToken
            });
            
            if (response.data.token) {
              console.log('✅ Token refreshed successfully');
              localStorage.setItem('token', response.data.token);
              if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
              }
              
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
              return api(originalRequest);
            }
          }
        } catch (refreshError) {
          console.log('🔐 Token refresh failed:', refreshError);
          
          // Clear session only if it's not an auth check endpoint
          if (!isAuthMeRequest) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        }
      }
      
      // For auth/me endpoint, return null instead of error to prevent redirect
      if (isAuthMeRequest) {
        console.log('⚠️ Auth check failed - returning null');
        return Promise.resolve({ data: null, _isFallback: true });
      }
      
      // For other endpoints, reject with error
      return Promise.reject(error);
    }
    
    console.error('❌ Response error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;