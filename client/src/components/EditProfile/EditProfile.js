import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [livesIn, setLivesIn] = useState('');
  const [worksAt, setWorksAt] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverPicChange = (e) => {
    setCoverPic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profilePic">Profile Picture</label>
            <input type="file" id="profilePic" onChange={handleProfilePicChange} />
            {profilePic && <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />}
          </div>
          <div className="form-group">
            <label htmlFor="coverPic">Cover Picture</label>
            <input type="file" id="coverPic" onChange={handleCoverPicChange} />
            {coverPic && <img src={coverPic} alt="Cover Preview" className="cover-pic-preview" />}
          </div>
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