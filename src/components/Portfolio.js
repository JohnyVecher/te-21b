import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Portfolio.css";

const Portfolio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ firstName: "", lastName: "" });
  const [subjects, setSubjects] = useState({ passed: [], notPassed: [] });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data: userData } = await supabase.auth.getUser();
        
        if (!userData?.user) {
          navigate("/login");
          return;
        }

        setUser(userData.user);

        const { data, error } = await supabase
          .from("profiles")
          .select("StudentFirstN, StudentSecondN")
          .eq("id", userData.user.id)
          .single();

        if (error || !data) {
          throw new Error(error?.message || "Профиль не найден");
        }

        const userProfile = {
          firstName: data.StudentFirstN?.trim() || "Неизвестно",
          lastName: data.StudentSecondN?.trim() || "Неизвестно",
        };

        setProfile(userProfile);
        await fetchSubjects(userProfile.firstName, userProfile.lastName);
      } catch (error) {
        console.error("Ошибка:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubjects = async (firstName, lastName) => {
      try {
        const response = await axios.get(
          "https://portfolioreader.onrender.com/user-subjects",
          {
            params: { firstName, lastName },
            timeout: 10000,
            validateStatus: (status) => status >= 200 && status < 500
          }
        );

        if (response.status !== 200) {
          throw new Error(response.data?.error || `Ошибка ${response.status}`);
        }

        setSubjects(response.data || { passed: [], notPassed: [] });
      } catch (error) {
        console.error("Ошибка при получении предметов:", error);
        setErrorMessage(
          error.response?.data?.error || 
          error.message || 
          "Ошибка соединения с сервером"
        );
        setSubjects({ passed: [], notPassed: [] });
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) return <div className="loading-animation">Загрузка...</div>;
  
  if (errorMessage) return (
    <div className="error-container">
      <div className="error-card">
        <h3>Произошла ошибка 😕</h3>
        <p>{errorMessage}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );

  return (
  <div className="portfolio-container">
    <header className="portfolio-header">
      <h1>Учебное портфолио</h1>
    </header>

      <div className="profile-card">
        <div className="avatar">{profile.firstName[0]}{profile.lastName[0]}</div>
        <h2 className="user-name">
          {profile.lastName} {profile.firstName}
        </h2>
      </div>

      <div className="subjects-grid">
        <div className="subject-category passed">
          <h3>Сдано предметов: {subjects.passed.length}</h3>
          {subjects.passed.length > 0 ? (
            <ul className="subject-list">
              {subjects.passed.map((subject, index) => (
                <li key={index} className="subject-item">
                  {subject}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Нет сданных предметов</p>
          )}
        </div>

        <div className="subject-category not-passed">
          <h3>В процессе: {subjects.notPassed.length}</h3>
          {subjects.notPassed.length > 0 ? (
            <ul className="subject-list">
              {subjects.notPassed.map((subject, index) => (
                <li key={index} className="subject-item">
                  {subject}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">Все предметы сданы!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;