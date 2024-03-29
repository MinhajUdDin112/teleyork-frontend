import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dropdown } from "primereact/dropdown";
import PaymentStripModule from "./dialog/stripe_payment";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
const PaymentScreen = ({ setActiveIndex, enrollment_id, _id, csr }) => {
    console.log("payment screen is here ");
    const [inventory, setInventory] = useState();
    const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();
    const [previousPlanPrice, setPreviousPlanPrice] = useState(0);
    //Handle Back
    let paymentInfo = JSON.parse(localStorage.getItem("paymentallinfo"))?.data;

    const handleBack = () => {
        setActiveIndex(1);
    };
    const validationSchema = Yup.object().shape({
        billId: Yup.string().required("Product is required"),
        paymentMode: Yup.string().required("Payment Mode are required"),
        plan: Yup.string().required("Plan is required"),  
        paid:Yup.string().required("Paid Amount is required")
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            plan: "",
            billId: "",
            paymentMode: "",
            discount: [],
            additional: [],
            totalamount: "",  
            paid:"",
            customerid: _id,
            type: "Sign Up ",
        },
        onSubmit: async (values, actions) => {
            if (localStorage.getItem("paymentstatus")) {
                if (localStorage.getItem("paymentstatus") === "paid") {
                    setActiveIndex(3);
                } else {
                    setPaymentDialogVisibility(true);
                }
            } else {
                setPaymentDialogVisibility(true);
            }
        },
    });
    console.log("formik values is", formik.values);
    useEffect(() => {
        if (paymentInfo) {
            console.log("payment mode has set");
            setPaymentDialogVisibility(false);
            formik.setFieldValue("billId", paymentInfo.billId);
            formik.setFieldValue("plan", paymentInfo.plan);
            formik.setFieldValue("additionalFeature", paymentInfo.additionalFeature);
            formik.setFieldValue("discount", paymentInfo.discount);
            formik.setFieldValue("totalamount", paymentInfo.totalAmount);
        }
    }, []);
    const optionsForPayment = [
        { label: "Select ", value: "" },
        { label: "Credit/Debit card", value: "card" },
    ];
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error block">{formik.errors[name]}</small>;
    };
    return (
        <form onSubmit={formik.handleSubmit}>
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
                                 console.log(e)
                                 localStorage.setItem("product",e.key)
                                formik.setFieldValue("totalamount", 0);
                                formik.setFieldValue("billId", e.value);

                                let inventory;
                                let inventoryType = JSON.parse(localStorage.getItem("inventoryType"));
                                for (let i = 0; i < inventoryType.length; i++) {
                                    if (e.value === inventoryType[i].value) {
                                        inventory = inventoryType[i].label; 
                                         localStorage.setItem("product",inventory)
                                        break;
                                    }
                                }
                                setInventory(inventory);
                                if (inventory === "SIM") {
                                    formik.setFieldValue("discount", JSON.parse(localStorage.getItem("simdiscountobjectarray")));
                                    let oneTimeCharge = JSON.parse(localStorage.getItem("simpricing")).oneTimeCharge;
                                    let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("simadditionaltotal")));
                                    formik.setFieldValue("plan", "");
                                    let amountafterdiscount = (parseFloat(oneTimeCharge) + amountafteradditionalfeature - parseFloat(JSON.parse(localStorage.getItem("totalsimdiscount")))).toString();
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("simadditionalfeaturearray")).length > 0 ? JSON.parse(localStorage.getItem("simadditionalfeaturearray")) : []);
                                    formik.setFieldValue("totalamount", amountafterdiscount);  
                                    setPreviousPlanPrice(0)
                                } else if (inventory === "WIRELESS DEVICE") {
                                    formik.setFieldValue("plan", "");
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("devicediscountobjectarray")).length > 0 ? JSON.parse(localStorage.getItem("devicediscountobjectarray")) : []);
                                    formik.setFieldValue("discount", JSON.parse(localStorage.getItem("devicediscountobjectarray")));
                                    formik.setFieldValue("additional", JSON.parse(localStorage.getItem("deviceadditionalfeaturearray")));
                                    let oneTimeCharge = JSON.parse(localStorage.getItem("devicepricing")).oneTimeCharge;
                                    let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("deviceadditionaltotal")));
                                    let amountafterdiscount = (parseFloat(oneTimeCharge) + amountafteradditionalfeature - parseFloat(JSON.parse(localStorage.getItem("totaldevicediscount")))).toString();
                                    formik.setFieldValue("totalamount", amountafterdiscount);   
                                    setPreviousPlanPrice(0)
                                }
                                formik.handleChange(e);
                            }}
                            options={JSON.parse(localStorage.getItem("inventoryType"))}
                            placeholder="Select Inventory"
                        />
                        {getFormErrorMessage("billId")}
                    </div>
                    <div className="mt-2">
                        <label className="block">Select Plan</label>
                        {inventory === "SIM" ? (
                            <>
                                <Dropdown
                                    disabled={paymentInfo ? true : false}
                                    className="field-width mt-2"
                                    id="plan"
                                    placeholder="Select Plan"
                                    optionLabel="name"
                                    optionValue="value"
                                    options={JSON.parse(localStorage.getItem("simplan"))}
                                    value={formik.values.plan}
                                    onChange={(e) => {
                                        console.log("inventory is", inventory);
                                        console.log(e);
                                        if (formik.values.plan === "") {
                                            let devicepricing = JSON.parse(localStorage.getItem("planprices"));
                                            for (let i = 0; i < devicepricing.length; i++) {
                                                if (devicepricing[i]._id === e.value) {
                                                    console.log("adding plan === null ");
                                                    formik.setFieldValue("totalamount", parseFloat(formik.values.totalamount) + devicepricing[i].price).toString();
                                                    setPreviousPlanPrice(devicepricing[i].price);
                                                }
                                            }

                                            formik.setFieldValue("plan", e.value);
                                            //formik.handleChange(e);
                                        } else {
                                            let devicepricing = JSON.parse(localStorage.getItem("planprices"));

                                            for (let i = 0; i < devicepricing.length; i++) {
                                                if (devicepricing[i]._id === e.value) {
                                                    console.log("adding current plan pricing ");
                                                    formik.setFieldValue("totalamount", (parseFloat(formik.values.totalamount) + devicepricing[i].price - previousPlanPrice).toString());
                                                    setPreviousPlanPrice(devicepricing[i].price);
                                                }
                                            }
                                            formik.setFieldValue("plan", e.value);
                                            //formik.handleChange(e);
                                        }
                                    }}
                                />
                                {getFormErrorMessage("plan")}
                            </>
                        ) : inventory === "WIRELESS DEVICE" ? (
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
                                        if (formik.values.plan === "") {
                                            let devicepricing = JSON.parse(localStorage.getItem("planprices"));
                                            for (let i = 0; i < devicepricing.length; i++) {
                                                if (devicepricing[i]._id === e.value) {
                                                    formik.setFieldValue("totalamount", parseFloat(formik.values.totalamount) + devicepricing[i].price).toString();
                                                }
                                            }
                                            formik.setFieldValue("plan", e.value);
                                            formik.handleChange(e);
                                        } else {
                                            let devicepricing = JSON.parse(localStorage.getItem("planprices"));
                                            for (let i = 0; i < devicepricing.length; i++) {
                                                if (devicepricing[i]._id === e.value || devicepricing[i]._id === formik.values.plan) {
                                                    if (devicepricing[i]._id === formik.values.plan) {
                                                        formik.setFieldValue("totalamount", parseFloat(formik.values.totalamount) - devicepricing[i].price).toString();
                                                    } else {
                                                        formik.setFieldValue("totalamount", parseFloat(formik.values.totalamount) + devicepricing[i].price).toString();
                                                    }
                                                }
                                            }
                                            formik.setFieldValue("plan", e.value);
                                            formik.handleChange(e);
                                        }
                                    }}
                                />
                                {getFormErrorMessage("plan")}
                            </>
                        ) : (
                            <Dropdown disabled={paymentInfo ? true : false} className="field-width mt-2" placeholder="Select Plan" id="plan" optionLabel="name" options={[]} />
                        )}
                    </div>
                    <div className="mt-2">
                        <label className="block">Select Additional Feature</label>
                        {inventory === "SIM" ? (
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
                        <label className="block">Paying Amount</label>
                        <InputText
                    
                            className="field-width mt-2"
                            id="paid"
                            value={formik.values.paid}
                            onChange={(e) => {
                                formik.setFieldValue("paid", e.target.value);
                               // formik.handleChange(e);
                            }}
                        />
                        {getFormErrorMessage("paid")}
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
                                /* if (e.value === "card") {
                                    setPaymentDialogVisibility(true);
                                }*/
                            }}
                        />
                        {getFormErrorMessage("paymentMode")}
                    </div>
                    {formik.values.paymentMode == "card" && !(localStorage.getItem("paymentstatus") === "paid") ? (
                        <>
                            <Dialog className="stripe-dialog-width" header="Stripe Payment" visible={paymentDialogVisibility} setPaymentDialogVisibility={setPaymentDialogVisibility} onHide={() => setPaymentDialogVisibility(false)}>
                                <PaymentStripModule paid={formik.values.paid} plan={formik.values.plan} amount={formik.values.totalamount} object={formik.values} setActiveIndex={setActiveIndex} />
                            </Dialog>
                        </>
                    ) : undefined}
                </div>
            </div>
        </form>
    );
};

export default PaymentScreen;
