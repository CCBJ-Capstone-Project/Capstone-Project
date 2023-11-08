import { useState, useEffect } from "react"
import { showAllUsers, showSingleUser } from "../api/usersUtils.js";
import { useParams, useNavigate } from "react-router";

export default function SingleUserPage(){
   const nav= useNavigate();
   const [selectedUser, setSelectedUser] = useState(null);
   const [users, setUsers] = useState([]);
   const { userId }= useParams();

   const getUsers = async () => {
      const usersArr = await showAllUsers();
      setUsers(usersArr);
   }

   async function displaySingleUser(){
      if(selectedUser){
         try {
            const result = await showSingleUser(selectedUser._id);
            console.log('Selected User: ', result);
         } catch (error) {
            console.error(error);
         }
      }
   }

   useEffect(()=> {
      console.log('User ID from URL: ', userId);
      const user = users.find((user) => user._id === userId);
      setSelectedUser(user);
      console.log('Selected User: ', user);
   }, [userId, users]);
   
   useEffect(() => {
      getUsers();
      displaySingleUser();
   }, [])

   return(
      <>
         <div>
            {selectedUser ? (
               <>
                  <h1>{selectedUser.username}</h1>
                  <h3>Post Count: {selectedUser.postCount}</h3>
                  <div>
                     <button onClick={() => nav(`/new-review-form/${selectedUser._id}`)}>Write Review</button>
                  </div>
               </>
            ) : (
               <p>User Not Found</p>
            )}
         </div>
      </>
   )
}