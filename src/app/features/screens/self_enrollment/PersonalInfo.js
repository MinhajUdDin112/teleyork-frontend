import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PersonalInfo = () => {
    const [date, setDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const history = useHistory();

    const handleClick = () => {
        // Navigate to a different route
        history.push("/address");
    };
    const formik = useFormik({
        initialValues: {
            firstName: "",
            middleName: "",
            lastname: "",
            suffix: "",
            SSN: "",
            DOB: "",
            contact: "",
        },
        onSubmit: () => {},
    });

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
                    <div className="card flex p-8">
                        <div className="col-6">
                            <p className="text-2xl font-bold">Personal Information</p>
                            <p className="mt-0 text-xl">We'll need some information about yourself to proced</p>
                            <p className="text-lg">Enter the information as it appears on your government issued ID. If you have a middle name, please enter it. If you do not have a middle name, please leave the field blank.</p>
                        </div>
                        <div className="col-6">
                            <div className="flex flex-column">
                                <InputText className="mb-3" placeholder="First Name" name="firstName" value={formik.values.firstName} />
                                <InputText className="mb-3" placeholder="Middle Name" name="middleName" value={formik.values.middletName} />
                                <InputText className="mb-3" placeholder="Last Name" name="lastName" value={formik.values.lastName} />
                                <InputText className="mb-3" placeholder="Select a suffix if needed" name="suffix" value={formik.values.suffix} />
                                <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" name="SSN" value={formik.values.SSN} />
                                <Calendar className="mb-3" id="icon" value={date} onChange={(e) => setDate(e.value)} showIcon />
                                <InputText className="mb-3" placeholder="Contact Phone" name="contact" value={formik.values.contact} />
                                <div className="mb-3 flex justify-content-center">
                                    <Checkbox inputId="binary" checked={isChecked} onChange={(e) => setIsChecked(e.checked)} />
                                    <label htmlFor="binary" className="text-xl flex align-items-center ml-2">
                                        Is the Benefit Qualifying Person different?
                                    </label>
                                </div>
                                <div>
                                    {isChecked ? (
                                        <div className="flex flex-column">
                                            <InputText className="mb-3" placeholder="First Name" />
                                            <InputText className="mb-3" placeholder="Middle Name" />
                                            <InputText className="mb-3" placeholder="Last Name" />
                                            <InputText className="mb-3" placeholder="Last 4 SSN or Tribal ID" />
                                            <InputText className="mb-3" placeholder="Date of Birth" />
                                        </div>
                                    ) : null}
                                </div>
                                <Button label="Next" onClick={handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInfo;
