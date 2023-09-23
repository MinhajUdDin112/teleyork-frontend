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
import classNames from "classnames";

const Address = ({ handleNext, id, handleBack}) => {
    const zipCode = useSelector((state) => {
        return state.zip;
    });

    const zipcode = zipCode?.serviceAvailability?.data?.zip;
    const enrollment_id = zipCode?.serviceAvailability?.data?.enrollmentId;
    const dispatch = useDispatch();

   const [confrimAddress, setConfrimAddress] = useState('');
    const [tempAdd, setTempAdd] = useState(true);
    const [isSame, setIsSame] = useState();
    const [isDifferent, setIsDifferent] = useState();
    const [isPoBox, setIsPoBox] = useState();

    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Address is required"),
        city: Yup.string().required("city is required"),
        state: Yup.string().required("state is required"),
        isTemporaryAddress: Yup.string().required("please confrim address"),
        // mailingAddress1: Yup.string().required("Mailing Address1  is required"),
        // mailingZip: Yup.string().required("Zip code is required"),
        // mailingCity: Yup.string().required("city is required"),
        // mailingState: Yup.string().required("state is required"),
        // PoBoxAddress: Yup.string().required("This is required"),
        // poBoxZip: Yup.string().required("This is required"),
        // poBoxState: Yup.string().required("This is required"),
        // poBoxCity: Yup.string().required("This is required"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            isTemporaryAddress : tempAdd,
            postal: "",
            isServiceAddress: "",
            isNotServiceAddress: "",
            isPOboxAddress: "",
            mailingAddress1: "",
            mailingAddress2: "",
            mailingZip: zipcode,
            mailingCity: "",
            mailingState: "",
            PoBoxAddress:"",
            poBoxZip: zipcode,
            poBoxState: "",
            poBoxCity:""
        },
        onSubmit: (values, actions) => {

            const dataToSend = {
                address1: formik.values.address1,
                address2: formik.values.address2,
                city: "",
                state: "",
                isTemporaryAddress : tempAdd,
                postal: formik.values.postal,
                isServiceAddress: true,
                isNotServiceAddress: false,
                isPOboxAddress: false,
                mailingAddress1: formik.values.mailingAddress1,
                mailingAddress2: formik.values.mailingAddress2,
                mailingZip: zipcode,
                mailingCity: "",
                mailingState: "",
                PoBoxAddress:formik.values.PoBoxAddress,
                poBoxZip: zipcode,
                poBoxState: "",
                poBoxCity:"",
                userId:userId,
                csr:"645c7bcfe5098ff6251a2255"
            }

            console.log("values",values)
            actions.resetForm();
            handleNext();
            const userId = id;
           
            dispatch(addCustomerAddressAction(dataToSend));
        },
    });
    console.log("confrim address is",confrimAddress);

//     const handleSame = () => {
// if(formik.values.isServiceAddress==true)
// {
//     formik.values.isNotServiceAddress= false;
//     formik.values.isPoBox =false
// }else{
//     formik.values.isServiceAddress=true
// }
//     };
//     const handleDifferent = () => {
//         if(formik.values.isNotServiceAddress===true)
//         {
//             formik.values.isServiceAddress=false;
//             formik.values.isPoBox=false
//         }else{
//             formik.values.isNotServiceAddress=true
//         }
//     };
//     const handlePobox = () => {
//         if(formik.values.isPOboxAddress===true)
// {
//     formik.values.isNotServiceAddress=false;
//     formik.values.isServiceAddress=false
// }else{
//     formik.values.isPoBox=true
// }
//     };

const handleSame = () => {

    formik.setFieldValue("isServiceAddress", true);
    formik.setFieldValue("isNotServiceAddress", false);
    formik.setFieldValue("isPoBoxAddress", false);
    setIsSame(true);
    setIsDifferent(false);
    setIsPoBox(false);
  };
  
  const handleDifferent = () => {
    formik.setFieldValue("isServiceAddress", false);
    formik.setFieldValue("isNotServiceAddress", true);
    formik.setFieldValue("isPoBoxAddress", false);
    setIsSame(false);
    setIsDifferent(true);
    setIsPoBox(false);
  };
  
  const handlePobox = () => {
    formik.setFieldValue("isServiceAddress", false);
    formik.setFieldValue("isNotServiceAddress", false);
    formik.setFieldValue("isPoBoxAddress", true);
    setIsSame(false);
    setIsDifferent(false);
    setIsPoBox(true);
  };
  

    const handleAddress = (e) => {
        console.log(e)
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
                        <p className="m-0">Zip Code</p>
                        <InputText value={zipcode} name="zip" className="w-21rem" disabled />
                    </div>

                    <div className="mr-3 mb-3">
                        <p className="m-0">State</p>
                        <InputText type="text" value={formik.values.state} name="state" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.state && formik.errors.state ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.state}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">City</p>
                        <InputText type="text" value={formik.values.city} name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^[a-zA-Z\s]*$/} />
                        {formik.touched.city && formik.errors.city ? (
                            <p className="mt-0" style={{ color: "red" }}>
                                {formik.errors.city}
                            </p>
                        ) : null}
                    </div>
                    <div className="mr-3 mb-3">
                        <p className="m-0">Postal Code</p>
                        <InputText type="text" value={formik.values.postal} name="postal" onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-21rem" keyfilter={/^\d{0,5}$/ } />
                    </div>
                </div>
                <div>
                    <p>Is this a temporary address?</p>
                    <div className="flex">
                        <div className="flex align-items-center">
                            <Checkbox id="isTemporaryAddress" value={false}  checked={tempAdd === false} onChange={(e)=>handleAddress(e)}></Checkbox>
                            <label className="ml-2">NO</label>
                        </div>
                        <div className="flex align-items-center ml-2">
                            <Checkbox id="isTemporaryAddress" value={true}  checked={tempAdd === true} onChange={(e)=>handleAddress(e)}></Checkbox>
                            <label className="ml-2">Yes</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    <div className="mr-3 flex alignitem-center">
                    <RadioButton inputId="sameAdress" name="address" value="same" onClick={handleSame} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === 'same'} />
                    <label htmlFor="sameAdress" className="ml-2">Same As service Address</label>
                    </div>
                    <div className="mr-3 flex alignitem-center">
                    <RadioButton inputId="differentAddress" name="address" value="different" onClick={handleDifferent} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === 'different'} />
                    <label htmlFor="differentAddress" className="ml-2">Different from Service address</label>
                     
                    </div>
                    <div className="mr-3 flex alignitem-center">
                    <RadioButton inputId="poboxAddress" name="address" value="pobox" onClick={handlePobox} onChange={(e) => setConfrimAddress(e.value)} checked={confrimAddress === 'pobox'} />
                    <label htmlFor="poboxAddress" className="ml-2">My mailing address is a PO BOX</label>
                       
                    </div>
                </div>

                {isDifferent && (
                    <>
                        <div className="p-fluid formgrid grid mt-5">
                            <div className="field col-12 md:col-3">
                                <label className="field_label">
                                    Mailing Address 1 <span className="steric">*</span>
                                </label>
                                <InputText id="mailingAddress1" value={formik.values.mailingAddress1} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingAddress1") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                                {getFormErrorMessage("mailingAddress1")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">Mailing Address 2 </label>
                                <InputText id="mailingAddress2" value={formik.values.mailingAddress2} onChange={formik.handleChange}  keyfilter={/^[a-zA-Z\s]*$/}  />
                                
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">Zip Code <span className="steric">*</span> </label>
                                <InputText id="mailingZip" value={formik.values.mailingZip} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingZip") }, "input_text")}keyfilter={/^\d{0,5}$/ } maxLength={5} />
                                {getFormErrorMessage("mailingZip")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">State <span className="steric">*</span> </label>
                                <InputText id="mailingState" value={formik.values.mailingState} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingState") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                                {getFormErrorMessage("mailingState")}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label className="field_label">City <span className="steric">*</span> </label>
                                <InputText id="mailingCity" value={formik.values.mailingCity} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("mailingCity") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                                {getFormErrorMessage("mailingCity")}
                            </div>
                        </div>
                    </>
                )}
                {isPoBox && (
                    <>
                    <div className="p-fluid formgrid grid mt-5">
                        <div className="field col-12 md:col-3">
                            <label className="field_label">
                            Mailing Address 1 <span className="steric">*</span>  PO BOX  
                            </label>
                            <InputText id="PoBoxAddress" value={formik.values.PoBoxAddress} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("PoBoxAddress") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                            {getFormErrorMessage("PoBoxAddress")}
                        </div>
                        <div className="field col-12 md:col-3">
                            <label className="field_label">Zip Code <span className="steric">*</span> </label>
                            <InputText id="poBoxZip" value={formik.values.poBoxZip} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("poBoxZip") }, "input_text")}keyfilter={/^\d{0,5}$/ } maxLength={5} />
                            {getFormErrorMessage("poBoxZip")}
                        </div>
                        <div className="field col-12 md:col-3">
                            <label className="field_label">State <span className="steric">*</span> </label>
                            <InputText id="poBoxState" value={formik.values.poBoxState} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("poBoxState") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                            {getFormErrorMessage("poBoxState")}
                        </div>
                        <div className="field col-12 md:col-3">
                            <label className="field_label">City <span className="steric">*</span> </label>
                            <InputText id="poBoxCity" value={formik.values.poBoxCity} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("poBoxCity") }, "input_text")} keyfilter={/^[a-zA-Z\s]*$/}  />
                            {getFormErrorMessage("poBoxCity")}
                        </div>
                    </div>
                </>
                )}
            </form>
        </>
    );
};

export default Address;
