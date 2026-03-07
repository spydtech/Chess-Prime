// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function EditProfile() {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("privacy");

//   const menuSections = [
//     {
//       items: [
//         { name: "Privacy", section: "privacy" },
        
        
//       ]
//     },
//     {
//       items: [
//         { name: "Change username", section: "username" },
//         { name: "Change password", section: "password" },
//         { name: "Change email", section: "email" },
//       ]
//     },
//     {
//       items: [
//         { name: "Two-factor authentication", section: "2fa" },
//         { name: "Security", section: "security" },
//       ]
//     },
    
//     {
//       items: [
//         { name: "Close account", section: "close" },
//       ]
//     },
//   ];

//   // Username change state
//   const [usernameData, setUsernameData] = useState({
//     newUsername: "",
//     confirmUsername: "",
//   });

//   // Password change state
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // Email change state
//   const [emailData, setEmailData] = useState({
//     newEmail: "",
//     confirmEmail: "",
//   });

//   const [message, setMessage] = useState({ type: "", text: "" });

//   // Profile data state
//   const [profileData, setProfileData] = useState({
//     displayName: "",
//     bio: "",
//     location: "",
//     website: "",
//     birthday: "",
//     gender: "",
//     occupation: "",
//     interests: "",
//     chessLevel: "",
//     preferredLanguage: "",
//   });

//   const languages = [
//     "English", "Spanish", "French", "German", "Italian", "Portuguese",
//     "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi"
//   ];

//   const chessLevels = [
//     "Beginner", "Intermediate", "Advanced", "Expert", "Professional"
//   ];

//   const genders = [
//     "Prefer not to say", "Male", "Female", "Non-binary", "Other"
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleUsernameChange = (e) => {
//     const { name, value } = e.target;
//     setUsernameData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEmailChange = (e) => {
//     const { name, value } = e.target;
//     setEmailData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     // Save profile data logic here
//     console.log("Saving profile:", profileData);
//     // You can add API call here
//     navigate('/profile');
//   };

//   const handleUpdateUsername = () => {
//     if (!usernameData.newUsername || !usernameData.confirmUsername) {
//       setMessage({ type: "error", text: "Please fill in all fields" });
//       return;
//     }
//     if (usernameData.newUsername !== usernameData.confirmUsername) {
//       setMessage({ type: "error", text: "Usernames do not match" });
//       return;
//     }
//     setMessage({ type: "success", text: "Username updated successfully!" });
//     setUsernameData({ newUsername: "", confirmUsername: "" });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   const handleUpdatePassword = () => {
//     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
//       setMessage({ type: "error", text: "Please fill in all fields" });
//       return;
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setMessage({ type: "error", text: "New passwords do not match" });
//       return;
//     }
//     if (passwordData.newPassword.length < 8) {
//       setMessage({ type: "error", text: "Password must be at least 8 characters" });
//       return;
//     }
//     setMessage({ type: "success", text: "Password updated successfully!" });
//     setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   const handleUpdateEmail = () => {
//     if (!emailData.newEmail || !emailData.confirmEmail) {
//       setMessage({ type: "error", text: "Please fill in all fields" });
//       return;
//     }
//     if (emailData.newEmail !== emailData.confirmEmail) {
//       setMessage({ type: "error", text: "Emails do not match" });
//       return;
//     }
//     if (!emailData.newEmail.includes('@') || !emailData.newEmail.includes('.')) {
//       setMessage({ type: "error", text: "Please enter a valid email address" });
//       return;
//     }
//     setMessage({ type: "success", text: "Email updated successfully!" });
//     setEmailData({ newEmail: "", confirmEmail: "" });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   const renderContent = () => {
//     switch (activeSection) {
//       case "username":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Username</h2>
            
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">New Username</label>
//               <input
//                 name="newUsername"
//                 value={usernameData.newUsername}
//                 onChange={handleUsernameChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Enter new username"
//               />
//             </div>

//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Confirm Username</label>
//               <input
//                 name="confirmUsername"
//                 value={usernameData.confirmUsername}
//                 onChange={handleUsernameChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Confirm new username"
//               />
//             </div>

//             <div className="flex justify-end pt-4">
//               <button 
//                 onClick={handleUpdateUsername}
//                 className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm"
//               >
//                 Update Username
//               </button>
//             </div>
//           </div>
//         );

//       case "password":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Password</h2>
            
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Current Password</label>
//               <input
//                 name="currentPassword"
//                 value={passwordData.currentPassword}
//                 onChange={handlePasswordChange}
//                 type="password"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Enter current password"
//               />
//             </div>

//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">New Password</label>
//               <input
//                 name="newPassword"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordChange}
//                 type="password"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Enter new password (min. 8 characters)"
//               />
//             </div>

//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Confirm New Password</label>
//               <input
//                 name="confirmPassword"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordChange}
//                 type="password"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Confirm new password"
//               />
//             </div>

//             <div className="flex justify-end pt-4">
//               <button 
//                 onClick={handleUpdatePassword}
//                 className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm"
//               >
//                 Update Password
//               </button>
//             </div>
//           </div>
//         );

//       case "email":
//         return (
//           <div className="space-y-6">
//             <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Email</h2>
            
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">New Email Address</label>
//               <input
//                 name="newEmail"
//                 value={emailData.newEmail}
//                 onChange={handleEmailChange}
//                 type="email"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Enter new email"
//               />
//             </div>

//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Confirm Email Address</label>
//               <input
//                 name="confirmEmail"
//                 value={emailData.confirmEmail}
//                 onChange={handleEmailChange}
//                 type="email"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Confirm new email"
//               />
//             </div>

//             <div className="flex justify-end pt-4">
//               <button 
//                 onClick={handleUpdateEmail}
//                 className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm"
//               >
//                 Update Email
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="space-y-6">
//             <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Edit profile</h2>
            
//             {/* Display Name */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Display Name</label>
//               <input
//                 name="displayName"
//                 value={profileData.displayName}
//                 onChange={handleInputChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="How you want to be called"
//               />
//             </div>

//             {/* Bio */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">
//                 Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={profileData.bio}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524] resize-none"
//                 placeholder="Tell us a little about yourself..."
//               />
//             </div>

//             {/* Location */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Location</label>
//               <input
//                 name="location"
//                 value={profileData.location}
//                 onChange={handleInputChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="City, Country"
//               />
//             </div>

//             {/* Website */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Website</label>
//               <input
//                 name="website"
//                 value={profileData.website}
//                 onChange={handleInputChange}
//                 type="url"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="https://yourwebsite.com"
//               />
//             </div>

//             {/* Birthday */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Birthday</label>
//               <input
//                 name="birthday"
//                 value={profileData.birthday}
//                 onChange={handleInputChange}
//                 type="date"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//               />
//             </div>

//             {/* Gender */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Gender</label>
//               <select 
//                 name="gender"
//                 value={profileData.gender}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//               >
//                 <option value="">Select gender</option>
//                 {genders.map(gender => (
//                   <option key={gender} value={gender}>{gender}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Occupation */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Occupation</label>
//               <input
//                 name="occupation"
//                 value={profileData.occupation}
//                 onChange={handleInputChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="What you do"
//               />
//             </div>

//             {/* Interests */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Interests</label>
//               <input
//                 name="interests"
//                 value={profileData.interests}
//                 onChange={handleInputChange}
//                 type="text"
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//                 placeholder="Chess, reading, music, etc."
//               />
//             </div>

//             {/* Chess Level */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Chess Level</label>
//               <select 
//                 name="chessLevel"
//                 value={profileData.chessLevel}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//               >
//                 <option value="">Select your level</option>
//                 {chessLevels.map(level => (
//                   <option key={level} value={level}>{level}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Preferred Language */}
//             <div>
//               <label className="block text-[#A1A1AA] text-sm mb-2">Preferred Language</label>
//               <select 
//                 name="preferredLanguage"
//                 value={profileData.preferredLanguage}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
//               >
//                 <option value="">Select language</option>
//                 {languages.map(lang => (
//                   <option key={lang} value={lang}>{lang}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Save Button */}
//             <div className="flex justify-end pt-4">
//               <button 
//                 onClick={handleSave}
//                 className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex-1 bg-[#140A05] h-auto p-6 overflow-auto">
//       <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">
//         {/* Header with Back Button */}
//         <div className="flex items-center px-6 py-4 border-b border-[#5A3A1A]">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-[#A1A1AA] hover:text-[#F5A524] transition mr-4"
//           >
//             ← Back
//           </button>
//           <h1 className="text-2xl font-normal text-[#F5F5F5]">User123</h1>
//         </div>

//         {/* Message Display */}
//         {message.text && (
//           <div className={`mx-6 mt-4 p-3 rounded ${
//             message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
//           }`}>
//             {message.text}
//           </div>
//         )}

//         {/* Two Column Layout */}
//         <div className="flex">
//           {/* Left Column - Settings Menu */}
//           <div className="w-80 border-r border-[#5A3A1A] min-h-[600px]">
//             {menuSections.map((section, idx) => (
//               <React.Fragment key={idx}>
//                 {section.items.map((item) => (
//                   <button
//                     key={item.name}
//                     onClick={() => setActiveSection(item.section)}
//                     className={`w-full px-6 py-3 text-left hover:bg-[#2A160C] transition-colors border-b border-[#5A3A1A] last:border-b-0 ${
//                       activeSection === item.section ? 'bg-[#2A160C]' : ''
//                     }`}
//                   >
//                     <span className={item.name === "Close account" ? "text-red-400" : "text-[#F5F5F5]"}>
//                       {item.name}
//                     </span>
//                   </button>
//                 ))}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Right Column - Dynamic Content */}
//           <div className="flex-1 p-6 max-h-[800px]  overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A3A1A] scrollbar-track-[#1E120B]">
//             {renderContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// components/EditProfile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import profileService from "../services/profileService";

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile, changeName, changePassword, changeEmail, closeAccount, refreshProfileCompletion } = useAuth();
  const [activeSection, setActiveSection] = useState("privacy");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    birthday: "",
    gender: "Prefer not to say",
    occupation: "",
    interests: "",
    chessLevel: "Beginner",
    preferredLanguage: "English",
  });

  const [nameData, setNameData] = useState({
    newName: "",
    confirmName: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailData, setEmailData] = useState({
    newEmail: "",
    confirmEmail: "",
  });

  const [closeAccountData, setCloseAccountData] = useState({
    password: "",
    confirmText: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : "",
        gender: user.gender || "Prefer not to say",
        occupation: user.occupation || "",
        interests: user.interests || "",
        chessLevel: user.chessLevel || "Beginner",
        preferredLanguage: user.preferredLanguage || "English",
      });
    }
  }, [user]);

  const menuSections = [
    {
      items: [
        { name: "Privacy", section: "privacy" },
      ]
    },
    {
      items: [
        { name: "Change name", section: "name" },
        { name: "Change password", section: "password" },
        { name: "Change email", section: "email" },
      ]
    },
    {
      items: [
        { name: "Two-factor authentication", section: "2fa" },
        { name: "Security", section: "security" },
      ]
    },
    {
      items: [
        { name: "Close account", section: "close" },
      ]
    },
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi"
  ];

  const chessLevels = [
    "Beginner", "Intermediate", "Advanced", "Expert", "Professional"
  ];

  const genders = [
    "Prefer not to say", "Male", "Female", "Non-binary", "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setNameData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseAccountChange = (e) => {
    const { name, value } = e.target;
    setCloseAccountData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });
      
      await updateProfile(profileData);
      await refreshProfileCompletion();
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!nameData.newName || !nameData.confirmName) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    if (nameData.newName !== nameData.confirmName) {
      setMessage({ type: "error", text: "Names do not match" });
      return;
    }
    if (nameData.newName.length < 3 || nameData.newName.length > 20) {
      setMessage({ type: "error", text: "Name must be between 3 and 20 characters" });
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(nameData.newName)) {
      setMessage({ type: "error", text: "Name can only contain letters, numbers, and underscores" });
      return;
    }

    try {
      setLoading(true);
      await changeName(nameData.newName);
      setMessage({ type: "success", text: "Name updated successfully!" });
      setNameData({ newName: "", confirmName: "" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update name" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update password" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!emailData.newEmail || !emailData.confirmEmail) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }
    if (emailData.newEmail !== emailData.confirmEmail) {
      setMessage({ type: "error", text: "Emails do not match" });
      return;
    }
    if (!emailData.newEmail.includes('@') || !emailData.newEmail.includes('.')) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    try {
      setLoading(true);
      await changeEmail(emailData.newEmail);
      setMessage({ type: "success", text: "Email updated successfully!" });
      setEmailData({ newEmail: "", confirmEmail: "" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to update email" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAccount = async () => {
    if (closeAccountData.confirmText !== "DELETE") {
      setMessage({ type: "error", text: 'Please type "DELETE" to confirm' });
      return;
    }
    if (!closeAccountData.password) {
      setMessage({ type: "error", text: "Please enter your password" });
      return;
    }

    try {
      setLoading(true);
      await closeAccount(closeAccountData.password);
      navigate('/login');
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to close account" });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "name":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Name</h2>
            
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">New Name</label>
              <input
                name="newName"
                value={nameData.newName}
                onChange={handleNameChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Enter new name"
                disabled={loading}
              />
              <p className="text-xs text-[#A1A1AA] mt-1">3-20 characters, letters, numbers, and underscores only</p>
            </div>

            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Confirm Name</label>
              <input
                name="confirmName"
                value={nameData.confirmName}
                onChange={handleNameChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Confirm new name"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleUpdateName}
                disabled={loading}
                className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Name'}
              </button>
            </div>
          </div>
        );

      case "password":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Password</h2>
            
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Current Password</label>
              <input
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                type="password"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Enter current password"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">New Password</label>
              <input
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                type="password"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Enter new password (min. 6 characters)"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Confirm New Password</label>
              <input
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                type="password"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Confirm new password"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleUpdatePassword}
                disabled={loading}
                className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Change Email</h2>
            
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">New Email Address</label>
              <input
                name="newEmail"
                value={emailData.newEmail}
                onChange={handleEmailChange}
                type="email"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Enter new email"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Confirm Email Address</label>
              <input
                name="confirmEmail"
                value={emailData.confirmEmail}
                onChange={handleEmailChange}
                type="email"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Confirm new email"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleUpdateEmail}
                disabled={loading}
                className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Email'}
              </button>
            </div>
          </div>
        );

      case "close":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-normal mb-6 text-red-400">Close Account</h2>
            
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-sm mb-4">
                Warning: This action is permanent and cannot be undone. All your data will be deleted.
              </p>
              
              <div className="mb-4">
                <label className="block text-[#A1A1AA] text-sm mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  name="confirmText"
                  value={closeAccountData.confirmText}
                  onChange={handleCloseAccountChange}
                  type="text"
                  className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-red-500/30 focus:outline-none focus:border-red-500"
                  placeholder="DELETE"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[#A1A1AA] text-sm mb-2">Password</label>
                <input
                  name="password"
                  value={closeAccountData.password}
                  onChange={handleCloseAccountChange}
                  type="password"
                  className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-red-500/30 focus:outline-none focus:border-red-500"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleCloseAccount}
                disabled={loading}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Permanently Close Account'}
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-normal mb-6 text-[#F5F5F5]">Edit Profile</h2>
            
            {/* Display Name */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Display Name</label>
              <input
                name="displayName"
                value={profileData.displayName}
                onChange={handleInputChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="How you want to be called"
                disabled={loading}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524] resize-none"
                placeholder="Tell us a little about yourself..."
                disabled={loading}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Location</label>
              <input
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="City, Country"
                disabled={loading}
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Website</label>
              <input
                name="website"
                value={profileData.website}
                onChange={handleInputChange}
                type="url"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="https://yourwebsite.com"
                disabled={loading}
              />
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Birthday</label>
              <input
                name="birthday"
                value={profileData.birthday}
                onChange={handleInputChange}
                type="date"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                disabled={loading}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Gender</label>
              <select 
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                disabled={loading}
              >
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Occupation</label>
              <input
                name="occupation"
                value={profileData.occupation}
                onChange={handleInputChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="What you do"
                disabled={loading}
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Interests</label>
              <input
                name="interests"
                value={profileData.interests}
                onChange={handleInputChange}
                type="text"
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                placeholder="Chess, reading, music, etc."
                disabled={loading}
              />
            </div>

            {/* Chess Level */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Chess Level</label>
              <select 
                name="chessLevel"
                value={profileData.chessLevel}
                onChange={handleInputChange}
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                disabled={loading}
              >
                {chessLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-[#A1A1AA] text-sm mb-2">Preferred Language</label>
              <select 
                name="preferredLanguage"
                value={profileData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full bg-[#1A0D06] text-[#F5F5F5] rounded px-4 py-3 text-sm border border-[#5A3A1A] focus:outline-none focus:border-[#F5A524]"
                disabled={loading}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-6 py-2.5 bg-[#F5A524] hover:bg-[#E09612] text-[#140A05] font-semibold rounded transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#140A05] h-auto p-6 overflow-auto">
      <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">
        {/* Header with Back Button */}
        <div className="flex items-center px-6 py-4 border-b border-[#5A3A1A]">
          <button
            onClick={() => navigate(-1)}
            className="text-[#A1A1AA] hover:text-[#F5A524] transition mr-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-normal text-[#F5F5F5]">{user?.name || 'User'}</h1>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mx-6 mt-4 p-3 rounded ${
            message.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : 
            "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}>
            {message.text}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column - Settings Menu */}
          <div className="w-80 border-r border-[#5A3A1A] min-h-[600px]">
            {menuSections.map((section, idx) => (
              <React.Fragment key={idx}>
                {section.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveSection(item.section)}
                    className={`w-full px-6 py-3 text-left hover:bg-[#2A160C] transition-colors border-b border-[#5A3A1A] last:border-b-0 ${
                      activeSection === item.section ? 'bg-[#2A160C] border-l-2 border-l-[#F5A524]' : ''
                    }`}
                  >
                    <span className={item.name === "Close account" ? "text-red-400" : "text-[#F5F5F5]"}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="flex-1 p-6 max-h-[800px] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-[#5A3A1A] scrollbar-track-[#1E120B]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}