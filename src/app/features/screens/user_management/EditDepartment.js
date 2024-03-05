import React, { useState, useEffect } from "react";
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Checkbox } from "primereact/checkbox";
const BASE_URL=process.env.REACT_APP_BASE_URL
const EditDepartment = ({rowData,setRefresh ,setEditDepartmentVisibility}) => {
  
  const [name, setName] = useState(rowData?.department);
  const [status, setStatus] = useState(rowData?.status);
  let toast = useRef(null); 
   
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `${BASE_URL}/api/deparments/updateDeparment`,
        {
          departmentId:rowData?._id,
          department: name,
          status: status,
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Department Configuration",
        detail: "Department updated successfully",
      });    
      setTimeout(() => {
        setEditDepartmentVisibility(false); 
        setRefresh(prev=>!prev)
    }, 1000);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update department",
      });
    }
  };

  return (
    <>
        <Toast ref={toast} />
        <form onSubmit={handleEdit}>
          <div className="flex flex-wrap mt-2">
          <div className="w-21rem mr-3 ">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="status" style={{ fontSize: "20px" }} className="mr-2">Status</label>
            <Checkbox  checked={status}  onChange={(e) => setStatus(e.target.checked)} />
          </div>
          </div>
        
          <Button label="Update" type="submit" className="w-10rem mt-3" />
        </form>
    
    </>
  );
};

export default EditDepartment;
