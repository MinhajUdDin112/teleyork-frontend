import React, { useState } from "react";  
import { useFormik } from "formik";  
import "./css/changemsisdn.css"
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";  
import Axios from "axios";
export default function ChangeMSISDN({currentSelected,setChangeMSISDNDialogVisibility}){  
const BASE_URL = process.env.REACT_APP_BASE_URL; 
   const [loading,setLoading]=useState(false)
    const validationSchema = Yup.object().shape({
        newmdn: Yup.string()
        .required("MDN is required")
        .matches(/^\d+$/, 'MDN must contain only digits')
        .length(19, "MDN must be exactly 19 digits"),
        account: Yup.string().required("OSP Account No Is Required"), 
        password:Yup.string().required("OSP Account Password Is Required") 
      });
      const formik = useFormik({
        initialValues: {
            enrollmentId:currentSelected?._id, 
            newmdn:"", 
            account:"", 
            password:"",
    
        },
        validationSchema, 
        onSubmit:(values,actions)=>{ 
          setLoading(prev=>!prev)
          Axios.post(`${BASE_URL}/api/user/portInChange`,formik.values).then(res=>{ 
                 setLoading(prev=>!prev)       
                 setChangeMSISDNDialogVisibility(prev=>!prev)
          }).catch(err=>{ 
            setLoading(prev=>!prev)
          })
        } 
    })
     return( 
          <form onSubmit={formik.handleSubmit} className="w-full flex flex-wrap flex-row justify-content-between"> 
             <div className="changemsisdn_field">         
              <label>Primary Number <span className="p-error">*</span></label>
            <InputText
              name="newmdn"
              value={formik.values.newmdn} 
              keyfilter="int"  maxLength={19} minLength={19}
              onChange={formik.handleChange}
              className="  border pl-2 h-[40px] p-2 w-full rounded-lg mt-2 border-[#D6D7DB] font-poppins font-medium"
              placeholder="Primary Number"
            />
            {formik.touched.newmdn && formik.errors.newmdn ? (
              <p className="font-poppins  p-error  font-medium mt-2 ml-1 text-red-500">
                {formik.errors.newmdn}
              </p>
            ) : null}
          </div> 
          <div className="changemsisdn_field">         
              <label>OSP Account Number <span className="p-error">*</span></label>
            <InputText
              name="account"
              value={formik.values.account}
              onChange={formik.handleChange}
              className="  border pl-2 h-[40px] p-2 w-full rounded-lg mt-2 border-[#D6D7DB] font-poppins font-medium"
              placeholder="OSP Account Number"
            />
            {formik.touched.account && formik.errors.account ? (
              <p className="font-poppins font-medium  p-error  mt-2 ml-1 text-red-500">
                {formik.errors.account}
              </p>
            ) : null}
          </div> 
          <div className="changemsisdn_field">         
              <label>OSP Account Password  <span className="p-error">*</span></label>
            <InputText
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="  border pl-2 h-[40px] p-2 w-full rounded-lg mt-2 border-[#D6D7DB] font-poppins font-medium"
              placeholder="OSP Account Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="font-poppins font-medium mt-2 ml-1 p-error text-red-500">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
            <div className="w-full mt-2 flex flex-wrap flex-row "> 
             <button  disabled={loading} className={`submit-buttonmsisdn ${loading ?"opacitydim":""}`} type="submit">  
               Submit
              </button>
            </div>
          </form>
     )
}