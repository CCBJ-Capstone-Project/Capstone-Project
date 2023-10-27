import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function AllUsersPage({users}){
    const nav = useNavigate();

    return (
        <>
        <h1>All users Page</h1>
        <div>
        {
            users.map((user) =>{
                return(
                    <>
                    <div key={user.id} classname="user-container">
                        <h2>{user.name}</h2>

                        <button key= {user.id}
                        onClick={() => nav(`/users/${user.id}`)}>
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