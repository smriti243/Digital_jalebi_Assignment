import React from 'react';
import './userPopup.css';

const UserPopup = ({ user, onClose, isDarkTheme }) => {
  if (!user) return null;

  const popupStyle = {
    position: 'fixed', 
    top: '10%', 
    left: '10%', 
    right: '10%', 
    backgroundColor: isDarkTheme ? '#2a2b2e' : '#ffffff',  
    zIndex: 1000, 
    border: '1px solid black', 
    padding: '20px', 
    overflowY: 'auto',
    maxHeight: '80vh', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    color: isDarkTheme ? '#cacaca' : '#737373'  
  };

  const gridStyle = {
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '10px', 
    width: '100%', 
    marginBottom: '20px'
  };

  const closeButtonStyle = {
    padding: '8px 16px', 
    backgroundColor: isDarkTheme ? '#d6606d' : '#cc4e5c', 
    color: '#fff', 
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={popupStyle}>
      <h1 style={{color: '#3acc73'}}>User Details</h1>
      <div style={gridStyle}>
       
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Department:</strong> {user.company.department}</p>
        <p><strong>Title:</strong> {user.company.title}</p>
        <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}</p>
        <p><strong>University:</strong> {user.university}</p>
        <p><strong>Birth Date:</strong> {user.birthDate}</p>
        <p><strong>IP Address:</strong> {user.ip}</p>
        <p><strong>MAC Address:</strong> {user.macAddress}</p>
        <p><strong>Browser:</strong> {user.userAgent}</p>
      </div>
      <button className='popup_closebtn' onClick={onClose} style={closeButtonStyle}>Close</button>
    </div>
  );
};

export default UserPopup;
