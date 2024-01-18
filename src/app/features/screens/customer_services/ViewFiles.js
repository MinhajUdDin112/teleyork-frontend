import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import BillingNavbar from "../customer_profile/modals/BillingNavbar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ViewFiles() {
    const [isLoading, setIsLoading] = useState(false);
    const [fileData, setFileData] = useState();
    const [filename, setFilename] = useState(null);
    const [fileerror, setFileError] = useState(false);

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const getFiles = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/web/uploadfiles/get-uploaded-files?enrollmentId=${parseselectedid}`);
            if (response?.status == 200 || response?.status == 201) {
                setFileData(response?.data);
            }
        } catch (error) {}
    };
    useEffect(() => {
        getFiles();
    }, []);

    const formik = useFormik({
        validationSchema: Yup.object({
            fileType: Yup.string().required("File Type is required"),
            file: Yup.string().required("file is required"),
        }),
        initialValues: {
            fileType: "",
            file: "",
        },
        onSubmit: (e) => {
            handlesubmit();
        },
    });

    const handlesubmit = async () => {
        const formData = new FormData();
        formData.append("file", formik.values.file);
        formData.append("fileType", formik.values.fileType);
        formData.append("enrollmentId", parseselectedid);
        formData.append("uploadedBy", parseLoginRes?._id);
        setIsLoading(true);
        if (Object.keys(formik.errors).length === 0) {
            if (formik.values.file !== "") {
                try {
                    const response = Axios.post(`${BASE_URL}/api/web/uploadfiles/upload-file`, formData);
                    toast.success("File is Uploaded Successfully");
                    setIsLoading(true);
                    getFiles();
                } catch (error) {
                    toast.error(error?.response?.data?.msg);
                    setIsLoading(true);
                }
            } else {
                setFileError(true);
                setIsLoading(false);
            }
        }
    };

    const options = [
        { label: "Select File Type", value: "" },
        { label: "Address Proof", value: "purchaseHistory" },
        { label: "Bill Proof History", value: "orderHistory" },
    ];
    const handleFileDownload = (filePath) => {
        // You may need to modify the file path based on your server configuration
        const fileUrl = `${BASE_URL}/${filePath}`;

        // Trigger the download by creating an invisible link element
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", ""); // Use an empty attribute to indicate that the file should be downloaded
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <ToastContainer />
            <BillingNavbar/>
            <div className="card ">
                <h3>Upload Files</h3>

                <div className="card flex" style={{ alignItems: "center" }}>
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
                    </div>
                    <div className="mt-1">
                        <Button
                            disabled={isLoading}
                            label="Upload"
                            onClick={() => {
                                if (formik.values.file === "") {
                                    setFileError(true);
                                }
                                formik.handleSubmit();
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className=" ">
                    <h3 className="font-bold">Uploaded Files</h3>
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
                        <Column header="File" body={(rowData) => <Button onClick={() => handleFileDownload(rowData.filepath)}>Download</Button>} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
            </div>
        </>
    );
}
