import React, { useState, useEffect } from "react";
import "./Test.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (e) => {
    const clickedTab = e.target.closest("li");
    if (clickedTab) {
      const tabsNewAnim = document.getElementById("navbarSupportedContent");
      const activeItemNewAnim = tabsNewAnim.querySelector(".active");
      const itemPosNewAnimTop = clickedTab.offsetTop;
      const itemPosNewAnimLeft = clickedTab.offsetLeft;
      const activeWidthNewAnimHeight = clickedTab.offsetHeight;
      const activeWidthNewAnimWidth = clickedTab.offsetWidth;
      const horiSelector = document.querySelector(".hori-selector");

      setActiveTab(clickedTab);
      if (horiSelector) {
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      }
    }
  };

  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    const resizeHandler = setTimeout(() => {
      test();
    }, 100);

    return () => clearTimeout(resizeHandler);
  }, [activeTab]);

  const test = () => {
    const tabsNewAnim = document.getElementById("navbarSupportedContent");
    const activeItemNewAnim = tabsNewAnim.querySelector(".active");
    if (activeItemNewAnim) {
      const itemPosNewAnimTop = activeItemNewAnim.offsetTop;
      const itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
      const activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
      const activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
      const horiSelector = document.querySelector(".hori-selector");

      if (horiSelector) {
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      }
    }
  };

  const NavbarItem = ({ label }) => {
    return (
      <li className={`nav-item ${activeTab === label ? "active" : ""}`}>
        <a
          className="nav-link"
          href="javascript:void(0);"
          onClick={() => setActiveTab(label)}
        >
          {label}
        </a>
      </li>
    );
  };

  useEffect(() => {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const target = document.querySelector(
      `#navbarSupportedContent ul li a[href="${path}"]`
    );
    if (target) {
      setActiveTab(target.textContent);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <a className="navbar-brand navbar-logo" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleTabClick}
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <NavbarItem label="Dashboard" />
          <NavbarItem label="Address Book" />
          <NavbarItem label="Components" />
          <NavbarItem label="Calendar" />
          <NavbarItem label="Charts" />
          <NavbarItem label="Documents" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
