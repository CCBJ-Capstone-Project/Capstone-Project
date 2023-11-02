import { useState,useEffect } from "react"

const Register = (props) => {

  const [email, setEmail] = usestate('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('')
  const handleSubmit = () => {
    e.preventDefault();
    console.log(email);
  }

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input value={name}name="name"placeholder="full name"/>
      <label htmlFor="email">email</label>

      <input value = {email} onchange={(e) => setEmail(e.target.value)}/>
      <label htmlfor="password">password</label>
      <input value={pass} onChange={(e) => setPass(e.target.value)}/>
      <button type ="submit">Log In</button>
    </form>
    <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Don't have an account? Register here.</button>
    </div>
  )
}

export default Register;