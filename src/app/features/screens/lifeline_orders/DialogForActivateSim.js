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
import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { ProgressSpinner } from 'primereact/progressspinner';

const DialogForActivateSim = ({enrollmentId,zipCode}) => {

  const [allESN, setAllESN] = useState([])
  const [allPlan, setAllPlan] = useState([])
  const [isButtonLoading, setisButtonLoading] = useState(false)


  const loginRes = localStorage.getItem("userData");
     const parseLoginRes = JSON.parse(loginRes);

  const validationSchema = Yup.object().shape({
    planId: Yup.string().required("Please Select Plan"),  
   // esn: Yup.string().required("Please select ESN"), 
});

const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { 
      zip:"",    
      planId: "",  
      esn: "",
    },
    onSubmit: async (values,actions) => {
      setisButtonLoading(true);
        const dataToSend = { enrollmentId, ...values };
        console.log("data to send is",dataToSend)
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("Successfully Run");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        actions.resetForm();
    },
});


useEffect(() => {
  formik.setFieldValue("zip",zipCode)
     
  const getESN = async () => {
      try {
          const res = await Axios.get(`${BASE_URL}/api/esn/all`);
         
          setAllESN(res?.data?.data || []);
          
      } catch (error) {
         toast.error(error?.response?.data?.msg);
      }
      
}
getESN();

},[] )


useEffect(() => {
  const getPlan = async () => {
      try {
          const res = await Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=645a85198cd1ff499c8b99cd`);
          setAllPlan(res?.data?.data || []);
         
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
  };
  getPlan();
}, []);


const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
};



  return (
    <>
    <ToastContainer/>
    <form onSubmit={formik.handleSubmit}>
    <div className="flex formgrid grid mt-1  ">
    <div className="field col-12 md:col-4">
                            <label className="field_label">Select ESIN<span style={{ color: "red" }}>*</span></label>
                            {getFormErrorMessage("esn")}
                            <Dropdown
                                id="esn"
                                options={allESN}
                                value={formik.values.esn}
                                onChange={(e) => formik.setFieldValue("esn", e.value)}
                                optionLabel="Esn"
                                optionValue="Esn"
                                filter
                                showClear
                                filterBy="Esn" // Set the property to be used for filtering
                                className='w-20rem'
                            />                     
           
                        </div>
                        <div className="field col-12 md:col-4">
                            <label className="field_label">Assign Plan<span style={{ color: "red" }}>*</span> </label>
                            {getFormErrorMessage("planId")}
                            <Dropdown
                                id="planId"
                                options={allPlan}
                                value={formik.values.planId}
                                onChange={(e) => formik.setFieldValue("planId", e.value)}
                                optionLabel="name"
                                optionValue="_id"
                                filter
                                showClear
                                filterBy="name" // Set the property to be used for filtering
                                className='w-20rem'
                            />
                           
           
                        </div>
                        <div className="field col-12 md:col-3">
                          <label className="field_label">ZipCode<FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}</label>
                         <InputText value={formik.values.zip} disabled  className='w-20rem'/>
                        </div>
                   
    </div>
    <div className='text-right'>
    <Button label={isButtonLoading ? <ProgressSpinner strokeWidth="2" style={{ width: '1.5rem', height: '1.5rem', color:'white' }}/> : "Activate"} type='submit'  className='w-13rem '/>
    </div>
   
    </form>
    </>
  )
}

export default DialogForActivateSim