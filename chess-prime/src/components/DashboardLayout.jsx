import React, { useEffect } from "react";
import Sidebar from "./Sidebar";

// Add custom scrollbar styles
const addScrollbarStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #4a4542;
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #6a6562;
    }
  `;
  document.head.appendChild(style);
};

export default function DashboardLayout({ children }) {
  useEffect(() => {
    addScrollbarStyles();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}