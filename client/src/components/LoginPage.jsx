import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { showAllUsers } from "../api/usersUtils";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  const getUsers = async () => {
    const usersArr = await showAllUsers();
    setUsers(usersArr);
  }

  const isAuthenticated = () =>{
    let authUser = null;
    for(let i=0; i<users.length; i++){
      if(users[i].username===username && users[i].password===password){
        authUser = users[i];
      }
    }
    if(authUser!==null){
      console.log('Authorized user: ', authUser);
    }else{
      alert('Incorrect Username or Password!')
      return authUser;
    }
    return authUser;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const loggedUser = isAuthenticated();
    if(loggedUser!==null){
      sessionStorage.setItem('status', 'loggedIn');
      sessionStorage.setItem('user', JSON.stringify(loggedUser));
      const authenticatedUser = JSON.parse(sessionStorage.user);
      console.log('LoggedIn User Info: ', authenticatedUser);
      console.log(authenticatedUser.username);
      nav(`/`);
    }
  }

  const goToRegister = () => {
    nav("/register")
  }

  useEffect(() => {
    getUsers();
  }, [])

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
