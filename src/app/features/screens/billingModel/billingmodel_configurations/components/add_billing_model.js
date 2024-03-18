import React,{useState} from "react";  
import { useFormik } from "formik";   
import * as Yup from "yup"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"; 
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Axios from "axios";
const validationSchema = Yup.object().shape({
    billingModel: Yup.string().required("Billing Model Is Required"),
})  
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function AddBillingModel({setRefresh, setAddBillingModelVisibility}){     
    
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
    const [inventoryList,setinventoryList]=useState({})   
    const [refresh2,setRefresh2]=useState(false)
    const toast = useRef(null);
    const formik=useFormik({ 
        initialValues:{ 
         billingModel:"",  
         input:"",
         serviceProvider:parseLoginRes?.company
        }, 
        validationSchema, 
        onSubmit:(values)=>{    
            const dataTosend={billingModel:(formik.values.billingModel).trim(),serviceProvider:parseLoginRes?.company}  
            let inventoryarray=[]
          
           Object.keys(inventoryList).map(item=>{ 
            inventoryarray.push(item.trim())
           })
           dataTosend.inventory=inventoryarray
       Axios.post(`${BASE_URL}/api/billingModel/add`,dataTosend).then(()=>{
        toast.current.show({ severity: "success", summary: "Billing Model Addition", detail: "Added Successfully" });
        setTimeout(() => {
            setAddBillingModelVisibility(false); 
            setRefresh(prev=>!prev)
        }, 1000);
       }).catch(err=>{ 
        toast.current.show({ severity: "error", summary: "Billing Model Addition", detail: err?.response?.data?.msg });
            
       })
        }
    })
    return(   
         
         <div className="flex flex-wrap p-4 justify-content-around flex-row"> 
          <form >
           <div style={{width:"70vw"}}  className="  ml-5   flex flex-wrap justify-content-left flex-row  "> 
           <div className="mt-0 ">
                        <label className="block">
                            Billing Model <span className="star">*</span>
                        </label>
                        <InputText className="field-width mt-2" name="billingModel" value={formik.values.billingModel} onChange={(e)=>{ let sentence=e.target.value;
                        formik.setFieldValue("billingModel",sentence.toUpperCase())}} />
                        {formik.touched.billingModel && formik.errors.billingModel? <p className="mt-2 ml-1 star">{formik.errors.billingModel}</p> : null}
                    </div>  
                     <div style={{width:"30vw"}} className="field-width flex ml-5  flex-wrap flex-row justify-content-left"> 
                     <label className="block w-full">
                            Inventory Types <span style={{color:"red",fontSize:"12px"}}>(Press Enter On Field To Add)</span> <span className="star">*</span>
                        </label> 
                        <div className="block mt-2 ">
                     { 
                        Object.keys(inventoryList).map(item=>(  
                            
                            <p className="inline ml-1  mt-2 ">{item} <i onClick={()=>{   
                                let inventory=inventoryList; 
                                delete  inventory[item]
                                setinventoryList(prev=>(inventory))   
                                setRefresh2(prev=>!prev)
                            }} className="inline ml-2 cursor-pointer pi pi-times"></i></p>    
                            
                        ))
                     }    
                     </div>
                     
                      <InputText name="input" value={formik.values.input} className="inline ml-4 mt-2 w-10rem" onKeyDown={(e)=>{  
                        let key=formik.values.input   
                        if(e.key === 'Enter' || e.keyCode === 13){    
                           
                            
                            setinventoryList(prev=>({...prev,[key]:key}))  
                              formik.setFieldValue("input","")
                        }
                      }} onChange={(e)=>{     
                            let sentence=e.target.value; 
                            
                         formik.setFieldValue("input",sentence.toUpperCase())
                      }}/>
                     </div>
           </div>  
           <div className="w-full  mt-4  ml-5   flex flex-wrap justify-content-left flex-row  "> 
           <div className="mt-0">
                         <Button className="field-width" label="Submit" onClick={formik.handleSubmit} type="button"/>
                      </div>
           </div> 
            </form> 
            
            <Toast ref={toast} />
         </div>
    )
}