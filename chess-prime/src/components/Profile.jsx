import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import

export default function Profile() {
  const navigate = useNavigate(); // Add this line

  return (
    <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto">
      <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">

        {/* Username Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#5A3A1A]">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <h1 className="text-2xl font-normal text-[#F5F5F5]">
              User123
            </h1>
          </div>

          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => navigate('/edit-profile')} // Add this
              className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
            >
              ⚙ Edit profile
            </button>
            {/* <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
              📖 Opening explorer
            </button> */}
            {/* <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
              ⬇ Export games
            </button> */}
            <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
              👤 Friends
            </button>
            <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
              More ▾
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-10 px-6 py-4 border-b border-[#5A3A1A] text-sm text-[#A1A1AA]">
          <div>0 Tournament Points</div>
          <div>0 Studies</div>
          <div>0 Forum Posts</div>
          {/* <div>0 Blog Posts</div> */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 py-28 w-full">

          {/* Left */}
          <div>
            <h2 className="text-xl font-normal mb-4 text-[#F5F5F5]">
              Welcome to ChessVerse!
            </h2>

            <p className="mb-2">This is your profile page.</p>

            <p className="mb-4">
              Will a child use this account? You might want to enable{" "}
              <span className="text-[#F5A524] hover:underline cursor-pointer">
                Kid mode
              </span>.
            </p>

            <p className="mb-3">What now? Here are a few suggestions:</p>

            <ul className="list-disc pl-5 space-y-1 text-[#F5A524]">
              <li className="hover:underline cursor-pointer">
                Learn chess rules
              </li>
              <li className="hover:underline cursor-pointer">
                Improve with chess tactics puzzles.
              </li>
              <li className="hover:underline cursor-pointer">
                Play the Artificial Intelligence.
              </li>
              <li className="hover:underline cursor-pointer">
                Play opponents from around the world.
              </li>
              <li className="hover:underline cursor-pointer">
                Follow your friends on Lichess.
              </li>
              <li className="hover:underline cursor-pointer">
                Play in tournaments.
              </li>
              <li className="hover:underline cursor-pointer">
                Learn from Study and Videos.
              </li>
              <li className="hover:underline cursor-pointer">
                Configure ChessVerse to your liking.
              </li>
              <li className="text-[#F5F5F5]">Explore the site and have fun :)</li>
            </ul>
          </div>

          {/* Right */}
          <div className="text-sm text-[#F5F5F5] space-y-2">
            <p>
              <span className="font-medium">Member since</span> 26 Feb 2026
            </p>
            <p>
              <span className="font-medium">Active</span> 2 minutes ago
            </p>
            <p>
              <span className="text-[#F5A524] hover:underline cursor-pointer">
                Profile completion: 0%
              </span>
            </p>
            <p>
              <span className="font-medium">
                Time spent playing:
              </span>{" "}
              0 minutes
            </p>
          </div>

        </div>

        {/* Bottom Tabs */}
        <div className="flex border-t border-[#5A3A1A]">
          <div className="px-6 py-3 border-r border-[#5A3A1A] bg-[#1A0D06] font-medium">
            Activity
          </div>
          <div className="px-6 py-3 text-[#A1A1AA]">
            0 Games
          </div>
        </div>

      </div>
    </div>
  );
}