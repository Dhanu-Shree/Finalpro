
import {useState} from 'react'; 
import '../App.css' 
import { useNavigate} from 'react-router-dom'
import axios from 'axios' 

const Login = () => { 
const[userid,setUserid]=useState("") 
const[username,setUserName]=useState("")
const[role,setRole]=useState("")
const[password,setPassword]=useState("") 
const navigate = useNavigate();

const handleSubmit = async(e)=>{ 
    e.preventDefault() ;
  try {
        const response = await axios.post('http://localhost:5000/login', {
          username,
          userid,
          role,
          password,
        });
        console.log(response.data);
  
        // Navigate to the respective role page based on the selected role
        if (role === 'admin') {
          navigate('/coursecard');
        } else if (role === 'trainee') {
          navigate('/trainee');
        } else if (role === 'intern') {
          navigate('/intern');
        }
        }
       catch (error) {
        console.error('Error during login:', error);
        // Handle error as needed
      }
    };

    return ( <div className='createuser-container'> 

<form className='form-container' onSubmit={handleSubmit}> 
<h2>Login</h2> 
<label htmlFor='userid'>Userid:</label> 
<input type='text' value={userid} placeholder='User_Id' 
    onChange={(e)=>setUserid(e.target.value)}/> 

<label htmlFor='username'>Name:</label> 
<input type='text' value={username} placeholder='Name' 
  onChange={(e)=>setUserName(e.target.value)}/> 

<label htmlFor="role">Role:</label>
<select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="admin">Admin</option>
  <option value="trainee">Trainee</option>
  <option value="intern">Intern</option>
</select>

<label htmlFor='password'> Password:</label> 
<input type="text" 
value={password}
placeholder='Password' 
onChange={(e)=>setPassword(e.target.value)}/> 

<div className="button-container">
          <button type="submit">Login</button>
          <button type="submit">Signup</button>
        </div> </form> </div> ) }; 

export default Login;