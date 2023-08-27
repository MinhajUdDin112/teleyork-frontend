import { Button } from "primereact/button";
import React, { useState } from "react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { useDispatch } from "react-redux";
import { addCustomerInfoAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";

export default function PersonalInfoPage({ setActiveIndex }) {
    const dispatch = useDispatch();
    let pages = ["personal", "homeAddress", "question1", "question2", "question3"];
    const [selectedPage, setSelectedPage] = useState(0);
    const [ingredient, setIngredient] = useState("");
    const handlenext = () => {
        if (selectedPage < 4) {
            setSelectedPage((prev) => {
                return prev + 1;
            });
        } else {
            setActiveIndex(1);
        }
    };

    const reuturnPersonalInfo = () => {
        const [emailChecked, setEmailChecked] = useState(false);
        const [phoneChecked, setPhoneChecked] = useState(false);
        const [textChecked, setTextChecked] = useState(false);
        const [mailChecked, setMailChecked] = useState(false);
        const [acp, setAcp] = useState(false);
        const [myself, setMyself] = useState(true);
        const [somebody, setSomebody] = useState(false);

        const validationSchema = Yup.object().shape({
            firstName: Yup.string().required("FirstName is required."),
            middleName: Yup.string().required("MiddleName is required."),
            lastName: Yup.string().required("LastName is required."),
            suffix: Yup.string().required("Suffix is required."),
            SSN: Yup.string().required("SSN is required."),
            DOB: Yup.string().required("DOB is required."),
            contact: Yup.string().required("Contact is required."),
            drivingLicense: Yup.string().required("DrivingLicense is required."),
            email: Yup.string().required("Email is required."),
            bestWayToReach: Yup.string().required("BestWayToReach is required."),
            isSelfReceive: Yup.string().required("SelfReceive is required."),
            isACP: Yup.string().required("ACP is required."),
        });
        const formik = useFormik({
            validationSchema: validationSchema,
            initialValues: {
                firstName: "",
                middleName: "",
                lastName: "",
                suffix: "",
                SSN: "",
                DOB: "",
                contact: "",
                drivingLicense: "",
                email: "",
                bestWayToReach: "",
                isSelfReceive: true,
                isACP: false,
            },
            onSubmit: (values, actions) => {
                console.log(values);
                actions.resetForm();
                handlenext();
            },
        });
        const handleReach = (e) => {
            if (e.value === "email") {
                if (e.value == formik.values.bestWayToReach) {
                    setEmailChecked(false);
                } else {
                    setEmailChecked(true);
                }

                setPhoneChecked(false);
                setTextChecked(false);
                setMailChecked(false);
                formik.values.bestWayToReach = e.value;
            } else if (e.value === "phone") {
                if (e.value == formik.values.bestWayToReach) {
                    setPhoneChecked(false);
                } else {
                    setPhoneChecked(true);
                }
                setEmailChecked(false);
                setTextChecked(false);
                setMailChecked(false);
                formik.values.bestWayToReach = e.value;
            } else if (e.value === "text") {
                if (e.value == formik.values.bestWayToReach) {
                    setTextChecked(false);
                } else {
                    setTextChecked(true);
                }
                setEmailChecked(false);
                setPhoneChecked(false);
                setMailChecked(false);
                formik.values.bestWayToReach = e.value;
            } else if (e.value === "mail") {
                if (e.value == formik.values.bestWayToReach) {
                    setMailChecked(false);
                } else {
                    setMailChecked(true);
                }
                setEmailChecked(false);
                setPhoneChecked(false);
                setTextChecked(false);
                formik.values.bestWayToReach = e.value;
            }
        };
        const handleACP = (e) => {
            if (formik.values.isACP == true) {
                formik.values.isACP = false;
                setAcp(false);
            } else {
                formik.values.isACP = true;
                setAcp(true);
            }
        };

        const handleRadio = (e) => {
            if (e.value == "myself") {
                setMyself(true);
                formik.values.isSelfReceive = true;
                setSomebody(false);
            } else {
                setMyself(false);
                formik.values.isSelfReceive = false;
                setSomebody(true);
            }
        };
        return (
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" type="submit" />
                </div>
                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>The name you use on offical documents like your Social Security Card or State ID, Not a Nick Name.</p>

                <div className="flex flex-wrap mb-3">
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            First Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.firstName} name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.firstName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Middle Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.middleName} name="middleName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.middleName && formik.errors.middleName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.middleName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Last Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.lastName} name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.lastName}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Suffix <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.suffix} name="suffix" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.suffix && formik.errors.suffix ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.suffix}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            SSN <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.SSN} name="SSN" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.SSN && formik.errors.SSN ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.SSN}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            DOB <span style={{ color: "red" }}>*</span>
                        </p>
                        <Calendar id="icon" value={formik.values.DOB} name="DOB" onChange={formik.handleChange} onBlur={formik.handleBlur} showIcon className="w-21rem" />
                        {formik.touched.DOB && formik.errors.DOB ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.DOB}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Driving License <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.drivingLicense} name="drivingLicense" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.drivingLicense && formik.errors.drivingLicense ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.drivingLicense}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Email <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.email}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Contact Number <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.contact} name="contact" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.contact && formik.errors.contact ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.contact}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="col-6 mb-3 p-0">
                    <p className="font-semibold">What is the best way to reach you?</p>
                    <div className="flex flex-wrap">
                        <div className="flex align-items-center mr-3">
                            <Checkbox inputId="email" value="email" name="email" checked={emailChecked} onChange={(e) => handleReach(e)}></Checkbox>
                            <label htmlFor="email" className="p-checkbox-label mx-2">
                                Email
                            </label>
                        </div>
                        <div className="flex align-items-center mr-3">
                            <Checkbox inputId="phone" value="phone" name="phone" checked={phoneChecked} onChange={(e) => handleReach(e)}></Checkbox>
                            <label htmlFor="phone" className="p-checkbox-label mx-2">
                                Phone
                            </label>
                        </div>
                        <div className="flex align-items-center mr-3">
                            <Checkbox inputId="text" value="text" name="text" checked={textChecked} onChange={(e) => handleReach(e)}></Checkbox>
                            <label htmlFor="text" className="p-checkbox-label mx-2">
                                Text Message
                            </label>
                        </div>
                        <div className="flex align-items-center mr-3">
                            <Checkbox inputId="mail" value="mail" name="mail" checked={mailChecked} onChange={(e) => handleReach(e)}></Checkbox>
                            <label htmlFor="mail" className="p-checkbox-label mx-2">
                                Mail
                            </label>
                        </div>
                    </div>
                </div>

                <div className=" mb-3">
                    <Checkbox inputId="cb1" value="New York"></Checkbox>
                    <label htmlFor="cb1" className="p-checkbox-label mx-2">
                        By checking this box and your signature below, you are agreeing to the terms and conditions.
                    </label>
                </div>

                <div className="mt-4">
                    <p className="font-semibold">Who recieved government assistance? (SNAP, Medicaid, etc)</p>
                    <div className="flex">
                        <div className="flex align-items-center">
                            <RadioButton inputId="myself" value="myself" name="myself" onChange={(e) => handleRadio(e)} checked={myself} />
                            <label htmlFor="myself" className="ml-2">
                                Myself
                            </label>
                        </div>
                        <div className="flex align-items-center ml-2">
                            <RadioButton inputId="somebody" value="somebody" name="somebody" onChange={(e) => handleRadio(e)} checked={somebody} />
                            <label htmlFor="somebody" className="ml-2">
                                Somebody else in household
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3>Affordable Connectivity Program (ACP) Consent</h3>
                    <div className="flex">
                        <Checkbox inputId="isACP" checked={acp} onChange={(e) => handleACP(e)}></Checkbox>
                        <label htmlFor="isACP" className="p-checkbox-label mx-2">
                            By continuing with your application, you affirm and understand that the Affordable Connectivity Program is an FCC benefit program that reduce your monthly broadband invoice. The program will be in effect for an indefinite amount of time. At the conclusion of the program,
                            you will be given 30 days notice and may elect to keep your plan at an undiscounted rate. As a participant yoy may transfer your ACP benefit to another provider. The Affordable Connectivity Program is limited to one monthly service discount and one device discount per
                            hoousehold.
                        </label>
                    </div>
                </div>
            </form>
        );
    };
    const returnHomeAddress = () => {
        const validationSchema = Yup.object().shape({
            address1: Yup.string().required("Address1 is required."),
            address2: Yup.string().required("Address2 is required."),
            city: Yup.string().required("City is required."),
            state: Yup.string().required("State is required."),
            zip: Yup.string().required("Zip is required."),
        });
        const formik = useFormik({
            validationSchema: validationSchema,
            initialValues: {
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                isTemporaryAddress: "",
            },
            onSubmit: (values, actions) => {
                console.log(values);
                actions.resetForm();
                handlenext();
            },
        });
        return (
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button type="submit" label="Continue" />
                </div>
                <br></br>
                <p className="text-xl">What is your home address?</p>
                <p>The address you will get service. Do not use P.O Box</p>
                <form>
                    <div className="grid p-fluid">
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Address 1 <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.address1} name="address1" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                            {formik.touched.address1 && formik.errors.address1 ? (
                                <p className="mt-0" style={{ color: "red" }}>
                                    {formik.errors.address1}
                                </p>
                            ) : null}
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Address 2 <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                            {formik.touched.address2 && formik.errors.address2 ? (
                                <p className="mt-0" style={{ color: "red" }}>
                                    {formik.errors.address2}
                                </p>
                            ) : null}
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                Zip Code <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.zip} name="zip" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                            {formik.touched.zip && formik.errors.zip ? (
                                <p className="mt-0" style={{ color: "red" }}>
                                    {formik.errors.zip}
                                </p>
                            ) : null}
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                City <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                            {formik.touched.city && formik.errors.city ? (
                                <p className="mt-0" style={{ color: "red" }}>
                                    {formik.errors.city}
                                </p>
                            ) : null}
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">
                                State <span style={{ color: "red" }}>*</span>
                            </p>
                            <InputText type="text" value={formik.values.state} name="state" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                            {formik.touched.state && formik.errors.state ? (
                                <p className="mt-0" style={{ color: "red" }}>
                                    {formik.errors.state}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </form>
                <p>Is this a temporary address?</p>
                <div className="flex">
                    <div className="flex align-items-center">
                        <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === "Mushroom"} />
                        <label htmlFor="ingredient2" className="ml-2">
                            Yes
                        </label>
                    </div>
                    <div className="flex align-items-center ml-2">
                        <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === "Mushroom"} />
                        <label htmlFor="ingredient2" className="ml-2">
                            No
                        </label>
                    </div>
                </div>
            </form>
        );
    };

    const returnQuestion1 = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" />
                </div>
                <h3>Do you live with another adult?</h3>
                <p>Adults are people who are 18 years or older, or who are emancipated minors. This can include a spouse, domestic partner, parent, adult son or daughter, adult in your family, adult roomate etc.</p>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" className="p-button-success" />
                    <Button icon="pi pi-times" label="No" className="p-button-danger" />
                </div>
            </>
        );
    };
    const returnQuestion2 = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" />
                </div>
                <h3>Do they get the Affordable Connectivity Program?</h3>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" className="p-button-success" />
                    <Button icon="pi pi-times" label="No" className="p-button-danger" />
                </div>
            </>
        );
    };
    const returnQuestion3 = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" />
                </div>
                <h3>Do yoy share money (incomeand expenses) with another adult who gets the Affordable Connectivity Program Benifit?</h3>
                <p>This can be cost of bills, food etc and income. If you are married, you should check yes for this question.</p>
                <div className="flex flex-row justify-content-between">
                    <Button icon="pi pi-check" label="Yes" className="p-button-success" />
                    <Button icon="pi pi-times" label="No" className="p-button-danger" />
                </div>
            </>
        );
    };

    let buildPages = {
        personal: reuturnPersonalInfo(),
        homeAddress: returnHomeAddress(),
        question1: returnQuestion1(),
        question2: returnQuestion2(),
        question3: returnQuestion3(),
    };

    return (
        <div className="card">
            <br></br>

            {buildPages[pages[selectedPage]]}
        </div>
    );
}
