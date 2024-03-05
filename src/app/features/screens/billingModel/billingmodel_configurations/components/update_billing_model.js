 import React, { useEffect, useState } from "react";  
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"; 
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Axios from "axios";
const validationSchema = Yup.object().shape({
    billingModel: Yup.string().required("Inventory Type Is Required"),
})  
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function UpdateBillingModel({data ,setRefresh ,setEditBillingModelVisibility}){ 
    const toast = useRef(null);  
    const [inventoryList,setinventoryList]=useState({}) 
    const [refresh2,setRefresh2]=useState([])
    const formik=useFormik({ 
        initialValues:{ 
         billingModel:data?.billingModel, 
         serviceProvider:parseLoginRes?.company, 
         billingModelId:data?._id
        }, 
        validationSchema, 
        onSubmit:(values)=>{    
            const dataTosend={billingModel:formik.values.billingModel,billingModelId:formik.values.billingModelId,serviceProvider:parseLoginRes?.company}  
            let inventoryarray=[]
          
           Object.keys(inventoryList).map(item=>{ 
            inventoryarray.push(item)
           })
           dataTosend.inventory=inventoryarray
       Axios.put(`${BASE_URL}/api/billingModel/update`,dataTosend).then(()=>{
        toast.current.show({ severity: "success", summary: "Billing Model Updation", detail: "Updated Successfully" });
        setTimeout(() => {
            setEditBillingModelVisibility(false); 
            setRefresh(prev=>!prev)
        }, 1000);
       }).catch(err=>{ 
        toast.current.show({ severity: "error", summary: "Billing Model  Updation", detail: err?.response?.data?.msg });
            
       })
        }
    }) 
    useEffect(()=>{ 
         let obj={} 
         data.inventory.map(item=>{ 
              obj[item]=item
         })    
         setinventoryList(obj)
    },[])
    return(   
         
         <div className="flex flex-wrap justify-content-around flex-row"> 
          <form onSubmit={formik.handleSubmit}>
           <div style={{width:"70vw"}} className="    flex flex-wrap justify-content-left flex-row  "> 
           <div className="mt-0">
                        <label className="block">
                            Billing Model <span className="star">*</span>
                        </label>
                        <InputText className="field-width mt-2" name="billingModel" value={formik.values.billingModel} onChange={formik.handleChange} />
                        {formik.touched.billingModel && formik.errors.billingModel? <p className="mt-2 ml-1 star">{formik.errors.billingModel}</p> : null}
                    </div>       
                    <div style={{width:"30vw"}} className="field-width flex ml-5 mt-4 flex-wrap flex-row justify-content-left"> 
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
                     
                      <InputText name="input" value={formik.values.input} className="inline ml-4 w-10rem" onKeyDown={(e)=>{  
                        let key=formik.values.input
                        if(e.key === 'Enter'){    
                            console.log(inventoryList)
                            setinventoryList(prev=>({...prev,[key]:key}))  
                              formik.setFieldValue("input","")
                        }
                      }} onChange={formik.handleChange}/>
                     </div>
           </div>             
           
           <div className="w-full  mt-4    flex flex-wrap justify-content-around flex-row  "> 
           <div className="mt-0">
                         <Button className="field-width" label="Submit" onClick={formik.handleSubmit} type="button"/>
                      </div>
           </div> 
            </form> 
            
            <Toast ref={toast} />
         </div>
    )
}