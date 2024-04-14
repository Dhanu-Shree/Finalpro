import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Login.css';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Fetch intern data
      const internResponse = await axios.get('http://localhost:5000/api/intern');
      const internData = internResponse.data;

      // Fetch employee data
      const employeeResponse = await axios.get('http://localhost:5000/api/employee');
      const employeeData = employeeResponse.data;

      // Fetch trainee data
      const traineeResponse = await axios.get('http://localhost:5000/api/trainee');
      const traineeData = traineeResponse.data;

      // Combine all user data from different collections
      const allUserData = [...internData, ...employeeData, ...traineeData];

      // Check if the entered login details match any user
      localStorage.setItem("userName", username);
      localStorage.setItem("userId", userid);
      localStorage.setItem("Role", role);

      const isValidUser = allUserData.some((user) => {
        return user.id === userid && user.name === username && user.password === password;
      });

      if (isValidUser) {
        console.log('Matched');
        // Display a toast message for successful login
        toast.success("Logged in!");

        // Navigate to the respective page based on the selected role
        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'trainee':
            navigate('/trainee');
            break;
          case 'intern':
            navigate('/intern');
            break;
          case 'employee':
            navigate('/employee');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        // Display a toast message for invalid login
        toast.error("Invalid!");
        console.log('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="createuser-container">
      {/* Include ToastContainer at the top level of your application */}
      <ToastContainer />

      <form className="form-container">
        <h2>Login</h2>
        <div className="input-container">
          <label htmlFor="userid">Userid:</label>
          <input
            type="text"
            value={userid}
            placeholder="User Id"
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-container select">
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="trainee">Trainee</option>
            <option value="intern">Intern</option>
            <option value='employee'>Employee</option>
          </select>
        </div>
<br>
</br>
        <div className="button-container">
          <button type="submit" onClick={handleClick}>Login</button>
        </div>
        <h3 style={{ color: 'black', textAlign: 'center' }}>.. Welcome To Newwave ..</h3>
      </form>
    </div>
  );
};

export default Login;
