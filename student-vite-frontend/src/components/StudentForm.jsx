import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
    const [student, setStudent] = useState({ id: undefined, name: "", email: "", course: ""});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
const fetchStudent = async () => {
      // Если id не указан, значит это создание нового студента
      if (!id) return;

      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        const response = await axios.get(`http://localhost:8080/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error);

        // Обработка ошибок аутентификации
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Не удалось загрузить данные студента");
          setLoading(false);
        }
      }
    };

    fetchStudent();
  }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
          if (id) {
            // Режим редактирования
            await axios.put(`http://localhost:8080/api/students/${id}`, student, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          } else {
            // Режим создания
            await axios.post("http://localhost:8080/api/students", student, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          }

          // После успешного сохранения переходим к списку студентов
          navigate("/");
        } catch (error) {
          console.error("Error saving student:", error);

          // Обработка ошибок аутентификации
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError("Не удалось сохранить данные студента");
            setLoading(false);
          }
        }
      };

      // Если идет загрузка, показываем индикатор
      if (loading && id) {
        return <div className="text-center mt-5">Загрузка...</div>;
      }

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">
          {student.id ? "Редактировать студента" : "Добавить нового студента"}
        </h1>

        <form onSubmit={handleSubmit} className="student_form">
          <input type="hidden" name="id" value={student.id} />

          <div className="mb-3">
            <label htmlFor="name" className="form_label">Имя:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form_label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
              <label htmlFor="course" className="form_label">Курс:</label>
              <input
                type="text"
                id="course"
                name="course"
                value={student.course}
                onChange={handleChange}
                className="form-control"
                required
              />
          </div>

          <div className="text_center">
            <button type="submit" className="btn btn-success me-2">
              Сохранить
            </button>
            <a href="/"  className="btn btn-secondary">
              Отмена
            </a>

          </div>
        </form>
      </div>
    );
};

export default StudentForm;