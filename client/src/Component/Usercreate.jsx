import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const CreateUser = () => {
  const [userid, setUserid] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const[dob,setDob]=useState("")
  const [password, setPassword] = useState("");
  const[role,setRole]=useState("")
  const[state,setState]=useState("")
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new user
      const res = await axios.post("http://localhost:5000/usercreate", {
        userid,
        username,
        role,
        email,
        password,
        dob,
        state
      });

      // Assuming the server sends an email with a link to reset password
      // You can customize the email content and include the reset link
      const resetLink = `http://localhost:5000/reset-password?userid=${userid}`;
      console.log(`Reset password link: ${resetLink}`);

      // Handle the email sending logic here (e.g., using a third-party email service)

      console.log(res.data);

      // Navigate to the login page after successful user creation
      navigate("/"); // Change the route to the login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createuser-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <label htmlFor="userid">Userid:</label>
        <input
          type="text"
          value={userid}
          placeholder="User_Id"
          onChange={(e) => setUserid(e.target.value)}
        />
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          value={username}
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="role">Role:</label>
<select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="admin">Admin</option>
  <option value="trainee">Trainee</option>
  <option value="intern">Intern</option>
</select>
<label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          value={dob} 
          placeholder=""
          onChange={(e) => setDob(e.target.value)}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          value={state}
          placeholder="state"
          onChange={(e) => setState(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
