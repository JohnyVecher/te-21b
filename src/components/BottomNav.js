import React from "react";

import { Link, useLocation } from "react-router-dom";
import scheduleIcon from "./schedule.png";
import portfolioIcon from "./portfolio.png";
import infoIcon from "./info.png";
import groupIcon from "./group.png";
import ProfileIcon from "./Profile.png";


import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>
        <img
          src={portfolioIcon}
          alt="Портфолио"
          style={{ filter: location.pathname === "/portfolio" ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)" : "none" }}
        />
        <span>Портфолио</span>
      </Link>
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <img
          src={scheduleIcon}
          alt="Домой"
          style={{ filter: location.pathname === "/" ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)" : "none" }}
        />
        <span>Домой</span>
      </Link>
	  <Link to="/RedirectToSchedule" className={location.pathname === "/RedirectToSchedule" ? "active" : ""}>
        <img
          src={groupIcon}
          alt="Расписание"
          style={{ filter: location.pathname === "/RedirectToSchedule" ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)" : "none" }}
        />
        <span>Расписание</span>
      </Link>
	  <Link to="/Profile" className={location.pathname === "/Profile" ? "active" : ""}>
        <img
          src={ProfileIcon}
          alt="Профиль"
          style={{ filter: location.pathname === "/Profile" ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)" : "none" }}
        />
        <span>Профиль</span>
      </Link>
    </nav>
  );
};

export default BottomNav;