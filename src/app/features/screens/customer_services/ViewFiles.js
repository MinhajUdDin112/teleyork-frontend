import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ToastContainer, toast } from "react-toastify";
import BillingNavbar from "../customer_profile/modals/BillingNavbar";
import { InputText } from "primereact/inputtext";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ViewFiles() {
    const [isLoading, setIsLoading] = useState(false);
    const [fileData, setFileData] = useState();
    const [filename, setFilename] = useState(null);
    const [fileerror, setFileError] = useState(false);
    const [customerFile, setCustomerFile] = useState()
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);      
    const [linkError,setLinkError]=useState(false) 
      
    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);     
    const [uploadType,setUploadType]=useState("file")
    const getData = async () => {             
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${parseselectedid}`);
          if(response?.status==200){
            setCustomerFile(response?.data?.data?.pdfPath)          
          }         
        } catch (error) {
         toast.error(error?.response?.data?.msg)        
        }
       
      };

    const getFiles = async () => {
      
        try {
            const response = await Axios.get(`${BASE_URL}/api/web/uploadfiles/get-uploaded-files?enrollmentId=${parseselectedid}`);
            if (response?.status === 200 || response?.status === 201) {
                const sortedFiles = response?.data?.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                setFileData(sortedFiles);
            }
        } catch (error) {
           toast.error("Error of getting of All Files is" + error)
         
        }
    };
    useEffect(() => {
        getFiles();
        getData();
    }, []);

    const formik = useFormik({
         validationSchema:Yup.object().shape({ 
             fileType:Yup.string().required("File Type Is Required"),
         }),
        initialValues: {
            fileType:"",
            file: "",    
            audioUrl:"",
        },
        onSubmit: (e) => {
            handlesubmit();
        },
    });

    const handlesubmit = async () => {  
          
        const formData = new FormData();  
        if(formik.values.file !== ""){
        formData.append("file", formik.values.file); 
        } 
        else{ 
             if(formik.values.audioUrl !== ""){ 
                formData.append("audioUrl", formik.values.audioUrl);   
             }
        }
        formData.append("fileType", formik.values.fileType);
        formData.append("enrollmentId", parseselectedid);
        formData.append("uploadedBy", parseLoginRes?._id); 
        setIsLoading(true);
        if (Object.keys(formik.errors).length === 0) {
            if (formik.values.file !== "" || formik.values.audioUrl !== "") {
                try {
                    const response = await Axios.post(`${BASE_URL}/api/web/uploadfiles/upload-file`, formData);
                 if(response?.status==200){
                    toast.success(response?.data?.msg)
                    setIsLoading(true);
                    getFiles();
                 }
                   
                } catch (error) {
                    if(error?.response?.data?.msg){
                    toast.error(error?.response?.data?.msg); 
                    } 
                    else{ 
                        toast.error(error?.response?.data?.message); 
                    }
                    setIsLoading(true);
                }
            } else {
                setFileError(true);
                setIsLoading(false);
            }
        }
        setIsLoading(false);
    };

    const options = [
        { label: "Select File Type", value: "" },
        { label: "Address Proof", value: "Address Proof History" },
        { label: "Bill Proof History", value: "Bill Proof History" },
    ];
    const handleFileDownload = (filePath) => {
        const trimmedPath = filePath.replace(/^uploads\//, '');  
        const fileUrl = `${BASE_URL}/${trimmedPath}`;  
        const audioUrl = document.createElement("a");
        audioUrl.href = fileUrl;    
        audioUrl.download=trimmedPath.substring(trimmedPath.lastIndexOf("/") + 1) 
        audioUrl.target="_blank" 
        
      document.body.appendChild(audioUrl);
       // audioUrl.setAttribute("download",  trimmedPath.substring(trimmedPath.lastIndexOf("/") + 1)); // Use an empty attribute to indicate that the file should be downloaded
        audioUrl.click(); 
        
      document.body.removeChild(audioUrl);
    };
if(customerFile){
    // const trimmedPath = customerFile.replace(/^uploads\//, '');  
    const fileUrl = `http://dev-api.teleyork.com/${customerFile}`;   
    
}
   
    const downloadCustomerFile=()=>{
       // const trimmedPath = customerFile.replace(/^uploads\//, '');  
        const fileUrl = `http://dev-api.teleyork.com/${customerFile}`;        
        const audioUrl = document.createElement("a");
        audioUrl.href = fileUrl;
        audioUrl.setAttribute("download", ""); // Use an empty attribute to indicate that the file should be downloaded
        document.body.appendChild(audioUrl);
        audioUrl.click();
        document.body.removeChild(audioUrl);
    }

    return (
        <Card>
            <ToastContainer />
            <BillingNavbar/>   
            <div className="p-3">
            <div className="card ">
                <h3>Upload Files</h3> 
                  
                <div className=" mt-2 ">
                        <Dropdown
                            className="w-21rem"
                            options={[{ 
                                label:"File", 
                                value:"file"
                             },{ 
                                label:"audioUrl", 
                                value:"audioUrl"
                             }]}
                            value={uploadType}
                            onChange={(e) => {   
                                 if(e.value === "file"){ 
                                   formik.setFieldValue("audioUrl","")
                                 } 
                                 else{ 
                                    formik.setFieldValue("file","")
                                 }
                                 setUploadType(e.value)
                                
                            }}
                            onBlur={formik.handleBlur}
                        />
                    
                    </div>
                <div className=" flex" style={{ alignItems: "center" }}>   
                   <div className="mt-3  mb-2 mr-3 ">
                        <Dropdown
                            className="w-21rem"
                            id="fileType"
                            options={options}
                            value={formik.values.fileType}
                            onChange={(e) => {
                                formik.setFieldValue("fileType", e.value);
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                        />
                          {formik.touched.fileType && formik.errors.fileType ? (
                            <p className="mt-2 ml-2" style={{ color: "red" }}>
                                {formik.errors.fileType}
                            </p>
                        ) : null}
                    </div>
                    {uploadType === "file" ?<> 
                    <div>
                        <Button
                            className="mr-3 mt-1 text-lg font-bold"
                            onClick={() => {
                                setFileError(false);
                                let input = document.createElement("input");
                                input.type = "file";
                                input.accept = ".csv,.pdf,.png,.jpg,.peg,.bmp,.mp3,.wav,.wma,.gsm,.3gp,.amr,.txt,.doc,.docx,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                                input.click();
                                input.onchange = (e) => {
                                    setFilename(e.target.files[0].name);
                                    formik.setFieldValue("file", e.target.files[0]);
                                };
                            }}
                        >
                            {filename === null ? "Choose File" : filename}
                        </Button>
                        {fileerror ? (
                            <p className="mt-2" style={{ color: "red" }}>
                                File is required
                            </p>
                        ) : undefined}
                    </div>    </>:<div><InputText  
                          value={formik.values.audioUrl}   
                          placeholder="Paste File Link Here"  
                            onChange={(e)=>{  
                                setLinkError(false)
                                formik.setFieldValue("audioUrl",e.target.value)
                            }} 
                            name="audioUrl" 
                            className="ml-2 mr-2 mt-2"
                      />  
                      {linkError ? (
                        <p className="mt-2 block " style={{ color: "red" }}>
                           File Link is required
                        </p>
                    ) : undefined} 
                        </div>
                       }
                    <div className="mt-1">
                        <Button
                            disabled={isLoading}
                            label={`${uploadType === "file"?"Upload":"Submit"}`}
                            onClick={() => { 
                                if(uploadType === "file"){
                                if (formik.values.file === "") {
                                    setFileError(true);
                                }  
                            } 
                            else{ 
                                if (formik.values.audioUrl === "") {
                                    setLinkError(true);
                                }   
                            }
                                
                                formik.handleSubmit();
                            }}
                        />
                    </div>
                 
                </div>  
                
            </div>
            <div className="card">
                <div className=" ">
                    <div className="flex justify-content-between pr-5">
                    <h3 className="font-bold">Uploaded Files</h3>  <Button onClick={downloadCustomerFile} className="mb-3 mr-5" label="Download Customer File"/>
                    </div>
                   
                    <DataTable value={fileData} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="File Type" field="fileType" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                        <Column
                            header="Date"
                            field="uploadDate"
                            body={(rowData) =>
                                new Date(rowData.uploadDate)
                                    .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")
                            }
                            headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                        />
                        <Column header="UploadBy" field="uploadedBy.name" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                        <Column header="File" body={(rowData) => <Button onClick={() => handleFileDownload(rowData.filepath)} label="Download" />} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                       
                    </DataTable>
                </div>
            </div> 
             </div>
        </Card>
    );
}
