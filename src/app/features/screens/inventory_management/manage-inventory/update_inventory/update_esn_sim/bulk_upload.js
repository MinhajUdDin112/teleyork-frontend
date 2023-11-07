import React,{useRef} from "react";
import { FileUpload } from "primereact/fileupload";
import { vendor,carrier } from "../assets";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown"; 
import { useFormik } from "formik";
export default function EsnSimBulkUpload(){        
    const fileUploadRef=useRef(null)    
    function onUpload(){
        
    }
    const formik = useFormik({
        initialValues: {
            carrier: "",
             vendor:"",
    
        },
    });
    return (
        <div >
          
           
                <div>
                    <Button style={{height:"45px",top:"115px",position:"absolute",right:"75px",fontSize:"bold"}} label="ViewReport" type="button" /> 
                    </div>
                

                
                <div className="flex flex-wrap mb-3 mt-8 justify-content-around ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Carrier</p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Vendor</p>
                        <Dropdown value={formik.values.vendor} options={vendor} onChange={(e) => formik.setFieldValue("vendor", e.value)} placeholder="Select an option" className="w-20rem" />
                    </div>
                </div>
                <div style={{marginLeft:"55%",marginTop:"50px",transform:"translate(-50%)"}}>
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
                        style={{marginLeft:"50%",transform:"translate(-50%)"}}
                    />
                    <div className="mt-3">
                        <p>Please Upload File To Update ESN/SIM's Details Into Inventory</p>
                    </div>
                </div>   
                <p className="mt-4">  
                <span><strong>Header: (Header Required):</strong> </span> ESN/SIM,Model ID, MSL/PUK, PO#, Box, Notes, Wholesale Price, Selling Price, Activation Fee,BYOD (Y/N),MSID , UICCID, Device ID <strong>(Download Sample File)</strong>
                </p>
        </div>
    );
}