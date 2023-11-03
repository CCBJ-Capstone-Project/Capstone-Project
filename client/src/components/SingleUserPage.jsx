import { useState, useEffect } from "react"
import { showSingleUser } from "../api/usersUtils";
import { useParams, useNavigate } from "react-router";

export default function SingleUserPage({users}){
 const nav= useNavigate();
 const {userId}= useParams();

 const singleUser = users.find((user) =>{
    return user._id == userId;
 })
 console.log(singleUser, "Here is a break");
 console.log(users, "here is break2");

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
    <div>
        <button onClick={() => nav(`/login/`)}>If new user please go to log in page!
        </button>
    </div>
    </>
 )
}