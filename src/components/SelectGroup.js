import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectGroup.css";

const SelectGroup = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState(localStorage.getItem("selectedGroup") || null);

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem("selectedGroup", selectedGroup);
    }
  }, [selectedGroup]);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    localStorage.setItem("selectedGroup", group);
    navigate(`/${group}`);
  };

  return (
    <div className="select-group-container">
      <h2>Личный кабинет</h2>

      {selectedGroup ? (
        <>
          <p className="selected-group-text">
            Ваша текущая группа: <strong>{selectedGroup}</strong>
          </p>
          <button className="view-schedule-btn" onClick={() => navigate(`/${selectedGroup}`)}>
            Перейти к расписанию
          </button>
          <button className="change-group-btn" onClick={() => setSelectedGroup(null)}>
            Сменить группу
          </button>
        </>
      ) : (
        <>
          <p>Выберите вашу группу:</p>
          <div className="group-buttons">
            <button onClick={() => handleSelectGroup("TE31B")}>TE31B</button>
            <button onClick={() => handleSelectGroup("TE21B")}>TE21B</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectGroup;
