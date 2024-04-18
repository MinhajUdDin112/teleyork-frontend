import React, { useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { useState } from "react";
import "../css/advance_search.css";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import DisplayAdvanceSearchApiResponse from "./component/search_result";
import { ProgressSpinner } from "primereact/progressspinner";  
import { InputMask } from 'primereact/inputmask';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdvanceSearch = ({ setSearchBy }) => {  
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);  
    const [carrierholder,setCarrier]=useState([])
    const formik = useFormik({
        initialValues: {
            contact: "",
            firstName: "",
            lastName: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            DOB: "",
            SSN: "",
            esnId: "",
            status: "",
            carrier: "",
            esn: "",
            IMEI: "",
            applicationId: "",
            subscriberId: "",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                contact: formik.values.contact,
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
            try {
                setIsLoading(true);
                const response = await Axios.post(`${BASE_URL}/api/web/search/advancesearch?userId=${parseLoginRes._id}`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setSearchData(response?.data);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
            }
        },
    });
    //Account Type
   /* const optionsForAccountType = [ 
         {label:"--Select--",value:""},
        { label: "ACP", value: "acp" },
        { label: "Non ACP", value: "nonAcp" },
    ];*/
    //Status
    const optionsForStatus = [  
         {label:"Status",value:""},
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Rejected", value: "rejected" },
        { label: "Suspend", value: "suspend" },
        { label: "Prospect", value: "prospect" },
        { label: "Dispatched", value: "dispatched" },
    ]; 
    useEffect(()=>{
    Axios.get(`${BASE_URL}/api/web/carrier/all`)
        .then((res) => {
            let carrierholder = [{label:"Carrier",value:""}];
            for (let i = 0; i < res.data.data.length; i++) {
                const obj = {};
                obj.label = res.data.data[i].name;
                obj.value = obj.label;
                carrierholder.push(obj);
            }

            setCarrier(carrierholder);
        })
        .catch(() => {
        });
    
}, [])
    return (
        <div className="card">
            <form onSubmit={formik.handleSubmit}>
                <h1 className="daterange p-4 ml-4">Advance Search </h1>
                <div className="flex flex-wrap justify-content-around wrapper flex-row">
                    <div className="field-width2 mt-2">
                        <InputText id="contact" keyfilter="pint" value={formik.values.contact} onChange={formik.handleChange} className="w-full" placeHolder="Phone Number" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="address1" value={formik.values.address1} onChange={formik.handleChange} className="w-full" placeHolder="Street Address" />
                    </div>  
                    <div className="field-width2 mt-2">
                        <InputText id="address2" value={formik.values.address2} onChange={formik.handleChange} className="w-full" placeHolder="Apartment or Unit" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="esnId" value={formik.values.esnId} onChange={formik.handleChange} className="w-full" placeHolder="Account Number" />
                    </div>
                    
                    {/*<div className="field-width2 mt-2">
                        <InputText
                            // id="phoneNumber"
                            // value={formik.values.phoneNumber}  
                            onChange={formik.handleChange}
                            placeHolder="Enroll Id"
                            className="w-full"
                        />
                    </div>  */}
                    <div className="field-width2 mt-2">
                        <InputText id="city" className="w-full" value={formik.values.city} onChange={formik.handleChange} placeHolder="City" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="firstName" className="w-full" value={formik.values.firstName} onChange={formik.handleChange} placeHolder="First Name" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="state" className="w-full" value={formik.values.state} onChange={formik.handleChange} placeHolder="State" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="lastName" className="w-full" value={formik.values.lastName} onChange={formik.handleChange} placeHolder="Last Name" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="zip" className="w-full" value={formik.values.zip} onChange={formik.handleChange} placeHolder="Zip" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="email" className="w-full" value={formik.values.email} onChange={formik.handleChange} placeHolder="Email" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="SSN" keyfilter="pint" className="w-full" value={formik.values.SSN} onChange={formik.handleChange} placeHolder="SSN" />
                    </div>

                   
                    <div className="field-width2 mt-2">
                        <InputMask id="DOB"  mask="99-99-9999"
      placeholder="MM-DD-YYYY" className="w-full"  value={formik.values.DOB} onChange={formik.handleChange} />
                    </div>
                    <div className="field-width2 mt-2">
                        <Dropdown
                            id="status"
                            value={formik.values.status}
                            placeholder="Status"
                            options={optionsForStatus}
                            onChange={formik.handleChange}
                            className="w-full"
                        />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="esn"  keyfilter="pint" className="w-full" value={formik.values.esn} onChange={formik.handleChange} placeHolder="SIM/ESN" />
                    </div>
                    <div className="field-width2 mt-2">
                        <Dropdown
                            id="carrier"
                            value={formik.values.carrier}
                            placeholder="Carrier"
                            options={carrierholder}
                            className="w-full"
                            onChange={(e) => {
                                formik.setFieldValue("carrier", e.value);
                                formik.handleChange(e);
                            }}
                        />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="IMEI" className="w-full" keyfilter="pint" value={formik.values.IMEI} onChange={formik.handleChange} placeHolder="IMEI" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="subscriberId" className="w-full" value={formik.values.subscriberId} onChange={formik.handleChange} placeHolder="NLAD Subscriber Id" />
                    </div>
                    <div className="field-width2 mt-2">
                        <InputText id="applicationId" className="w-full" value={formik.values.applicationId} onChange={formik.handleChange} placeHolder="NV Application Id" />
                    </div> 
                    <div className="field-width2 ">
                    <Button label="Search" type="submit" className="w-full mt-2" />
                     </div>
                </div>
               
            </form>  
            {!isLoading ? (
            <DisplayAdvanceSearchApiResponse  searchData={searchData} setSearchBy={setSearchBy} />
            ):
                <div>
                    <ProgressSpinner className="mt-4 pt-4 flex flex-wrap justify-content-center flex-row " />
                </div> 
}
            
        </div>
    );
};

export default AdvanceSearch;
