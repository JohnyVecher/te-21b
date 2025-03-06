import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToSchedule = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    if (savedGroup) {
      navigate(`/${savedGroup}`);
    } else {
      navigate("/profile"); // Если группа не выбрана, отправляем в личный кабинет
    }
  }, [navigate]);

  return null;
};

export default RedirectToSchedule;
