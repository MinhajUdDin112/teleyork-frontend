import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import XLSX library
import BASE_URL from "../../../../config";
import { useSelector } from "react-redux";
import Axios from "axios";

const Upload = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // State to hold the datatable data
    const [tempObjId, setTempObjId] = useState(""); // State to hold the datatable data

    const [allTemps, setAllTemps] = useState([])

    const { loginData } = useSelector((state) => state.login);
    const companyId = loginData?.compony

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
        console.log("now here");
    };

    const onUpload = async () => {
        try {
            setLoading(true);
            toast.success("File uploaded");
        } catch (error) {
            console.error("Error uploading file:", error);
            // Handle the error here
        } finally {
            setLoading(false);
        }
    };

    const getAllTemps = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/all?companyId=${companyId}`);
        setAllTemps(response?.data?.data)
    }

    useEffect(() => {
        getAllTemps()
    }, []);
    console.log('data', data)
    useEffect(() => {

        const objectId = allTemps.filter(item => item?.templateId === data[0]?.templateId)
        const idToPass = objectId[0]?._id
        setTempObjId(idToPass)

        console.log('idToPass', idToPass)

    }, [data]);

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Upload Template</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <FileUpload
                    name="file"
                    url={`${BASE_URL}/api/sms/upload/${tempObjId && tempObjId}`}
                    onUpload={onUpload}
                    multiple
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>}
                    onSelect={handleFileUpload}
                />
            </div>
        </div>
    );
};

export default Upload;
