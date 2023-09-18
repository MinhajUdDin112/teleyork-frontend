import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BASE_URL from "../../../../config";
import axios from "axios";

const PersonalInfo = () => {
    // const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    // const [date3, setDate3] = useState(null);
    const history = useHistory();
    const handleDate = (e) => {
        console.log(e);
    };
    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            SSN: "",
            DOB: "",
            contact: "",
        },
        onSubmit: (values) => {
            // const dob = values.DOB.toLocaleDateString();
            // values.DOB = dob;
            const newData = {
                userId: "648dcb5aa3f7af983cd118e2",
                ...values,
            };
            console.log("values", newData);
            const res = axios.post(`${BASE_URL}/api/enrollment/initialInformation`, newData);
            history.push("/address");
        },
    });

    console.log("formik.values.DOB", new Date(formik.values.DOB));
    console.log("formik.values.DOB", new Date());

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh", // Adjust the height to your preference
                }}
            >
                <div className="col-7">
                    <div className="col-12">
                        <p className="text-4xl font-semibold">IJ Wireless</p>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card flex p-8">
                            <div className="col-6">
                                <p className="text-2xl font-bold">Personal Information</p>
                                <p className="mt-0 text-xl">We'll need some information about yourself to proced</p>
                                <p className="text-lg">Enter the information as it appears on your government issued ID. If you have a middle name, please enter it. If you do not have a middle name, please leave the field blank.</p>
                            </div>
                            <div className="col-6">
                                <div className="flex flex-column">
                                    <InputText className="mb-3" placeholder="First Name" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Select a suffix if needed" name="suffix" value={formik.values.suffix} onChange={formik.handleChange} />
                                    <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="SSN" value={formik.values.SSN} onChange={formik.handleChange} />
                                    <Calendar className="mb-3" id="DOB" value={new Date(formik.values.DOB)} onChange={formik.handleChange} showIcon />
                                    <InputText className="mb-3" placeholder="Contact Phone" name="contact" value={formik.values.contact} onChange={formik.handleChange} />
                                    <div className="mb-3 flex justify-content-center">
                                        <Checkbox inputId="binary" checked={isChecked} onChange={(e) => setIsChecked(e.checked)} />
                                        <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                            Is the Benefit Qualifying Person different?
                                        </label>
                                    </div>
                                    <div>
                                        {isChecked && (
                                            <div className="flex flex-column">
                                                <InputText className="mb-3" placeholder="First Name" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middleName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="SSN" value={formik.values.SSN} onChange={formik.handleChange} />
                                                <InputText className="mb-3" placeholder="Date of Birth" name="DOB" value={formik.values.DOB} onChange={formik.handleChange} />
                                            </div>
                                        )}
                                    </div>
                                    <Button label="Next" type="submit" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
