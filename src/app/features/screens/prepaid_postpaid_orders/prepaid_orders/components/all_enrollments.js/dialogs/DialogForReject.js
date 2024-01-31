import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const DialogForReject = ({ enrollmentId, CSRid, getAllEnrollments, checkType ,setIsModalOpen}) => {
    const [allRoles, setAllRoles] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
    const [checkCompany, setcheckCompany] = useState(false);
    const [assignButtonClicked, setAssignButtonClicked] = useState(false); // Added state
    const enrolmentId = enrollmentId;

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    // Get role name  from login response
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName ? roleName.toUpperCase() : "DEFAULT_VALUE";

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required("Please enter Reason"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            reason: "",
            assignees: [],
            department: "",
        },
        onSubmit: async (values, actions) => {
            const approvedBy = parseLoginRes?._id;
            const approved = false;

            const dataToSend = {
                assignees: formik.values.assignees,
                reason: formik.values.reason,
                department: formik.values.department,
                approvedBy,
                approved,
                enrolmentId,
            };
            try {
                const response = await Axios.patch(`${BASE_URL}/api/user/rejected`, dataToSend);
                if (response?.status === 201 || response?.status === 200) {
                    toast.success("Rejected");
                    setIsModalOpen(false)
                } 
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
            actions.resetForm();
            getAllEnrollments();
        },
    });

    const assignCSRId = () => {
        formik.setFieldValue("assignees", [CSRid]);
        setAssignButtonClicked(true)
    };

    const checkcompany = () => {
        if (parseLoginRes?.companyName.includes("IJ") || parseLoginRes?.companyName.includes("ij") || parseLoginRes?.companyName.includes("Ij")) {
            if (toCapital.includes("PROVISION AGENT") || toCapital.includes("PROVISION MANAGER") || (toCapital.includes("QA ")  )) {
                setcheckCompany(true);
            }
        }
    };

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/deparments/getRejectDepartment?userId=${parseLoginRes?._id}`);
                setAllDepartment(res.data.result || []);
            } catch (error) {
                toast.error(`Error fetching roles: ${error?.response?.data?.error}`);
            }
        };
        getDepartment();
        checkcompany();
    }, []);

    useEffect(() => {
        if (formik.values.department) {
            const departId = formik.values.department;
            const getRoles = async () => {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/web/user/getRejectUser?department=${departId}&roleId=${parseLoginRes?.role?._id}`);
                    setAllRoles(res?.data?.result);
                } catch (error) {
                    toast.error(`Error fetching roles: ${error?.response?.data?.error}`);
                }
            };
            getRoles();
        }  
        document.addEventListener("click",documentOnClick,false)    
        return ()=>{ 
             document.removeEventListener("click",documentOnClick,false)
        }
    }, [formik.values.department]);
     function documentOnClick(e){ 
        setIsModalOpen(false)
     }
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div onClick={(e)=>{
            e.stopPropagation()
        }}>
            <form onSubmit={formik.handleSubmit} >
                <div className="p-fluid p-formgrid grid ">
                    { 
                                            roleName.includes("provision") || roleName.includes("Provision") || roleName.includes("PROVISION") || roleName.includes("QA ")  && checkCompany ?( 
                                                <>
                                                <div className="p-field col-12 md:col-4 mt-3">
                                                    <Button label="Assign to Created User" type="button" onClick={assignCSRId} style={{ backgroundColor: assignButtonClicked ? 'grey' : '',transition: 'background-color 0.3s ease', border:'none' }} />
                                                </div>
                                                {/* <div className="p-fluid p-formgrid grid m-2 mt-5">
                                                    <h4>Or</h4>
                                                </div> */}
                                            </>
                                            )
                      :
                     roleName.includes("provision") || roleName.includes("Provision") || roleName.includes("PROVISION")  ? (
                        <>
                            <div className="p-field col-12 md:col-4 mt-3">
                                <Button label="Send To Retension" onClick={()=>{setAssignButtonClicked(true)}} type="button" style={{ backgroundColor: assignButtonClicked ? 'grey' : '',transition: 'background-color 0.3s ease', border:'none' }} />
                            </div>
                            {/* <div className="p-fluid p-formgrid grid m-2 mt-5">
                                <h4>Or</h4>
                            </div> */}
                        </>
                    ) : checkType == "Enrollment" ? (
                        <>
                            <div className="p-field col-12 md:col-4 mt-3">
                                <Button label="Assign to Created User" type="button" onClick={assignCSRId} style={{ backgroundColor: assignButtonClicked ? 'grey' : '',transition: 'background-color 0.3s ease', border:'none' }}/>
                            </div>
                            {/* <div className="p-fluid p-formgrid grid m-2 mt-5">
                                <h4>Or</h4>
                            </div> */}
                        </>
                    ) : (
                        ""
                    )}
                    {checkCompany ? (
                        ""
                    ) : (
                        <>
                            <div className="p-fluid p-formgrid grid m-2 mt-5">
                                <h4>Or</h4>
                            </div>
                            <div className="p-field col-12 md:col-3">
                                <label className="Label__Text">Assign to department </label>
                                <Dropdown
                                    id="department"
                                    options={allDepartment.map((item) => ({ label: item.department, value: item._id }))}
                                    value={formik.values.department}
                                    onChange={(e) => formik.setFieldValue("department", e.value)}
                                    optionLabel="label" // Use "label" as the property to display as an option
                                    optionValue="value" // Use "value" as the property representing the selected value
                                    filter
                                    showClear
                                    filterBy="label" // Set the property to be used for filtering
                                />
                            </div>{" "}
                        </>
                    )}
                    {formik.values.department ? (
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text ml-3">Select User </label>
                            {allRoles.map((item) => (
                                <div key={item._id} className="p-field-checkbox m-1  ml-3">
                                    <Checkbox
                                        inputId={item._id}
                                        value={item._id}
                                        checked={formik.values.assignees.includes(item._id)}
                                        onChange={(e) => {
                                            const isChecked = e.checked;
                                            const updatedAssignee = isChecked ? [...formik.values.assignees, item._id] : formik.values.assignees.filter((value) => value !== item._id);
                                            formik.setFieldValue("assignees", updatedAssignee);
                                        }}
                                    />

                                    <label htmlFor={item._id} className="p-checkbox-label ml-1">
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <div className="mt-2">
                    <h4>
                        Reject Reason <span className="steric"> *</span>
                    </h4>
                    <textarea  id="reason" value={formik.values.reason} onChange={formik.handleChange} cols={60} rows={9} className="p-2 textarea-border" />
                    {getFormErrorMessage("reason")}
                </div>

                <br />
                <Button label="Submit" type="submit" className="mt-3" />
            </form>
        </div>
    );
};

export default DialogForReject;
