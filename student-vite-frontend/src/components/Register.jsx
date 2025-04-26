import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        email
      });

      // Сохраняем токен
      localStorage.setItem("token", response.data.token);

      // Можно также сохранить дополнительную информацию о пользователе
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      // Перенаправляем на защищенную страницу
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      // Более детальная обработка ошибок
      if (error.response && error.response.data) {
        alert(`Ошибка регистрации: ${error.response.data.message || "Пользователь с таким именем уже существует"}`);
      } else {
        alert("Ошибка при регистрации. Пожалуйста, попробуйте позже.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Регистрация</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Логин:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Пароль:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Зарегистрироваться</button>

        <div className="mt-3 text-center">
          <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;