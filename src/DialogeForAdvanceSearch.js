import React from 'react'
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from 'primereact/inputtext';
import Axios from 'axios';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForAdvanceSearch = ({setDialogeForAdvance}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([])

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const serviceProvider = parseLoginRes?.compony;

    console.log("service provider is",serviceProvider)

    const formik = useFormik({
        initialValues: {
            phoneNumber: "",
            firstName:"",
            lastName:"",
            email:"",
            address1:"",
            address2:"",
            city:"",
            state:"",
            zip:"",
            DOB:"",
            SSN:"",
            esnId:"",
            status:"",
            carrier:"",
            esn:"",
            IMEI:"",
            applicationId:"",
            subscriberId:"",
        },
        onSubmit: async (values, actions) => {   
            const dataToSend = {  
                  
                phoneNumber: formik.values.phoneNumber,
                firstName: formik.values.firstName,  
                lastName: formik.values.lastName,
                email: formik.values.email,
                address1: formik.values.address1,
                address2: formik.values.address2,  
                city: formik.values.city,
                state: formik.values.state,
                zip: formik.values.zip,
                DOB: formik.values.DOB,  
                SSN: formik.values.SSN,
                esnId: formik.values.esnId,
                status: formik.values.status,
                carrier: formik.values.carrier,  
                esn: formik.values.esn,
                IMEI: formik.values.IMEI,
                applicationId: formik.values.applicationId,
                subscriberId: formik.values.subscriberId,

            };

            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/web/search/advancesearch`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                 setSearchData(response?.data)
                 console.log("search data is",response?.data)
                }
            } catch (error) {
            console.log("error is",error)
                setIsLoading(false);
            } 
        }
        ,
    });

    function closeModal(){
        setDialogeForAdvance(false);
    }

    const optionsForAccountType = [
        { label: "ACP", value: "acp" },
        { label: "Non ACP", value: "nonAcp" },
    ];
    const optionsForStatus = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Rejected", value: "rejected" },
        { label: "Suspend", value: "suspend" },
        { label: "Prospect", value: "prospect" },
        { label: "Dispatched", value: "dispatched" },
    ];
    const optionsForCarrier = [ 
        { label: "TMB", value: "TMB" },     
    ];


  return (
    <>
<form onSubmit={formik.handleSubmit}>
<div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="phoneNumber"
                             value={formik.values.phoneNumber}
                             onChange={formik.handleChange}
                            placeHolder="Phone Number"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="address1"
                             value={formik.values.address1}
                             onChange={formik.handleChange}
                            placeHolder="Street Address"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="esnId"
                            value={formik.values.esnId}
                             onChange={formik.handleChange}
                            placeHolder="Account Number"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                          id="address2"
                          value={formik.values.address2}
                             onChange={formik.handleChange}
                            placeHolder="Apartment or Unit"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            // id="phoneNumber"
                            // value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            placeHolder="Enroll Id"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                           id="city"
                            value={formik.values.city}
                             onChange={formik.handleChange}
                            placeHolder="City"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                             id="firstName"
                             value={formik.values.firstName}
                             onChange={formik.handleChange}
                             placeHolder="First Name"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="State"
                             value={formik.values.State}
                             onChange={formik.handleChange}
                            placeHolder="State"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="lastName"
                             value={formik.values.lastName}
                             onChange={formik.handleChange}
                              placeHolder="Last Name"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="zip"
                             value={formik.values.zip}
                             onChange={formik.handleChange}
                            placeHolder="Zip"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="email"
                             value={formik.values.email}
                             onChange={formik.handleChange}
                            placeHolder="Email"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="ssn"
                             value={formik.values.ssn}
                             onChange={formik.handleChange}
                            placeHolder="SSN"
                        />
                    </div>
                
                   
                    <div className="field col-12 md:col-6">
                    <Dropdown
                            //id=""
                           // value={formik.values.suffix}
                           placeholder='Account Type'
                            options={optionsForAccountType}  
                            onChange={(e) => {
                                formik.setFieldValue("suffix", e.value);
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="DOB"
                             value={formik.values.DOB}
                             onChange={formik.handleChange}
                            placeHolder=" DOB(MM-DD-YYYY)"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                    <Dropdown
                            id="status"
                           // value={formik.values.suffix}
                            placeholder='Status'
                            options={optionsForStatus}  
                            onChange={(e) => {
                                formik.setFieldValue("status", e.value);
                                formik.handleChange(e);
                            }}
                           
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="esn"
                             value={formik.values.esn}
                             onChange={formik.handleChange}
                            placeHolder="SIM/ESN"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                    <Dropdown
                            id="carrier"
                            value={formik.values.carrier}
                            placeholder='Carrier'
                            options={optionsForCarrier}  
                            onChange={(e) => {
                                formik.setFieldValue("carrier", e.value);
                                formik.handleChange(e);
                            }}
                           
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="IMEI"
                             value={formik.values.IMEI}
                             onChange={formik.handleChange}
                            placeHolder="IMEI"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                             id="subscriberId"
                             value={formik.values.subscriberId}
                             onChange={formik.handleChange}
                            placeHolder="NLAD Subscriber Id"
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="applicationId"
                             value={formik.values.applicationId}
                             onChange={formik.handleChange}
                            placeHolder="NV Application Id"
                        />
                    </div>
                   
                   
                    </div>
                    <div className=' flex justify-content-between ml-2 mr-2 mt-3'>
                    <Button label="Cancel" type="button" onClick={closeModal}/>
                    <Button label="Reset" type="submit"/>
                    <Button label="Search" type="submit"/>
                    </div>
                    </form>
    </>
  )
}

export default DialogeForAdvanceSearch