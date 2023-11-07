import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload"; 
import { Button } from "primereact/button";
export default function UpdateDeviceBulkUpload() {
    const fileUploadRef = useRef(null);
    function onUpload() {}
    return (
        <div > 
            <div>
                    <Button style={{height:"45px",top:"115px",position:"absolute",right:"75px",fontSize:"bold"}} label="ViewReport" type="button" /> 
                    </div>   
            <div  className="mt-4 flex flex-wrap justify-content-center ">
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
       
                ></FileUpload>  
                </div> 

                <div className="mt-4 flex flex-wrap justify-content-center">
                    <p>Please Upload File To Update Device Detail Into Inventory</p>
                </div>
            
        </div>
    );
}
