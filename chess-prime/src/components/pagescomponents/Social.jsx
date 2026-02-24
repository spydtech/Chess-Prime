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
    <div className="flex-1 h-screen overflow-y-auto bg-[#312e2b] text-white px-8 py-6 custom-scrollbar">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Users size={32} />
        Community
      </h1>

      {/* CONNECT */}
      <Section title="Connect">

        <Card
          icon={<Users size={55} />}
          title="Friends"
          desc="Find and add friends"
          color="bg-[#d9b98b]"
        />

        <Card
          icon={<Flag size={55} />}
          title="Clubs"
          desc="Join and compete in Chess clubs"
          color="bg-[#3c6e3c]"
        />

        <Card
          icon={<Globe size={55} />}
          title="Members"
          desc="Search and find players across the world"
          color="bg-[#1f5d8c]"
        />

        <Card
          icon={<UserCheck size={55} />}
          title="Coaches"
          desc="Find a coach to help you improve"
          color="bg-[#5c6f86]"
        />

      </Section>


      {/* PLAYERS */}
      <Section title="Players">

        <Card
          icon={<Crown size={55} />}
          title="Top Players"
          desc="Learn about the best players in the world"
          color="bg-[#8b1e1e]"
        />

        <Card
          icon={<BarChart3 size={55} />}
          title="Chess Rankings"
          desc="See player ratings for competitive formats"
          color="bg-[#34495e]"
        />

        <Card
          icon={<Trophy size={55} />}
          title="Leaderboards"
          desc="See player ranking for Chess.com formats"
          color="bg-[#6b3f2b]"
        />

      </Section>


      {/* CONTENT */}
      <Section title="Content">

        <Card
          icon={<Radio size={55} />}
          title="Chess Today"
          desc="Stay up-to-date on events and streaming"
          color="bg-[#2f6f3a]"
        />

        <Card
          icon={<Newspaper size={55} />}
          title="News"
          desc="Get the latest on competitive chess"
          color="bg-[#9e9e9e]"
        />

        <Card
          icon={<FileText size={55} />}
          title="Articles"
          desc="Read chess features, guides, and more"
          color="bg-[#5b8d3d]"
        />

        <Card
          icon={<Edit3 size={55} />}
          title="Blogs"
          desc="Read and improve on your chess journey"
          color="bg-[#c6952b]"
        />

        <Card
          icon={<MessageCircle size={55} />}
          title="Forums"
          desc="Find answers from the community"
          color="bg-[#2f7a78]"
        />

      </Section>


      {/* FOOTER */}
      <div className="text-gray-400 text-sm mt-20 pb-10">

        Support • Chess Terms • About • Students • Jobs • Developers •
        User Agreement • Privacy Policy • Privacy Settings • Fair Play •
        Partners • Compliance • Chess.com © 2026

      </div>

    </div>
  );
};

export default Social;



/* SECTION COMPONENT */

const Section = ({ title, children }) => (

  <div className="mb-12">

    <h2 className="text-xl font-semibold mb-5">

      {title}

    </h2>


    <div className="grid grid-cols-4 gap-7">

      {children}

    </div>

  </div>

);



/* CARD COMPONENT */

const Card = ({ icon, title, desc, color }) => (

  <div className="bg-[#262421] rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 shadow-md">

    {/* ICON */}

    <div className={`${color} h-36 flex items-center justify-center`}>

      {icon}

    </div>


    {/* TEXT */}

    <div className="p-5">

      <h3 className="font-semibold text-lg">

        {title}

      </h3>


      <p className="text-gray-400 text-sm mt-1">

        {desc}

      </p>

    </div>

  </div>

);
