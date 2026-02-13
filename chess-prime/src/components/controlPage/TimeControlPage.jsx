// import React, { useState } from "react";
// import {
//   Gamepad2,
//   Puzzle,
//   GraduationCap,
//   Eye,
//   Users,
//   MoreHorizontal,
//   Moon,
//   Settings,
//   LifeBuoy,
//   Crown,
//   Zap,
//   Clock,
//   Hourglass,
//   Trophy,
// } from "lucide-react";

// export default function App() {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white">
//       <Sidebar />
//       <TimeControlPage />
//     </div>
//   );
// }

// /* ---------------- SIDEBAR ---------------- */

// function Sidebar() {
//   const [active, setActive] = useState("Play");

//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={20} /> },
//     { name: "Puzzles", icon: <Puzzle size={20} /> },
//     { name: "Learn", icon: <GraduationCap size={20} /> },
//     { name: "Watch", icon: <Eye size={20} /> },
//     { name: "Social", icon: <Users size={20} /> },
//     { name: "More", icon: <MoreHorizontal size={20} /> },
//   ];

//   return (
//     <div className="w-56 bg-[#0f0703] flex flex-col min-h-screen border-r border-white/5">
//       {/* LOGO */}
//       <div className="flex items-center gap-3 px-6 py-8">
//         <Crown className="text-amber-400" size={28} />
//         <div>
//           <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//           <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//         </div>
//       </div>

//       {/* MENU */}
//       <nav className="flex-1 space-y-1 px-4">
//         {menuItems.map((item) => {
//           const isActive = active === item.name;
//           return (
//             <button
//               key={item.name}
//               onClick={() => setActive(item.name)}
//               className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition text-sm 
//                 ${
//                   isActive
//                     ? "bg-amber-500 text-black"
//                     : "text-gray-400 hover:bg-white/5 hover:text-white"
//                 }`}
//             >
//               <span className={isActive ? "text-black" : "text-gray-400"}>{item.icon}</span>
//               {item.name}
//             </button>
//           );
//         })}
//       </nav>

//       {/* BOTTOM */}
//       <div className="px-4  space-y-2 border-t border-white/5 pt-4 -mt-10">
//         <BottomItem icon={<Moon size={18} />} label="Dark mode" />
//         <BottomItem icon={<Settings size={18} />} label="Settings" />
//         <BottomItem icon={<LifeBuoy size={18} />} label="Support" />
//       </div>
//     </div>
//   );
// }

// function BottomItem({ icon, label }) {
//   return (
//     <div className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-base font-medium">
//       <span className="text-gray-400">{icon}</span>
//       {label}
//     </div>
//   );
// }

// /* ---------------- TIME CONTROL PAGE ---------------- */

// function TimeControlPage() {
//   const tabs = ["Quick playing", "Lobby", "Correspondence", "Message"];
//   const [activeTab, setActiveTab] = useState("Quick playing");

//   const sections = [
//     {
//       title: "Bullet",
//       icon: <Zap size={16} />,
//       items: ["1+0", "2+1", "3+0"],
//       players: [345, 166, 166]
//     },
//     {
//       title: "Blitz",
//       icon: <Clock size={16} />,
//       items: ["3+2", "5+0", "5+3"],
//       players: [525, 505, 455]
//     },
//     {
//       title: "Rapid",
//       icon: <Hourglass size={16} />,
//       items: ["10+0", "15+10", "20+0"],
//       players: [225, 185, 85]
//     },
//     {
//       title: "Classic",
//       icon: <Trophy size={16} />,
//       items: ["30+0", "60+0", "90+30"],
//       players: [145, 85, 85]
//     },
//   ];

//   return (
//     <div className="flex-1 p-10 overflow-y-auto">
//       {/* HEADER */}
//       <h1 className="text-4xl font-bold text-center">
//         Choose your <span className="text-amber-400">Time Control</span>
//       </h1>

//       <p className="text-center text-gray-400 mt-2 text-lg">
//         Select your Game mode and start playing instantly
//       </p>

//       {/* TABS */}
//       <div className="flex justify-center mt-8">
//         <div className="bg-[#2a2522] rounded-full p-1.5 flex gap-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2.5 rounded-full text-base font-medium transition ${
//                 activeTab === tab
//                   ? "bg-black text-amber-400"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* CARDS */}
//       <div className="mt-12 space-y-8 max-w-4xl mx-auto">
//         {sections.map((section, sectionIdx) => (
//           <div key={section.title}>
//             <p className="text-gray-400 mb-4 text-base font-medium">
//               {section.title} {section.title === "Bullet" ? "trains reflexes and intuitions" : 
//                 section.title === "Blitz" ? "sharpens tactical awareness" :
//                 section.title === "Rapid" ? "trains reflexes and intuitions" :
//                 "builds long-term strategy"}
//             </p>

//             <div className="grid md:grid-cols-3 gap-4">
//               {section.items.map((item, idx) => (
//                 <Card
//                   key={item}
//                   icon={section.icon}
//                   title={section.title}
//                   time={item}
//                   players={section.players[idx]}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Card({ icon, title, time, players }) {
//   return (
//     <div className="bg-[#120b06] border border-amber-500/30 rounded-xl p-5 hover:border-amber-400 cursor-pointer transition group">
//       <div className="flex items-center gap-2 text-amber-400">
//         {icon}
//         <span className="font-semibold text-sm tracking-wide">{title} {time}</span>
//       </div>

//       <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
//         <Users size={12} />
//         <span>{players} players</span>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
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
  Zap,
  Clock,
  Hourglass,
  Trophy,
} from "lucide-react";

export default function App() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      <Sidebar />
      <TimeControlPage />
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar() {
  const [active, setActive] = useState("Play");

  const menuItems = [
    { name: "Play", icon: <Gamepad2 size={15} /> },
    { name: "Puzzles", icon: <Puzzle size={15} /> },
    { name: "Learn", icon: <GraduationCap size={15} /> },
    { name: "Watch", icon: <Eye size={15} /> },
    { name: "Social", icon: <Users size={15} /> },
    { name: "More", icon: <MoreHorizontal size={15} /> },
  ];

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
          const isActive = active === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg transition text-xs
                ${
                  isActive
                    ? "bg-amber-500 text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className={isActive ? "text-black" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* BOTTOM - Fixed at bottom */}
      <div className="px-4 pb-8 space-y-0  pt-4 mt-4 text-sm">
        <BottomItem icon={<Moon size={15} />} label="Dark mode" className="text-xs" />
        <BottomItem icon={<Settings size={15} />} label="Settings" className="text-xs" />
        <BottomItem icon={<LifeBuoy size={15} />} label="Support" className="text-xs" />
      </div>
    </div>
  );
}

function BottomItem({ icon, label }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-xs">
      <span className="text-gray-400">{icon}</span>
      {label}
    </div>
  );
}

/* ---------------- TIME CONTROL PAGE ---------------- */

function TimeControlPage() {
  const tabs = ["Quick playing", "Lobby", "Correspondence", "Message"];
  const [activeTab, setActiveTab] = useState("Quick playing");

  const sections = [
    {
      title: "Bullet",
      icon: <Zap size={16} />,
      description: "trains reflexes and intuitions",
      items: ["1+0", "2+1", "3+0"],
      players: [345, 166, 166]
    },
    {
      title: "Blitz",
      icon: <Clock size={16} />,
      description: "sharpens tactical awareness",
      items: ["3+2", "5+0", "5+3"],
      players: [525, 505, 455]
    },
    {
      title: "Rapid",
      icon: <Hourglass size={16} />,
      description: "trains reflexes and intuitions",
      items: ["10+0", "15+10", "20+0"],
      players: [225, 185, 85]
    },
    {
      title: "Classic",
      icon: <Trophy size={16} />,
      description: "builds long-term strategy",
      items: ["30+0", "60+0", "90+30"],
      players: [145, 85, 85]
    },
  ];

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden">
      {/* Fixed Header Section */}
      <div className="pt-10 pb-4 px-10">
        <h1 className="text-4xl font-bold text-center">
          Choose your <span className="text-amber-400">Time Control</span>
        </h1>

        <p className="text-center text-gray-400 mt-2 text-lg">
          Select your Game mode and start playing instantly
        </p>

        {/* TABS */}
        <div className="flex justify-center mt-8">
          <div className="bg-[#2a2522] rounded-full p-1.5 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-base font-medium transition ${
                  activeTab === tab
                    ? "bg-black text-amber-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Cards Section */}
      <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-gray-400 mb-4 text-base font-medium">
                {section.title} {section.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {section.items.map((item, idx) => (
                  <Card
                    key={item}
                    icon={section.icon}
                    title={section.title}
                    time={item}
                    players={section.players[idx]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, time, players }) {
  return (
    <div className="bg-[#120b06] border border-amber-500/30 rounded-xl p-5 hover:border-amber-400 cursor-pointer transition group">
      <div className="flex items-center gap-2 text-amber-400">
        {icon}
        <span className="font-semibold text-sm tracking-wide">{title} {time}</span>
      </div>

      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
        <Users size={12} />
        <span>{players} players</span>
      </div>
    </div>
  );
}

// Add custom scrollbar styles
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