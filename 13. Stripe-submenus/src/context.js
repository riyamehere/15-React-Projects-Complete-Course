import React, { useState, useContext } from "react";
import sublinks from "./data";
const AppContext = React.createContext();

//app provider
const AppProvider = ({ children }) => {
  //setting up all the states
  //put sidebar as false in the starting, so that once we load the page, we should not immediately se the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //initially, put submenu as false
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [page, setPage] = useState({ page: "", links: [] });
  const [location, setLocation] = useState({});

  //arrow funcs to open and close sidebar and submenu
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    const page = sublinks.find((link) => link.page === text);
    setPage(page);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

//exporting the provider
export { AppContext, AppProvider };
