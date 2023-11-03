import React, { useRef } from "react";
import { useFormik } from "formik";
import { carrier, company, agent } from "../../assets";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";
export default function GSMBulkUpload() {
    const fileUploadRef = useRef();
    function onUpload() {}
    const formik = useFormik({
        initialValues: {
            carrier: "",
            company: "",
            agent: "",
            tinnumber: "",
            trackingnumber: "",
            imei: "",
        },
    });
    return (
        <>
            <div>
                <div className="flex flex-wrap mb-3  justify-content-around ">
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
                            Tracking Number <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.trackingnumber} name="trackingnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">TIN Number</p>
                        <InputText type="text" value={formik.values.tinnumber} name="tinnumber" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-20rem" />
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
                        style={{ width: "50%", marginLeft: "50%", textAlign: "center", transform: "translate(-50%)" }}
                    />
                    <div className="mt-3">
                        <p style={{ width: "50%", marginLeft: "50%", textAlign: "center", transform: "translate(-50%)" }}>Note: Please Select Carrier To Download the Sample File</p>
                    </div>
                </div>
            </div>
            <div>
                <Card
                    style={{
                        width: "50%",
                        backgroundColor: "#aae5e9",
                        marginBottom: "20px",
                        marginLeft: "50%",
                        marginTop: "50px",
                        transform: "translate(-50%)",
                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div className="ml-3">
                        <h2>ACP Co-Pay Amount</h2>
                        <p>in this feild enter the amount that will be paid by the customer when thy are eligible to get acp supported device</p>
                        <h3>ACP Device Reimbursement Amount </h3>
                        <p>in this feild enter the amount that will be Reimbursed from USAC for selling the acp device</p>
                    </div>
                </Card>
            </div>
        </>
    );
}
