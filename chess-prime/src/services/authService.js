// import api from './api';

// class AuthService {
//   async register(userData) {
//     try {
//       const response = await api.post('/auth/register', userData);
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     }
//   }

//   async login(credentials) {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   }

//   async getCurrentUser() {
//     try {
//       const response = await api.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       console.error('Get current user error:', error);
//       throw error;
//     }
//   }

//   async forgotPassword(email) {
//     try {
//       const response = await api.post('/auth/forgot-password', { email });
//       return response.data;
//     } catch (error) {
//       console.error('Forgot password error:', error);
//       throw error;
//     }
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }

//   getCurrentUserFromStorage() {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated() {
//     return !!this.getToken();
//   }
// }

// export default new AuthService();





// import api from './api';

// class AuthService {
//   async register(userData) {
//     try {
//       const response = await api.post('/auth/register', userData);
//       if (response.data.token) {
//         this.setSession(response.data.token, response.data.user);
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     }
//   }

//   async login(credentials) {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       if (response.data.token) {
//         this.setSession(response.data.token, response.data.user);
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   }

//   async getCurrentUser() {
//     try {
//       const response = await api.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       console.error('Get current user error:', error);
//       throw error;
//     }
//   }

//   async forgotPassword(email) {
//     try {
//       const response = await api.post('/auth/forgot-password', { email });
//       return response.data;
//     } catch (error) {
//       console.error('Forgot password error:', error);
//       throw error;
//     }
//   }

//   setSession(token, user) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     console.log('Session set with token and user');
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     console.log('User logged out');
//   }

//   getCurrentUserFromStorage() {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch (e) {
//         console.error('Error parsing user from storage:', e);
//         return null;
//       }
//     }
//     return null;
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated() {
//     const token = this.getToken();
//     if (!token) return false;
    
//     // Optional: Check if token is expired
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const isExpired = payload.exp < Date.now() / 1000;
//       if (isExpired) {
//         console.log('Token expired');
//         this.logout();
//         return false;
//       }
//       return true;
//     } catch (e) {
//       console.error('Error checking token expiration:', e);
//       return true; // Assume valid if can't parse
//     }
//   }
// }

// export default new AuthService();



// import api from './api';

// class AuthService {
//   async register(userData) {
//     try {
//       const response = await api.post('/auth/register', userData);
//       if (response.data.token) {
//         this.setSession(response.data.token, response.data.user);
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw error;
//     }
//   }

//   async login(credentials) {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       if (response.data.token) {
//         this.setSession(response.data.token, response.data.user);
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   }

//   async getCurrentUser() {
//     try {
//       const response = await api.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       console.error('Get current user error:', error);
//       throw error;
//     }
//   }

//   async forgotPassword(email) {
//     try {
//       const response = await api.post('/auth/forgot-password', { email });
//       return response.data;
//     } catch (error) {
//       console.error('Forgot password error:', error);
//       throw error;
//     }
//   }

//   setSession(token, user) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     console.log('Session set with token and user');
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     console.log('User logged out');
//   }

//   getCurrentUserFromStorage() {
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         return JSON.parse(userStr);
//       } catch (e) {
//         console.error('Error parsing user from storage:', e);
//         return null;
//       }
//     }
//     return null;
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated() {
//     const token = this.getToken();
//     if (!token) return false;
    
//     // FIXED: Better token validation with error handling
//     try {
//       const parts = token.split('.');
//       if (parts.length !== 3) {
//         console.log('Invalid token format');
//         return false;
//       }
      
//       const payload = JSON.parse(atob(parts[1]));
      
//       // Add small buffer (30 seconds) to account for time differences
//       const currentTime = Math.floor(Date.now() / 1000);
//       const isExpired = payload.exp < (currentTime - 30);
      
//       if (isExpired) {
//         console.log('Token expired at:', new Date(payload.exp * 1000));
//         console.log('Current time:', new Date(currentTime * 1000));
//         this.logout();
//         return false;
//       }
//       return true;
//     } catch (e) {
//       console.error('Error checking token expiration:', e);
//       // If token is malformed, clear it
//       this.logout();
//       return false;
//     }
//   }
// }

// export default new AuthService();


import api from './api';

class AuthService {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        this.setSession(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        this.setSession(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  setSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Session set with token and user');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
  }

  getCurrentUserFromStorage() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user from storage:', e);
        return null;
      }
    }
    return null;
  }

  // Make sure getToken is defined as a method
  getToken() {
    const token = localStorage.getItem('token');
    console.log('Getting token from localStorage:', token ? 'Token exists' : 'No token');
    return token;
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.log('Invalid token format');
        return false;
      }
      
      const payload = JSON.parse(atob(parts[1]));
      
      // Add small buffer (30 seconds) to account for time differences
      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp < (currentTime - 30);
      
      if (isExpired) {
        console.log('Token expired at:', new Date(payload.exp * 1000));
        console.log('Current time:', new Date(currentTime * 1000));
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error checking token expiration:', e);
      this.logout();
      return false;
    }
  }
}

// Create a singleton instance
const authService = new AuthService();

// Export both the class and the instance for flexibility
export default authService;