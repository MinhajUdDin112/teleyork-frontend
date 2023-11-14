import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { carrier, emptyretailer, phonetype, emptydistributor, masteragent, distributor, retailer, ordershippingmode } from "../assets";
import { NewYorkStates } from "../../../../../../../Utils/new_york_states";
export default function AddNewPhoneRequest({ setHideBackInventoryButton, setActivePhoneRequestComponent }) {
    setHideBackInventoryButton(true);
    const formik = useFormik({
        initialValues: {
            masteragent: "",
            retailer: "",
            distributor: "",
            phonetype: "",
            carrier: "",
            ordershippingmode: "all",
            deliverydate: "",
            requestedquantity: "",
            mailingzipcode: "",
            mailingcity: "",
            mailingstate: "",
            mailingaddress1: "",
            mailingaddress2: "",
            comments: "",
        },
    });

    function handleSearch() {
        //Api call goes here
    }
    useEffect(() => {
        return () => {
            setHideBackInventoryButton(false);
        };
    }, []);
    return (
        <div>
            <div className="card">
                <Button
                    label="Back"
                    onClick={() => {
                        setActivePhoneRequestComponent("");
                    }}
                    style={{ padding: "10px", paddingLeft: "15px", paddingRight: "15px" }}
                />
                <p className="mt-4" style={{ fontSize: "16px" }}>
                    Add New Phone Request
                </p>
            </div>
            <div className="card ">
                <div className="flex flex-wrap justify-content-around">
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Master Agent Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.masteragent} options={masteragent} onChange={(e) => formik.setFieldValue("masteragent", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>

                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Distributor Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.distributor} options={formik.values.masteragent !== "" ? distributor : emptydistributor} onChange={(e) => formik.setFieldValue("distributor", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Retailer Name<span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.retailer} options={formik.values.distributor !== "" ? retailer : emptyretailer} onChange={(e) => formik.setFieldValue("retailer", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Order Shipping Mode <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown defaultValue="all" value={formik.values.ordershippingmode} options={ordershippingmode} onChange={(e) => formik.setFieldValue("ordershippingmode", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Phone Type <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.phonetype} options={phonetype} onChange={(e) => formik.setFieldValue("phonetype", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>

                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Carrier <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Delivery Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.deliverydate} onChange={(e) => formik.setFieldValue("deliverydate", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Requested Quantity <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.requestedquantity} onChange={(e) => formik.setFieldValue("requestedquantity", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Mailing City <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.mailingcity} onChange={(e) => formik.setFieldValue("mailingcity", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Mailing State <span style={{ color: "red" }}>*</span>
                        </label>
                        <Dropdown value={formik.values.mailingstate} onChange={(e) => formik.setFieldValue("mailingstate", e.value)} options={NewYorkStates} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Mailing Address1 <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.mailingaddress1} onChange={(e) => formik.setFieldValue("mailingaddress1", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Mailing Address2 <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.mailingaddress2} onChange={(e) => formik.setFieldValue("mailingaddress2", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Mailing Zipcode <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.mailingzipcode} onChange={(e) => formik.setFieldValue("mailingzipcode", e.value)} className="mt-2 w-full" />
                    </div>
                    <div className="mt-2 w-20rem">
                        <label className="mt-4" style={{ display: "block" }}>
                            Comments <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputText value={formik.values.comments} onChange={(e) => formik.setFieldValue("comments", e.value)} className="mt-2 w-full" />
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-content-center">
                    <Button label="Submit" onClick={handleSearch} />
                </div>
            </div>
        </div>
    );
}
