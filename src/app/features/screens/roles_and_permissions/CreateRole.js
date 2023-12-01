import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { Divider } from "primereact/divider";
import { useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const CreateRole = () => {
    let toast = useRef(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const location = useLocation();
    const { rowData } = location.state || {};
    const [moduleData, setModuleData] = useState([]);
    const [selectedModules, setSelectedModules] = useState({});
    const [selectedSubmodules, setSelectedSubmodules] = useState({});
    const [selectedActions, setSelectedActions] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    // Validation Schema
    const validationSchema = Yup.object().shape({
        role: Yup.string().required("This field is required."),
        description: Yup.string().required("This field is required."),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            role: "",
            description: "",
        },
        onSubmit: async () => {
            const permissions = [];
            // Define the data object
            const data = {
                serviceProvider: parseLoginRes?.compony,
                permissions: permissions,
                role: formik.values.role,
                description: formik.values.description,
                isSperPanelRole: false,
            };
            let l = 1;
            const selectedSubmoduleKeys = Object.keys(selectedSubmodules);
            function processNextSubmodule() {
                if (l <= selectedSubmoduleKeys.length) {
                    const submoduleId = selectedSubmoduleKeys[l - 1];
                    if (selectedSubmodules[submoduleId]) {
                        const submoduleActions = [];
                        moduleData.forEach((module) => {
                            module.submodule.forEach((submodule) => {
                                if (submodule._id === submoduleId) {
                                    submodule.actions.forEach((action) => {
                                        const key = `${submoduleId}-${action._id}`;
                                        if (selectedActions[key]) {
                                            submoduleActions.push(action._id);
                                        }
                                    });
                                }
                            });
                        });
                        permissions.push({
                            subModule: submoduleId,
                            actions: submoduleActions,
                        });
                    }
                    l++;
                    processNextSubmodule(); // Recursively process the next submodule
                }
            }
            processNextSubmodule(); // Start processing the first submodule
            Axios.post(`${BASE_URL}/api/web/role`, data)
                .then((response) => {
                    if (response?.status === 200) {
                       
                        toast.current.show({ severity: "success", summary: "Info", detail: "Role Added Successfully" });
                    }
                })
                .catch((error) => {
                    setErrorMessage(error?.response?.data?.msg);
                  
                    toast.current.show({ severity: "error", summary: "Info", detail: "Role Added Failed" });
                });

            formik.resetForm();
            return;
            // Send the data to the server using Axios POST request
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const getModules = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/module`);
            setModuleData(res?.data?.data || []);
          
        } catch (error) {
           
        }
    };
    useEffect(() => {
        getModules();
    }, []);
    const handleModuleCheckboxChange = (moduleId) => {
        setSelectedModules((prevSelectedModules) => ({
            ...prevSelectedModules,
            [moduleId]: !prevSelectedModules[moduleId],
        }));
        setSubmodulesAndActions(moduleId, !selectedModules[moduleId]);
    };
    const setSubmodulesAndActions = (moduleId, checked) => {
        const module = moduleData.find((module) => module._id === moduleId);
        if (module) {
            module.submodule.forEach((submodule) => {
                setSelectedSubmodules((prevSelectedSubmodules) => ({
                    ...prevSelectedSubmodules,
                    [submodule._id]: checked,
                }));
                submodule.actions.forEach((action) => {
                    togglePermission(submodule._id, action._id);
                });
            });
        }
    };
    const togglePermission = (submoduleId, actionId) => {
     
        setSelectedActions((prevSelectedActions) => {
            const key = `${submoduleId}-${actionId}`;
            return {
                ...prevSelectedActions,
                [key]: !prevSelectedActions[key],
            };
        });
    };
    const handleSubmoduleCheckboxChange = (submoduleId) => {
        const updatedSubmodules = {
            ...selectedSubmodules,
            [submoduleId]: !selectedSubmodules[submoduleId],
        };
        setSelectedSubmodules(updatedSubmodules);
        // Check permissions if submodule is checked, uncheck if it's unchecked
        if (updatedSubmodules[submoduleId]) {
            checkPermissionsForSubmodule(submoduleId);
        } else {
            uncheckPermissionsForSubmodule(submoduleId);
        }
    };
    // to check permissions for a submodule
    const checkPermissionsForSubmodule = (submoduleId) => {
        setSelectedActions((prevSelectedActions) => {
            const updatedActions = { ...prevSelectedActions };
            moduleData.forEach((module) => {
                module.submodule.forEach((submodule) => {
                    if (submodule._id === submoduleId) {
                        submodule.actions.forEach((action) => {
                            updatedActions[`${submoduleId}-${action._id}`] = true;
                        });
                    }
                });
            });
            return updatedActions;
        });
    };
    // to uncheck permissions for a submodule
    const uncheckPermissionsForSubmodule = (submoduleId) => {
        setSelectedActions((prevSelectedActions) => {
            const updatedActions = { ...prevSelectedActions };
            Object.keys(updatedActions).forEach((actionId) => {
                if (actionId.startsWith(`${submoduleId}-`)) {
                    updatedActions[actionId] = false;
                }
            });
            return updatedActions;
        });
    };
    const getPermissionsByRoleId = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/roleDetails?roleId=${rowData?.role?._id}`);
            if (res?.status === 200 || res?.status === 201) {
                setRolePermissions(res?.data?.data?.permissions);
            }
         
        } catch (error) {
           
        }
    };
    useEffect(() => {
        if (rowData) {
            getPermissionsByRoleId();
        }
    }, [rowData]);

    return (
        <>
          <div className="card">
            <h3 className="mt-1 ">Create Role</h3>
        </div>
            <div className="card">
                <Toast ref={toast} />
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-fluid p-formgrid grid justify-content-around">
                            <div className="col-12 md:col-4" style={{width:"45%"}}>
                                <label className="Label__Text">Role</label>
                                <InputText style={{marginTop:"15px"}} id="role" placeholder="Enter Role Name" value={formik.values.role} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("role") }, "Input__Round")} keyfilter={/^[A-Za-z\s]+$/} maxLength={30} />
                                {getFormErrorMessage("role")}
                            </div>
                            <div className="col-12 md:col-4" style={{width:"45%"}}>
                                <label className="Label__Text">Description</label>
                                <InputText style={{marginTop:"15px"}} id="description" placeholder="Enter Role Description" value={formik.values.description} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("description") }, "Input__Round")} rows={5} cols={30} />
                                {getFormErrorMessage("description")}
                            </div>
                        </div>
                        <div>
                            <Button style={{marginTop:"34px",marginLeft:"50%",transform:"translate(-50%)"}} label="Submit" type="submit" />
                        </div>
                    </form>
                </div>
                <Divider /> 
           
                <div  className="flex flex-wrap justify-content-around" style={{height:"65vh",overflowY:"scroll",overflowX:"hidden"}}>
                    {moduleData.map((module) => (  
                     
                        <div >  
                       
                            <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                                <ul style={{paddingLeft:"24%"}}>
                                    <li style={{marginTop:"10px",listStyleType:"none"}}>
                                        <input style={{cursor:"pointer"}} type="checkbox" checked={selectedModules[module._id] || false} onChange={() => handleModuleCheckboxChange(module._id)} />
                                        {module.name}
                                    </li>
                                    {module.submodule.map((submodule) => (
                                        <ul>
                                            <li style={{marginTop:"5px",listStyleType:"none"}}>
                                                <div key={submodule._id} style={{width:"245px"}}>
                                                    <input style={{cursor:"pointer"}} type="checkbox" checked={selectedSubmodules[submodule._id] || false} onChange={() => handleSubmoduleCheckboxChange(submodule._id)} />
                                                    {submodule.name}
                                                </div>
                                            </li>
                                            <ul>
                                                <li style={{marginTop:"5px",listStyleType:"none"}}>
                                                    {submodule.actions.map((action) => (
                                                        <div key={`${submodule._id}-${action._id}`} style={{marginTop:"5px"}}>
                                                            <input style={{cursor:"pointer"}} type="checkbox" checked={selectedActions[`${submodule._id}-${action._id}`] || false} onChange={() => togglePermission(submodule._id, action._id)} />
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
                    ))}
                </div>
            </div>
        </>
    );
};
export default CreateRole;
