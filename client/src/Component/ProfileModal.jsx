import React from 'react';
import Modal from 'react-modal';

const ProfileModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Profile Modal"
    >
      <h2>Profile Details</h2>
      {/* Add your profile details here */}
      <p>Username: JohnDoe</p>
      <p>Email: johndoe@example.com</p>
      {/* Add more profile details as needed */}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ProfileModal;
