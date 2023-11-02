import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { showAllUsers } from "../api/usersUtils";

export default function AllUsersPage({users, setUsers}){
  const nav = useNavigate();

  async function displayUsers(){
    const usersDisplay = await showAllUsers();
    setUsers(usersDisplay);
  }

useEffect(() => {
  displayUsers();
}, [])

  return (
    <>
      <h1>All Users Page</h1>
      <div>
        {
          users.map((user) => {
            return(
              <>
                <div key={user._id} className="user-container">
                  <h2>{user.username}</h2>

                  <button key= {user.id}
                  onClick={() => nav(`/users/${user._id}`)}>
                    See User Details
                  </button>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}