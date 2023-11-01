import React,{useRef} from "react" 
import { useFormik } from "formik";
import { carrier,company,agent,master} from "../../assets"; 
import {Dropdown} from "primereact/dropdown"    
import { FileUpload } from "primereact/fileupload";
export default function SIMBulkUploadAddProvision(){  
    const fileUploadRef=useRef(null)  
     function onUpload(){ 

     }
    const formik=useFormik({ 
        initialValues:{
            carrier:"", 
            company:"", 
            agent:"", 
            master:"",
           

        }
    }) 
    return (
        <>
            <div>
               
                <div className="flex flex-wrap mb-3  justify-content-around">
   
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Carrier <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.company} options={company} onChange={(e) => formik.setFieldValue("company", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.agent} options={agent} onChange={(e) => formik.setFieldValue("agent", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Master <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.master} options={master} onChange={(e) => formik.setFieldValue("master", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                </div>
                <div>
                    <FileUpload
                        ref={fileUploadRef}
                        mode="basic"
                        chooseLabel="Add File"
                        uploadLabel="Upload"
                        cancelLabel="Cancel"
                        multiple
                        accept="image/*,application/pdf"
                        maxFileSize={1000000} // Set the maximum file size (1MB in this example)
                        onUpload={onUpload}
                    />
                    <div className="mt-3">
                        <p>Note: Please Select Carrier To Download the Sample File</p>
                    </div>
                </div>
            </div>
        </>
    );
}