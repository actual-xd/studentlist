// src/App.js
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Login from './components/Login';
import Register from './components/Register';
import logo from './assets/guu_logo.png';

function App() {
  return (

  <Router>
      <div>
                       <img src={logo} style={{height: "50px"}}/>
                       </div>
      <Routes>

        <Route path="/" element={<StudentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students/new" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
      </Routes>
  </Router>

  );
}
export default App