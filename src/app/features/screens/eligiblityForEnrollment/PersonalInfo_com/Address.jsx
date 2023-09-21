import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addCustomerAddressAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";

const Address = ({ handleNext, id, handleBack, enrollmentId }) => {
    const zipCode = useSelector((state) => {
        return state.zip;
    });
    const zipcode = zipCode?.serviceAvailability?.data?.zip;

    const dispatch = useDispatch();
    const [tempAdd, setTempAdd] = useState(false);
    const [permaAdd, setPermaAdd] = useState(false);
    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        isTemporaryAddress: Yup.string().required("please confrim address"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            isTemporaryAddress: "",
            postalAddress: "",
            isSameServiceAddress: "",
            isNotSameServiceAddress: "",
            isPoBoxAddress: "",
        },
        onSubmit: (values, actions) => {
            actions.resetForm();
            handleNext();
            const userId = id;
            const zip = zipcode;
            const csr = "645c7bcfe5098ff6251a2255";
            const dataToSend = { userId, csr, zip, ...values };

            dispatch(addCustomerAddressAction(dataToSend));
        },
    });

    const handleAddress = (e) => {
        if (e.value === "temp") {
            if (e.value == formik.values.isTemporaryAddress) {
                setTempAdd(false);
            } else {
                setTempAdd(true);
            }
            setPermaAdd(false);
            formik.values.isTemporaryAddress = true;
        } else if (e.value === "permanent") {
            if (e.value == formik.values.isTemporaryAddress) {
                setPermaAdd(false);
            } else {
                setPermaAdd(true);
            }
            setTempAdd(false);
            formik.values.isTemporaryAddress = false;
        }
    };
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-items-center mb-2">
                    <Button label="Back" type="button" onClick={handleBack} />
                    <Button label="Continue" type="submit" />
                </div>
                <div>
                    <h6>Enrollment ID: {enrollmentId}</h6>
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
                        <p className="m-0">Address 2</p>
                        <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Zip Code</p>
                        <InputText value={zipcode} name="zip" className="w-21rem" disabled />
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">State</p>
                        <InputText type="text" value={formik.values.state} name="state" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.state && formik.errors.state ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.state}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">City</p>
                        <InputText type="text" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                        {formik.touched.city && formik.errors.city ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.city}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Postal Code</p>
                        <InputText type="text" value={formik.values.postalAddress} name="postalAddress" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" />
                    </div>
                </div>
                <div>
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
                </div>
                <div className="flex flex-row ">
                    <div className="p-col-12">
                        <div >
                            <RadioButton inputId="male" name="gender" value="male" onChange={formik.handleChange} checked={formik.values.gender === "male"} />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div >
                            <RadioButton inputId="female" name="gender" value="female" onChange={formik.handleChange} checked={formik.values.gender === "female"} />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div >
                            <RadioButton inputId="other" name="gender" value="other" onChange={formik.handleChange} checked={formik.values.gender === "other"} />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Address;
