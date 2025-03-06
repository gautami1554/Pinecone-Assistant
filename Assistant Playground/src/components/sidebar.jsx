import React from 'react';
import { useState } from "react";
import { Settings, Description as FileIcon, Code, MoreVert, ChevronLeft, ChevronRight } from "@mui/icons-material";
import UploadFile from "./uploadfile";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className="relative">
      {/* Custom collapse button positioned at the divider line */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-[-15px] h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-200 transition-all z-50"
        style={{
          transform: "translateX(-50%)",
        }}
      >
        {collapsed ? (
          <ChevronRight style={{ fontSize: 24 }} />
        ) : (
          <ChevronLeft style={{ fontSize: 24 }} />
        )}
      </button>

      <Drawer
        variant="persistent"
        anchor="right"
        open={!collapsed}
        sx={{
          width: collapsed ? 0 : 320,
          flexShrink: 0,
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: collapsed ? 0 : 320,
            boxSizing: "border-box",
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
            borderTop: "none",
            overflow: "hidden",
          },
        }}
      >
        <div className="relative h-16 flex items-center border-b border-gray-200">
          {/* Top Icons in horizontal layout */}
          <div className="flex flex-row items-center gap-4 text-gray-600 px-4 h-full">
            {[
              { name: "settings", Icon: Settings, label: "Settings" },
              { name: "file", Icon: FileIcon, label: "Files" },
              { name: "connect", Icon: Code, label: "Connect" },
              { name: "more", Icon: MoreVert, label: "More" },
            ].map(({ name, Icon, label }) => (
              <div
                key={name}
                className={`relative group p-2 cursor-pointer rounded-md ${selectedIcon === name ? "bg-gray-200" : ""} hover:bg-gray-100`}
                onClick={() => handleIconClick(name)}
              >
                <Icon className={`${selectedIcon === name ? "text-black" : "text-gray-600"}`} style={{ fontSize: 16 }} />
                {/* Label visibility when collapsed */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-25px] opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-300 rounded-md py-1 px-2 text-xs text-gray-600 z-10">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div className="flex-1 overflow-hidden">
          <UploadFile />
        </div>
      </Drawer>

      {/* Icons outside the sidebar when collapsed */}
      {collapsed && (
        <div className="absolute top-4 right-4 flex flex-row items-center space-x-4">
          {[
            { name: "settings", Icon: Settings, label: "Settings" },
            { name: "file", Icon: FileIcon, label: "Files" },
            { name: "connect", Icon: Code, label: "Connect" },
            { name: "more", Icon: MoreVert, label: "More" },
          ].map(({ name, Icon, label }) => (
            <div
              key={name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleIconClick(name)}
            >
              <Icon className="text-gray-600" style={{ fontSize: 24 }} />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
