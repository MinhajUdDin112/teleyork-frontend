import { Button } from "primereact/button";
import React, { useState } from "react";
import { useFormik } from "formik";
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

    const validationSchema = Yup.object().shape({
        zip: Yup.string().required("Zip is required."),
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
            isSelfReceive: false,
            isACP: false,
        },
    });

    const submitHandler = () => {
        switch (selectedPage) {
            case 0:
                //case 1 api
                dispatch(addCustomerInfoAction(formik.values));
                break;
            case 1:
                // case 2 api
                break;
            case 2:
                // case 3 api
                break;
            default:
            //default
        }
        if (selectedPage < 4) {
            setSelectedPage((prev) => {
                return prev + 1;
            });
        } else {
            setActiveIndex(1);
        }
    };
    const reuturnPersonalInfo = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" onClick={submitHandler} />
                </div>
                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <p className="text-xl font-semibold">What is your full legal name?</p>
                <p>The name you use on offical documents like your Social Security Card or State ID, Not a Nick Name.</p>
                <form>
                    <div className="flex flex-wrap mb-3">
                        <div className="mr-3 mb-3">
                            <p className="m-0">First Name:</p>
                            <InputText type="text" value={formik.values.firstName} name="firstName" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Middle Name:</p>
                            <InputText type="text" value={formik.values.middleName} name="middleName" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Last Name:</p>
                            <InputText type="text" value={formik.values.lastName} name="lastName" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Suffix:</p>
                            <InputText type="text" value={formik.values.suffix} name="suffix" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">SSN:</p>
                            <InputText type="text" value={formik.values.SSN} name="SSN" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">DOB:</p>
                            <Calendar id="icon" value={formik.values.DOB} name="DOB" onChange={formik.handleChange} showIcon className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Driving License:</p>
                            <InputText type="text" value={formik.values.drivingLicense} name="drivingLicense" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Email:</p>
                            <InputText type="text" value={formik.values.email} name="email" onChange={formik.handleChange} className="w-21rem" />
                        </div>
                        <div className="mr-3 mb-3">
                            <p className="m-0">Contact Number:</p>
                            <InputText type="text" value={formik.values.contact} name="contact" onChange={formik.handleChange} className="w-21rem" />
                        </div>

                        {/* <CustomInputField className="lg:col-3" iden="fistName" label="First Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Middle Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Last Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Suffix" value="" /> */}
                    </div>
                    {/* <div className="flex flex-wrap mb-3">
                        <CustomInputField className="lg:col-3" iden="fistName" label="SSN" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" type="date" label="Dat of Birth" value="" />
                    </div> */}
                    {/* <div className="flex flex-wrap mb-3">
                        <CustomInputField className="lg:col-6" iden="fistName" label="Driving License" value="" />
                                <CustomInputField className="lg:col-6" iden="fistName" label="Email" value="" />
                                <CustomInputField className="lg:col-6" iden="fistName" label="Contact Number" value="" />
                    </div> */}

                    <div className="col-6 mb-3 p-0">
                        <p className="font-semibold">What is the best way to reach you?</p>
                        <div className="flex flex-wrap">
                            <div className="flex align-items-center mr-3">
                                <Checkbox inputId="cb1" value="New York"></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    Email
                                </label>
                            </div>
                            <div className="flex align-items-center mr-3">
                                <Checkbox inputId="cb1" value="New York"></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    Phone
                                </label>
                            </div>
                            <div className="flex align-items-center mr-3">
                                <Checkbox inputId="cb1" value="New York"></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                    Text Message
                                </label>
                            </div>
                            <div className="flex align-items-center mr-3">
                                <Checkbox inputId="cb1" value="New York"></Checkbox>
                                <label htmlFor="cb1" className="p-checkbox-label mx-2">
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
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === "Mushroom"} />
                                <label htmlFor="ingredient2" className="ml-2">
                                    Myself
                                </label>
                            </div>
                            <div className="flex align-items-center ml-2">
                                <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === "Mushroom"} />
                                <label htmlFor="ingredient2" className="ml-2">
                                    Somebody else in household
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3>Affordable Connectivity Program (ACP) Consent</h3>
                        <div className="flex">
                            <Checkbox inputId="cb1" value="New York"></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                By continuing with your application, you affirm and understand that the Affordable Connectivity Program is an FCC benefit program that reduce your monthly broadband invoice. The program will be in effect for an indefinite amount of time. At the conclusion of the
                                program, you will be given 30 days notice and may elect to keep your plan at an undiscounted rate. As a participant yoy may transfer your ACP benefit to another provider. The Affordable Connectivity Program is limited to one monthly service discount and one device
                                discount per hoousehold.
                            </label>
                        </div>
                    </div>
                </form>
            </>
        );
    };
    const returnHomeAddress = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button type="submit" label="Continue" onClick={submitHandler} />
                </div>
                <br></br>
                <p className="text-xl">What is your home address?</p>
                <p>The address you will get service. Do not use P.O Box</p>
                <form>
                    <div className="grid p-fluid">
                        {/* <CustomInputField className="col-3" iden="fistName" label="Address 1" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="Address 2" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="Zip code" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="City" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="State" value="" /> */}
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
            </>
        );
    };

    const returnQuestion1 = () => {
        return (
            <>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button label="Continue" onClick={submitHandler} />
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
                    <Button label="Continue" onClick={submitHandler} />
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
                    <Button label="Continue" onClick={submitHandler} />
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
