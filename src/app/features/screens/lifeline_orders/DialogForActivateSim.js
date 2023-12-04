import React from 'react'
import { Button } from 'primereact/button';
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useEffect } from 'react';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { ProgressSpinner } from 'primereact/progressspinner';
const BASE_URL=process.env.REACT_APP_BASE_URL
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
      
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("Successfully Run");
                setisButtonLoading(false);
                actions.resetForm();
            }
        } catch (error) {
          toast.error(error?.response?.data?.msg, {
            position: toast.POSITION.TOP_Right, 
            
          });
          setisButtonLoading(false);
        }
    },
});


useEffect(() => {
  formik.setFieldValue("zip",zipCode)
     
  const getESN = async () => {
      try {
          const res = await Axios.get(`${BASE_URL}/api/web/simInventory/available?serviceProvider=${parseLoginRes?.compony}`);   
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
          const res = await Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLoginRes?.compony}`);
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
   
    <form onSubmit={formik.handleSubmit}>
    <div className="flex formgrid grid mt-1  ">
    <div className="field col-12 md:col-4">
                            <label className="field_label">Select ESN<span style={{ color: "red" }}>*</span></label>
                            {getFormErrorMessage("esn")}
                            <Dropdown
                                id="esn"
                                options={allESN}
                                value={formik.values.esn}
                                onChange={(e) => formik.setFieldValue("esn", e.value)}
                                optionLabel="SimNumber"
                                optionValue="SimNumber"
                                filter
                                showClear
                                filterBy="SimNumber" // Set the property to be used for filtering
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
                                optionLabel={(option) => `${option.name} - (${option.planId})`}
                                optionValue="planId"
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
    <Button label="Activate" icon={isButtonLoading ? <ProgressSpinner strokeWidth="6" style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} /> : null} type='submit' className='w-13rem'  disabled={isButtonLoading}/>

    </div>
   
    </form>
    </>
  )
}

export default DialogForActivateSim