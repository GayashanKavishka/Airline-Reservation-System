import React from 'react';
import './LogoutConfirmation.css';

const LogoutConfirmation = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <div className="logout-modal-header">
          <h3>Confirm Logout</h3>
        </div>
        <div className="logout-modal-body">
          <p>Are you sure you want to logout from the admin panel?</p>
        </div>
        <div className="logout-modal-footer">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
