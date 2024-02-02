// import React, { useEffect, useState } from "react";
// import { Button } from "primereact/button";
// import { Image } from "primereact/image";
// import Axios from "axios";

// import { Calendar } from "primereact/calendar";

// import { Formik, useFormik } from "formik";
// import * as Yup from "yup";

// import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
// import { toast } from "react-toastify";
// import { Dropdown } from "primereact/dropdown";
// import moment from "moment/moment";
// import { InputText } from "primereact/inputtext";
// import classNames from "classnames";
// import { MultiSelect } from "primereact/multiselect";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const Agree = ({ handleNext, handleBack,enrollment_id, _id ,csr}) => {

//     const [acpPrograms, setAcpPrograms] = useState([]);
//     const [selectedAcpProgramId, setSelectedAcpProgramId] = useState(null);
//     const [btnState, setBtnState] = useState(true);
//     const [isBack, setIsBack] = useState(0)
//     const [isLoading, setIsLoading] = useState(false)

//     // Get user data from localStorage
//     const loginRes = localStorage.getItem("userData");
//     const parseLoginRes = JSON.parse(loginRes);

    
//     const enrollmentUserId = _id;

//     const getAcpPrograms = async () => {
//         try {
//             const res = await Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.compony}`);
//             setAcpPrograms(res?.data?.data || []);
//         } catch (error) {
//             toast.error(`Error fetching module data : + ${error?.response?.data?.msg}`);
//         }
//     };

//     useEffect(() => {
//         getAcpPrograms();
//     }, []);

//    const postData = async () => {
//     setIsLoading(true);

//     const data = {
//         csr: csr,
//         userId: enrollmentUserId,
//         program: selectedAcpProgramId
//     }
//     try{
//         const res = await Axios.post(`${BASE_URL}/api/user/selectProgram`, data);
//         if (res?.status === 200 || res?.status === 201) {
//             localStorage.setItem("programmeId",JSON.stringify(res?.data))
           
//             setIsBack(isBack+1);
//             handleNext();
//             setIsLoading(false);
//         }
//     }
//     catch(error){
//        toast.error(error?.response?.data?.msg)
//        setIsLoading(false);
//        handleNext();
//     }
// }

// //get programme data from local storage 
// const programedata= localStorage.getItem("programmeId");
// const parseprogramedata = JSON.parse(programedata);

//  //get ZipData data from local storage 
//  const zipdata= localStorage.getItem("zipData");
//  const parseZipData = JSON.parse(zipdata);

// //get personal info  data from local storage 
//  const basicResponse = localStorage.getItem("basicData");

 

 

 

//     const handleAcpSelection = (acpId) => {      
//             if (selectedAcpProgramId === acpId) {
//                 setSelectedAcpProgramId(null);
//             } else {
//                 setSelectedAcpProgramId(acpId);
//             }
//     };


//     useEffect(() => {
//         if (selectedAcpProgramId) 
//         {     setBtnState(false) } else { setBtnState(true)        
//         }
//     }, [selectedAcpProgramId]);


// useEffect(() => {
    
//     if(parseprogramedata){
//         if(zipdata ){
//             setSelectedAcpProgramId(parseprogramedata?.data?.acpProgram); 
           
//         }
//         else{
//             setSelectedAcpProgramId(parseprogramedata?.data?.acpProgram?._id);    
            
//         }
       
//     }
// }, [])



// const [isSearch, setIsSearch] = useState(false);
// const [historyData, setHistoryData] = useState();

// const selectedid = localStorage.getItem("selectedId");
// const parseselectedid = JSON.parse(selectedid);

// const validationSchema = Yup.object().shape({
//     plan: Yup.string().required("please select Payment Mode"),
//     product: Yup.string().required("Please Enter Complete Card Number"),
//     paymentMode: Yup.string().required("please select Payment Mode"),
//     cardNo1: Yup.string().required("Please Enter Complete Card Number"),
//     cardNo2: Yup.string().required("Please Enter Complete Card Number"),
//     cardNo3: Yup.string().required("Please Enter Complete Card Number"),
//     cardNo4: Yup.string().required("Please Enter Complete Card Number"),
//     CVC: Yup.string().required("Please Enter Code"),
//     expDate: Yup.string().required("Please Enter Date"),
//     receiptNumber: Yup.string().required("Please Enter Number"),
//     name: Yup.string().required("Please Enter Name"),
//     city: Yup.string().required("Please Enter City"),
//     state: Yup.string().required("Please Enter state"),
//     zip: Yup.string().required("Please Enter Zip"),
//     address1: Yup.string().required("Please Enter Address 1"),
//     address2: Yup.string().required("Please Enter Address 2"),
//     pin: Yup.string().required("Please Enter Pin"),
// });
// const formik = useFormik({
//     validationSchema: validationSchema,
//     initialValues: {
//         amount: "",
//         plan: "",
//         product: "",
//         paymentMode: "",
//         cardNo1: "",
//         cardNo2: "",
//         cardNo3: "",
//         cardNo4: "",
//         cardType: "",
//         CVC: "",
//         expDate: "",
//         receiptNumber: "",
//         name: "",
//         city: "",
//         state: "",
//         zip: "",
//         address1: "",
//         address2: "",
//         pin: "",
//         totall:"$24",
//     },
//     onSubmit: async (values, actions) => {
//         const selectedStartDate = formik.values.startDate;

//         const formattedStartDate = selectedStartDate ? moment(selectedStartDate).format("YYYY-MM-DD") : "";

//         setIsSearch(true);
//         const dataToSend = {
//             UserId: parseselectedid,
//             reportType: formik.values.reportType,
//             startDate: formattedStartDate,
//         };
//        
//         setIsLoading(true);
//         try {
//             const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
//             if (response?.status === 200 || response?.status === 201) {
//                 setHistoryData(response?.data?.data);
//                
//             }
//         } catch (error) {
//             toast.error(error?.response?.data?.msg);
//             setIsLoading(false);
//         }
//     },
// });

// const options = [
//     { label: "Select", value: "" },
//     { label: "Plan 1", value: "sim2" },
//     { label: "Plan 2", value: "tablet2" },
//     { label: "Plan 3", value: "cell2" },
//     { label: "Plan 4", value: "sim1" },
//     { label: "Plan 5", value: "tablet1" },
//     { label: "Plan 6", value: "cell1" },
// ];
// const optionsForPayment = [
//     { label: "Select ", value: "" },
//     { label: "Credit/Debit card", value: "card" },
//     { label: "Cash", value: "cash" },
//     { label: "Money Order", value: "money" },
//     { label: "Skip Payment", value: "skip" },
// ];
// const optionsForProduct = [
//     { label: "Cell Phone", value: "cell" },
//     { label: "Tablet", value: "tablet" },
//     { label: "Wireless Device", value: "wireless" },
//     { label: "Titan", value: "titan" },
//     { label: "Sim Card", value: "Sim" },
// ];
// const optionsForCardType = [
//     { label: "Select ", value: "" },
//     { label: "Master", value: "Master" },
//     { label: "Visa", value: "Visa" },
   
// ];

// const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// const getFormErrorMessage = (name) => {
//     return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// };

//     return (
//         <>
//         <ToastContainer/>
//             <div>
//                 <div className="flex flex-row justify-content-between align-items-center mb-2 sticky-buttons">
//                     <Button label="Back" type="submit" onClick={handleBack} />
//                        <Button
//                             label="Continue"
//                             type="submit"
//                             onClick={postData}
//                             // disabled={btnState}
//                             icon={isLoading === true ? "pi pi-spin pi-spinner " : ""} 
//                         />    
//                 </div>
//                 <div>
//                 <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
//                 </div>
//                 <br />
              
//             </div>
         

//             <div className="card flex flex-column justify-content-center mx-5 border-noround">
//                 <h2 className="font-bold"> Payment</h2>
//                 <div className="flex flex-wrap mx-3 my-3">
//                     <div className="mt-1 mr-3 ">
//                         <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Plan</label>
//                         <Dropdown
//                             className="w-21rem"
//                             id="plan"
//                             options={options}
//                             value={formik.values.plan}
//                             onChange={(e) => {
//                                 formik.setFieldValue("plan", e.value);
//                                 formik.handleChange(e);
//                             }}
//                         />
//                     </div>
//                     <div className="mt-1 mr-3 ">
//                         <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Product</label>
//                         <MultiSelect
//                             className="w-21rem"
//                             value={formik.values.product}
//                             display="chip"
//                             onChange={(e) => {
//                                 formik.setFieldValue("product", e.value);
//                                 formik.handleChange(e);
//                             }}
//                             options={optionsForProduct}
//                             placeholder="Select"
//                             filter
//                             maxSelectedLabels={5}
//                         />
//                     </div>

//                     <div className="mt-1 mr-3 ">
//                     <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Totall Amount</label>
//                     <InputText placeholder="$24"/>
//                     </div>
//                     <div className="mt-1 mr-3 ">
//                         <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Payment Method</label>
//                         <Dropdown
//                             className="w-21rem"
//                             id="paymentMode"
//                             options={optionsForPayment}
//                             value={formik.values.paymentMode}
//                             onChange={(e) => {
//                                 formik.setFieldValue("paymentMode", e.value);
//                                 formik.handleChange(e);
//                             }}
//                         />
//                     </div>
//                 </div>


//                 {formik.values.paymentMode == "card" ? (
//                 <>
//                     <table className="cp_table w-full ml-3">
//                         <tbody>
//                             <tr className="text-lg">
//                                 <td className="w-21rem ">Credit Card Number</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo1") }, "input_text")} type="text" id="cardNo1" value={formik.values.cardNo1} onChange={formik.handleChange} maxLength={4}/>
//                                     {getFormErrorMessage("cardNo1")}
//                                     <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo2") }, "input_text")} type="text" id="cardNo2" value={formik.values.cardNo2} onChange={formik.handleChange} maxLength={4}/>
//                                     <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo3") }, "input_text")} type="text" id="cardNo3" value={formik.values.cardNo3} onChange={formik.handleChange}maxLength={4} />
//                                     {getFormErrorMessage("cardNo3")}
//                                     <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo4") }, "input_text")} type="text" id="cardNo4" value={formik.values.cardNo4} onChange={formik.handleChange} maxLength={4}/>
//                                     {getFormErrorMessage("cardNo4")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Select Crad TYpe</td>
//                                 <td>
//                                     <Dropdown
//                                         className="w-15rem"
//                                         id="cardType"
//                                         options={optionsForCardType}
//                                         value={formik.values.cardType}
//                                         onChange={(e) => {
//                                             formik.setFieldValue("cardType", e.value);
//                                             formik.handleChange(e);
//                                         }}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Security Code</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("CVC") }, "input_text")} type="password" id="CVC" value={formik.values.CVC} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("CVC")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">EXP Date</td>
//                                 <td>
//                                     <InputText id="expDate" value={formik.values.expDate} onChange={formik.handleChange} showIcon style={{ width: "15rem" }} />
//                                     {getFormErrorMessage("expDate")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Name On Card</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("name") }, "input_text")} type="text" id="name" value={formik.values.name} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("name")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Receipt Number</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid(" receiptNumber") }, "input_text")} type="text" id="receiptNumber" value={formik.values.receiptNumber} onChange={formik.handleChange} />
//                                     {getFormErrorMessage(" receiptNumber")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Zip Code</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("Zip") }, "input_text")} type="text" id="Zip" value={formik.values.Zip} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("Zip")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">City</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("City") }, "input_text")} type="text" id="City" value={formik.values.City} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("City")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">State</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("State") }, "input_text")} type="text" id="State" value={formik.values.State} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("State")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Billing Address 1</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address1") }, "input_text")} type="text" id="address1" value={formik.values.address1} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("address1")}
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="text-lg">Billing Address 2</td>
//                                 <td>
//                                     <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address2") }, "input_text")} type="text" id="address2" value={formik.values.address2} onChange={formik.handleChange} />
//                                     {getFormErrorMessage("address2")}
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </>
//             ) : formik.values.paymentMode == "money" ? (
//                 <>
//                     <div className="field ml-5">
//                         <label className="field_label text-lg">
//                             Receipt Number
//                         </label>
//                         <InputText type="text" id="receiptNumber" value={formik.values.receiptNumber} onChange={formik.handleChange}  className={classNames({"w-21rem ": true, "p-invalid": isFormFieldValid("receiptNumber") }, "input_text")} />
//                         {getFormErrorMessage("receiptNumber")}
//                     </div>
//                 </>
//             ) : formik.values.paymentMode == "cash" ? (
//                 <>
//                     <div className="field ml-5">
//                         <label className="field_label text-lg">
//                            Totall Amount 
//                         </label>
//                         <InputText type="text" id="totall" value={formik.values.totall} onChange={formik.handleChange}  className={classNames({"w-21rem ": true, "p-invalid": isFormFieldValid("totall") }, "input_text")} />
//                         {getFormErrorMessage("totall")}
//                     </div>
//                 </>
//             ) : (
//                 ""
//             )}


//                 <div className="text-right">
//                 <Button label="Submit" type="Submit"/>
//             </div>
//             </div>
//         </>
//     );
// };

// export default Agree;





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

const Agree = ({handleNext,handleBack, enrollment_id, _id, csr }) => {
   
    const [inventory, setInventory] = useState();
    const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();
    //Handle Back
    let paymentInfo = JSON.parse(localStorage.getItem("paymentallinfo"))?.data;
  
   
    const validationSchema = Yup.object().shape({
        billId: Yup.string().required("Product is required"),
     //   paymentMode: Yup.string().required("Payment Mode are required"),
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
        },
        onSubmit: async (values, actions) => {

            const dataToSend={
                customerId:_id,
                selectPlan:formik.values.plan,
                selectProduct:formik.values.billId,
                totalAmount:formik.values.totalamount,
                paymentMethod:formik.values.paymentMode
            }
            if(formik.values.paymentMode=="skip"){
                try {
                    const response =await Axios.post(`${BASE_URL}/api/user/paymentdetail`,dataToSend)
                   
                    if(response?.status===201 || response?.status===200){
                      
                        localStorage.setItem("productData", JSON.stringify(response.data?.data));       
                                         handleNext();
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.msg)
                }

              
               
            }
            if (localStorage.getItem("paymentstatus")) {
                if (localStorage.getItem("paymentstatus") === "paid") {
                    // setActiveIndex(3);
                    handleNext();
                   
                } else {
                    setPaymentDialogVisibility(true);
                }
            } else {
                setPaymentDialogVisibility(true);
            }
        },
    });
    useEffect(() => {
        if (paymentInfo) {
            formik.setFieldValue("billId", paymentInfo.billId);
            formik.setFieldValue("plan", paymentInfo.plan);
            formik.setFieldValue("additionalFeature", paymentInfo.additionalFeature);
            formik.setFieldValue("discount", paymentInfo.discount);
            formik.setFieldValue("totalamount", paymentInfo.totalAmount);
        }
    }, []);  
    const productData = localStorage.getItem("productData");
    const parseproductData = JSON.parse(productData);

    useEffect(()=>{
if(parseproductData){
    console.log("Product is",parseproductData.selectProduct)
    console.log("plan is",parseproductData.plan.name)
    formik.setFieldValue("billId", parseproductData.selectProduct);
    formik.setFieldValue("plan", parseproductData?.plan.name);
    formik.setFieldValue("additionalFeature", parseproductData.additionalFeature);
   
    formik.setFieldValue("totalamount", parseproductData.totalAmount);
    formik.setFieldValue("paymentMode",parseproductData?.paymentMethod)
}
    },[])
    const optionsForPayment = [
        { label: "Select ", value: "" },
        { label: "Credit/Debit card", value: "card" },
        { label: "Skip Payment", value: "skip" },

    ];

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error block">{formik.errors[name]}</small>;
    };

    const goNext=()=>{
    
    }
    return (
        <form onSubmit={formik.handleSubmit}>
        <ToastContainer/>
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
                        {getFormErrorMessage("billId")}
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
                                    options={formik.values.product === "Wireless Device" ? JSON.parse(localStorage.getItem("deviceplan")) : []}
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
                                    options={formik.values.product === "Wireless Device" && JSON.parse(localStorage.getItem("deviceadditional")).length > 0 ? JSON.parse(localStorage.getItem("deviceadditional")) : []}
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
                                 if (e.value === "skip") {
                                        goNext()                 }
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
