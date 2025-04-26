import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });
      localStorage.setItem("token", response.data);

      navigate("/"); // Перенаправляем на защищенную страницу
    } catch (error) {
      console.error("Login failed:", error);
      alert("Неверные учетные данные!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Вход в систему</h1>
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
          <label htmlFor="password" className="form-label">Пароль:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Войти</button>
      </form>
      <div className="mt-3 text-center">
        <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
      </div>
    </div>
  );
};

export default Login;