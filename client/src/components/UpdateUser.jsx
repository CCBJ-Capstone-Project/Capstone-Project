import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { updateUser } from "../api/usersUtils";

export default function UpdateUserPage({users}){
    const { userId } = useParams();
    const [updatedUserName, setUpdatedUserName] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const nav = useNavigate();

    async function editUser(e){
      e.preventDefault();
      try{
        const result = await updateUser(userId, updatedUserName, updatedPassword)
        console.log(`User with id: ${userId} has been updated!`);
        sessionStorage.user = JSON.stringify(result);
        setUpdatedUserName('');
        setUpdatedPassword('');
        nav(`/users/${userId}`);
        return result;
      }catch (error){
        console.error("Error updating user: ", error)
      }
    }

    return(
      <>
        <h1>Update User</h1>
        <form method="PATCH">
          <label>
            Username: 
            <input type="text" value={updatedUserName} onChange={(e) => {
              setUpdatedUserName(e.target.value);
            }}/>
          </label>
          <label>
            Password:
            <input type="text" value={updatedPassword} onChange={(e) => {
              setUpdatedPassword(e.target.value);
            }}/>
          </label>
          <button onClick={editUser}>Update User</button>
        </form>
      </>
    )
}