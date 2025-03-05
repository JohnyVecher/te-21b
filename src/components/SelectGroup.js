import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectGroup.css";

const SelectGroup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      navigate(`/${savedGroup}`);
    }
  }, [navigate]);

  const handleSelectGroup = (group) => {
    localStorage.setItem("selectedGroup", group);
    navigate(`/${group}`);
  };

  return (
    <div className="select-group-container">
      <h2>Выберите вашу группу</h2>
      <button onClick={() => handleSelectGroup("TE31B")}>TE31B</button>
      <button onClick={() => handleSelectGroup("TE21B")}>TE21B</button>
    </div>
  );
};

export default SelectGroup;
