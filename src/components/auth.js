import { useNavigate } from "react-router-dom";
import './Auth.css';

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <h2>Вход или регистрация</h2>
      <button onClick={() => navigate("/login")}>Войти</button>
      <button onClick={() => navigate("/register")}>Зарегистрироваться</button>
    </div>
  );
}
