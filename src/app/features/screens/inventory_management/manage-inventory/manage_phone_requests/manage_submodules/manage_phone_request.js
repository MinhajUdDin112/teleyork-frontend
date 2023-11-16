import React from "react";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import ManageStateCity from "./manage_state_city";
import { masteragent, emptydistributor, emptyretailer, carrier, retailer, distributor, currentstatus, ordershippingmode } from "../assets";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import ManageStandingOrder from "./manage_standing_order";
import AddStandingOrder from "./add_standing_order";
import AddNewPhoneRequest from "./add_new_phone_request"; 
export default function ManagePhoneRequest({setHideBackInventoryButton}) {
    const [onsearchdata, setOnSearchData] = useState([]);  
    function handleSearch() {
        //Api call goes here
    }
    const [activephonerequestcomponent, setActivePhoneRequestComponent] = useState("");
     

   
    const formik = useFormik({
        initialValues: {
            masteragent: "",
            retailer: "",
            distributor: "",
            carrier: "",
            currentstatus: "all",
            ordershippingmode: "all",
            purchaseorderno: "",
        },
    });
    return (
        <>
            {activephonerequestcomponent === "ManageStateCity" ? (
                <ManageStateCity setHideBackInventoryButton={setHideBackInventoryButton} setActivePhoneRequestComponent={setActivePhoneRequestComponent} />
            ) : activephonerequestcomponent === "ManageStandingOrder" ? (
                <ManageStandingOrder setHideBackInventoryButton={setHideBackInventoryButton} setActivePhoneRequestComponent={setActivePhoneRequestComponent} />
            ) : activephonerequestcomponent === "AddStandingOrder" ? (
                <AddStandingOrder setHideBackInventoryButton={setHideBackInventoryButton} setActivePhoneRequestComponent={setActivePhoneRequestComponent} />
            ) : activephonerequestcomponent === "AddNewPhoneRequest" ? (
                <AddNewPhoneRequest setHideBackInventoryButton={setHideBackInventoryButton} setActivePhoneRequestComponent={setActivePhoneRequestComponent} />
            ) : (
                <div>
                    <div className="card mt-4 p-4">
                        <p>Approve Phone Request</p>
                    </div>
                    <div className="card ">
                        <div className="flex flex-wrap justify-content-around">
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Master Agent:
                                </label>
                                <Dropdown value={formik.values.masteragent} options={masteragent} onChange={(e) => formik.setFieldValue("masteragent", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>

                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Distributor:
                                </label>
                                <Dropdown value={formik.values.distributor} options={formik.values.masteragent !== "" ? distributor : emptydistributor} onChange={(e) => formik.setFieldValue("distributor", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Retailer:
                                </label>
                                <Dropdown value={formik.values.retailer} options={formik.values.distributor !== "" ? retailer : emptyretailer} onChange={(e) => formik.setFieldValue("retailer", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Order Shipping Mode:
                                </label>
                                <Dropdown defaultValue="all" value={formik.values.ordershippingmode} options={ordershippingmode} onChange={(e) => formik.setFieldValue("ordershippingmode", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Current Status:
                                </label>
                                <Dropdown defaultValue="all" value={formik.values.currentstatus} options={currentstatus} onChange={(e) => formik.setFieldValue("currentstatus", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Search By Purchase Order No:
                                </label>
                                <InputText value={formik.values.purchaseorderno} onChange={(e) => formik.setFieldValue("purchaseorderno", e.value)} className="mt-2 w-full" />
                            </div>
                            <div className="mt-2 w-20rem">
                                <label className="mt-4" style={{ display: "block" }}>
                                    Carrier:
                                </label>
                                <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="mt-2 w-full" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-content-center">
                            <Button label="Submit" onClick={handleSearch} />
                        </div>
                        <div className="mt-4  flex flex-wrap justify-content-around">
                            <div className="card w-20 mt-4">
                                <p
                                    style={{ color: "royalblue", cursor: "pointer", width: "inherit" }}
                                    onClick={() => {
                                        setActivePhoneRequestComponent("ManagePhoneRequest");
                                    }}
                                >
                                    Manage Phone Request
                                </p>
                            </div>
                            <div className=" card w-20 mt-4">
                                <p
                                    style={{ color: "royalblue", cursor: "pointer" }}
                                    onClick={() => {
                                        setActivePhoneRequestComponent("ManageStateCity");
                                    }}
                                >
                                    Manage State City
                                </p>
                            </div>
                            <div className="card w-20 mt-4">
                                <p
                                    style={{ color: "royalblue", cursor: "pointer" }}
                                    onClick={() => {
                                        setActivePhoneRequestComponent("ManageStandingOrder");
                                    }}
                                >
                                    Manage Standing Order
                                </p>
                            </div>
                            <div className="card w-20 mt-4">
                                <p
                                    style={{ color: "royalblue", cursor: "pointer" }}
                                    onClick={() => {
                                        setActivePhoneRequestComponent("AddStandingOrder");
                                    }}
                                >
                                    Add Standing Order
                                </p>
                            </div>
                            <div className="card w-20 mt-4">
                                <p
                                    style={{ color: "royalblue", cursor: "pointer" }}
                                    onClick={() => {
                                        setActivePhoneRequestComponent("AddNewPhoneRequest");
                                    }}
                                >
                                    Add New Phone Request
                                </p>
                            </div>
                        </div>
                        <h5 className="mt-4"> Total Record: {onsearchdata.length}</h5>
                        <DataTable className="mt-4" />
                    </div>
                </div>
            )}
        </>
    );
}
