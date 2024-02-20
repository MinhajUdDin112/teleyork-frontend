import React from "react";  
import Axios from "axios";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext"; 
import { useFormik } from "formik";
import { Button } from "primereact/button";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function AddNewFeature(compony,setNewFeature,getFeature){  
      const formik=useFormik({ 
        initialValues:{ 
             ServiceProvider:compony, 
             featureName:"", 
             featureAmount:""
        }
      })
    const addFeature = async () => {
        const dataToSend = {
            ServiceProvider:compony,
            featureName: formik.values.featureName,
            featureAmount: formik.values.featureAmount,
        };

        try {
            const response = await Axios.post(`${BASE_URL}/api/web/feature/addfeature`, dataToSend);
            if (response?.status == 200 || response?.status == 201) {
                setNewFeature(false); // Fix the typo here
                getFeature();
                toast.success("Feature added successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    return(  
         
        <div className="flex flex-wrap justify-content-evenly flex-row ">
          
                <div className="field-width">
                    <label className="field_label mb-2 text-lg ">Name</label>
                    <InputText id="featureName"  className="field-width" value={formik.values.featureName} onChange={formik.handleChange} />
                </div>
                <div className="field-width  ">
                    <label className="field_label mb-2 text-lg "> Amount </label>
                    <InputText id="featureAmount" className="field-width"  value={formik.values.featureAmount} onChange={formik.handleChange} />
                </div> 
                 <div className="w-full flex  mt-4 flex-wrap flex-row justify-content-center ">
                <Button label="Add Feature" className="field-width"/>
             </div>
            </div>
    
    )
}