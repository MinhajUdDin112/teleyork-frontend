import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useFormik, formi, setIn } from "formik";
import * as Yup from "yup";
import { Dropdown } from "primereact/dropdown";
import PaymentStripModule from "./dialog/stripe_payment";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { clippingParents } from "@popperjs/core";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Agree = ({ handleNext, handleBack, enrollment_id, _id, csr }) => {

    const [inventory, setInventory] = useState();
    const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();
    //Handle Back
    let paymentInfo = JSON.parse(localStorage.getItem("paymentallinfo"))?.data;


    const validationSchema = Yup.object().shape({
        //billId: Yup.string().required("Product is required"),
        paymentMode: Yup.string().required("Payment Mode are required"),
        plan: Yup.string().required("Please Select it first"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            plan: "",
            billId: [],
            paymentMode: "",
            discount: [],
            additional: [],
            totalamount: "",
            customerid: _id,
            type: "Sign Up "
        },
        onSubmit: async (values, actions) => {

            const dataToSend = {
                invoiceType: "Sign Up",
                customerId: _id,
                planId: formik.values.plan,
                planCharges: planCharges,
                additionalCharges: additionalFeature,
                discount: discounts,
                totalAmount: formik.values.totalamount,
                amountPaid: "0",
                invoiceDueDate: dueDate,
                billingPeriod: {
                    from: "onActivation",
                    to: "onActivation"
                },
                invoiceStatus: "pending",

                paymentMethod: formik.values.paymentMode,
                invoiceOneTimeCharges: oneTimeCharge,
                lateFee: applyLateFee,
                planName: planName,
                chargingType: "Monthly",
                printSetting: "Both",
                productName:"",

                selectProduct: formik.values.billId,

            }
            if (formik.values.paymentMode == "skip") {
                try {
                    console.log("Data to send is", dataToSend)
                    const response = await Axios.post(`${BASE_URL}/api/user/postpaidpaymentDetails`, dataToSend)

                    if (response?.status === 201 || response?.status === 200) {
                        console.log( "data is", response?.data?.data)
                        localStorage.setItem("productData", JSON.stringify(response?.data?.data));
                        handleNext();
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.msg) 
                }



            } 
            if (localStorage.getItem("paymentstatus")) {
                if (localStorage.getItem("paymentstatus") === "paid") {

                    handleNext();

                } else {
                    setPaymentDialogVisibility(true);
                }
            } else {
                setPaymentDialogVisibility(true);
            }
        },
    });

    let additionalFeature = []
    let discounts = []

    let devicepricing = JSON.parse(localStorage.getItem("devicepricing"))
    let simpricing = JSON.parse(localStorage.getItem("simpricing"))
    let dueDate = ""
    let applyLateFee = ""
    let oneTimeCharge = ""
    let planName = ""
    let planId = ""
    let planCharges = ""
    if (formik.values.plan === simpricing?._id) {
        dueDate = simpricing?.dueDate
        console.log("sim due date is",simpricing?.dueDate)
        oneTimeCharge = simpricing?.oneTimeCharge
        applyLateFee = simpricing?.applyLateFee
        for (let i = 0; i < simpricing?.selectdiscount?.length; i++) {
            let obj = {
                name: simpricing?.selectdiscount[i]?.discountname,
                amount: simpricing?.selectdiscount[i]?.amount,

            }
            discounts.push(obj)

        }
        for (let i = 0; i < simpricing.monthlyCharge.length; i++) {
            if (formik.values.billId === simpricing?.monthlyCharge[i]?._id) {
                planName = simpricing?.monthlyCharge[i]?.name
                planCharges = simpricing?.monthlyCharge[i]?.price;
                planId = simpricing?.monthlyCharge[i]?._id;
            }
        }
        let simadditional = JSON.parse(localStorage.getItem("simadditionalfeaturearray"))
        for (let k = 0; k < simadditional?.length; k++) {
            for (let i = 0; i < simpricing?.additionalFeature?.length; i++) {

                if (simpricing?.additionalFeature[i]?.featureName?._id === simpricing?.additionalFeature[i]?._id) {
                    let obj = {
                        name: simpricing?.additionalFeature[i]?.featureName,
                        amount: simpricing?.additionalFeature[i]?.featureAmount,
                    }
                    additionalFeature.push(obj)
                }
            }
        }
    }
    else {
        dueDate = devicepricing?.dueDate
     
        applyLateFee = devicepricing?.applyLateFee
        oneTimeCharge = devicepricing?.oneTimeCharge
        for (let i = 0; i < devicepricing?.selectdiscount?.length; i++) {
            let obj = {
                name: devicepricing?.selectdiscount[i]?.discountname,
                amount: devicepricing?.selectdiscount[i]?.amount,
            }
            discounts.push(obj)
        }
        for (let i = 0; i < devicepricing?.monthlyCharge?.length; i++) {
            if (formik.values.plan === devicepricing?.monthlyCharge[i]?._id) {
                planName = devicepricing?.monthlyCharge[i]?.name
                planCharges = devicepricing?.monthlyCharge[i]?.price;

                planId = devicepricing?.monthlyCharge[i]?._id;
            }
        }
        let deviceadditional = JSON.parse(localStorage.getItem("deviceadditionalfeaturearray"))
      
        for (let k = 0; k < deviceadditional?.length; k++) {
            for (let i = 0; i < devicepricing?.additionalFeature?.length; i++) {
                if (deviceadditional[k] === devicepricing?.additionalFeature[i]?._id) {
                    let obj = {
                        name: devicepricing?.additionalFeature[i]?.featureName,
                        amount: devicepricing?.additionalFeature[i]?.featureAmount,
                    }
                    additionalFeature.push(obj)
                }
            }
        }
    }


    const optionsForPayment = [
        { label: "Select ", value: "" },
        { label: "Credit/Debit card", value: "card" },
        { label: "Skip Payment", value: "skip" },

    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error block">{formik.errors[name]}</small>;
    };


    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer />
            <div className="card">
                <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons ">
                    <div>
                        <Button label="Back" type="button" onClick={handleBack} />
                    </div>
                    <div className="fixed-button-container">
                        {" "}
                        <Button label="Continue" type="submit" icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} disabled={isLoading} />
                    </div>
                </div>
                <div>
                    <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div>
                <div className="flex flex-wrap flex-row justify-content-around">
                    <div className="mt-2">
                        <label className="block">Select Product</label>
                        <Dropdown
                            disabled={paymentInfo ? true : false}
                            className="field-width mt-2"
                            value={formik.values.billId}
                            onChange={(e) => {
                                formik.setFieldValue("billId", e.value);
                                let inventory;
                                let inventoryType = JSON.parse(localStorage.getItem("inventoryType"));
                                for (let i = 0; i < inventoryType.length; i++) {
                                    if (e.value === inventoryType[i].value) {
                                        inventory = inventoryType[i].label;
                                        break;
                                    }
                                }
                                setInventory(inventory);
                                if (inventory === "Sim Card") {
                                    formik.setFieldValue("discount", JSON.parse(localStorage.getItem("simdiscountobjectarray")));
                                    let oneTimeCharge = JSON.parse(localStorage.getItem("simpricing")).oneTimeCharge;
                                    let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("simadditionaltotal")));
                                    let amountafterdiscount = (parseFloat(oneTimeCharge) + amountafteradditionalfeature - parseFloat(JSON.parse(localStorage.getItem("totalsimdiscount")))).toString();
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("simadditionalfeaturearray")).length > 0 ? JSON.parse(localStorage.getItem("simadditionalfeaturearray")) : []);
                                    formik.setFieldValue("totalamount", amountafterdiscount);
                                 // Inside the inventory selection handler
                                 formik.setFieldValue("productName","SIM CARD")

                                } else if (inventory === "Wireless Device") {
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("devicediscountobjectarray")).length > 0 ? JSON.parse(localStorage.getItem("devicediscountobjectarray")) : []);
                                    formik.setFieldValue("discount", JSON.parse(localStorage.getItem("devicediscountobjectarray")));
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("deviceadditionalfeaturearray")));
                                    let oneTimeCharge = JSON.parse(localStorage.getItem("devicepricing")).oneTimeCharge;
                                    let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("deviceadditionaltotal")));
                                    let amountafterdiscount = (parseFloat(oneTimeCharge) + amountafteradditionalfeature - parseFloat(JSON.parse(localStorage.getItem("totaldevicediscount")))).toString();
                                    formik.setFieldValue("totalamount", amountafterdiscount);
                                }
                                formik.handleChange(e);
                            }}
                            options={JSON.parse(localStorage.getItem("inventoryType"))}
                            placeholder="Select Inventory"
                        />
                        {getFormErrorMessage("plan")}
                        {/* Add this line to display validation error */}
                    </div>

                    <div className="mt-2">
                        <label className="block">Select Plan</label>
                        {inventory === "Sim Card" ? (
                            <>
                                <Dropdown
                                    disabled={paymentInfo ? true : false}
                                    className="field-width mt-2"
                                    id="plan"
                                    placeholder="Select Plan"
                                    optionLabel="name"
                                    options={JSON.parse(localStorage.getItem("simplan"))}
                                    value={formik.values.plan}
                                    onChange={(e) => {
                                        formik.setFieldValue("plan", e.value);
                                        formik.handleChange(e);
                                    }}
                                />
                                {getFormErrorMessage("plan")}
                            </>
                        ) : (
                            <>
                                <Dropdown
                                    disabled={paymentInfo ? true : false}
                                    className="field-width mt-2"
                                    placeholder="Select Plan"
                                    id="plan"
                                    optionLabel="name"
                                    options={JSON.parse(localStorage.getItem("deviceplan"))}
                                    value={formik.values.plan}
                                    onChange={(e) => {
                                        formik.setFieldValue("plan", e.value);
                                        formik.handleChange(e);
                                    }}
                                />
                                {getFormErrorMessage("plan")}
                            </>
                        )}
                    </div>
                    <div className="mt-2">
                        <label className="block">Select Additional Feature</label>
                        {inventory === "Sim Card" ? (
                            <>
                                <MultiSelect
                                    disabled={paymentInfo ? true : false}
                                    className="field-width mt-2"
                                    id="additional"
                                    placeholder="Select Additional Feature"
                                    optionLabel="name"
                                    options={JSON.parse(localStorage.getItem("simadditional"))}
                                    value={formik.values.additional}
                                    onChange={(e) => {
                                        let additional = formik.values.additional;
                                        let prerviousadditionaltotal = 0;
                                        let totalamount = parseFloat(formik.values.totalamount);
                                        let simpricing = JSON.parse(localStorage.getItem("simpricing"));
                                        for (let i = 0; i < additional.length; i++) {
                                            for (let k = 0; k < simpricing.additionalFeature.length; k++) {
                                                if (simpricing.additionalFeature[k]._id === additional[i]) {
                                                    prerviousadditionaltotal += parseFloat(simpricing.additionalFeature[k].featureAmount);
                                                }
                                            }
                                        }
                                        totalamount -= prerviousadditionaltotal;
                                        let additionalnew = e.value;
                                        let newadditionaltotal = 0;
                                        for (let i = 0; i < additionalnew.length; i++) {
                                            for (let k = 0; k < simpricing.additionalFeature.length; k++) {
                                                if (simpricing.additionalFeature[k]._id === additionalnew[i]) {
                                                    newadditionaltotal += parseFloat(simpricing.additionalFeature[k].featureAmount);
                                                }
                                            }
                                        }
                                        totalamount += newadditionaltotal;
                                        localStorage.setItem("simadditionalfeaturearray", JSON.stringify(e.value));
                                        formik.setFieldValue("additional", e.value);
                                        formik.setFieldValue("totalamount", totalamount.toString());
                                    }}
                                />
                                {getFormErrorMessage("additional")}
                            </>
                        ) : (
                            <>
                                <MultiSelect
                                    disabled={paymentInfo ? true : false}
                                    className="field-width mt-2"
                                    placeholder="Select Additional Feature"
                                    id="additional"
                                    optionLabel="name"
                                    options={JSON.parse(localStorage.getItem("deviceadditional"))}
                                    value={formik.values.additional}
                                    onChange={(e) => {
                                        let additional = formik.values.additional;
                                        let prerviousadditionaltotal = 0;
                                        let totalamount = parseFloat(formik.values.totalamount);
                                        let devicepricing = JSON.parse(localStorage.getItem("devicepricing"));
                                        for (let i = 0; i < additional.length; i++) {
                                            for (let k = 0; k < devicepricing.additionalFeature.length; k++) {
                                                if (devicepricing.additionalFeature[k]._id === additional[i]) {
                                                    prerviousadditionaltotal += parseFloat(devicepricing.additionalFeature[k].featureAmount);
                                                }
                                            }
                                        }
                                        totalamount -= prerviousadditionaltotal;
                                        let additionalnew = e.value;
                                        let newadditionaltotal = 0;
                                        for (let i = 0; i < additionalnew.length; i++) {
                                            for (let k = 0; k < devicepricing.additionalFeature.length; k++) {
                                                if (devicepricing.additionalFeature[k]._id === additionalnew[i]) {
                                                    newadditionaltotal += parseFloat(devicepricing.additionalFeature[k].featureAmount);
                                                }
                                            }
                                        }
                                        totalamount += newadditionaltotal;
                                        localStorage.setItem("deviceadditionalfeaturearray", JSON.stringify(e.value));
                                        formik.setFieldValue("additional", e.value);
                                        formik.setFieldValue("totalamount", totalamount.toString());
                                    }}
                                />
                                {getFormErrorMessage("additional")}
                            </>
                        )}
                    </div>
                    <div className="mt-2">
                        <label className="block">Net Amount</label>
                        <InputText
                            disabled
                            className="field-width mt-2"
                            id="totalamount"
                            value={formik.values.totalamount}
                            onChange={(e) => {
                                formik.setFieldValue("totalpayment", e.value);
                                formik.handleChange(e);
                            }}
                        />
                        {getFormErrorMessage("totalpayment")}
                    </div>
                    <div className="mt-2">
                        <label className="block">Select Payment Method</label>
                        <Dropdown
                            disabled={paymentInfo ? true : false}
                            className="field-width mt-2"
                            id="paymentMode"
                            options={optionsForPayment}
                            value={formik.values.paymentMode}
                            onChange={(e) => {
                                formik.setFieldValue("paymentMode", e.value);
                                formik.handleChange(e);

                            }}
                        />
                        {getFormErrorMessage("paymentMode")}
                    </div>
                    {formik.values.paymentMode == "card" ? (
                        <>
                            <Dialog className="stripe-dialog-width" header="Stripe Payment" visible={paymentDialogVisibility} onHide={() => setPaymentDialogVisibility(false)}>
                                <PaymentStripModule amount={formik.values.totalamount} object={formik.values} handleNext={handleNext} />
                            </Dialog>
                        </>
                    ) : undefined}
                </div>
            </div>
        </form>
    );
};

export default Agree;
