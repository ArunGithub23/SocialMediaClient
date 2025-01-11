import React, { useState } from 'react';
import './EditProfile.css';
import { useSelector } from 'react-redux';

const EditProfile = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [livesIn, setLivesIn] = useState('');
  const [worksAt, setWorksAt] = useState('');
  const [relationship, setRelationship] = useState('');
  const {user}=useSelector((state)=>state.authReducer.authData)
    const userid=user._id

  const BaseUrl = process.env.REACT_APP_BaseUrl1;


  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverPicChange = (e) => {
    setCoverPic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const url = `${BaseUrl}/user/updateuser`;

    const formData = {userid ,name, about, livesIn, worksAt, relationship};
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the API returns JSON
    console.log('Update successful:', data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
  };

 const handleProfileSubmit=(e)=>{
    e.preventDefault();
    console.log("profilePic");
    
    
  }

  const resetForm = () => {
    setProfilePic(null);
    setCoverPic(null);
    setName('');
    setAbout('');
    setLivesIn('');
    setWorksAt('');
    setRelationship('');
  }
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={()=>{onClose();resetForm()}}>×</button>
        <h2>Edit Profile</h2>


        <form onSubmit={handleProfileSubmit}>
        <div className="form-group">
            <label htmlFor="profilePic">Profile Picture</label>
            <input type="file" id="profilePic" onChange={handleProfilePicChange} />
            {profilePic && <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />}
          </div>
          <button type="submit" className="submit-button">Save Profile</button>

        </form>
        
        <form onSubmit={handleSubmit}>
          
          {/* <div className="form-group">
            <label htmlFor="coverPic">Cover Picture</label>
            <input type="file" id="coverPic" onChange={handleCoverPicChange} />
            {coverPic && <img src={coverPic} alt="Cover Preview" className="cover-pic-preview" />}
          </div> */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label htmlFor="about">About</label>
            <textarea id="about" maxLength={50} value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="livesIn">Lives In</label>
            <input type="text" id="livesIn" value={livesIn} onChange={(e) => setLivesIn(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="worksAt">Works At</label>
            <input type="text" id="worksAt" value={worksAt} onChange={(e) => setWorksAt(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="relationship">Relationship</label>
            <input type="text" id="relationship" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;