import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
const Address = ({ handleNext }) => {
    const [ingredient, setIngredient] = useState("");
    const [tempAdd, setTempAdd] = useState(false);
    const [permaAdd, setPermaAdd] = useState(false);
    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
        address2: Yup.string().required("Address is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        zip: Yup.string().required("zip is required"),
        confrimAddress: Yup.string().required("please confrim address"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            confrimAddress: "",
        },
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
            handleNext();
        },
    });

    const handleAddress = (e) => {
        if (e.value === "temp") {
            if (e.value == formik.values.confrimAddress) {
                setTempAdd(false);
            } else {
                setTempAdd(true);
            }
            setPermaAdd(false);
            formik.values.confrimAddress = e.value;
        } else if (e.value === "permanent") {
            if (e.value == formik.values.confrimAddress) {
                setPermaAdd(false);
            } else {
                setPermaAdd(true);
            }
            setTempAdd(false);
            formik.values.confrimAddress = e.value;
        }
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-tems-center mb-2">
                    <h6 className="font-semibold">Enrollment ID:</h6>
                    <Button type="submit" label="Continue" />
                </div>
                <br></br>
                <p className="text-xl">What is your home address?</p>
                <p>The address you will get service. Do not use P.O Box</p>

                <div className="flex flex-wrap mb-3">
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
                    <Checkbox inputId="permaAdd" value="permanent" name="permanent" checked={permaAdd} onChange={(e) => handleAddress(e)}></Checkbox>
                    <label className="ml-2">NO</label>
                </div>
                <div className="flex align-items-center ml-2">
                    <Checkbox inputId="tempAdd" value="temp" name="temp" checked={tempAdd} onChange={(e) => handleAddress(e)}></Checkbox>
                    <label className="ml-2">Yes</label>
                </div>
            </div>
        </>
    );
};

export default Address;
