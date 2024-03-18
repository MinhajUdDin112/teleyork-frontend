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
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Roles_Permission = () => {

    const [addDepartment, setAddDepartment] = useState(false)
    const [allDepartment, setAllDepartment] = useState()
    const [addRole, setAddRole] = useState(false)
    const [allRoles, setAllRoles] = useState()
    const [addUser, setAddUser] = useState(false)
    const [allUsers, setAllUsers] = useState()


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
            const res = await Axios.get(`${BASE_URL}`);
            setAllDepartment(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
     // get all Roles
    const getRoles = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}`);
            setAllRoles(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
     // get all Users
     const getUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}`);
            setAllUsers(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getDepartment(); 
    }, [])
    useEffect(() => {
        getRoles();
        getUsers();
    }, [formik.values.department])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };



    return (
        <>
        <div className="card">  
<h3>Manage Roles And Permission</h3>
        </div>
        <div className="card mt-5">
        <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddDepartment(true) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Department
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="department"
                       
                        placeholder="Select Department"
                        options={allDepartment}
                        value={formik.values.department}
                        onChange={(e) => formik.setFieldValue("department", e.value)}
                        optionLabel={"name"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                    {getFormErrorMessage("department")}
                </div>
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddRole(true) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Roles
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="role"
                       
                        placeholder="Select Role"
                        options={allRoles}
                        value={formik.values.role}
                        onChange={(e) => formik.setFieldValue("role", e.value)}
                        optionLabel={"name"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                      {getFormErrorMessage("role")}
                </div>
                <div className="field col-12 md:col-3 ml-2">
                    <label className="field_label">
                        Select OR{" "}
                        <span onClick={() => { setAddRole(true) }} style={{ color: "blue", cursor: "pointer" }}>
                            Add Users
                        </span>{" "}
                    </label>
                    <Dropdown
                        id="user" 
                        placeholder="Select Users"
                        options={allUsers}
                        value={formik.values.user}
                        onChange={(e) => formik.setFieldValue("user", e.value)}
                        optionLabel={"name"}
                        optionValue="_id"
                        className="w-full mt-1"
                    />
                      {getFormErrorMessage("user")}
                </div>

            </div>
        </div>
           
        </>
    )
}
export default Roles_Permission