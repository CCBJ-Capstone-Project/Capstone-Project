import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  const goToRegister = () => {
    nav("/register")
  }

  return(
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit= {handleSubmit}>
        <label>Username: 
          <input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>Password: 
          <input type = "password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type ="submit">Log In</button>
      </form>
      <button onClick={goToRegister}>Don't have an account? Register here.</button> 
    </div>
  )
}
