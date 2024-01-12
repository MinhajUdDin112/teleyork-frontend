import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ViewFiles = () => {
    const [fileData, setFileData] = useState();

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const validationSchema = Yup.object().shape({
        fileType: Yup.string().required("Please select File Type"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fileType: "",
            file: "",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                UserId: parseselectedid,
                fileType: formik.values.fileType,
                file: formik.values.file,
            };
            
            console.log("data to send is", dataToSend);
           
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setFileData(response?.data?.data);
                    console.log("Data is", response?.data?.data);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
               
            }
        },
    });

    const options = [
        { label: "Select File Type", value: "" },
        { label: "Address Proof", value: "purchaseHistory" },
        { label: "Bill Proof History", value: "orderHistory" },
    ];

    const onUpload = async () => {
        try {
            toast.success("File Successfully Uploaded.");
        } catch (error) {
            console.log("error is", error);
        } finally {
        }
    };

    return (
        <>
            <div></div>
            <div className="card">
                <h3>Upload Files</h3>
                <div className="flex " style={{alignItems:'center'}}>
                    <div className="mt-3 mb-2 mr-3 ">
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
                    <h5 > <span className="font-bold">Note:</span>  Only JPG, PNG, PDF, JPEG, BMP, MP3, WAV, WMA, GSM, 3GP, AMR, TXT, DOC, and DOCX files are allowed. The file size should be less than 5 MB.</h5>
                </div>

                <FileUpload
                    name="demo[]"
                    onSelect={(event) => {
                        const selectedFile = event.files && event.files.length > 0 ? event.files[0] : null;
                        formik.setFieldValue("file", selectedFile);
                    }}
                    
                    multiple
                    accept=".csv,.pdf,png,.jpg,.peg,.bmp,.mp3,.wav,.wma,.gsm,.3gp,.amr,.txt,.doc,.docx"
                    onUpload={onUpload}
                    maxFileSize={5000000}
                    emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                />
            </div>
            <div>
            <div className=" card">
                            <h3 className="font-bold">Uploaded Files</h3>
                            <DataTable value={fileData} showGridlines resizableColumns columnResizeMode="fit" >
                                <Column header="#" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="File Type" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="DateTime" field="NahistoryDatame.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="UploadBy" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                                <Column header="File" field="historyData.firstName" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                               
                            </DataTable>
                            
                        </div>
            </div>
        </>
    );
};

export default ViewFiles;
