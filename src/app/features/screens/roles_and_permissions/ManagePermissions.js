import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import Axios from "axios";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";
import ManagepermissionModule from "./ManagePermissionModule";
import { ProgressSpinner } from 'primereact/progressspinner';
export default function ManagePermissions({ setRefresh }) {
    const searchParams = new URLSearchParams(useLocation().search);
    const [roleId, setRoleId] = useState(searchParams.get("roleId"))

    let reffortoast = useRef(null);
    let [showError, setShowError] = useState(false);
    const [roleUpdateLoading, setRoleUpdateLoading] = useState(false);
    const [roleData, setRoleData] = useState({ role: "", description: "" })
    let [allRoles, setAllRoles] = useState([])
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [moduledData, setModuleData] = useState(null);
    const [permissionObject, setPermissionObject] = useState(null);
    const [disabledMode, setDisableMode] = useState(true);
    function updatePermissions() {

        let obj = { roleId: roleData._id, permissions: [] }
        Object.keys(permissionObject).forEach(item => {
            let obj2 = {}
            obj2.subModule = item;
            obj2.actions = permissionObject[item]
            obj.permissions.push(obj2)
        })

        Axios.patch(`${BASE_URL}/api/web/role/permissions`, obj).then(() => {

            reffortoast.current.show({ severity: "success", summary: "Info", detail: "Updated Permissions Successfully" });
        }).catch(err => {

            reffortoast.current.show({ severity: "error", summary: "Info", detail: "Updated Permissions Failed" });
        })
    }
    function handleAddRole(e) {
        e.preventDefault();
        if (!roleUpdateLoading) {
            if (formik.values.role.length > 0 && formik.values.description.length > 0) {
                setRoleUpdateLoading((prev) => !prev);
                Axios.patch(`${BASE_URL}/api/web/role`, { roleId: roleData._id, role: formik.values.role, description: formik.values.description })
                    .then(() => {

                        reffortoast.current.show({ severity: "success", summary: "Info", detail: "Updated Role Successfully" });
                        setRoleUpdateLoading((prev) => !prev);
                    })
                    .catch((error) => {
                        reffortoast.current.show({ severity: "error", summary: "Info", detail: "Updated Role Failed" });
                        setRoleUpdateLoading((prev) => !prev);
                    });
            } else {
                setShowError(true);
            }
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

        } catch (error) {

        }
    };

    const getAllRoles = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.compony}`);

            if (res?.status === 200 || res?.status === 201) {
                let rolesdata = res.data.data;
                for (let k = 0; k < rolesdata.length; k++) {
                    if (rolesdata[k]._id === roleId) {
                        let rowData = rolesdata[k]
                        formik.values.role = rowData.role;
                        formik.values.description = rowData.description
                        setRoleData(rowData)
                        let object = {}
                        for (let i = 0; i < rowData.permissions.length; i++) {
                            if (rowData.permissions[i].subModule !== null) {
                                let subModuleID = rowData.permissions[i].subModule._id

                                let arr = []
                                console.log('arr', arr)
                                for (let k = 0; k < rowData.permissions[i].actions.length; k++) {
                                    arr.push(rowData.permissions[i].actions[k]._id)
                                }

                                // Check if the array is not empty before adding to the object
                                if (arr.length > 0) {
                                    object[subModuleID] = arr
                                }
                            }
                        }
                        console.log('object', object)
                        setPermissionObject(object)
                    }
                }
                setAllRoles(res?.data?.data);
            }

        } catch (error) {

        }
    };

    useEffect(() => {
        getModules();
        getAllRoles()
        return () => {

            setRefresh(prev => !prev)
        };
    }, []);

    return (
        <>
            {
                moduledData !== null && permissionObject !== null ?
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
                            style={{ position: "absolute", right: "100px" }}
                            onClick={() => {
                                setDisableMode(false);
                            }}
                        />
                        <form style={{ marginTop: "45px" }} onSubmit={handleAddRole}>
                            <div className="grid p-fluid " style={{ justifyContent: "space-around" }}>
                                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "25em" }}>
                                    <p className="m-0">Role:</p>
                                    <InputText type="text" style={{ padding: "12px" }} disabled={disabledMode} value={formik.values.role} keyfilter={/^[A-Za-z\s]+$/} maxLength={30} onChange={formik.handleChange} name="role" />
                                    {showError ? (
                                        <div className="error" style={{ marginTop: "22px", color: "red" }}>
                                            {formik.errors.role}
                                        </div>
                                    ) : undefined}
                                </div>
                                <div className="mr-3 mb-3 " style={{ marginTop: "15px", width: "25em" }}>
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
                        {!disabledMode ?
                            <Button label="Update Permissions" style={{ marginLeft: "0px", position: "absolute", right: "90px" }} onClick={() => {
                                updatePermissions()
                            }} /> : undefined
                        }
                        <div className="flex flex-wrap justify-content-around" style={{ height: "65vh", overflowX: "hidden", overflowY: "auto", marginTop: `${disabledMode ? "0px" : "90px"}` }}>
                            {moduledData !== null && permissionObject !== null ? moduledData.map((module) => <ManagepermissionModule module={module} permissionObject={permissionObject} disabledMode={disabledMode} setPermissionObject={setPermissionObject} />) : undefined}
                        </div>
                        <Toast ref={reffortoast} />

                    </div>
                    :
                    <div className="bg-pink-50 ">
                        <ProgressSpinner style={{ position: "relative", marginTop: "30%", marginLeft: "50%", transform: "translate(-50%,-50%)" }} />
                    </div>}   </>
    );
}
