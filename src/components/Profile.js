import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import studentImage from "./student.png";
import checkmark from "./galka.png";
import { requestPermission } from "./firebase"; // Импорт функции подписки

const Profile = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }
  }, []);

  const handleSelectGroup = (group) => {
    localStorage.setItem("selectedGroup", group);
    setSelectedGroup(group);
    setMenuOpen(false);
  };

  // Функция подписки на уведомления с передачей группы
  const handleSubscribe = async () => {
    if (!selectedGroup) {
      alert("Выберите группу перед подпиской!");
      return;
    }

    try {
      const token = await requestPermission();
      if (!token) {
        alert("Не удалось получить токен уведомлений");
        return;
      }

      // Отправка токена на сервер
      await fetch("https://backend-schedule-b6vy.onrender.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ group: selectedGroup, token })
      });

      setSubscribed(true);
      alert("Вы успешно подписались на уведомления!");
    } catch (err) {
      console.error("Ошибка подписки:", err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header1">
        <div className="profile-circle"></div>
        <img src={studentImage} alt="User" className="profile-image" />
        <h2 className="profile-title">Личный кабинет</h2>
      </div>

      <div className="Viktor">
        <div className="profile-card">
          <p className="profile-label">Выбрана группа:</p>
          <button className="profile-group-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {selectedGroup || "Выбрать группу"}
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              {["TE31B", "TE21B"].map((group) => (
                <div key={group} className="dropdown-item" onClick={() => handleSelectGroup(group)}>
                  {group}
                  {selectedGroup === group && <img src={checkmark} alt="✔" className="checkmark" />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="subscribe-btn">
          <button onClick={handleSubscribe} disabled={subscribed}>
            {subscribed ? "Подписка активна" : "Подписаться на уведомления"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
