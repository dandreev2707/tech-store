import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated, username: authUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      const success = login(username, password);
      if (success) {
        navigate("/profile");
      } else {
        setErrorMessage("Неверное имя пользователя или пароль");
      }
    } else {
      setErrorMessage("Заполните все поля");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isAuthenticated ? `Добро пожаловать, ${authUsername}` : "Войти"}</h1>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
        {!isAuthenticated ? (
          <>
            <input
              type="text"
              placeholder="Введите имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login-button">
              Войти
            </button>
            <p className="register-link">
          Если у вас нет аккаунта, {" "}
          <span onClick={() => navigate("/register")}>зарегистрируйтесь</span>
        </p>
          </>
        ) : (
          <button onClick={() => navigate("/profile")} className="login-button">
            Личный кабинет
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
