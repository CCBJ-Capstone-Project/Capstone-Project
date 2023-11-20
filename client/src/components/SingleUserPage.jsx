import { useState, useEffect } from "react"
import { showAllUsers, showSingleUser } from "../api/usersUtils.js";
import { useParams, useNavigate } from "react-router";
import { fetchReviews } from "../api/reviewsUtils.js";
import Reviews from "./Reviews.jsx";

export default function SingleUserPage(){
   const nav= useNavigate();
   const [selectedUser, setSelectedUser] = useState(null);
   const [users, setUsers] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [userReviews, setUserReviews] = useState([]);
   const { userId }= useParams();

   const getUsers = async () => {
      const usersArr = await showAllUsers();
      setUsers(usersArr);
   }

   const getReviews = async () => {
      const reviewsArr = await fetchReviews();
      getUserReviews(reviewsArr);
      setReviews(reviewsArr);
   }

   function getUserReviews(reviews){
      const filteredReviews = reviews.filter((review) => review.author._id === userId);
      setUserReviews(filteredReviews);
      console.log(userReviews);
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

   function goToUpdatedUser(){
      nav(`/edit-user/${userId}`);
   };

   useEffect(()=> {
      console.log('User ID from URL: ', userId);
      const user = users.find((user) => user._id === userId);
      setSelectedUser(user);
      console.log('Selected User: ', user);
   }, [userId, users]);
   
   useEffect(() => {
      getUsers();
      getReviews();
      displaySingleUser();
   }, [])

   return(
      <>
         <div>
            {selectedUser ? (
               <>
                  <h1>{selectedUser.username}</h1>
                  <div style={{
                     display: 'grid',
                     gridTemplateColumns: '1fr',
                     rowGap: '35px'
                  }}>
                     <Reviews reviews={userReviews}/>
                  </div>
                  <div>
                     <button onClick={() => nav(`/new-review-form/${selectedUser._id}`)}>Write Review</button>
                  </div>
                  <div>
                     <button onClick={goToUpdatedUser}>Update Your Info</button> 
                  </div>
               </>
            ) : (
               <p>User Not Found</p>
            )}
         </div>
      </>
   )
}