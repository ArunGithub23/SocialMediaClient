import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Followers } from "../../Data/FollowersData";
import { all } from "axios";
import { UpdateSelectedUser } from "../../actions/AuthAction";

const FollowersCard = () => {
  let [followers, setFollowers] = useState([]);
  let [followerinfo, setfollowerinfo] = useState([
    { name: "Andrew Thomas", username: "AndrewThomas", img: "" },
  ]);
  const currentUserId = useSelector((state) => state.authReducer.authData.user._id );

  const dispatch = useDispatch();
  let selecteduser = useSelector((state) => state.authReducer.selecteduser);
  const BaseUrl = process.env.REACT_APP_BaseUrl1;
  let showlistof = useSelector((state) => state.authReducer.showlistof);

  console.log("showlistof testtt", showlistof);

  // followers=useSelector((state)=>state.authReducer.authData  .user.following)

  const following = useSelector(
    (state) => state.authReducer.authData.user.following
  );
  const followersFromStore = useSelector(
    (state) => state.authReducer.authData.user.followers
  );

  useEffect(() => {
    if (showlistof == "following") {
      console.log("testttt");

      setFollowers(followersFromStore);
    } else {
      console.log("testttt123");

      setFollowers(following);
    }
    fetchAllUsers();
  }, [showlistof, selecteduser]);

  async function fetchAllUsers() {
    try {
      const response = await fetch(`${BaseUrl}/user/allusers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const result = await response.json();
      // console.log('Fetched users:', result);
      // let followerinfo1=[]
      // Map and filter users
      const followerInfoList = result
        .filter((user) => followers.includes(user._id))
        .map((user) => ({
          username: user.username,
          firstname: user.firstname,
          img: "",
          id: user._id,
        }));
      console.log("info", followerInfoList);
      setfollowerinfo(followerInfoList);
      return result;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // follow

  const follow = async (usertofollow) => {
    try {
      const response = await fetch(`${BaseUrl}/user/${usertofollow}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId }),
      });

      // console.log("user followed....",response.json());
    } catch (error) {}
  };

  //setShowPostFor selected user

  const setSelecteduser = (selecteduserId) => {
    // console.log('selecteduserId after click',selecteduserId);

    dispatch(UpdateSelectedUser(selecteduserId));
  };

  return (
    <div className="FollowersCardMain">
      <h3>See Your {showlistof}</h3>

      <div className="FollowersCard">
        {console.log("testinfo2", followerinfo)}

        {followerinfo.map((follower, id) => {
          

          return (
            <div
              key={followerinfo?.id}
              className="follower"
              onClick={(e) => {
                if (selecteduser != follower?.id) {
                  setSelecteduser(follower?.id);
                } else {
                  setSelecteduser(currentUserId);
                }

                const currentColor = e.currentTarget.style.background;
                document.querySelectorAll(".follower").forEach((el) => {
                  el.style.background = "white";
                });
                e.currentTarget.style.background =
                  currentColor === "white" ? "rgb(184, 146, 64)" : "white";
              }}
            >
              <div>
                <img src={follower?.img} alt="#" className="followerImg" />
                <div className="name">
                  <span>{follower?.firstname}</span>
                  <span>@{follower?.username}</span>
                </div>
              </div>

              <button
                className="button fc-button"
                onClick={() => {
                  follow(follower.id);
                }}
              >
                Follow
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowersCard;
