import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  //setting up states
  const [showLinks, setShowLinks] = useState(false);
  //for container
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  //for toggling the show link
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  //everytime the showlist changes, we want this useeffect
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    // making the container size dynamic, depending on the number of items we have in list , instead of estimating and hard coding the values
    if (showLinks) {
      //if showlinks is true
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      //else set height to 0 px
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="logo" alt="logo" />
          {/* togglelinks on click */}
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        {/* well, for this we need to put the height of list-container as auto and !important in the css file*/}
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {/* iterating over lists of data.js */}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  {/* fetching this from data.js */}
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {/* iterating over scoial of data.js */}
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
