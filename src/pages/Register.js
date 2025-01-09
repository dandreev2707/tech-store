import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [fio, setFio] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const newErrors = {};
    if (!fio) newErrors.fio = "Поле ФИО обязательно для заполнения";
    if (!birthdate || !isValidDate(birthdate)) newErrors.birthdate = "Некорректная дата рождения";
    if (!username) newErrors.username = "Поле Имя пользователя обязательно для заполнения";
    if (!password) newErrors.password = "Поле Пароль обязательно для заполнения";

    if (Object.keys(newErrors).length === 0) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (storedUsers.some((u) => u.username === username)) {
        newErrors.username = "Имя пользователя уже занято";
        setErrors(newErrors);
        return;
      }

      const newUser = { fio, birthdate, username, password };
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

      setSuccessMessage("Регистрация прошла успешно! Перенаправляем на страницу авторизации...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.getFullYear() <= currentYear &&
      currentYear - date.getFullYear() <= 100
    );
  };

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    switch (field) {
      case "fio":
        setFio(value);
        break;
      case "birthdate":
        setBirthdate(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Регистрация</h1>
        {successMessage && <p className="success-text">{successMessage}</p>}

        <input
          type="text"
          placeholder="Введите ФИО"
          value={fio}
          onChange={(e) => handleInputChange("fio", e.target.value)}
          className={errors.fio ? "input-error" : ""}
        />
        {errors.fio && <p className="error-text">{errors.fio}</p>}

        <input
          type="date"
          placeholder="Дата рождения"
          value={birthdate}
          onChange={(e) => handleInputChange("birthdate", e.target.value)}
          className={errors.birthdate ? "input-error" : ""}
        />
        {errors.birthdate && <p className="error-text">{errors.birthdate}</p>}

        <input
          type="text"
          placeholder="Введите имя пользователя"
          value={username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          className={errors.username ? "input-error" : ""}
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button onClick={handleRegister} className="register-button">
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default Register;
