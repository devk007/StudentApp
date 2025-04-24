import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './components/Registeration/Registeration';
import Login from './components/Login/Login';
import StudentAdmin from './components/studentAdmin/studentAdmin';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <h1>Welcome to Our App</h1>

                <nav>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/student-admin" className="nav-link">Student Admin</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<h2>Please select an option from the menu above.</h2>} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<h2>Dashboard</h2>} />
                    <Route path="/student-admin" element={<StudentAdmin />} />
                </Routes>

            </div>
        </Router>
    );
};

export default App;
