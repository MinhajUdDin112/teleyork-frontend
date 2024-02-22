import React from "react";  
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button"; 
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Axios from "axios";
const validationSchema = Yup.object().shape({
    inventoryType: Yup.string().required("Inventory Type Is Required"),
})  
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function AddInventory({setRefresh, setAddInventoryVisibility}){ 
    const toast = useRef(null);
    const formik=useFormik({ 
        initialValues:{ 
         inventoryType:"", 
         serviceProvider:parseLoginRes?.company
        }, 
        validationSchema, 
        onSubmit:(values)=>{ 
       Axios.post(`${BASE_URL}/api/inventoryType/add`,formik.values).then(()=>{
        toast.current.show({ severity: "success", summary: "Inventory Type Addition", detail: "Updated Successfully" });
        setTimeout(() => {
            setAddInventoryVisibility(false); 
            setRefresh(prev=>!prev)
        }, 1000);
       }).catch(err=>{ 
        toast.current.show({ severity: "error", summary: "Inventory Type Updation", detail: "Updation Failed" });
            
       })
        }
    })
    return(   
         
         <div className="flex flex-wrap justify-content-around flex-row"> 
          <form onSubmit={formik.handleSubmit}>
           <div className="w-full     flex flex-wrap justify-content-around flex-row  "> 
           <div className="mt-0">
                        <label className="block">
                            Inventory Type <span className="star">*</span>
                        </label>
                        <InputText className="field-width mt-2" name="inventoryType" value={formik.values.inventoryType} onChange={formik.handleChange} />
                        {formik.touched.inventoryType && formik.errors.inventoryType? <p className="mt-2 ml-1 star">{formik.errors.inventoryType}</p> : null}
                    </div>
           </div>  
           <div className="w-full  mt-4    flex flex-wrap justify-content-around flex-row  "> 
           <div className="mt-0">
                         <Button className="field-width" label="Submit" type="submit"/>
                      </div>
           </div> 
            </form> 
            
            <Toast ref={toast} />
         </div>
    )
}