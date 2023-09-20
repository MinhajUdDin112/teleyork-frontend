import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { useFormik } from "formik";
export default function AddAcpProgram() {   
    let [showError,setShowError]=useState(false)
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
            serviceProvider: "645a85198cd1ff499c8b99cd",   //Both Service Provider and CreatedBY will be same according to APi
            createdBy: "645a85198cd1ff499c8b99cd",
        };
      if(Object.keys(formik.errors).length === 0) {
        Axios.post(`${BASE_URL}/api/web/acpPrograms`, data)
            .then((response) => {
                console.log("Data sent successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error sending data:", error);
            });  
        }  
        else{ 
            setShowError(true)
        }
        console.log("data will submit here");
    }
    return (
        <form style={{ marginTop: "45px" }} onSubmit={handleAddAcp}>
            <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "30em" }}>
                    <p className="m-0">Name:</p>
                    <InputText type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
                    {showError? <div className="error" style={{ marginTop: "22px", color: "red" }}>
                        {formik.errors.name}
                    </div>  :undefined 
}
                </div>
                <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "30em" }}>
                    <p className="m-0">Description:</p>
                    <InputText type="text" value={formik.values.description} onChange={formik.handleChange} name="description" />

                   {showError ? <div className="error" style={{ marginTop: "22px", color: "red" }}>
                        {formik.errors.description}
                    </div> :undefined
                    }
                </div>
            </div>

            <Button type="submit" label="Add" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
        </form>
    );
}
