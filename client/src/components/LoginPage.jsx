import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  }

  const goToRegister = () => {
    nav("/register")
  }

  return(
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit= {handleSubmit}>
        <div>
          <label className="form-row">
            <p className="form-label">Username:</p>
            <input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
        </div>
        <div>
          <label className="form-row">
            <p className="form-label">Password:</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        <button className="login-button" type="submit">Log In</button>
      </form>
      <button className="login-button" onClick={goToRegister}>Don't have an account? Register here.</button> 
    </div>
  )
}
