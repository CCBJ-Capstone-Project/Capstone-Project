import { useState, useEffect } from "react"
import { showSingleUser } from "../api/usersUtils.js";
import { useParams, useNavigate } from "react-router";

export default function SingleUserPage({users}){
   const nav= useNavigate();
   const { userId }= useParams();

   const singleUser = users.find((user) =>{
      return user._id == userId;
   })

   async function displaySingleUser(){
      const result = await showSingleUser(singleUser._id);
      console.log("Single user info:", result);
      return result;
   }
  
   useEffect(()=> {
      displaySingleUser();
   }, []);
  
   return(
      <>
      <h1>{singleUser.username}</h1>
      <h3>Post Count: {singleUser.postCount}</h3>
      <div>
         <button onClick={() => nav(`/new-review-form/${singleUser._id}`)}>Write Review
         </button>
      </div>
      </>
   )
}