// services/profileService.js
import api from './api';

class ProfileService {
  // Get current user's profile
  async getMyProfile() {
    try {
      const response = await api.get('/profile/me');
      return response.data;
    } catch (error) {
      console.error('Get my profile error:', error);
      throw error;
    }
  }

  // Get user profile by name
  async getUserProfile(name) {
    try {
      const response = await api.get(`/profile/${name}`);
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }

  // Update profile information
  async updateProfile(profileData) {
    try {
      const response = await api.put('/profile/update', profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Change name
  async changeName(newName) {
    try {
      const response = await api.put('/profile/change-name', { newName });
      return response.data;
    } catch (error) {
      console.error('Change name error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.put('/profile/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Change email
  async changeEmail(newEmail) {
    try {
      const response = await api.put('/profile/change-email', { newEmail });
      return response.data;
    } catch (error) {
      console.error('Change email error:', error);
      throw error;
    }
  }

  // Update settings
  async updateSettings(settings) {
    try {
      const response = await api.put('/profile/settings', settings);
      return response.data;
    } catch (error) {
      console.error('Update settings error:', error);
      throw error;
    }
  }

  // Toggle kid mode
  async toggleKidMode() {
    try {
      const response = await api.put('/profile/kid-mode');
      return response.data;
    } catch (error) {
      console.error('Toggle kid mode error:', error);
      throw error;
    }
  }

  // Get profile completion percentage
  async getProfileCompletion() {
    try {
      const response = await api.get('/profile/completion/percentage');
      return response.data;
    } catch (error) {
      console.error('Get profile completion error:', error);
      throw error;
    }
  }

  // Close account
  async closeAccount(password) {
    try {
      const response = await api.post('/profile/close-account', { password });
      return response.data;
    } catch (error) {
      console.error('Close account error:', error);
      throw error;
    }
  }

  // Add friend
  async addFriend(userId) {
    try {
      const response = await api.post('/profile/friends/add', { userId });
      return response.data;
    } catch (error) {
      console.error('Add friend error:', error);
      throw error;
    }
  }

  // Get friends list
  async getFriends() {
    try {
      const response = await api.get('/profile/friends/list');
      return response.data;
    } catch (error) {
      console.error('Get friends error:', error);
      throw error;
    }
  }
}

export default new ProfileService();