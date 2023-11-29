import { useState, useEffect } from "react"
import { showAllUsers, showSingleUser } from "../api/usersUtils.js";
import { fetchReviews } from "../api/reviewsUtils.js";
import { useParams, useNavigate } from "react-router";
import Reviews from "./Reviews.jsx";

export default function SingleUserPage(){
   const nav= useNavigate();
   const [selectedUser, setSelectedUser] = useState(null);
   const [users, setUsers] = useState([]);
   const [reviews, setReviews] = useState([]);
   const [userReviews, setUserReviews] = useState([]);
   const { userId }= useParams();
   let loggedUser;
   if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      console.log('LoggedIn user info: ', loggedUser);
   }

   const getUsers = async () => {
      const usersArr = await showAllUsers();
      setUsers(usersArr);
   }

   const getReviews = async () => {
      const reviewsArr = await fetchReviews();
      filterUsersPosts(reviewsArr);
      setReviews(reviewsArr);
      // console.log(reviewsArr);
   }

   function filterUsersPosts(reviews){
      const filteredPost = reviews.filter((review) => review.author._id === userId);
      // console.log(filteredPost, "here should be the filtered review");
      setUserReviews(filteredPost);
   }

   async function displaySingleUser(){
      if(selectedUser){
         try {
            const result = await showSingleUser(selectedUser._id);
            // console.log('Selected User: ', result);
         } catch (error) {
            console.error(error);
         }
      }
   }

   function goToUpdatedUser(){
      nav(`/edit-user/${userId}`);
   };

   function logout(){
      sessionStorage.setItem('status', 'loggedOut');
      sessionStorage.setItem('user', null);
      nav('/');
   }

   useEffect(()=> {
      console.log('User ID from URL: ', userId);
      const user = users.find((user) => user._id === userId);
      setSelectedUser(user);
      // console.log('Selected User: ', user);
   }, [userId, users]);
   
   useEffect(() => {
      getReviews();
      getUsers();
      displaySingleUser();
   }, [])

   return(
      <>
         <div>
            {selectedUser ? (
               <div className="single-user-page">
                  <h1>{selectedUser.username}</h1>
                  <div className="single-user-feed" style={{
                     display: 'grid',
                     gridTemplateColumns: '1fr',
                     rowGap: '35px'
                  }}>
                     <Reviews reviews={userReviews}/>
                  </div>
                  {loggedUser ? (
                     // Check if loggedUser exists before comparing passwords
                     loggedUser.password === selectedUser.password ? (
                        <div className="users-buttons">
                           <button onClick={() => nav(`/new-review-form/${selectedUser._id}`)}>
                              Write Review
                           </button>
                           <button onClick={goToUpdatedUser}>
                              Update Your Info
                           </button>
                           <button onClick={logout}>
                              LogOut
                           </button>
                        </div>
                     ) : (
                        <p></p>
                     )
                  ) : (
                     <p>Please log in to perform actions.</p>
                  )}
               </div>
            ) : (
               <p>User Not Found</p>
            )}
         </div>
      </>
   )
}