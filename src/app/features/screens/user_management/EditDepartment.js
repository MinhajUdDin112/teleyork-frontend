import React, { useState, useEffect } from "react";
import Axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import BASE_URL from "../../../../config";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import { Checkbox } from "primereact/checkbox";

const EditDepartment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  let toast = useRef(null);

  useEffect(() => {
    if (location.state && location.state.rowData) {
      const { department, status } = location.state.rowData;
      setName(department);
      setStatus(status);
    } else {
      navigate("/manage-department");
    }
  }, [location, navigate]);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `${BASE_URL}/api/deparments/updateDeparment`,
        {
          departmentId:location.state.rowData._id,
          department: name,
          status: status,
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Department updated successfully",
      });
      navigate("/manage-department");
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
      <div className="card">
        <h3 className="mt-1">Edit Department</h3>
      </div>
      <div className="p-fluid">
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
      </div>
    </>
  );
};

export default EditDepartment;
