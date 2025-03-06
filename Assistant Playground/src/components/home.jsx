import React from 'react';
import { useState } from "react";
import Sidebar from "./sidebar";
import Playground from "./playground";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`h-screen flex ${collapsed ? "overflow-hidden" : ""}`}>
      <div className="flex-1">
        <Playground />
      </div>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Home;
