import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scheduleIcon from "./schedule.png";
import portfolioIcon from "./portfolio.png";
import groupIcon from "./group.png";
import ProfileIcon from "./Profile.png";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const [clicked, setClicked] = useState(null);
  const [activeButton, setActiveButton] = useState(localStorage.getItem("activeButton") || location.pathname);

  useEffect(() => {
    localStorage.setItem("activeButton", activeButton);
  }, [activeButton]);

  const handleClick = (name, path) => {
    setClicked(name);
    setActiveButton(path);
    setTimeout(() => setClicked(null), 300); // Убираем класс через 300 мс
  };

  const isActive = (path) => activeButton === path;

  const getFilterStyle = (path) => {
    return isActive(path)
      ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)"
      : "none";
  };

  return (
    <nav className="bottom-nav">
      <Link
        to="/portfolio"
        className={isActive("/portfolio") ? "active" : ""}
        onClick={() => handleClick("portfolio", "/portfolio")}
      >
        <img
          src={portfolioIcon}
          alt="Портфолио"
          style={{ filter: getFilterStyle("/portfolio") }}
          className={clicked === "portfolio" ? "maksimka" : ""}
        />
        <span>Портфолио</span>
      </Link>

      <Link
        to="/"
        className={isActive("/") ? "active" : ""}
        onClick={() => handleClick("home", "/")}
      >
        <img
          src={scheduleIcon}
          alt="Домой"
          style={{ filter: getFilterStyle("/") }}
          className={clicked === "home" ? "maksimka" : ""}
        />
        <span>Домой</span>
      </Link>

      <Link
        to="/RedirectToSchedule"
        className={isActive("/RedirectToSchedule") ? "active" : ""}
        onClick={() => handleClick("group", "/RedirectToSchedule")}
      >
        <img
          src={groupIcon}
          alt="Расписание"
          style={{ filter: getFilterStyle("/RedirectToSchedule") }}
          className={clicked === "group" ? "maksimka" : ""}
        />
        <span>Расписание</span>
      </Link>

      <Link
        to="/Profile"
        className={isActive("/Profile") ? "active" : ""}
        onClick={() => handleClick("profile", "/Profile")}
      >
        <img
          src={ProfileIcon}
          alt="Профиль"
          style={{ filter: getFilterStyle("/Profile") }}
          className={clicked === "profile" ? "maksimka" : ""}
        />
        <span>Профиль</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
