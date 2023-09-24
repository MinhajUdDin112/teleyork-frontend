import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addCustomerAddressAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import classNames from "classnames";

const Address = ({ handleNext, handleBack, enrollment_id, _id }) => {
    const dispatch = useDispatch();

    const [confrimAddress, setConfrimAddress] = useState("");
    const [tempAdd, setTempAdd] = useState(true);
    const [isSame, setIsSame] = useState();
    const [isDifferent, setIsDifferent] = useState();
    const [isPoBox, setIsPoBox] = useState();

     const zipResponse = useSelector((state)=>state.zip)
     const zipCode = zipResponse?.serviceAvailability?.data?.zip;
     const zipCity =zipResponse?.serviceAvailability?.data?.city;
     const zipState = zipResponse?.serviceAvailability?.data?.state;


    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
        isTemporaryAddress: Yup.string().required("please confrim address"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            zip: zipCode,
            city: zipCity,
            state: zipState,
            isTemporaryAddress: tempAdd,
            postal: "",
            isServiceAddress: "",
            isNotServiceAddress: "",
            isPOboxAddress: "",
            mailingAddress1: "",
            mailingAddress2: "",
            mailingZip: zipCode,
            mailingCity: zipCity,
            mailingState: zipState,
            PoBoxAddress: "",
            poBoxZip: zipCode,
            poBoxState: zipState,
            poBoxCity: zipCity,
        },
        onSubmit: (values, actions) => {
            const userId = _id;
            const dataToSend = {
                address1: formik.values.address1,
                address2: formik.values.address2,
                zip: zipCode,
                city: zipCity,
                state: zipState,
                isTemporaryAddress: tempAdd,
                postal: formik.values.postal,
                isServiceAddress: false,
                isNotServiceAddress: false,
                isPOboxAddress: false,
                mailingAddress1: formik.values.mailingAddress1,
                mailingAddress2: formik.values.mailingAddress2,
                mailingZip: formik.values.mailingZip,
                mailingCity: formik.values.mailingCity,
                mailingState: formik.values.mailingState,
                PoBoxAddress: formik.values.PoBoxAddress,
                poBoxZip: formik.values.poBoxZip,
                poBoxState: formik.values.poBoxState,
                poBoxCity: formik.values.poBoxCity,
                userId: userId,
                csr: "645c7bcfe5098ff6251a2255",
            };
            console.log("values", values);
            actions.resetForm();
            dispatch(addCustomerAddressAction(dataToSend));
            handleNext();
        },
    });

    const handleSame = () => {
        formik.setFieldValue("isServiceAddress", true);
        formik.setFieldValue("isNotServiceAddress", false);
        formik.setFieldValue("isPoBoxAddress", false);
        setIsSame(true);
        setIsDifferent(false);
        setIsPoBox(false);
    };

    const handleDifferent = () => {
        formik.setFieldValue("isNotServiceAddress", true);
        formik.setFieldValue("isServiceAddress", false);
       formik.setFieldValue("isPoBoxAddress", false);
        setIsSame(false);
        setIsDifferent(true);
        setIsPoBox(false);
    };

    const handlePobox = () => {
        formik.setFieldValue("isPoBoxAddress", true);
        formik.setFieldValue("isServiceAddress", false);
        formik.setFieldValue("isNotServiceAddress", false);
       
        setIsSame(false);
        setIsDifferent(false);
        setIsPoBox(true);
    };

    const handleAddress = (e) => {
        setTempAdd(e.target.value);
    };

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-items-center mb-2">
                    <Button label="Back" type="button" onClick={handleBack} />
                    <Button label="Continue" type="submit" />
                </div>
                <div>
                    <h6>Enrollment ID: {enrollment_id}</h6>
                </div>

                <br></br>
                <p className="text-xl">What is your home address?</p>
                <p>The address you will get service. Do not use P.O Box</p>

                <div className="flex flex-wrap mb-3">
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Address 1 <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.address1} name="address1" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.address1 && formik.errors.address1 ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.address1}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Address 2</p>
                        <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Zip Code <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText value={formik.values.zip} name="zip" disabled className="w-21rem disable-color" />
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            State <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText type="text" value={formik.values.state} name="state" disabled className="w-21rem disable-color" />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            City <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText type="text" value={formik.values.city} name="city" disabled className="w-21rem disable-color" />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Postal Code</p>
                        <InputText type="text" value={formik.values.postal} name="postal" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^\d{0,5}$/} />
                    </div>
                </div>
                <div>
                    <p>Is this a temporary address?</p>
                    <div className="flex">
                        <div className="flex align-items-center">
                            <Checkbox id="isTemporaryAddress" value={false} checked={tempAdd === false} onChange={(e) => handleAddress(e)}></Checkbox>
                            <label className="ml-2">NO</label>
                        </div>
                        <div className="flex align-items-center ml-2">
                            <Checkbox id="isTemporaryAddress" value={true} checked={tempAdd === true} onChange={(e) => handleAddress(e)}></Checkbox>
                            <label className="ml-2">Yes</label>
                            <div />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="sameAdress" name="address" value="same" onClick={handleSame} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "same"} />
                        <label htmlFor="sameAdress" className="ml-2">
                            Same As service Address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="differentAddress" name="address" value="different" onClick={handleDifferent} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "different"} />
                        <label htmlFor="differentAddress" className="ml-2">
                            Different from Service address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="poboxAddress" name="address" value="pobox" onClick={handlePobox} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "pobox"} />
                        <label htmlFor="poboxAddress" className="ml-2">
                            My mailing address is a PO BOX
                        </label>
                    </div>
                </div>

                {isDifferent && (
                    <>
                        <div className="p-fluid formgrid grid mt-5">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Mailing Address 1 <span className="steric">*</span>
                                </label>
                                <InputText id="mailingAddress1" value={formik.values.mailingAddress1} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingAddress1") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} />
                                {getFormErrorMessage("mailingAddress1")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">Mailing Address 2 </label>
                                <InputText id="mailingAddress2" value={formik.values.mailingAddress2} onChange={formik.handleChange} keyfilter={/^[a-zA-Z\s]*$/} />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Zip Code <span className="steric">*</span>
                                </label>
                                <InputText id="mailingZip" value={formik.values.mailingZip} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingZip") }, "input_text")} keyfilter={/^\d{0,5}$/} maxLength={5} />
                                {getFormErrorMessage("mailingZip")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    State <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingState" value={formik.values.mailingState} disabled className="disable-color" />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    City <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingCity" value={formik.values.mailingCity} disabled className="disable-color" />
                            </div>
                        </div>
                    </>
                )}
                {isPoBox && (
                    <>
                        <div className="p-fluid formgrid grid mt-5">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Mailing Address 1 <span className="steric">*</span> PO BOX
                                </label>
                                <InputText id="PoBoxAddress" value={formik.values.PoBoxAddress} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("PoBoxAddress") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/} />
                                {getFormErrorMessage("PoBoxAddress")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Zip Code <span className="steric">*</span>
                                </label>
                                <InputText id="poBoxZip" value={formik.values.poBoxZip} onChange={formik.handleChange} keyfilter={/^\d{0,5}$/} maxLength={5} />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    <p>
                                        State <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                                    </p>
                                </label>
                                <InputText id="poBoxState" value={formik.values.poBoxState} disabled className="disable-color" />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    City <FontAwesomeIcon className="steric icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="poBoxCity" value={formik.values.poBoxCity} className="disable-color" disabled />
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    );
};

export default Address;




