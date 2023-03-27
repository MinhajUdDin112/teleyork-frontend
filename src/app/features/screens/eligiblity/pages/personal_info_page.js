import { Button } from "primereact/button";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInputField from "../../../components/custom_input_field";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";

export default function PersonalInfoPage(props) {
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
            ssn: "",
            dob: "",
        },

        onSubmit: async (data) => {},
    });

    const reuturnPersonalInfo = () => {
        return (
            <>
                {" "}
                <p>To apply for a Affordable Connectivity program, fillout every section of this form, initial every agreement statement, and sign the last page</p>
                <br></br>
                <p className="text-xl">What is your full legal name?</p>
                <p>The name you use of offical documents lik eyour Social Security Card or State ID not a nick name.</p>
                <form>
                    <div className="grid p-fluid">
                        <CustomInputField className="lg:col-3" iden="fistName" label="First Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Middle Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Last Name" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" label="Suffix" value="" />
                    </div>
                    <div className="grid p-fluid">
                        <CustomInputField className="lg:col-3" iden="fistName" label="SSN" value="" />
                        <CustomInputField className="lg:col-3" iden="fistName" type="date" label="Dat of Birth" value="" />
                    </div>
                    <div className="grid p-fluid">
                        <div className="">
                            <div>
                                <p>What is the best way to reach you?</p>
                                <div className="flex flex-column lg:flex-row gap-6">
                                    <div className="flex">
                                        <Checkbox inputId="cb1" value="New York"></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                            Email
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <Checkbox inputId="cb1" value="New York"></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                            Phone
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <Checkbox inputId="cb1" value="New York"></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                            Text Message
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <Checkbox inputId="cb1" value="New York"></Checkbox>
                                        <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                            Mail
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="grid p-fluid">
                                <CustomInputField className="lg:col-6" iden="fistName" label="Driving License" value="" />
                                <CustomInputField className="lg:col-6" iden="fistName" label="Email" value="" />
                                <CustomInputField className="lg:col-6" iden="fistName" label="Contact Number" value="" />
                            </div>
                        </div>
                        <div className="">
                            <Checkbox inputId="cb1" value="New York"></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label mx-2">
                                Aliquip excepteur ex laboris duis dolor magna ipsum velit occaecat. Incididunt laborum veniam nisi irure elit quis quis ullamco. Excepteur cupidatat in sit sunt velit excepteur est anim.
                            </label>
                        </div>

                        <div className="mt-4">
                            <p>Who recieved government assistance? (SNAP, Medicaid, etc)</p>
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
                                    Aliquip excepteur ex laboris duis dolor magna ipsum velit occaecat. Incididunt laborum veniam nisi irure elit quis quis ullamco. Excepteur cupidatat in sit sunt velit excepteur est anim.
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    };
    const returnHomeAddress = () => {
        return (
            <>
                <br></br>
                <p className="text-xl">What is your home address?</p>
                <p>The address you will get service. Do not use P.O Box</p>
                <form>
                    <div className="grid p-fluid">
                        <CustomInputField className="col-3" iden="fistName" label="Address 1" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="Address 2" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="Zip code" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="City" value="" />
                        <CustomInputField className="col-3" iden="fistName" label="State" value="" />
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
            <div className="flex flex-row justify-content-between">
                <h6>Enrollment ID:</h6>
                <Button
                    label="Continue"
                    onClick={() => {
                        if (selectedPage < 4) {
                            setSelectedPage((prev) => {
                                return prev + 1;
                            });
                        } else {
                            props.changeValue(1);
                        }
                    }}
                />
            </div>
            <br></br>

            {buildPages[pages[selectedPage]]}
        </div>
    );
}
