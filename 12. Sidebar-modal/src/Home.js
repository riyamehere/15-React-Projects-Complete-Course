import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Home = () => {
  const { openSidebar, openModal } = useGlobalContext();
  return (
    <main>
      {/* button for sidebar */}
      <button onClick={openSidebar} className="sidebar-toggle">
        <FaBars />
      </button>
      {/* button for modal */}
      <button onClick={openModal} className="btn">
        show modal
      </button>
    </main>
  );
};

export default Home;
