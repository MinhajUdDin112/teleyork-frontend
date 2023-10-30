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
import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import classNames from "classnames";
import BASE_URL from "../../../../../config";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Address = ({ handleNext, handleBack, enrollment_id, _id,csr }) => {
    const [confrimAddress, setConfrimAddress] = useState("same");
    const [tempAdd, setTempAdd] = useState(true);
    const [isSame, setIsSame] = useState();
    const [isDifferent, setIsDifferent] = useState();
    const [isPoBox, setIsPoBox] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [autoCompleteAddress, setAutoCompleteAddress] = useState(null);

    const zipDataLs = localStorage.getItem("basicData");
    const zipDataParsed = JSON.parse(zipDataLs);
    const zipCode = zipDataParsed?.data?.zip;
    const zipCity = zipDataParsed?.data?.city;
    const zipState = zipDataParsed?.data?.state;

    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
        isTemporaryAddress: Yup.string().required("please confrim address"),
    });
    console.log("cnfrm addres is",confrimAddress)

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            zip: "",
            city: "",
            state: "",
            isTemporaryAddress: tempAdd,
            isSameServiceAddress: true,
            isNotSameServiceAddress: false,
            isPoBoxAddress: false,
            mailingAddress1: "",
            mailingAddress2: "",
            mailingZip: "",
            mailingCity: "",
            mailingState: "",
            PoBoxAddress: "",
            poBoxZip: "",
            poBoxState: "",
            poBoxCity: "",
        },
        onSubmit: async (values, actions) => {
            const userId = _id;
            const dataToSend = {
                address1: formik.values.address1,
                address2: formik.values.address2,
                zip: zipCode,
                city: zipCity,
                state: zipState,
                isTemporaryAddress: tempAdd,
                isSameServiceAddress: formik.values.isSameServiceAddress,
                isNotSameServiceAddress: formik.values.isNotSameServiceAddress,
                isPoBoxAddress: formik.values.isPoBoxAddress,
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
                csr: csr,
            };
           
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/homeAddress`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    localStorage.setItem("address", JSON.stringify(response.data));
                    toast.success("Address saved Successfully");
                    handleNext();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        if (zipCode) {
            formik.setFieldValue("zip", zipCode);
            formik.setFieldValue("city", zipCity);
            formik.setFieldValue("state", zipState);
            formik.setFieldValue("mailingZip", zipCode);
            formik.setFieldValue("mailingCity", zipCity);
            formik.setFieldValue("mailingState", zipState);
            formik.setFieldValue("poBoxZip", zipCode);
            formik.setFieldValue("poBoxCity", zipCity);
            formik.setFieldValue("poBoxState", zipState);
        }
    }, [zipCode]);

    useEffect(() => {
        if (formik.values.mailingZip && formik.values.mailingZip.length === 5) {
            async function getData() {
                const response = await Axios.get(`${BASE_URL}/api/zipCode/getByZipCode?zipCode=${formik.values.mailingZip}`);
                const data = response?.data?.data;
                formik.setFieldValue("mailingCity", data?.city);
                formik.setFieldValue("mailingState", data?.state);
            }
            getData();
        }
    }, [formik.values.mailingZip]);

    useEffect(() => {
       // if (formik.values.isPoBoxAddress) {
            if (formik.values.poBoxZip && formik.values.poBoxZip.length === 5) {
                async function getData() {
                    const response = await Axios.get(`${BASE_URL}/api/zipCode/getByZipCode?zipCode=${formik.values.poBoxZip}`);
                    const data = response?.data?.data;
                    formik.setFieldValue("poBoxCity", data?.city);
                    formik.setFieldValue("poBoxState", data?.state);
                }
                getData();
            }
       // }
    }, [formik.values.isPoBoxAddress, formik.values.poBoxZip]);

    //GETTING city from autocomplete api response

    useEffect(() => {
        if (autoCompleteAddress) {
            const cityFromAutoResponse = autoCompleteAddress?.value?.structured_formatting?.secondary_text;
            let cityName = "";
            if (cityFromAutoResponse && cityFromAutoResponse.includes(",")) {
                const parts = cityFromAutoResponse.split(",");
                if (parts.length >= 1) {
                    cityName = parts[0];
                }
            }

            if (cityName.includes(formik.values.city) || formik.values.city.includes(cityName)) {
                formik.setFieldValue("address1", autoCompleteAddress?.value?.structured_formatting?.main_text);
            } else {
                toast.error(`please select address against ${formik.values.city} `);
            }
        }
    }, [autoCompleteAddress]);

    const handleAutoCompleteClick = () => {
        setAutoCompleteAddress('');
      };
    

    const handleSame = () => {
        formik.setFieldValue("isSameServiceAddress", true);
        formik.setFieldValue("isNotSameServiceAddress", false);
        formik.setFieldValue("isPoBoxAddress", false);
        setIsSame(true);
        setIsDifferent(false);
        setIsPoBox(false);
    };

    const handleDifferent = () => {
        formik.setFieldValue("isNotSameServiceAddress", true);
        formik.setFieldValue("isSameServiceAddress", false);
        formik.setFieldValue("isPoBoxAddress", false);
        setIsSame(false);
        setIsDifferent(true);
        setIsPoBox(false);
    };

    const handlePobox = () => {
        formik.setFieldValue("isPoBoxAddress", true);
        formik.setFieldValue("isSameServiceAddress", false);
        formik.setFieldValue("isNotSameServiceAddress", false);

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

    const addressResponse = localStorage.getItem("address");
    const parseaddressResponse = JSON.parse(addressResponse);

    useEffect(() => {
        const address = parseaddressResponse?.data?.address1;
        if (address) {
            formik.setFieldValue("address1", address);
            formik.setFieldValue("address2", parseaddressResponse?.data?.address2);
            formik.setFieldValue("zip", parseaddressResponse?.data?.zip);
            formik.setFieldValue("city", parseaddressResponse?.data?.city);
            formik.setFieldValue("state", parseaddressResponse?.data?.state);
            formik.setFieldValue("isTemporaryAddress", parseaddressResponse?.data?.isTemporaryAddress);

            formik.setFieldValue("isSameServiceAddress", parseaddressResponse?.data?.isSameServiceAddress);
            formik.setFieldValue("isNotSameServiceAddress", parseaddressResponse?.data?.isNotSameServiceAddress);
            formik.setFieldValue("isPoBoxAddress", parseaddressResponse?.data?.isPoBoxAddress);

            formik.setFieldValue("mailingAddress1", parseaddressResponse?.data?.mailingAddress1);
            formik.setFieldValue("mailingAddress2", parseaddressResponse?.data?.mailingAddress2);
            formik.setFieldValue("mailingZip", parseaddressResponse?.data?.mailingZip);
            formik.setFieldValue("mailingCity", parseaddressResponse?.data?.mailingCity);
            formik.setFieldValue("mailingState", parseaddressResponse?.data?.mailingState);

            formik.setFieldValue("PoBoxAddress", parseaddressResponse?.data?.PoBoxAddress);
            formik.setFieldValue("poBoxZip", parseaddressResponse?.data?.poBoxZip);
            formik.setFieldValue("poBoxState", parseaddressResponse?.data?.poBoxState);
            formik.setFieldValue("poBoxCity", parseaddressResponse?.data?.poBoxCity);

            //changing state
            setTempAdd(parseaddressResponse?.data?.isTemporaryAddress);
            setIsSame(parseaddressResponse?.data?.isSameServiceAddress);
            setIsDifferent(parseaddressResponse?.data?.isNotSameServiceAddress);
            console.log("is not same is ",parseaddressResponse?.data?.isNotSameServiceAddress)
            setIsPoBox(parseaddressResponse?.data?.isPoBoxAddress);  
        }
    }, []);
    useEffect(() => {
        if (isDifferent) {
            setConfrimAddress("different");
        } else if (isPoBox) {
            setConfrimAddress("pobox");
        }
    }, [isDifferent, isPoBox]);
    

    return (
        <>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons ">
                    <div>
                        <Button label="Back" type="button" onClick={handleBack} />
                    </div>
                    <div className="fixed-button-container">{isLoading ? <Button label="Continue" type="submit" disabled /> : <Button label="Continue" type="submit" />}</div>
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
                        <InputText type="text" value={formik.values.address1} name="address1" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" minLength={10} />
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
                    <div className=" mr-3 w-21rem  ">
                        <p className="m-0">
                            <code>Google Auto</code> Complete Address
                        </p>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyDa1KFekZkev2CAqrcrU_nYDe_1jC-PHA0"
                            selectProps={{
                                autoCompleteAddress,
                                onChange: setAutoCompleteAddress,
                                onClick: handleAutoCompleteClick, 
                            }}
                        />
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            City <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText type="text" value={formik.values.city} name="city" disabled className="w-21rem disable-color" />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            State <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText type="text" value={formik.values.state} name="state" disabled className="w-21rem disable-color" />
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">
                            Zip Code <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                        </p>
                        <InputText value={formik.values.zip} name="zip" disabled className="w-21rem disable-color" />
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
                        <RadioButton inputId="confrimAddress" name="address" value="same" onClick={handleSame} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "same"} />
                        <label htmlFor="sameAdress" className="ml-2">
                            Same As service Address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="confrimAddress" name="address" value="different" onClick={handleDifferent} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "different"} />
                        <label htmlFor="differentAddress" className="ml-2">
                            Different from Service address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="confrimAddress" name="address" value="pobox" onClick={handlePobox} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "pobox"} />
                        <label htmlFor="poboxAddress" className="ml-2">
                            My mailing address is a PO BOX
                        </label>
                    </div>
                </div>

                {isDifferent && (
                    <>
                        <div className="mt-3">Mailing Address</div>
                        <div className="p-fluid formgrid grid mt-3">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Address 1 <span className="steric">*</span>
                                </label>
                                <InputText id="mailingAddress1" value={formik.values.mailingAddress1} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingAddress1") }, "input_text")} />
                                {getFormErrorMessage("mailingAddress1")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label"> Address 2 </label>
                                <InputText id="mailingAddress2" value={formik.values.mailingAddress2} onChange={formik.handleChange} />
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
                                    City <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingCity" value={formik.values.mailingCity} disabled className="disable-color" />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    State <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingState" value={formik.values.mailingState} disabled className="disable-color" />
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
                                <InputText id="PoBoxAddress" value={formik.values.PoBoxAddress} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("PoBoxAddress") }, "input_text")} keyfilter={/^[0-9]*$/} />
                                {getFormErrorMessage("PoBoxAddress")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Zip Code <span className="steric">*</span>
                                </label>
                                <InputText id="poBoxZip" value={formik.values.poBoxZip} onChange={formik.handleChange} maxLength={5} keyfilter={/^[0-9]*$/} />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    City <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="poBoxCity" value={formik.values.poBoxCity} className="disable-color" disabled />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    <p>
                                        State <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                    </p>
                                </label>
                                <InputText id="poBoxState" value={formik.values.poBoxState} disabled className="disable-color" />
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    );
};

export default Address;
