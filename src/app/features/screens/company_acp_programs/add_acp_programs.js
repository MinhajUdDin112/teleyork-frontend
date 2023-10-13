import React, { useState,useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { useFormik } from "formik";          
import { Toast } from 'primereact/toast';
export default function AddAcpProgram() {       
    const toast = useRef(null);
  


    let [showError,setShowError]=useState(false)  
    const loginRes = localStorage.getItem("userData");  
    const parseLoginRes = JSON.parse(loginRes);

    
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.name) {
                errors.name = "Name is required";
            }
            if (!values.description) {
                errors.description = "Description is required";
            }
            return errors;
        },
    });

    function handleAddAcp(e) {       
        e.preventDefault();  
        let data = {
            name: formik.values.name,
            description: formik.values.description,
            serviceProvider: parseLoginRes?.compony,   //Both Service Provider and CreatedBY will be same according to APi
            createdBy: parseLoginRes?._id,
        };
      if(Object.keys(formik.errors).length === 0) {  
        if(data.name !== "" && data.description !== ""){
        Axios.post(`${BASE_URL}/api/web/acpPrograms`, data)
            .then((response) => {
                console.log("Data sent successfully:", response.data);        
                toast.current.show({ severity: 'success', summary: 'Info', detail: 'Added Acp Program Successfully' });
    
            })
            .catch((error) => {
                console.error("Error sending data:", error);  
                toast.current.show({ severity: 'error', summary: 'Info', detail: 'Added Acp Program Failed' });
    
            });       
       
        }   
        else{ 
            formik.errors.name="Name is Required" 
            formik.errors.description="Description is Required"  
            setShowError(true)
        }

        }  
        else{ 
            setShowError(true)
        }
      
    }
    return (
        <form style={{ marginTop: "45px" }} onSubmit={handleAddAcp}>
            <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                    <p className="m-0">Name:</p>
                    <InputText type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
                    {showError? <div className="error" style={{ marginTop: "22px", color: "red" }}>
                        {formik.errors.name}
                    </div>  :undefined 
}
                </div>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "23em" }}>
                    <p className="m-0">Description:</p>
                    <InputText type="text" value={formik.values.description} onChange={formik.handleChange} name="description" />

                   {showError ? <div className="error" style={{ marginTop: "22px", color: "red" }}>
                        {formik.errors.description}
                    </div> :undefined
                    }
                </div>
            </div>

            <Button type="submit" label="Add" style={{ marginTop: "15px",paddingLeft:"35px",paddingRight:"35px", marginLeft: "50%", transform: "translate(-50%)" }} />
            <Toast ref={toast} />
        </form>
    );
}
