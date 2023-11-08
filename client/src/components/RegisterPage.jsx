import { useState,useEffect } from "react"

export default function Register (props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
    <form onSubmit={handleSubmit}>
    <label>email
      <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
    </label>
    <label >password
      <input type = "password" value={pass} onChange={(e) => setPass(e.target.value)}/>
    </label>
      <button type ="submit">Log In</button>
    </form>
    </div>
  )
}