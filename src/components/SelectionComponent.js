// ProfileSelection.js, CourseSelection.js, GroupSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Selection.css';

const SelectionComponent = ({ header, options, navigateTo }) => {
  const navigate = useNavigate();

  const handleSelect = (option) => {
    // Логика выбора может быть уникальной для каждого компонента
    navigate(navigateTo);
  };

  return (
    <div className="selection-container">
      <h2 className="selection-header">{header}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          className="selection-button"
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SelectionComponent;
