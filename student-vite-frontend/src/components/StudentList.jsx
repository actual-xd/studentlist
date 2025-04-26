import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudents = async () => {
          // Get token from localStorage
          const token = localStorage.getItem("token");

          // If no token, redirect to login
          if (!token) {
            navigate("/login");
            return;
          }

          try {
            // Make authenticated request with token in header
            const response = await axios.get("http://localhost:8080/api/students", {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            setStudents(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching students:", error);

            // Handle 401/403 errors (unauthorized/forbidden)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              // Token might be expired or invalid
              localStorage.removeItem("token");
              navigate("/login");
            } else {
              setError("Failed to fetch students. Please try again later.");
              setLoading(false);
            }
          }
        };

        fetchStudents();
      }, [navigate]);

      // Function to handle student deletion
      const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Вы уверены, что хотите удалить этого студента?")){

        try {
          await axios.delete(`http://localhost:8080/api/students/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Remove deleted student from state
          setStudents(students.filter(student => student.id !== id));
        } catch (error) {
          console.error("Error deleting student:", error);
          alert("Failed to delete student");
        }
      }};
// /*     axios.get("http://localhost:8080/api/students")
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setStudents(response.data);
//         } else {
//           console.error("Invalid data format:", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//         alert("Не удалось загрузить список студентов");
//       });
//   }; */

//   const handleDelete = (id) => {
//     if (window.confirm("Вы уверены, что хотите удалить этого студента?")) {
//       axios.delete(`http://localhost:8080/api/students/${id}`)
//         .then(() => {
//           // После успешного удаления обновляем список студентов
//           fetchStudents();
//         })
//         .catch((error) => {
//           console.error("Error deleting student:", error);
//           alert("Не удалось удалить студента");
//         });
//     }
//   };

  const handleEdit = (id) => {
      navigate(`/students/edit/${id}`);
  };


  return (

    <div className="table_container">

      <h1 className="text-center mb-4">Список студентов</h1>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Курс</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(student.id)}>
                    Редактировать
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Нет данных о студентах
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="student_add">
        <a href="/students/new" className="btn btn-primary">
          Добавить нового студента
        </a>
      </div>
    </div>
  );
};

export default StudentList;