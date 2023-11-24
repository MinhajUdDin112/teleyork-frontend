import React, { useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { ToastContainer,  } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import * as XLSX from "xlsx"; // Import XLSX library
import BASE_URL from "../../../../config";

const UploadBulk = () => {

  const onUpload = async () => {
    try {
      //  setLoading(true);
        toast.success("File Successfully Uploaded to Drafts. Please review and approve.");
    } catch (error) {
     
        // Handle the error here
    } finally {
      //  setLoading(false);
    }
};
   
    return (
        <>
            <div className="card ">
              <h5>Bulk Upload</h5>
            </div>

            <div className=" ml-3 flex  flex-column">
              <h5>Please Select a file.</h5> 
              <div className="steric"><h5>it's name should be sac-filename like (111111-example.csv) and it's extension should be csv only.</h5></div>
               
                <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000}  onUpload={onUpload} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            </div>
          
        </>
    );
};

export default UploadBulk;
