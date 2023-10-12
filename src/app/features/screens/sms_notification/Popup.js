// Popup.js (Create this component)
import React from "react";

const Popup = ({ templateBody, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        <div>{templateBody}</div>
      </div>
    </div>
  );
};

export default Popup;
