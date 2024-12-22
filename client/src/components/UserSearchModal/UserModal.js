import React, { useEffect, useState } from "react";
import "./UserModal.css"; // Include basic CSS for styling the modal
import { useDispatch, useSelector } from "react-redux";
import { UpdateSelectedUser } from '../../actions/AuthAction'


const UserModal = ( props ) => {


    let [users,setusers]=useState([])
    const [onClose,setonClose]=useState()
    // const [searchinput1,setsearchinput1]=useState(props.data.searchinput)
    const currentUserId= useSelector((state)=>state.authReducer.authData.user._id)
    const BaseUrl=process.env.REACT_APP_BaseUrl1
    const dispatch = useDispatch();
    let selecteduser=useSelector((state) => state.authReducer.selecteduser)
  

    
    // console.log('testssss123',searchinput1,onClose);



useEffect(()=>{
    // console.log('searchinput useeffect',searchinput1);

    searchUsers(props.data.searchinput)
    setonClose(props.data.isOpen)
    
    

},[props])

        const searchUsers = async (searchString) => {
            try {
                // console.log("searchString is",searchString);
                
              const response = await fetch(`${BaseUrl}/user/searchuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchString }),
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const data = await response.json();
              
              // Extract only firstname and username
              const users1 = data.map(user => ({
                firstname: user.firstname,
                username: user.username,
                id:user._id
              }));

              setusers(users1)
          
            //   console.log("search reas",users);
              return users;
            } catch (error) {
              console.error("Error fetching users:", error);
              return [];
            }
          };
          
         

        //onfollow
        const onFollow=async (usertofollow)=>{
                console.log("usertofollow",usertofollow);
                
            try {
              const response = await fetch(`${BaseUrl}/user/${usertofollow}/follow`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({currentUserId}),
              });
        
              console.log("user followed....",await response.json());
              
            } catch (error) {
              
            }
          }

          const setSelecteduser=(selecteduserId)=>{
              // console.log('selecteduserId after click',selecteduserId);
              
              dispatch(UpdateSelectedUser(selecteduserId))
            }
          

//   if (!isOpen) return null;

  return (
    ( onClose ?
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={()=>{setonClose(false)}}>
          ×
        </button>
        <h4>Search Results </h4>
        {users.length > 0 ? (
          <ul className="user-list">
            {users.map((user) => {
                console.log("user.firstname",user.firstname);
                
                return(
              <li key={user.id} className="user-item"  onClick={(e)=>{if(selecteduser!=user?.id){setSelecteduser(user?.id)}else{setSelecteduser(currentUserId)}; // Check the current background color of the clicked element
              const currentColor = e.currentTarget.style.background;
          
              // Reset all followers' background to white
              document.querySelectorAll(".user-item").forEach((el) => {
                el.style.background = "white";
              });
          
              // Toggle the background color for the clicked follower
              e.currentTarget.style.background = currentColor ===   "white" ?"rgb(184, 146, 64)": "white";
    }} 
              
              >
                <img src={user.image} alt={user.username} className="user-image" />
                <div className="user-details" style={{color:'black'}}>
                  <p><strong style={{color:'black'}}>{user.firstname}</strong></p>
                  <p>@{user.username}</p>
                </div>
                <button className="follow-btn" onClick={() => onFollow(user.id)}>
                  Follow
                </button>
              </li>
                )
   }   )}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
    : null
    )
  );
};



export default UserModal;