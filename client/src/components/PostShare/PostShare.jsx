import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import ProfileImage from "../../img/profileImg.jpg";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER


  //image set function
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("okk",e.target.files[0]);
      let img = e.target.files[0];
      setImage(img);
      console.log("img is ", image);
    }

    
  };

  //handling image upload and postupload
  const handlesubmit = (e) => {
    e.preventDefault();
    const newpost = {
      userid: user._id,
      desc: desc.current.value,
    };
console.log("postshare image",image)
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newpost.Image = filename;
      console.log("newpost", newpost);
      try {
        
        dispatch(uploadImage(data));
        dispatch(uploadPost(newpost));
      } catch (error) {
        console.log(error);
      }
    }
    reset();
  };

  const reset = () => {
    setImage(null);
    desc.current.value = null;
  };

  return (
    <div className="PostShare">
      <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} alt="#" />

      <div>
        <input type="text" ref={desc} required placeholder="What's happening" />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={(e) => {
              handlesubmit(e);
            }}
          >
            Share
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={(e) => {
                onImageChange(e);
              }}
            ></input>
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => {
                setImage(null);
              }}
            ></UilTimes>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
