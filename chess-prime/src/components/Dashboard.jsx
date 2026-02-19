import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TimeControlPage from "./controlPage/TimeControlPage";
import Social from "./pagescomponents/Social";

const addScrollbarStyles = () => {

  const style = document.createElement("style");

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


export default function Dashboard() {

  const [activeComponent, setActiveComponent] = useState("Social");


  useEffect(() => {

    addScrollbarStyles();

  }, []);


  const renderComponent = () => {

    switch (activeComponent) {

      case "Social":

        return <Social />;

      default:

        return <TimeControlPage />;

    }

  };


  return (

    <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">

      <Sidebar

        activeItem={activeComponent}

        onItemClick={setActiveComponent}

      />


      {renderComponent()}

    </div>

  );

}
