import { useState } from "react";
import "./Usercreate.css";
import axios from "axios";; // Import the useNavigate hook

const CreateUser = () => {
  const [userid, setUserid] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const[dob,setDob]=useState("")
  const [password, setPassword] = useState("");
  const[role,setRole]=useState("")
  const[state,setState]=useState("")
   // Initialize the useNavigate hook

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
      console.log('Role : ', role);

     console.log(res)

      // Navigate to the login page after successful user cre // Change the route to the login page
    } catch (error) {
      console.log(error);
    }
  };

  console.log('Role : ', role);
  
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
