import { useState, useEffect } from "react"
import { createUser, showAllUsers } from "../api/usersUtils";
import { useNavigate } from "react-router-dom";

export default function Register () {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const getUsers = async () => {
    const usersArr = await showAllUsers();
    setUsers(usersArr);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirm){
      alert("Passwords must match!")
      return;
    }
    
    try {
      const newUser = await createUser(username, password);
      console.log(newUser);

      const newUsersArr = [...users, newUser];
      setUsers(newUsersArr);

      setUsername('');
      setPassword('');
      setConfirm('');
      nav('/users');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-row">
            <p className="form-label">Username:</p>
            <input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)}/>
          </label>
        </div>
        <div>
          <label className="form-row">
            <p className="form-label">Password:</p>
            <input type = "password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        <div>
          <label className="form-row">
            <p className="form-label">Confirm Password:</p>
            <input type = "password" value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
          </label>
        </div>
        <button type ="submit">Create Account</button>
      </form>
    </div>
  )
}