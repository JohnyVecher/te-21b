import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [StudentSecondName, setStudentSecondName] = useState("");
  const [StudentFirstName, setStudentFirstName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || !StudentFirstName || !StudentSecondName || !selectedGroup) {
      setError("Заполните все поля!");
      setLoading(false);
      return;
    }

    // 1. Регистрируем пользователя
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      console.log("✅ Пользователь зарегистрирован:", data.user);

      // 2. Создаем профиль в таблице `profiles`
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id, // ID пользователя
            email,
            group: selectedGroup,
            StudentSecondN: StudentSecondName,
            StudentFirstN: StudentFirstName,
          },
        ]);

      if (profileError) {
        console.error("❌ Ошибка при создании профиля:", profileError.message);
        setError("Ошибка при создании профиля.");
      } else {
        console.log("✅ Профиль успешно создан");
        alert("Регистрация успешна! Подтвердите email.");
        navigate("/profile");
      }
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={StudentSecondName}
          onChange={(e) => setStudentSecondName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Имя"
          value={StudentFirstName}
          onChange={(e) => setStudentFirstName(e.target.value)}
          required
        />
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          required
        >
          <option value="" disabled>Выберите группу</option>
          <option value="TE31B">TE31B</option>
          <option value="TE21B">TE21B</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <p>
        Уже есть аккаунт? <a href="/login">Войти</a>
      </p>
    </div>
  );
};

export default Register;
