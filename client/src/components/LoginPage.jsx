import { useState } from "react"

export default function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
   
 const handleSubmit = () => {
 e.preventDefault();
 console.log(email);
 }

  return(
    <div className="auth-form-container">
      <h2>Login</h2>
    <form onSubmit= {handleSubmit}>
    <label htmlFor="email">email</label>
     <input value = {email} onchange={(e) => setEmail(e.target.value)}/>
     <label htmlfor="password">password</label>
     <input value={pass} onChange={(e) => setPass(e.target.value)}/>
     <button type ="submit">Log In</button>
    </form>
    <button onClick={props.onFormSwitch}>Don't have an account? Register here.</button>
    </div>
  )
}

