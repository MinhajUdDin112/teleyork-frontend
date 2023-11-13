import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { feature, action } from "./assets";
import { useFormik } from "formik";
import { Card } from "primereact/card";
import React from "react";
import NewOrderRequest from "./actions/new_order_request/new_order_request";
import CompletedOrderRequest from "./actions/completed_order_request/completed_order_request";
import CancelOrderRequest from "./actions/cancel_order_request/cancel_order_request";
export default function Equipment_And_Accessories_Request({ setActiveComponent }) {
    const formik = useFormik({
        initialValues: {
            feature: "",
            action: "",
        },
    });
    return (
        <Card>
            <Button
                label="Back"
                onClick={() => {
                    setActiveComponent("");
                }}
                className="card"
                style={{ padding: "10px", paddingLeft: "15px", background: "royalblue", paddingRight: "15px" }}
            />
            <div className="card mt-4 flex flex-wrap justify-content-around">
                <Dropdown value={formik.values.feature} options={feature} onChange={(e) => formik.setFieldValue("feature", e.value)} placeholder="Select an option" className="w-20rem" />
                <Dropdown value={formik.values.action} options={action} onChange={(e) => formik.setFieldValue("action", e.value)} placeholder="Select an option" className="w-20rem" />
            </div>
            {formik.values.feature === "equipmentandaccessoriesrequest" && formik.values.action === "neworderrequest" ? (
                <NewOrderRequest />
            ) : formik.values.feature === "equipmentandaccessoriesrequest" && formik.values.action === "completedorderrequest" ? (
                <CompletedOrderRequest />
            ) : formik.values.feature === "equipmentandaccessoriesrequest" && formik.values.action === "cancelorderrequest" ? (
                <CancelOrderRequest />
            ) : undefined}{" "}
        </Card>
    );
}
