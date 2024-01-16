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
const DialogForActivateSim = ({enrollmentId,zipCode,setOpenDialogeForActivate}) => {
  const [allESN, setAllESN] = useState([])
  const [allPlan, setAllPlan] = useState([])
  const [isButtonLoading, setisButtonLoading] = useState(false)
  const [checkStatus, setCheckStatus] = useState(null);
 const options1 = [
 
  { label: "Sim", value: "sim" },
  { label: "Tablet", value: "Tablet" },
  { label: "Cell Phone", value: "Cell Phone" },
];
const options2 = [
 
  { label: "Sim", value: "sim" },
  { label: "Cell Phone", value: "Cell Phone" },
];

  const loginRes = localStorage.getItem("userData");
     const parseLoginRes = JSON.parse(loginRes);

  const validationSchema = Yup.object().shape({
    planId: Yup.string().required("Please Select Plan"),  
   // esn: Yup.string().required("Please select ESN"), 
});
const userId=parseLoginRes?._id;

const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { 
      zip:"",    
      planId: "",  
      esn: "",
      unitType:""
    },
    onSubmit: async (values,actions) => {
      setisButtonLoading(true);
        const dataToSend = { enrollmentId,userId, ...values };
      
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/activateByPwg`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("Account Successfully Activated");
                setisButtonLoading(false);  
                actions.resetForm(); 
                // setOpenDialogeForActivate(prev=>!prev)
                setOpenDialogeForActivate(false)
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
  const fetchData = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${enrollmentId}`);
      if (res?.status === 200 || res?.status === 201) {
        setCheckStatus(res?.data?.data?.deviceEligibilty);
       
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  };

  fetchData();
}, [enrollmentId]);


useEffect(() => {
  formik.setFieldValue("zip",zipCode)
 
     if(formik.values.unitType){
      const getESN = async () => {
       
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/simInventory/getByUnitType?serviceProvider=${parseLoginRes?.compony}&UnitType=${formik.values.unitType}`);   
            setAllESN(res?.data?.result || []); 
               
        } catch (error) {
           toast.error(error?.response?.data?.msg);
        }
       
     }
     getESN();
}

},[formik.values.unitType])


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

const renderContent = () => {
 
    if (checkStatus === "true" || checkStatus === true) {
      return (
        <>
        
          <div  >
          <p className='font-bold'>This Person Is Eligible for Tablet.</p>    
          </div>
        </>
      );
    } else {
      return (
        <>
          <div  >
          <p className='font-bold' >This Person Is not Eligible for Tablet.</p>        
          </div>
        </>
      );
    }
};
  return (
    <>
{checkStatus !== null && (
  
      <form onSubmit={formik.handleSubmit}>
      <div className='mb-5'>{renderContent()}</div>
<div className="flex formgrid grid mt-1  ">
 {
       checkStatus && checkStatus ==true ? 
  <><div className="field col-12 md:col-4">
  <label className="field_label">Select Device<span style={{ color: "red" }}>*</span></label>
  {getFormErrorMessage("unitType")}
  <Dropdown
     id="unitType"
     value={formik.values.unitType}
     onChange={(e) => {
         formik.setFieldValue("unitType", e.value);
         formik.handleChange(e);
     }}
     options={options1}
    
      className='w-20rem'
  />                           
</div></>
  :
  <><div className="field col-12 md:col-4">
  <label className="field_label">Select Device<span style={{ color: "red" }}>*</span></label>
  {getFormErrorMessage("esn")}
  <Dropdown
     
     id="unitType"
     value={formik.values.unitType}
     onChange={(e) => {
         formik.setFieldValue("unitType", e.value);
         formik.handleChange(e);
     }}
     options={options2}
    
      className='w-20rem'   
  />                           
</div></>
 }
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
    
     
    )
    }
    </>
  )
}

export default DialogForActivateSim