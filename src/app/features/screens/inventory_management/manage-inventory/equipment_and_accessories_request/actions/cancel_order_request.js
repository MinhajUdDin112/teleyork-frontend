import React from "react";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { paymenttype, equipmenttype, processtype } from "../assets";
import { Button } from "primereact/button";
export default function CancelOrderRequest() {
    const formik = useFormik({
        initialValues: {
            equipmenttype: "allequipment&accessories",
            processtype: "allprocesstype",
            paymenttype: "allpaymentmethod",
            customerid: "",
        },
    });
    return (
        <div>
            <h5 className="card">Cancel Order Request </h5>
            <div className="flex flex-wrap justify-content-around">
                <InputText name="customerid" value={formik.values.customerid} onChange={formik.handleChange} className=" mt-4 w-20rem" placeholder="Customer Id" />
                <Dropdown defaultValue="allequipment&accessories" value={formik.values.equipmenttype} options={equipmenttype} onChange={(e) => formik.setFieldValue("equipmenttype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
                <Dropdown defaultValue="allprocesstype" value={formik.values.processtype} options={processtype} onChange={(e) => formik.setFieldValue("processtype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
                <Dropdown defaultValue="allpaymentmethod" value={formik.values.paymenttype} options={paymenttype} onChange={(e) => formik.setFieldValue("paymenttype", e.value)} placeholder="Select an option" className="mt-4 w-20rem" />
            </div>
            <div className="mt-4 flex flex-wrap justify-content-center">
                <Button label="Submit" />
            </div>
        </div>
    );
}
