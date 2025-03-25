import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import scheduleIcon from "./schedule.png";
import portfolioIcon from "./portfolio.png";
import groupIcon from "./group.png";
import ProfileIcon from "./Profile.png";
import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(null);
  const [activeButton, setActiveButton] = useState(localStorage.getItem("activeButton") || location.pathname);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("activeButton", activeButton);
  }, [activeButton]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleClick = async (name, path) => {
    if (name === "profile" && !user) {
      navigate("/auth");
      return;
    }

    if (name === "group") {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("group")
            .eq("id", user.id)
            .single();

          if (data?.group) {
            const groupPath = `/${data.group}`;
            setActiveButton(groupPath);
            navigate(groupPath);
            return;
          }
        }
        navigate("/auth");
      } catch (error) {
        console.error("Ошибка при получении группы:", error);
        navigate("/auth");
      }
      return;
    }

    setClicked(name);
    setActiveButton(path || name);
    navigate(path || name);
    setTimeout(() => setClicked(null), 300);
  };

  const isActive = (path) => activeButton === path;

  const getMaksStyle = (path) => {
    return isActive(path)
      ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)"
      : "none";
  };

  // Проверяем активна ли кнопка группы
  const isGroupActive = isActive("/TE31B") || isActive("/TE21B");

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
          style={{ filter: getMaksStyle("/portfolio") }}
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
          style={{ filter: getMaksStyle("/") }}
          className={clicked === "home" ? "maksimka" : ""}
        />
        <span>Домой</span>
      </Link>

      <button
  className={isGroupActive ? "active" : ""}
  onClick={() => handleClick("group")}
>
  <img
    src={groupIcon}
    alt="Расписание"
    style={{ 
      filter: isGroupActive 
        ? "brightness(0) saturate(100%) invert(33%) sepia(92%) saturate(1984%) hue-rotate(196deg) brightness(99%) contrast(104%)"
        : "none"
    }}
    className={clicked === "group" ? "maksimka" : ""}
  />
  <span>Расписание</span>
</button>

      <button
        className={isActive("/Profile") ? "active" : ""}
        onClick={() => handleClick("profile", "/Profile")}
      >
        <img
          src={ProfileIcon}
          alt="Профиль"
          style={{ filter: getMaksStyle("/Profile") }}
          className={clicked === "profile" ? "maksimka" : ""}
        />
        <span>{user ? "Профиль" : "Войти"}</span>
      </button>
    </nav>
  );
};

export default BottomNav;