import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }
  }, []);

  const handleSelectGroup = (group) => {
    localStorage.setItem("selectedGroup", group);
    setSelectedGroup(group);
  };

  return (
    <div className="profile-container">
      <h16>Личный кабинет</h16>

      <div className="profile-card">
        <p className="profile-label">Выбрана группа:</p>
        <h3 className="profile-group">{selectedGroup || "Не выбрана"}</h3>
      </div>

      <div className="group-selection">
        <p className="profile-label">Выберите группу:</p>
        <div className="group-buttons">
          <button
            className={`profile-btn ${selectedGroup === "TE31B" ? "selected" : ""}`}
            onClick={() => handleSelectGroup("TE31B")}
          >
            TE31B
          </button>
          <button
            className={`profile-btn ${selectedGroup === "TE21B" ? "selected" : ""}`}
            onClick={() => handleSelectGroup("TE21B")}
          >
            TE21B
          </button>
        </div>
      </div>

      {selectedGroup && (
        <button className="go-to-schedule" onClick={() => navigate(`/${selectedGroup}`)}>
          Перейти к расписанию
        </button>
      )}
    </div>
  );
};

export default Profile;
