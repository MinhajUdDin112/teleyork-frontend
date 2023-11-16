import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { toast } from "react-toastify";
import { ToastContainer,  } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import * as XLSX from "xlsx"; // Import XLSX library
import BASE_URL from "../../../../config";
import { useSelector } from "react-redux";
import Axios from "axios";

const Upload = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // State to hold the datatable data
    const [tempObjId, setTempObjId] = useState(""); // State to hold the datatable data
    const [btnClicked, setBtnClicked] = useState(false)

    const [allTemps, setAllTemps] = useState([])

    const { loginData } = useSelector((state) => state.login);

    const userId = loginData?._id

    const handleFileUpload = (event) => {
        const file = event.files[0]; // Get the selected file
        const reader = new FileReader(); // Create a FileReader object

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result); // Convert file data to an array
            const workbook = XLSX.read(data, { type: "array" }); // Read the workbook from the file data
            const sheetName = workbook.SheetNames[0]; // Get the name of the first sheet
            const worksheet = workbook.Sheets[sheetName]; // Get the worksheet by name
            const jsonData = XLSX.utils.sheet_to_json(worksheet); // Convert worksheet data to JSON format
            setData(jsonData); // Update the state with the extracted data
        };

        reader.readAsArrayBuffer(file); // Read the file as an array buffer
       
    };

    const onUpload = async () => {
        try {
            setLoading(true);
            toast.success("File Successfully Uploaded to Drafts. Please review and approve.");
        } catch (error) {
         
            // Handle the error here
        } finally {
            setLoading(false);
        }
    };

    const getAllTemps = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/all?userId=${userId}`);
        setAllTemps(response?.data?.data)
    }

    useEffect(() => {
        getAllTemps()
    }, []);

    useEffect(() => {

        const objectId = allTemps.filter(item => item?.templateId === data[0]?.templateId)
        const idToPass = objectId[0]?._id
        setTempObjId(idToPass)

    }, [data]);

    const handleUpload=()=>{
        setBtnClicked(true);
    }
    const chooseOptions = { label: 'Select', className: 'custom-choose-btn p-button-solid' };
    const uploadOptions = { 
        label: 'Send', 
        className: 'custom-upload-btn p-button-solid', 
       
      };
      
  

    return (
        <div className="card bg-pink-50">
            <ToastContainer />
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Upload Template</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <FileUpload
                    name="file"
                    url={`${BASE_URL}/api/sms/upload/${tempObjId && tempObjId}`}
                    onUpload={onUpload}
                    // multiple
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                    onSelect={handleFileUpload}
                    chooseOptions={chooseOptions}
                    uploadOptions={uploadOptions}
                   
                />
            </div>
        </div>
    );
};

export default Upload;
