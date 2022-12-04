import React from "react";
import Navbar from "./Navbar";
import Search from './Search';
import Chats from './Chats';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      {/* <Search /> */}
      <input type="search" className="search-box" placeholder="Search user..." />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />

    </div>
  );
};

export default Sidebar;
