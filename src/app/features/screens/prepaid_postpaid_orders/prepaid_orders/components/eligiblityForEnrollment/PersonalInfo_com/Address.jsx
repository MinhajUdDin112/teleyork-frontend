import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import classNames from "classnames";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./personalInfo.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Address = ({ handleNext, handleBack, enrollment_id, _id, csr }) => {
    const [confrimAddress, setConfrimAddress] = useState("same");
    const [isSame, setIsSame] = useState();
    const [isDifferent, setIsDifferent] = useState();
    const [isPoBox, setIsPoBox] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const zipDataLs = localStorage.getItem("prepaidbasicData");
    const zipDataParsed = JSON.parse(zipDataLs);

    const zipCode = zipDataParsed?.data?.zip;
    const zipCity = zipDataParsed?.data?.city;
    const zipState = zipDataParsed?.data?.state;

    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
    });

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: " ",
            zip: "",
            city: "",
            state: "",
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
            // checkEligiblity();
            const userId = _id;
            const dataToSend = {
                address1: formik.values.address1,
                address2: formik.values.address2,
                zip: formik.values.zip,
                city: formik.values.city,
                state: formik.values.state,
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
                    localStorage.setItem("prepaidaddress", JSON.stringify(response.data));
                    toast.success("Address saved Successfully");
                    handleNext();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        },
    });

    const checkEligiblity = async () => {
        try {
            const response = await Axios.post(`${BASE_URL}/api/user/deviceEligibilty?enrollmentId=${_id}`);
            if (response?.status === 200 || response?.status === 201) {
                localStorage.setItem("prepaidcheckEligiblity", JSON.stringify(response.data));
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    // useEffect(() => {
    //
    //     if (isDifferent == "false") {
    //         formik.setFieldValue("mailingAddress1", formik.values.address1);
    //         formik.setFieldValue("mailingAddress2", formik.values.address2); // Corrected line
    //         formik.setFieldValue("mailingZip", zipCode);
    //         formik.setFieldValue("mailingCity", zipCity);
    //         formik.setFieldValue("mailingState", zipState);
    //
    //     }
    // }, []);

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
                formik.setFieldValue("mailingState", data?.abbreviation);
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
                formik.setFieldValue("poBoxState", data?.abbreviation);
            }
            getData();
        }
        // }
    }, [formik.values.isPoBoxAddress, formik.values.poBoxZip]);

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

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const addressResponse = localStorage.getItem("prepaidaddress");
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
            setIsSame(parseaddressResponse?.data?.isSameServiceAddress);
            setIsDifferent(parseaddressResponse?.data?.isNotSameServiceAddress);

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

    const handleAddressChange = (e) => {
        const address = e?.value?.structured_formatting?.secondary_text;
        const regex = /\b(APT|BSMT|BLDG|DEPT|FL|HNGR|LBBY|LOWR|OFC|PH|RM|UNIT|UPPR|TRLR|STE|SPC)\s*([\w\d]+)\b/i;
        const pattern = /(.+)(?=(unit|apt|bsmt|bldg|dept|fl|hngr|lbby|lowr|ofc|ph|UPPR|TRLR|STE|spc|RM))/i;

        if (address) {
            let cityName = "";
            let cityName1 = "";
            let trimmedCityName = "";
            let tolowerTrimmedCityName = "";

            if (address && address.includes(",")) {
                const parts = address.split(",");
                if (parts.length >= 1) {
                    cityName = parts[0];
                    cityName1 = parts[1];

                    cityName = cityName.toLowerCase();
                    cityName1 = cityName1.toLowerCase();

                    const words = cityName.split(" ");

                    if (words.length >= 2) {
                        trimmedCityName = words[0] + (words[1].charAt(0).toLowerCase() + words[1].slice(1));
                        tolowerTrimmedCityName = trimmedCityName.toLowerCase();
                    } else {
                        tolowerTrimmedCityName = cityName;
                    }
                }
            }
            const cityFromDb = formik.values.city;

            let toLower;
            if (cityFromDb.includes(" ")) {
                const words = cityFromDb.split(" ");
                if (words.length >= 2) {
                    toLower = words[0] + (words[1].charAt(0).toLowerCase() + words[1].slice(1));
                    toLower = toLower.toLowerCase();
                    toLower = toLower.trim();
                }
            } else {
                toLower = cityFromDb.toLowerCase();
                toLower = toLower.trim();
            }
            if (tolowerTrimmedCityName.includes(toLower) || toLower.includes(tolowerTrimmedCityName) || cityName.includes(toLower) || toLower.includes(cityName) || cityName1.includes(toLower) || toLower.includes(cityName1)) {
                const completeAddress = e?.value?.structured_formatting?.main_text;

                const extractedAddress1 = completeAddress.match(pattern);

                if (extractedAddress1) {
                    const final = extractedAddress1 ? extractedAddress1[1].trim() : completeAddress.trim();

                    formik.setFieldValue("address1", final);
                } else {
                    formik.setFieldValue("address1", completeAddress);
                }
                const match = completeAddress.match(regex);

                var add2 = match ? match[0] : "";

                if (add2) {
                    add2 = add2.toUpperCase();
                    formik.setFieldValue("address2", add2);
                }
            } else {
                toast.error(`Please choose an address associated with ${formik.values.city}, ${formik.values.state} `);
            }
        }
    };
    useEffect(() => {
        // Retrieve the city value from localStorage and set it to formik state
        const cityValue = localStorage.getItem("cityValue");
        if (cityValue) {
            formik.setFieldValue("city", cityValue);
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                {/* <div>
                    <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div> */}

                <br></br>
                <p className="fname" style={{ marginTop: "-2px" }}>
                    WHAT IS YOUR HOME ADDRESS?
                </p>
                <p className="para">Please provide the address at which you will receive service; P.O. Box addresses are not acceptable.</p>

                <div className="flex flex-wrap flex-row justify-content-between">
                    <div className="calendar_field">
                        <p className="field_label ">
                            Address 1 <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText type="text" value={formik.values.address1} name="address1" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full" minLength={10} autoComplete="new-password" />
                        {formik.touched.address1 && formik.errors.address1 ? (
                            <p className="field_label" style={{ color: "red" }}>
                                {formik.errors.address1}
                            </p>
                        ) : null}
                    </div>
                    <div className="calendar_field">
                        <p className="field_label">Address 2</p>
                        <InputText type="text" value={formik.values.address2} name="address2" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full" autoComplete="new-password" />
                    </div>
                    <div className="calendar_field">
                        <p className="field_label">Google Auto Complete Address</p>
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyDa1KFekZkev2CAqrcrU_nYDe_1jC-PHA0"
                            selectProps={{
                                onChange: (e) => handleAddressChange(e),
                            }}
                        />
                    </div>

                    <div className="calendar_field">
                        <p className="field_label mt-4">
                            City <FontAwesomeIcon className="disable-icon-color icon-size" />{" "}
                        </p>
                        <InputText type="text" value={formik.values.city} name="city" className="w-full disable-color" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    <div className="calendar_field">
                        <p className="field_label mt-4">
                            State <FontAwesomeIcon className="disable-icon-color icon-size" icon={zipDataParsed?.data?.izZipVerified ? faBan : false} />
                        </p>
                        <InputText type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} disabled={zipDataParsed?.data?.izZipVerified === true ? true : false} value={formik.values.state} name="state" className="w-full disable-color" />
                    </div>
                    <div className="calendar_field">
                        <p className="field_label mt-4">
                            Zip Code <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />
                        </p>
                        <InputText disabled value={formik.values.zip} name="zip" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full disable-color" />
                    </div>
                </div>
                <div className="calendar_field1">
                    <p className="field_label" style={{ fontWeight: "600" }}>
                        Is Your Mailling Address?
                    </p>
                </div>

                <div className="flex flex-wrap mt-1">
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="confrimAddress" name="address" value="same" onClick={handleSame} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "same"} />
                        <label htmlFor="sameAdress" className="ml-2" style={{ color: "#A0A0A0", fontWeight: "400" }}>
                            Same As Service Address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="confrimAddress" name="address" value="different" onClick={handleDifferent} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "different"} />
                        <label htmlFor="differentAddress" className="ml-2" style={{ color: "#A0A0A0", fontWeight: "400" }}>
                            Different from Service Address
                        </label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                        <RadioButton inputId="confrimAddress" name="address" value="pobox" onClick={handlePobox} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === "pobox"} />
                        <label htmlFor="poboxAddress" className="ml-2" style={{ color: "#A0A0A0", fontWeight: "400" }}>
                            My mailing address is a PO BOX
                        </label>
                    </div>
                </div>

                {isDifferent && (
                    <>
                        <div className="field_label mt-5">Mailing Address</div>
                        <div className="flex flex-wrap flex-row justify-content-left">
                            <div className="calendar_field  ">
                                <label className="field_label mb-2">
                                    Address 1 <span className="steric">*</span>
                                </label>
                                <InputText id="mailingAddress1" value={formik.values.mailingAddress1} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingAddress1") }, "input_text", "w-full")} autoComplete="new-password" />
                                {getFormErrorMessage("mailingAddress1")}
                            </div>
                            <div className="calendar_field space">
                                <label className="field_label mb-2"> Address 2 </label>
                                <InputText id="mailingAddress2" value={formik.values.mailingAddress2} onChange={formik.handleChange} autoComplete="new-password" className="w-full" />
                            </div>

                            <div className="calendar_field space">
                                <label className="field_label  mt-2">
                                    City <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingCity" value={formik.values.mailingCity} disabled className="disable-color w-full" />
                            </div>
                            <div className="calendar_field space">
                                <label className="field_label mt-2">
                                    State <FontAwesomeIcon className="disable-icon-color icon-size" icon={faBan} />{" "}
                                </label>
                                <InputText id="mailingState" value={formik.values.mailingState} disabled className="disable-color w-full mt-2" />
                            </div>
                            <div className="calendar_field space " style={{ marginBottom: "3rem" }}>
                                <label className="field_label mt-2 ">
                                    Zip Code <span className="steric">*</span>
                                </label>
                                <InputText id="mailingZip" value={formik.values.mailingZip} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingZip") }, "w-full", "mt-2")} keyfilter={/^\d{0,5}$/} maxLength={5} />
                                {getFormErrorMessage("mailingZip")}
                            </div>
                        </div>
                    </>
                )}
                {isPoBox && (
                    <>
                        <div className="p-fluid formgrid grid mt-5">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    PO Box No <span className="steric">*</span>
                                </label>
                                <InputText id="PoBoxAddress" value={formik.values.PoBoxAddress} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("PoBoxAddress") }, "input_text")} keyfilter={/^[0-9]*$/} autoComplete="new-password" />
                                {getFormErrorMessage("PoBoxAddress")}
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
                            <div className="field col-12 md:col-3 mb-1">
                                <label className="field_label">
                                    Zip Code <span className="steric">*</span>
                                </label>
                                <InputText id="poBoxZip" value={formik.values.poBoxZip} onChange={formik.handleChange} maxLength={5} keyfilter={/^[0-9]*$/} />
                            </div>
                        </div>
                    </>
                )}
                <div>
                    <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons ">
                        {/* <div style={{ marginLeft: "80%", marginTop: "2rem" }}>
                        <Button className="btn" label="Back" type="button" onClick={handleBack} />
                    </div> */}
                        <div style={{ marginLeft: "80%" }} className="fixed-button-container">
                            <Button className="btn " label="Back" type="button" onClick={handleBack} />
                            <Button style={{ marginTop: "2rem" }} className="btn ml-1" label="Continue" type="submit" icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Address;
