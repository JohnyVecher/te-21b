import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import avatar from "./student.png"; // Путь к аватарке

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ firstName: "", lastName: "", group: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        setUser(userData.user);
        fetchProfile(userData.user.id);
      } else {
        navigate("/login");
      }
    };

    const fetchProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("StudentFirstN, StudentSecondN, group")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setProfile({
          firstName: data.StudentFirstN || "Неизвестно",
          lastName: data.StudentSecondN || "Неизвестно",
          group: data.group || "Не указана",
        });
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="profile-container1">
      <div className="profile-header1">
        <img src={avatar} alt="Аватар" className="profile-image" />
        <h2 className="profile-title">{profile.lastName} {profile.firstName}</h2>
      </div>

      <div className="Viktor">
        <div className="profile-card">
          <p className="profile-label">Email:</p>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="profile-card">
          <p className="profile-label">Группа:</p>
          <p className="profile-group">{profile.group}</p>
        </div>

        <button className="exit-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;
