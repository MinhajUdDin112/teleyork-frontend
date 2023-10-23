import React from "react";
import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import BASE_URL from "../../../../config";
import Axios from "axios";  
import { Toast } from "primereact/toast";
export default function ManagePermissions({ setNavigateToPermissions, roleData }) { 
    let reffortoast=useRef(null)
    let [showError, setShowError] = useState(false);
    const [moduledData, setModuleData] = useState(null);  
    
    
    const [selectedActions, setSelectedActions] = useState({});
    const [disabledMode, setDisableMode] = useState(true);  

    console.log(roleData);  
    console.log(selectedActions ) 
    const togglePermission = (submoduleId, actionId) => {
        console.log("actionId", actionId);
        setSelectedActions((prevSelectedActions) => {
            const key = `${submoduleId}-${actionId}`;
            return {
                ...prevSelectedActions,
                [key]: !prevSelectedActions[key],
            };
        });
    };  
    
    function handleAddRole(e) {
        e.preventDefault();
        setShowError(true);    
           if(formik.values.role.length > 0 && formik.values.description.length > 0){    
              Axios.patch(`${BASE_URL}/api/web/role`,{roleId:roleData._id,role:formik.values.role,description:formik.values.description}).then(()=>{ 
                 console.log("Update Successfully")  
                 reffortoast.current.show({ severity: "success", summary: "Info", detail: "Updated Role Successfully" })  
                  
              }).catch(error=>{ 
                reffortoast.current.show({ severity: "error", summary: "Info", detail: "Updated Role Failed" })  
                  
              }) 
           }
    }
    const formik = useFormik({
        initialValues: {
            role: roleData.role,
            description: roleData.description,
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.role) {
                errors.role = "Role is Required";
            }
            if (!values.description) {
                errors.description = "Description is required";
            }
            return errors;
        },
    });
    let navigate = useNavigate();
    const getModules = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/module`);
            setModuleData(res?.data?.data || []);
            console.log("res?.data?.data", res?.data?.data);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };
    useEffect(() => {
        getModules();
        return () => {
            setNavigateToPermissions(false);
        };
    }, []);
    return (
        <div className="card">
            <Button
                label="Back"
                style={{ cursor: "pointer", marginLeft: "25px", fontSize: "14px", paddingLeft: "27px" }}
                onClick={() => {
                    navigate("/managerolesandrights");
                }}
            />
            <Button
                label="Edit"
                style={{ position: "absolute", right: "5vw" }}
                onClick={() => {
                    setDisableMode(false);
                }}
            />
            <form style={{ marginTop: "45px" }} onSubmit={handleAddRole}>
                <div className="grid p-fluid " style={{ justifyContent: "space-around" }}>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "29em" }}>
                        <p className="m-0">Role:</p>
                         <InputText type="text" style={{ padding: "12px" }} disabled={disabledMode} value={formik.values.role} keyfilter={/^[A-Za-z\s]+$/} maxLength={30} onChange={formik.handleChange} name="role" />
                        {showError ? (
                            <div className="error" style={{ marginTop: "22px", color: "red" }}>
                                {formik.errors.role}
                            </div>
                        ) : undefined}
                    </div>
                    <div className="mr-3 mb-3 " style={{ marginTop: "15px", width: "29em" }}>
                        <p className="m-0">Description:</p>
                        <InputText type="text" style={{ padding: "12px" }} disabled={disabledMode} value={formik.values.description} onChange={formik.handleChange} name="description" />

                        {showError ? (
                            <div className="error" style={{ marginTop: "22px", color: "red" }}>
                                {formik.errors.description}
                            </div>
                        ) : undefined}
                    </div>
                </div>
                <Button type="submit" label="Update" style={{ marginTop: "45px", paddingLeft: "95px", paddingRight: "95px", marginLeft: "50%", transform: "translate(-50%)", display: `${disabledMode ? "none" : "block"}` }} />
            </form>
            <Divider />
            <div className="grid r_n_r" style={{ background: "white" }}>
                {moduledData !== null
                    ? moduledData.map((module) => (
                          <div className="col-12 md:col-6 lg:col-6 ">
                              <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                                  <ul style={{ paddingLeft: "24%" }}>
                                      <li style={{ marginTop: "10px" }}>
                                          <input style={{ cursor: "pointer" }} type="checkbox" />
                                          {module.name}
                                      </li>
                                      {module.submodule.map((submodule) => (
                                          <ul>
                                              <li style={{ marginTop: "5px" }}>
                                                  <div key={submodule._id} style={{ width: "245px" }}>
                                                      <input style={{ cursor: "pointer" }} type="checkbox"   />
                                                      {submodule.name}
                                                  </div>
                                              </li>
                                              <ul>
                                                  <li style={{ marginTop: "5px" }}>
                                                      {submodule.actions.map((action) => (
                                                          <div key={`${submodule._id}-${action._id}`} style={{ marginTop: "5px" }}>
                                                              <input style={{ cursor: "pointer" }} type="checkbox" checked={selectedActions[`${submodule._id}-${action._id}`] || false} onChange={() => togglePermission(submodule._id, action._id)}/>
                                                              {action.name}
                                                          </div>
                                                      ))}
                                                  </li>
                                              </ul>
                                          </ul>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                      ))
                    : undefined}
            </div>    
            <Toast ref={reffortoast}/>
        </div>
    );
}
