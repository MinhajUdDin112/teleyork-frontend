import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Roles_Permission = () => {

    const [addDepartment, setAddDepartment] = useState(false)
    const [allDepartment, setAllDepartment] = useState()
    const [addRole, setAddRole] = useState(false)
    const [allRoles, setAllRoles] = useState()
    const [addUser, setAddUser] = useState(false)
    const [allUsers, setAllUsers] = useState()
    const [rolePermissions, setRolePermissions] = useState([]);
    const location = useLocation();
    const currentPath = location?.pathname
    const { rowData } = location.state || {};
    const [moduleData, setModuleData] = useState([]);
    const [selectedModules, setSelectedModules] = useState({});
    const [selectedSubmodules, setSelectedSubmodules] = useState({});
    const [selectedActions, setSelectedActions] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);


    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const companyId = parseLoginRes?.company;

    const validationSchema = Yup.object().shape({
        department: Yup.string().required("Please Select Department."),
        role: Yup.string().required("Please Select Role."),
        user: Yup.string().required("Please Select user.")
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            department: "",
            role:"",
            user:"",
            name:"",
           description:"",
           status:"",
           role:"",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                department: formik.values.department,
                role: formik.values.role,
                user: formik.values.user,
            };

            try {
                const response = await Axios.post(`${BASE_URL}`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Bill Configured Successfully");
                    actions.resetForm();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
    });
    // get all department
    const getDepartment = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${companyId}`);
            setAllDepartment(res?.data?.data || []);
          
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    // add ddepartment 
    const addDepart = async()=>{
        try {
            const response = await Axios.post(`${BASE_URL}/api/deparments/addDeparment`, {
              department: formik.values.department,
              status: formik.values.status, 
              company: parseLoginRes?.company,
              description:formik.values.description,
            });
            if (response?.status === 200 || response?.status === 201) {           
            toast.success("Department Successfull Added");
            setAddDepartment(false)
            getDepartment();
            }
          } catch (error) {     
            toast.error(error?.response?.data?.msg);
          }
    }
     // get all Roles
    const getRoles = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${companyId}`);
           
            setAllRoles(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
// add Roles
    const addRoles = async()=>{

        const permissions = [];
            // Define the data object
            const data = {
                serviceProvider: parseLoginRes?.company,
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
toast.success("Role added Successfully")
getDepartment();
setAddRole(false);
                    }
                })
                .catch((error) => {
                   toast.error(error?.response?.data?.msg)
                });
    }
     // get all Users
     const getUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/user/all?serviceProvider=${companyId}`);
            setAllUsers(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getDepartment(); 
    }, [])

    useEffect(() => {
        if(formik.values.department){
            getRoles();
            getUsers();
        }
        
    }, [formik.values.department])

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

    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)

        const isCreate = parsedLoginPerms.some((node) =>
            node?.subModule.some((subNode) =>
                subNode?.route === currentPath && subNode?.actions.some((action) =>
                    action?.name === "create"
                )
            )
        );
        setIsCreate(isCreate)

        const isManage = parsedLoginPerms.some((node) =>
            node?.subModule.some((subNode) =>
                subNode?.route === currentPath && subNode?.actions.some((action) =>
                    action?.name === "manage"
                )
            )
        );
        setIsManage(isManage)

    };

    useEffect(() => {
        if (rowData) {
            getPermissionsByRoleId();
        }
    }, [rowData]);

    useEffect(() => {
        actionBasedChecks()
    }, []);



    return (
        <>
        <ToastContainer/>
        <div className="card">  
<h3>Manage Roles And Permission</h3>
        </div>
        <div className="card mt-5">
        <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddDepartment(prev => !prev) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Department
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="department"       
                        placeholder="Select Department"
                        options={allDepartment}
                        value={formik.values.department}
                        onChange={(e) => formik.setFieldValue("department", e.value)}
                        optionLabel={"department"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                    {getFormErrorMessage("department")}
                </div>
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddRole(prev => !prev) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Roles
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="role"
                       
                        placeholder="Select Role"
                        options={allRoles}
                        value={formik.values.role}
                        onChange={(e) => formik.setFieldValue("role", e.value)}
                        optionLabel={"role"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                      {getFormErrorMessage("role")}
                </div>
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddUser(prev =>!prev) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Users
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="user" 
                        placeholder="Select Users"
                        options={allUsers}
                        value={formik.values.user}
                        onChange={(e) => formik.setFieldValue("user", e.value)}
                        optionLabel={"user"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                      {getFormErrorMessage("user")}
                </div>

            </div>
            {
                addDepartment ? <>
                  <div className="p-fluid formgrid grid">
              
              <div className="field col-12 md:col-3 ml-2">
                <label className="field_label">
                      Name
                    </label>
                    <InputText name="name" id="name" onChange={formik.handleChange} value={formik.values.name}/> 
                </div>
                <div className="field col-12 md:col-3 ml-2">
                <label className="field_label">
                      Description
                    </label>
                    <InputText name="description" id="description" onChange={formik.handleChange} value={formik.values.description}/> 
                </div>
                <div className="field col-12 md:col-3 ml-2 mt-2">
              <label className="field_label">Status</label>
              <div className="flex flex-wrap mt-2 ">
                <div className="mr-3 flex alignitem-center">
                  <RadioButton
                    inputId="statusActive"
                    name="status"
                    value={true}
                    onChange={() => formik.setFieldValue('status', true)}
                    checked={formik.values.status === true}
                  />
                  <label htmlFor="statusActive" className='ml-2'>Active</label>
                </div>
                <div className="mr-3 flex alignitem-center ">
                  <RadioButton
                    inputId="statusInactive"
                    name="status"
                    value={false}
                    onChange={() => formik.setFieldValue('status', false)}
                    checked={formik.values.status === false}
                  />
                  <label htmlFor="statusInactive" className='ml-2'>Inactive</label>
                </div>
                
              </div>
              {getFormErrorMessage('status')}
             
            </div>
            </div>
             <div className="text-right ">
             <Button label="Add" onClick={addDepart} className="w-15rem mr-5"  />
         </div>
         </>
            :""
            }
            {addRole ? <>
    
            <div className="card">
                <div>
                    <form >
                        <div className="p-fluid p-formgrid grid justify-content-around">
                            <div className="col-12 md:col-4" style={{ width: "45%" }}>
                                <label className="Label__Text">Role</label>
                                <InputText style={{ marginTop: "15px" }} id="role" placeholder="Enter Role Name" value={formik.values.role} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("role") }, "Input__Round")} keyfilter={/^[A-Za-z\s]+$/} maxLength={30} />
                                {getFormErrorMessage("role")}
                            </div>
                            <div className="col-12 md:col-4" style={{ width: "45%" }}>
                                <label className="Label__Text">Description</label>
                                <InputText style={{ marginTop: "15px" }} id="description" placeholder="Enter Role Description" value={formik.values.description} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("description") }, "Input__Round")} rows={5} cols={30} />
                                {getFormErrorMessage("description")}
                            </div>
                        </div>
                        <div>
                            <Button style={{ marginTop: "34px", marginLeft: "50%", transform: "translate(-50%)" }} label="Add" onClick={addRoles} disabled={!(isCreate || isManage)} />
                        </div>

                    </form>
                </div>
                <Divider />

                <div className="flex flex-wrap justify-content-around" style={{ height: "65vh", overflowY: "scroll", overflowX: "hidden" }}>
                    {moduleData.map((module) => (

                        <div >

                            <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                                <ul style={{ paddingLeft: "24%" }}>
                                    <li style={{ marginTop: "10px", listStyleType: "none" }}>
                                        <input style={{ cursor: !(isCreate || isManage) ? "not-allowed" : "pointer" }} type="checkbox" checked={selectedModules[module._id] || false} onChange={() => handleModuleCheckboxChange(module._id)} disabled={!(isCreate || isManage)} />
                                        {module.name}
                                    </li>
                                    {module.submodule.map((submodule) => (
                                        <ul>
                                            <li style={{ marginTop: "5px", listStyleType: "none" }}>
                                                <div key={submodule._id} style={{ width: "245px" }}>
                                                    <input style={{ cursor: !(isCreate || isManage) ? "not-allowed" : "pointer" }} type="checkbox" checked={selectedSubmodules[submodule._id] || false} onChange={() => handleSubmoduleCheckboxChange(submodule._id)} disabled={!(isCreate || isManage)} />
                                                    {submodule.name}
                                                </div>
                                            </li>
                                            <ul>
                                                <li style={{ marginTop: "5px", listStyleType: "none" }}>
                                                    {submodule.actions.map((action) => (
                                                        <div key={`${submodule._id}-${action._id}`} style={{ marginTop: "5px" }}>
                                                            <input style={{ cursor: !(isCreate || isManage) ? "not-allowed" : "pointer" }} type="checkbox" checked={selectedActions[`${submodule._id}-${action._id}`] || false} onChange={() => togglePermission(submodule._id, action._id)} disabled={!(isCreate || isManage)} />
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
            </>:""}
           
        </div>
           
        </>
    )
}
export default Roles_Permission