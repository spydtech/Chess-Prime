import React from "react";
import {
  Gamepad2,
  Puzzle,
  GraduationCap,
  Eye,
  Users,
  MoreHorizontal,
  Moon,
  Settings,
  LifeBuoy,
  Crown,
} from "lucide-react";

function BottomItem({ icon, label, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-xs"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </div>
  );
}

export default function Sidebar({ activeItem, onItemClick }) {
  const menuItems = [
    { name: "Play", icon: <Gamepad2 size={15} /> },
    { name: "Puzzles", icon: <Puzzle size={15} /> },
    { name: "Learn", icon: <GraduationCap size={15} /> },
    { name: "Watch", icon: <Eye size={15} /> },
    { name: "Social", icon: <Users size={15} /> },
    { name: "More", icon: <MoreHorizontal size={15} /> },
  ];

  const bottomItems = [
    { name: "Dark mode", icon: <Moon size={15} /> },
    { name: "Settings", icon: <Settings size={15} /> },
    { name: "Support", icon: <LifeBuoy size={15} /> },
  ];

  const handleBottomItemClick = (itemName) => {
    if (itemName === "Settings") {
      onItemClick("Settings");
    } else if (itemName === "Support") {
      onItemClick("Support");
    }
    // Dark mode could be handled separately
  };

  return (
    <div className="w-auto bg-[#0f0703] flex flex-col h-full border-r border-white/5">
      {/* LOGO - Fixed at top */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Crown className="text-amber-400" size={28} />
        <div>
          <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
          <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
        </div>
      </div>

      {/* MENU - Scrollable if needed */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-20">
        {menuItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onItemClick(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
                ${
                  isActive
                    ? "bg-[#FFA20026] text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
                }`}
            >
              <span className={isActive ? "text-black" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* BOTTOM - Fixed at bottom */}
      <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm">
        {bottomItems.map((item) => (
          <BottomItem 
            key={item.name}
            icon={item.icon} 
            label={item.name}
            onClick={() => handleBottomItemClick(item.name)}
          />
        ))}
      </div>
    </div>
  );
}