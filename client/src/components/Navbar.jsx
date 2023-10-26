import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export default function Navbar(){

  return(
    <div className="navbar">
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/reviews'>Reviews</Link>
    </div>
  )
}