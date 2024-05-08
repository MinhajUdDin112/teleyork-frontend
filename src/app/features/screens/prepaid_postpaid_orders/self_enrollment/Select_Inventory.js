import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./css/payment_screen.css";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import PaymentStripModule from "./dialog/stripe_payment";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import PrepaidPreview from "./Preview_Prepaid";
import Axios from "axios";
function capitalizeSentence(sentence) {
    // Split the sentence into words
    const words = sentence.split(" ");
    // Capitalize the first letter of each word and convert the rest to lowercase
    const capitalizedWords = words.map((word) => {
        // Convert the first letter to uppercase and the rest to lowercase
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    // Join the words back into a sentence
    return capitalizedWords.join(" ");
}
const PrepaidSelectInventory = ({ setActiveIndex }) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [proceed, setProceed] = useState(false)
    useEffect(() => {
        if (localStorage.getItem("termsandcondition")) {

        }
        else {
            navigate("/prepaid-selfnationalverifier")
        }


        setbillingData()
    }, [])
      const [newinvenotoryselect,setNewInventorySelect]=useState(false)
    const checkinvenyory = JSON.parse(localStorage.getItem("inventoryselect"))
    const checkplan = JSON.parse(localStorage.getItem("planselect"))
    const [paidAmountRequired, setPaidAmountRequired] = useState(false)
    const navigate = useNavigate()
    const previewsRes = localStorage.getItem("homeAddress");
    const parsepreviewsRes = JSON.parse(previewsRes);
    const previewInfo = parsepreviewsRes?.data;
    if (previewInfo === undefined) {
        navigate("/prepaid-selfenrollment")
    }

    const loginRes = localStorage.getItem("userData");
    const parseLogin = JSON.parse(loginRes)
    let _id = previewInfo?._id
    const [inventory, setInventory] = useState();
    const [showPreview, setShowPreview] = useState(false)
    const [paymentmethoderror, setpaymentmethoderror] = useState(false)
    const [current, setCurrentSelect] = useState("");
    const [currentPlanSelect, setCurrentPlanSelect] = useState("");
    const [currentScreen, setCurrentScreen] = useState(0);
    const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previousPlanPrice, setPreviousPlanPrice] = useState(0);
    let paymentInfo = JSON.parse(localStorage.getItem("paymentallinfoself"))?.data;
    const validationSchema = Yup.object().shape({
        billId: Yup.string().required("Product is required"),
        plan: Yup.string().required("Plan is required"),
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
            paid: "",
            customerid: _id,
            type: "Sign Up ",
            discounts: "",
        },
        onSubmit: async (values, actions) => {
            if (formik.values.prospectwithoutinvoice || formik.values.prospectwithinvoice) {
                localStorage.setItem("paymentscreendetails", JSON.stringify(formik.values))
                setShowPreview(true)
            }
            else {
                if (formik.values.paymentMode === "card") {
                    if (formik.values.paid !== "") {
                        localStorage.setItem("paymentscreendetails", JSON.stringify(formik.values))
                        if (localStorage.getItem("paymentallinfoself")) {
                            setShowPreview(true)

                        } else {
                            setPaymentDialogVisibility(true);
                        }
                    }
                    else {
                        setPaidAmountRequired(false)
                    }
                }
                else {
                    setpaymentmethoderror(true)
                }
            }
        },
    });

    const onPlanSelect = (item) => {

        if (formik.values.plan === "") {

            let devicepricing = JSON.parse(localStorage.getItem("planprices"));
            for (let i = 0; i < devicepricing?.length; i++) {
                if (devicepricing[i]._id === item._id) {
                    formik.setFieldValue("totalamount", (parseFloat(formik.values.totalamount) + devicepricing[i].price).toString());
                    setPreviousPlanPrice(devicepricing[i].price);
                }
            }
            formik.setFieldValue("plan", item._id);
            //formik.handleChange(e);
        } else {

            let devicepricing = JSON.parse(localStorage.getItem("planprices"));

            for (let i = 0; i < devicepricing?.length; i++) {
                if (devicepricing[i]._id === item._id) {
                    let currentamount = parseFloat(formik.values.totalamount);
                    let currentafterremovingprevious = currentamount - previousPlanPrice;
                    formik.setFieldValue("totalamount", (currentafterremovingprevious + devicepricing[i].price).toString());
                    setPreviousPlanPrice(devicepricing[i].price);
                }
            }
            formik.setFieldValue("plan", item._id);
            //formik.handleChange(e);
        }

        localStorage.setItem("selfplanselect", item._id)

        setCurrentPlanSelect(item._id);
    };

    useEffect(() => {

        if (localStorage.getItem("paymentallinfoself") && proceed) {
            setPaymentDialogVisibility(false);
            formik.setFieldValue("billId", paymentInfo.billId);
            formik.setFieldValue("plan", paymentInfo.plan);
            formik.setFieldValue("additionalFeature", paymentInfo.additionalFeature);
            formik.setFieldValue("discount", paymentInfo.discount);
            formik.setFieldValue("totalamount", paymentInfo.totalAmount);
            formik.setFieldValue("paymentMode", "card")
        }
    }, [proceed]);
    useEffect(() => {
        if (checkinvenyory && proceed) {
            formik.setFieldValue("billId", checkinvenyory?.data?.billId)

            inventoryselectuponrefresh(checkinvenyory?.data?.billId)

        }

    }, [proceed])
    useEffect(() => {
        formik.setFieldValue("paid", formik.values.totalamount)
    }, [formik.values.totalamount])
    const optionsForPayment = [
        { label: "Select ", value: "" },
        { label: "Credit/Debit card", value: "card" },
    ];
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error block">{formik.errors[name]}</small>;
    };
    function inventoryselectuponrefresh(billId) {
        let allinventory = JSON.parse(localStorage.getItem("inventoryType"))
        let item = {}
        for (let i = 0; i < allinventory?.length; i++) {
            if (allinventory[i].value === billId) {
                item.label = allinventory[i].label
                item.value = allinventory[i].value
            }
        }
        onInventorySelect(item)

    }

    function onInventorySelect(item) {
        setCurrentPlanSelect("");
        setCurrentSelect(item.label);
        localStorage.setItem("product", item.label);       
         
        setPreviousPlanPrice(0) 
        if(checkinvenyory){ 
             formik.values.totalamount="0" 
              formik.values.plan=""
        } 
        else{
 
            formik.setFieldValue("totalamount", 0);   
            formik.setFieldValue("plan","")   

        }
        formik.setFieldValue("billId", item.value);
        let inventory;
        let inventoryType = JSON.parse(localStorage.getItem("inventoryType"));
        for (let i = 0; i < inventoryType?.length; i++) {
            if (item.value === inventoryType[i]?.value) {
                inventory = inventoryType[i].label;
                localStorage.setItem("product", inventory);
                break;
            }
        }
        setInventory(inventory)
        if (inventory === "SIM") {
            formik.setFieldValue("discount", JSON.parse(localStorage.getItem("simdiscountobjectarray")));
            let oneTimeCharge = parseFloat(JSON.parse(localStorage.getItem("simpricing")).oneTimeCharge);
            let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("simadditionaltotal")));

            formik.setFieldValue("plan", "");
            let amountafterdiscount = (oneTimeCharge + (amountafteradditionalfeature ? amountafteradditionalfeature : 0) - parseFloat(JSON.parse(localStorage.getItem("totalsimdiscount")))).toString();
            formik.setFieldValue("additional", JSON.parse(localStorage.getItem("simadditionalfeaturearraytotal")).length > 0 ? JSON.parse(localStorage.getItem("simadditionalfeaturearraytotal")) : []);
            formik.setFieldValue("discounts", JSON.parse(localStorage.getItem("simdiscountobjectarraytotal")).length > 0 ? JSON.parse(localStorage.getItem("simdiscountobjectarraytotal")) : []);
            if(checkinvenyory){
                formik.values.totalamount = amountafterdiscount 
                 } 
                  else{ 
                    formik.setFieldValue("totalamount",amountafterdiscount)
                  }
            setPreviousPlanPrice(0);
        } else if (inventory === "WIRELESS DEVICE") {
            formik.setFieldValue("plan", "");
            formik.setFieldValue("discount", JSON.parse(localStorage.getItem("devicediscountobjectarray")));
            formik.setFieldValue("additional", JSON.parse(localStorage.getItem("deviceadditionalfeaturearraytotal")));
            let oneTimeCharge = JSON.parse(localStorage.getItem("devicepricing")).oneTimeCharge;
            let amountafteradditionalfeature = parseFloat(JSON.parse(localStorage.getItem("deviceadditionaltotal")));
            let amountafterdiscount = (parseFloat(oneTimeCharge) + (amountafteradditionalfeature ? amountafteradditionalfeature : 0) - parseFloat(JSON.parse(localStorage.getItem("totaldevicediscount")))).toString();
             if(checkinvenyory){
            formik.values.totalamount = amountafterdiscount 
             } 
              else{ 
                formik.setFieldValue("totalamount",amountafterdiscount)
              }
            formik.setFieldValue("discounts", JSON.parse(localStorage.getItem("devicediscountobjectarraytotal")).length > 0 ? JSON.parse(localStorage.getItem("devicediscountobjectarraytotal")) : []);
            setPreviousPlanPrice(0);
        }
        localStorage.setItem("selfinventoryselect", item.value)

        if (checkplan) {
            let item2 = {}
            let id = checkplan?.data?.plan
            item2._id = id             
            onPlanSelect(item2)
        }    


    }

    function setbillingData() {
        Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLogin?.company}`)
            .then((res) => {

                localStorage.setItem("planprices", JSON.stringify(res?.data?.data))
                Axios.get(`${BASE_URL}/api/web/billing/getall`)
                    .then((response) => {

                        let inventoryType = [];
                        for (let i = 0; i < response?.data?.data?.length; i++) {
                            let plans = [];
                            let discountobjectarray = [];
                            let discount = []
                            let additionalfeature = [];
                            let paymentMethods = [];
                            let totaldiscounts = 0
                            let additionaltotal = 0;
                            let additionalfeaturearray = []
                            if ((response?.data?.data[i]?.inventoryType === "SIM") && (response?.data?.data[i]?.billingmodel === "PREPAID")) {

                                let obj = { label: "SIM", value: response?.data?.data[i]?._id };
                                //objectforpricing[response.data.data[i].inventoryType]["oneTimeCharge"]=response.data.data[i].inventoryType.oneTimeCharge
                                inventoryType.push(obj);
                                for (let k = 0; k < response?.data?.data[i]?.monthlyCharge?.length; k++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.monthlyCharge[k]?.name,
                                        value: response?.data?.data[i]?.monthlyCharge[k]?._id,
                                    };
                                    plans.push(obj);
                                }
                                for (let k = 0; k < response?.data?.data[i]?.paymentMethod?.length; k++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.paymentMethod[k],
                                    };
                                    paymentMethods.push(obj);
                                }
                                for (let z = 0; z < response?.data?.data[i]?.additionalFeature?.length; z++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.additionalFeature[z]?.featureName,
                                        value: response?.data?.data[i]?.additionalFeature[z]?._id,
                                    };
                                    additionaltotal += parseFloat(response?.data?.data[i]?.additionalFeature[z]?.featureAmount)
                                    additionalfeaturearray.push((response?.data?.data[i]?.additionalFeature[z]?._id).toString())
                                    additionalfeature.push(obj);
                                }

                                for (let y = 0; y < response.data.data[i].selectdiscount.length; y++) {
                                    discountobjectarray.push(response?.data?.data[i]?.selectdiscount[y]?._id.toString());
                                    totaldiscounts += parseFloat(response?.data?.data[i]?.selectdiscount[y]?.amount);
                                }
                                //Additional Features 
                                //_id array
                                localStorage.setItem("simadditionalfeaturearray", JSON.stringify(additionalfeaturearray))

                                // Options array name and _id
                                localStorage.setItem("simadditional", JSON.stringify(additionalfeature));

                                localStorage.setItem("simadditionalfeaturearraytotal", JSON.stringify(additionalfeaturearray))
                                //totalfeatureamount 
                                localStorage.setItem("simadditionaltotal", JSON.stringify(additionaltotal));
                                localStorage.setItem("simdiscount", JSON.stringify(response.data.data[i].selectdiscount))

                                //Discounts 
                                //Total Discounts
                                localStorage.setItem("totalsimdiscount", JSON.stringify(totaldiscounts));
                                //discount _id array will send to backend 
                                localStorage.setItem("simdiscountobjectarray", JSON.stringify(discountobjectarray));
                                localStorage.setItem("simdiscountobjectarraytotal", JSON.stringify(discountobjectarray))
                                //SIM Complete Object include additional discount and any other
                                localStorage.setItem("simpricing", JSON.stringify(response.data.data[i]));
                                //SIM Plans
                                localStorage.setItem("simplan", JSON.stringify(plans));
                                ///payments method
                                localStorage.setItem("simPaymentMethod", JSON.stringify(paymentMethods));
                            } else if (response?.data?.data[i]?.inventoryType === "WIRELESS DEVICE" && (response?.data?.data[i]?.billingmodel === "PREPAID")) {

                                let obj = { label: "WIRELESS DEVICE", value: response?.data?.data[i]?._id };
                                inventoryType.push(obj);
                                for (let k = 0; k < response?.data?.data[i]?.monthlyCharge?.length; k++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.monthlyCharge[k]?.name,
                                        value: response?.data?.data[i]?.monthlyCharge[k]?._id,
                                    };
                                    plans.push(obj);
                                }
                                for (let k = 0; k < response?.data?.data[i]?.paymentMethod?.length; k++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.paymentMethod[k],
                                    };
                                    paymentMethods.push(obj);
                                }
                                for (let z = 0; z < response?.data?.data[i]?.additionalFeature?.length; z++) {
                                    let obj = {
                                        name: response?.data?.data[i]?.additionalFeature[z]?.featureName,
                                        value: response?.data?.data[i]?.additionalFeature[z]?._id,
                                    };
                                    additionaltotal += parseFloat(response.data.data[i].additionalFeature[z].featureAmount)
                                    additionalfeaturearray.push(response.data.data[i].additionalFeature[z]._id.toString())
                                    additionalfeature.push(obj);
                                }
                                for (let y = 0; y < response.data.data[i].selectdiscount.length; y++) {
                                    discountobjectarray.push(response.data.data[i].selectdiscount[y]._id.toString());
                                    totaldiscounts += parseFloat(parseFloat(response.data.data[i].selectdiscount[y].amount))
                                }
                                //Device Features 
                                // additional feature value and name 
                                localStorage.setItem("deviceadditional", JSON.stringify(additionalfeature));
                                localStorage.setItem("deviceadditionalfeaturearraytotal", JSON.stringify(additionalfeaturearray))
                                // additionalfeaturetotal 
                                localStorage.setItem("deviceadditionaltotal", JSON.stringify(additionaltotal))
                                //additional feature array object  
                                localStorage.setItem("deviceadditionalfeaturearray", JSON.stringify(additionalfeaturearray))
                                //Discounts 
                                //total device discount
                                localStorage.setItem("totaldevicediscount", JSON.stringify(totaldiscounts));

                                localStorage.setItem("devicediscount", JSON.stringify(response.data.data[i].selectdiscount))
                                //discount _id sennding to backend
                                localStorage.setItem("devicediscountobjectarray", JSON.stringify(discountobjectarray));

                                localStorage.setItem("devicediscountobjectarraytotal", JSON.stringify(discountobjectarray))
                                //Plans 
                                //Device Plans 
                                localStorage.setItem("deviceplan", JSON.stringify(plans));
                                //Complete Device Pricing including additional feature and discount
                                localStorage.setItem("devicepricing", JSON.stringify(response.data.data[i]));
                                ///payments method
                                localStorage.setItem("devicePaymentMethod", JSON.stringify(paymentMethods));
                            }
                        }
                        localStorage.setItem("inventoryType", JSON.stringify(inventoryType));

                        setProceed(prev => !prev)

                        setCurrentScreen(1)


                    })
                    .catch((err) => { });
            })
            .catch((err) => { });



    }
    return (
        <>

            {
                showPreview ? <PrepaidPreview setShowPreview={setShowPreview} /> :
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card inventoryscreens">
                            <div className="flex flex-wrap flex-row justify-content-around">
                                <div className="w-full pb-4 flex flex-wrap flex-row justify-content-between ">
                                    <Button
                                        label="Back"
                                        type="button"
                                        onClick={() => {
                                            if (currentScreen !== 1) {
                                                setCurrentScreen((prev) => (prev = prev - 1));
                                            } else {

                                                navigate(`/prepaid-selfnationalverifier`);
                                            }
                                        }}
                                    />
                                    <Button
                                        label="Continue"
                                        type={currentScreen < 4 ? "button" : "submit"}
                                        icon={isLoading ? "pi pi-spinner" : ""}
                                        disabled={(current === "" && currentScreen === 1) || (newinvenotoryselect && currentScreen === 2)}
                                        onClick={() => {
                                            if (currentScreen === 1) {
                                                Axios.post(`${BASE_URL}/api/enrollment/selectInventory`, {
                                                    "userId": previewInfo?._id,
                                                    "inventoryId": formik.values.billId
                                                }).then((res) => {
                                                    localStorage.setItem("inventoryselect", JSON.stringify(res?.data))     
                                                    
                                                }).catch(err => {

                                                })
                                            }
                                            else if (currentScreen === 2) {
                                                Axios.post(`${BASE_URL}/api/enrollment/plan`, {
                                                    "userId": previewInfo?._id,
                                                    "plan": formik.values.plan
                                                }).then((res) => {

                                                    localStorage.setItem("planselect", JSON.stringify(res?.data))
                                                }).catch(err => {

                                                })
                                            }
                                            if (currentScreen !== 3) {
                                                setCurrentScreen((prev) => (prev = prev + 1));
                                            } else {
                                                formik.handleSubmit();
                                            }
                                        }}
                                    />
                                </div >
                                {currentScreen === 1 ? (
                                    <div className="mt-2 w-full flex flex-wrap flex-row justify-content-around">
                                        <h1 className="block w-full selectProduct">Select Product</h1>
                                        {JSON.parse(localStorage.getItem("inventoryType"))?.map((item) => {
                                            return (
                                                <div style={{ opacity: `${item.label === current ? "0.5" : ""}` }} className="inventorySelect">
                                                    <h1>{capitalizeSentence(item?.label)}</h1>
                                                    <img src={`./${item.label}.jpg`} />
                                                    <button
                                                        type="button"

                                                        disabled={item?.label === current || paymentInfo}
                                                        onClick={() => {   
                                                             setNewInventorySelect(true)
                                                            onInventorySelect(item);
                                                        }}
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : undefined}
                                {currentScreen === 2 ? (
                                    <div className="mt-2 w-full flex flex-wrap flex-row justify-content-left">
                                        <h1 className="block w-full selectProduct">Select Plan</h1>
                                        {JSON.parse(localStorage.getItem("planprices"))?.map((item) => {
                                            let include = false
                                            if (inventory === "SIM") {
                                                let plans = JSON.parse(localStorage.getItem("simplan"))
                                                for (let i = 0; i < plans.length; i++) {
                                                    if (plans[i].value === item?._id) {
                                                        include = true
                                                        break
                                                    }
                                                }
                                            }
                                            else if (inventory === "WIRELESS DEVICE") {
                                                let plans = JSON.parse(localStorage.getItem("deviceplan"))
                                                for (let i = 0; i < plans.length; i++) {
                                                    if (plans[i].value === item?._id) {
                                                        include = true
                                                        break
                                                    }
                                                }
                                            }
                                            return (
                                                include ?
                                                    <>
                                                        <div style={{ opacity: `${item._id === currentPlanSelect ? "0.5" : ""}` }} className="planSelect">
                                                            <div className="planinfo">
                                                                <h1>{capitalizeSentence(item?.name)}</h1>
                                                                <h1>No Hidden Fees / No Contracts</h1>
                                                            </div>
                                                            <h1 className="planprice">
                                                                <span>$</span>
                                                                <span>{item?.price}</span>
                                                            </h1>
                                                            <p className="chargetype">Monthly</p>
                                                            <p className="voiceallowance">
                                                                Voice Allowance {item?.voiceAllowance} <span>{item.voiceAllowanceUnit}</span>
                                                            </p>
                                                            <p className="dataallowance">
                                                                Data Allowance {item?.dataAllowance} <span>{item.dataAllowanceUnit}</span>
                                                            </p>
                                                            <p className="textallowance">
                                                                Text Allowance {item?.textAllowance} <span>{item.textAllowanceUnit}</span>
                                                            </p>

                                                            <button
                                                                type="button"
                                                                disabled={item?._id === currentPlanSelect || paymentInfo}
                                                                onClick={() => { 
                                                                     setNewInventorySelect(false)
                                                                    onPlanSelect(item);
                                                                }}
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    </>
                                                    : undefined
                                            )

                                        })}
                                    </div>
                                ) : undefined}
                                {currentScreen === 3 ? (
                                    <div className="w-full flex flex-wrap flex-row justify-content-left w-full">



                                        <div className="mt-2  fieldinpayment">
                                            <label className="block">Select Additional Feature</label>
                                            {inventory === "SIM" ? (
                                                <>
                                                    <MultiSelect
                                                        disabled={paymentInfo ? true : false}
                                                        className="w-full mt-2"
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

                                                                        prerviousadditionaltotal += (parseFloat(simpricing.additionalFeature[k].featureAmount)) ? (parseFloat(simpricing.additionalFeature[k].featureAmount)) : 0;

                                                                    }
                                                                }
                                                            }

                                                            totalamount -= prerviousadditionaltotal;

                                                            let additionalnew = e.value;
                                                            let newadditionaltotal = 0;
                                                            for (let i = 0; i < additionalnew.length; i++) {
                                                                for (let k = 0; k < simpricing.additionalFeature.length; k++) {
                                                                    if (simpricing.additionalFeature[k]._id === additionalnew[i]) {
                                                                        newadditionaltotal += (parseFloat(simpricing.additionalFeature[k].featureAmount)) ? (parseFloat(simpricing.additionalFeature[k].featureAmount)) : 0;
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
                                                        className="w-full mt-2"
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



                                        <div className="mt-2  fieldinpayment">
                                            <label className="block">Select Discounts</label>
                                            {inventory === "SIM" ? (
                                                <>
                                                    <MultiSelect
                                                        disabled={paymentInfo ? true : false}
                                                        className="w-full mt-2"
                                                        id="discount"
                                                        placeholder="Select Discounts"
                                                        optionLabel="discountname"
                                                        optionValue="_id"
                                                        options={JSON.parse(localStorage.getItem("simdiscount"))}
                                                        value={formik.values.discounts}
                                                        onChange={(e) => {
                                                            let discount = formik.values.discounts;
                                                            let prerviousdiscounttotal = 0;
                                                            let totalamount = parseFloat(formik.values.totalamount);
                                                            let discountpricing = JSON.parse(localStorage.getItem("simdiscount"));
                                                            for (let i = 0; i < discount.length; i++) {
                                                                for (let k = 0; k < discountpricing.length; k++) {
                                                                    if (discount[i] === discountpricing[k]._id) {
                                                                        prerviousdiscounttotal += parseFloat(discountpricing[k].amount);
                                                                    }
                                                                }
                                                            }
                                                            totalamount += prerviousdiscounttotal;
                                                            let discountnew = e.value;
                                                            let newdiscounttotal = 0;
                                                            for (let i = 0; i < discountnew.length; i++) {
                                                                for (let k = 0; k < discountpricing.length; k++) {
                                                                    if (discountnew[i] === discountpricing[k]._id) {
                                                                        newdiscounttotal += parseFloat(discountpricing[k].amount);
                                                                    }
                                                                }
                                                            }
                                                            totalamount -= newdiscounttotal;
                                                            localStorage.setItem("simdiscountobjectarray", JSON.stringify(e.value));
                                                            formik.setFieldValue("discounts", e.value);
                                                            formik.setFieldValue("totalamount", totalamount.toString());
                                                        }}
                                                    />
                                                    {getFormErrorMessage("discounts")}
                                                </>
                                            ) : (
                                                <>
                                                    <MultiSelect
                                                        disabled={paymentInfo ? true : false}
                                                        className="w-full mt-2"
                                                        placeholder="Select Discounts"
                                                        id="discount"
                                                        optionLabel="discountname"
                                                        optionValue="_id"
                                                        options={JSON.parse(localStorage.getItem("devicediscount"))}
                                                        value={formik.values.discounts}
                                                        onChange={(e) => {
                                                            let discount = formik.values.discounts;
                                                            let prerviousdiscounttotal = 0;
                                                            let totalamount = parseFloat(formik.values.totalamount);
                                                            let discountpricing = JSON.parse(localStorage.getItem("devicediscount"));
                                                            for (let i = 0; i < discount.length; i++) {
                                                                for (let k = 0; k < discountpricing.length; k++) {
                                                                    if (discount[i] === discountpricing[k]._id) {
                                                                        prerviousdiscounttotal += parseFloat(discountpricing[k].amount);
                                                                    }
                                                                }
                                                            }
                                                            totalamount += prerviousdiscounttotal;
                                                            let discountnew = e.value;
                                                            let newdiscounttotal = 0;
                                                            for (let i = 0; i < discountnew.length; i++) {
                                                                for (let k = 0; k < discountpricing.length; k++) {
                                                                    if (discountnew[i] === discountpricing[k]._id) {
                                                                        newdiscounttotal += parseFloat(discountpricing[k].amount);
                                                                    }
                                                                }
                                                            }
                                                            totalamount -= newdiscounttotal;
                                                            localStorage.setItem("devicediscountobjectarray", JSON.stringify(e.value));
                                                            formik.setFieldValue("discounts", e.value);
                                                            formik.setFieldValue("totalamount", totalamount.toString());
                                                        }}
                                                    />
                                                    {getFormErrorMessage("discounts")}
                                                </>
                                            )}
                                        </div>
                                        <div className="mt-2 fieldinpayment">
                                            <label className="block">Net Amount</label>
                                            <InputText
                                                disabled
                                                className="w-full mt-2"
                                                id="totalamount"
                                                name="totalamount"
                                                value={formik.values.totalamount}
                                                onChange={(e) => {
                                                    formik.setFieldValue("totalpayment", e.value);
                                                    formik.handleChange(e);
                                                }}
                                            />
                                            {getFormErrorMessage("totalpayment")}
                                        </div>
                                        {formik.values.paymentMode === "card" ? (
                                            <div className="mt-2 fieldinpayment">
                                                <label className="block">Paying Amount</label>
                                                <InputText
                                                    disabled={true}
                                                    className="w-full mt-2"
                                                    id="paid"
                                                    value={formik.values.paid}
                                                    onChange={(e) => {
                                                        if (e.target.value === "") {
                                                            setPaidAmountRequired(true)
                                                        }
                                                        else {
                                                            setPaidAmountRequired(false)
                                                        }
                                                        formik.setFieldValue("paid", e.target.value);
                                                        // formik.handleChange(e);
                                                    }}
                                                />
                                                {
                                                    paidAmountRequired ? <p className="p-error mt-1 ml-1">Paying Amount Is Required</p> : ""
                                                }
                                                {getFormErrorMessage("paid")}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        <div className="mt-2 fieldinpayment">
                                            <label className="block">Select Payment Method</label>
                                            <Dropdown
                                                disabled={paymentInfo ? true : false}
                                                className="w-full mt-2"
                                                id="paymentMode"
                                                options={optionsForPayment}
                                                value={formik.values.paymentMode}
                                                onChange={(e) => {
                                                    formik.setFieldValue("paymentMode", e.value);
                                                    formik.handleChange(e);
                                                    setpaymentmethoderror(false)

                                                    /* if (e.value === "card") {
                                                setPaymentDialogVisibility(true);
                                            }*/
                                                }}
                                            />
                                            {paymentmethoderror && (<p className="p-error">Payment Method Is Required</p>)}
                                        </div>
                                    </div>
                                ) : undefined}
                                {formik.values.paymentMode == "card" && !(localStorage.getItem("paymentstatus") === "paid") ? (
                                    <>
                                        <Dialog className="stripe-dialog-width" header="Stripe Payment" visible={paymentDialogVisibility} setPaymentDialogVisibility={setPaymentDialogVisibility} onHide={() => setPaymentDialogVisibility(false)}>
                                            <PaymentStripModule setShowPreview={setShowPreview} paid={formik.values.paid} plan={formik.values.plan} setPaymentDialogVisibility={setPaymentDialogVisibility} amount={formik.values.totalamount} object={formik.values} setActiveIndex={setActiveIndex} />
                                        </Dialog>
                                    </>
                                ) : undefined}
                            </div>
                        </div>
                    </form>
            }  </>
    );
};

export default PrepaidSelectInventory;

