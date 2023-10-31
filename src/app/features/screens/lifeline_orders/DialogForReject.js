import React from 'react'
import { Button } from 'primereact/button';
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import BASE_URL from '../../../../config';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useEffect } from 'react';
import { useState } from 'react';

const DialogForReject = ({enrollmentId,CSRid}) => {
    
    const [allRoles, setAllRoles] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
    const enrolmentId = enrollmentId;
     // Get user data from ls
     const loginRes = localStorage.getItem("userData");
     const parseLoginRes = JSON.parse(loginRes);

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required("Please enter Reason"),   
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            
            reason: "",  
            assignee: "",
            department:"",
        },
        onSubmit: async (values,actions) => {
      
            const approvedBy = parseLoginRes?._id;
            const approved = false;
            const data = {
                assignee: formik.values.assignee,
                reason:formik.values.reason
            };   
            const dataToSend = { approvedBy, enrolmentId, approved, data, ...values };
            console.log("data to send is",dataToSend)
            try {
                const response = await Axios.patch(`${BASE_URL}/api/user/rejected`, dataToSend);
                if (response?.status === 201 || response?.status === 200) {
                    toast.success("Rejected");
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
            actions.resetForm();
        },
    });

    const assignCSRId=()=>{
        formik.setFieldValue("assignee" ,CSRid)    
    }

    useEffect(() => {
        if(formik.values.department){
            const departId= formik.values.department;
        const getRoles = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/user/getByDepartments?department=${departId}`);
                setAllRoles(res?.data?.data || []);
                console.log("all role is",res?.data?.data)
            } catch (error) {
                console.error("Error fetching module data:", error);
            }
        };
        getRoles();
    }
   
    }, [formik.values.department])

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes?.compony}`);
                setAllDepartment(res?.data?.data || []);
                console.log("all department is",res?.data?.data)
            } catch (error) {
                console.error("Error fetching module data:", error);
            }
        };
        getDepartment();
    }, []);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
  return (
   <>
   <form onSubmit={formik.handleSubmit}>
                    <div className="p-fluid p-formgrid grid ">
                        <div className="p-field col-12 md:col-4 mt-3">
                            <Button label="Assign back to CSR" type='button' onClick={assignCSRId}  />
                        </div>
                        <div className="p-fluid p-formgrid grid m-2 mt-3">
                            <h4>Or</h4>
                        </div>

                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Assign to department </label>
                            <Dropdown
                                id="department"
                                options={allDepartment}
                                value={formik.values.department}
                                onChange={(e) => formik.setFieldValue("department", e.value)}
                                optionLabel="department"
                                optionValue="_id"
                                filter
                                showClear
                                filterBy="department" // Set the property to be used for filtering
                            />
           
                        </div>
                        <div className="p-field col-12 md:col-3">
                            <label className="Label__Text">Select User </label>
                            <Dropdown id="assignee" options={allRoles} value={formik.values.assignee} onChange={(e) => formik.setFieldValue("assignee", e.value)} optionLabel="name" optionValue="_id" showClear filter filterBy="name" />
                           
                        </div>
                    </div>
                    <div className="mt-4">
                    <h4>Reject Reason <span className="steric"> *</span></h4> 
                    <textarea id="reason" value={formik.values.reason} onChange={formik.handleChange} cols={70} rows={10} className="p-2"/>
                    {getFormErrorMessage("reason")}
                    </div>
                    
                    <br />
                    <Button label="Submit"  type="submit" className="mt-3" />
                    </form>
   </>
  )
}

export default DialogForReject