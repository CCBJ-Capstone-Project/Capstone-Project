import { useState, useEffect } from "react"
import { showSingleUser } from "../api/usersUtils";
import { useParams, useNavigate } from "react-router";

export default function singleUserPage({users}){
 const nav= useNavigate();
 const {usersId}= useParams();

 const singleUser = users.find((user) =>{
    return user._id == usersId;
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
    <h1>{singleUser.name}</h1>
    <div>
        <button onClick={() => nav(`/login/`)}>If new user please go to log in page!
        </button>
    </div>
    </>
 )
}