import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import axios from "axios";
const EditPreview = ({  data, handleUpdate  }) => {
    const [editedData, setEditedData] = useState({ ...data });
    console.log("edit data is",editedData)
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Make PUT request using Axios
    axios
      .put("api/web/update", editedData)
      .then((response) => {
        // Handle response
        console.log(response.data);
        // Redirect to the original page
        handleUpdate(editedData);
        navigate('/original-page');
    
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  
 

  return (
    <div className="card">
      <div>
        <h2>Edit Enrollment Details</h2>
        <div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={editedData.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={editedData.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
          <div>
            <label>DOB:</label>
            <input
              type="text"
              value={editedData.DOB}
              onChange={(e) => handleChange(e, "DOB")}
            />
          </div>
          <div>
            <label>SSN:</label>
            <input
              type="text"
              value={editedData.SSN}
              onChange={(e) => handleChange(e, "SSN")}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={editedData.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          {/* Add other fields here */}
        </div>
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default EditPreview;
