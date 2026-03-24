import React from "react";
import {
  Users,
  Flag,
  Globe,
  UserCheck,
  Crown,
  BarChart3,
  Trophy,
  Radio,
  Newspaper,
  FileText,
  Edit3,
  MessageCircle,
} from "lucide-react";

const Social = () => {
  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#312e2b] text-white px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 custom-scrollbar">
      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
        <Users size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        Community
      </h1>

      {/* CONNECT */}
      <Section title="Connect">
        <Card
          icon={<Users size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Friends"
          desc="Find and add friends"
          color="bg-[#d9b98b]"
        />

        <Card
          icon={<Flag size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Clubs"
          desc="Join and compete in Chess clubs"
          color="bg-[#3c6e3c]"
        />

        <Card
          icon={<Globe size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Members"
          desc="Search and find players across the world"
          color="bg-[#1f5d8c]"
        />

        <Card
          icon={<UserCheck size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Coaches"
          desc="Find a coach to help you improve"
          color="bg-[#5c6f86]"
        />
      </Section>

      {/* PLAYERS */}
      <Section title="Players">
        <Card
          icon={<Crown size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Top Players"
          desc="Learn about the best players in the world"
          color="bg-[#8b1e1e]"
        />

        <Card
          icon={<BarChart3 size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Chess Rankings"
          desc="See player ratings for competitive formats"
          color="bg-[#34495e]"
        />

        <Card
          icon={<Trophy size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Leaderboards"
          desc="See player ranking for Chess.com formats"
          color="bg-[#6b3f2b]"
        />
      </Section>

      {/* CONTENT */}
      <Section title="Content">
        <Card
          icon={<Radio size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Chess Today"
          desc="Stay up-to-date on events and streaming"
          color="bg-[#2f6f3a]"
        />

        <Card
          icon={<Newspaper size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="News"
          desc="Get the latest on competitive chess"
          color="bg-[#9e9e9e]"
        />

        <Card
          icon={<FileText size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Articles"
          desc="Read chess features, guides, and more"
          color="bg-[#5b8d3d]"
        />

        <Card
          icon={<Edit3 size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Blogs"
          desc="Read and improve on your chess journey"
          color="bg-[#c6952b]"
        />

        <Card
          icon={<MessageCircle size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />}
          title="Forums"
          desc="Find answers from the community"
          color="bg-[#2f7a78]"
        />
      </Section>

      {/* FOOTER */}
      <div className="text-gray-400 text-xs sm:text-sm mt-10 sm:mt-16 md:mt-20 pb-6 sm:pb-8 md:pb-10 text-center sm:text-left">
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 gap-y-1">
          <span>Support</span> • <span>Chess Terms</span> • <span>About</span> • 
          <span>Students</span> • <span>Jobs</span> • <span>Developers</span> • 
          <span>User Agreement</span> • <span>Privacy Policy</span> • 
          <span>Privacy Settings</span> • <span>Fair Play</span> • 
          <span>Partners</span> • <span>Compliance</span> • 
          <span>Chess.com © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default Social;

/* SECTION COMPONENT */
const Section = ({ title, children }) => (
  <div className="mb-8 sm:mb-10 md:mb-12">
    <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-5">
      {title}
    </h2>

    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-7">
      {children}
    </div>
  </div>
);

/* CARD COMPONENT */
const Card = ({ icon, title, desc, color }) => (
  <div className="bg-[#262421] rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 shadow-md">
    {/* ICON - Responsive height */}
    <div className={`${color} h-24 xs:h-28 sm:h-32 md:h-36 flex items-center justify-center`}>
      {icon}
    </div>

    {/* TEXT - Responsive padding and font sizes */}
    <div className="p-3 sm:p-4 md:p-5">
      <h3 className="font-semibold text-sm sm:text-base md:text-lg">
        {title}
      </h3>

      <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">
        {desc}
      </p>
    </div>
  </div>
);