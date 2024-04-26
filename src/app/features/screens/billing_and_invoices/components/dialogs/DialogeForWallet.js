import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import moment from "moment/moment";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import WalletPaymentStripModule from "../dialog/stripe_wallet";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const DialogeForWallet = ({ setOpenDialogeForWallet }) => {   
     
    const [isLoading, setIsLoading] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const validationSchema = Yup.object().shape({
        amount: Yup.string().required("Please Enter Amount"),
        processingFee: Yup.string().required("Please Enter Amount"),
        TotallAmount: Yup.string().required("Please Enter Amount"),
        paymentMode: Yup.string().required("please select Payment Mode"),
        cardNo1: Yup.string().required("Please Enter Complete Card Number"),
        cardNo2: Yup.string().required("Please Enter Complete Card Number"),
        cardNo3: Yup.string().required("Please Enter Complete Card Number"),
        cardNo4: Yup.string().required("Please Enter Complete Card Number"),
        securityCode:Yup.string().required("Please Enter Code"),
        expDate:Yup.string().required("Please Enter Date"),
        receiptNumber:Yup.string().required("Please Enter Number"),
        name:Yup.string().required("Please Enter Name"),
        city:Yup.string().required("Please Enter City"),
        state:Yup.string().required("Please Enter state"),
        zip:Yup.string().required("Please Enter Zip"),
        address1:Yup.string().required("Please Enter Address 1"),
        address2:Yup.string().required("Please Enter Address 2"),
        pin:Yup.string().required("Please Enter Pin"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            amount: "",
            processingFee: "",
            TotallAmount: "",
            paymentMode: "",
            cardNo1: "",
            cardNo2: "",
            cardNo3: "",
            cardNo4: "",
            cardType:"",
            securityCode:"",
            expDate:"",
            receiptNumber:"",
            name:"",
            city:"",
            state:"",
            zip:"",
            address1:"",
            address2:"",
pin:"",
        },
        onSubmit: async (values, actions) => {
            const selectedStartDate = formik.values.startDate;

            const formattedStartDate = selectedStartDate ? moment(selectedStartDate).format("YYYY-MM-DD") : "";

            setIsSearch(true);
            const dataToSend = {
                UserId: parseselectedid,
                reportType: formik.values.reportType,
                startDate: formattedStartDate,
            };
          
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                  
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        },
    });

    const options = [
        { label: "Select ", value: "" },
        { label: "Credit card", value: "card" },
        { label: "Cash", value: "cash" },
        { label: "Using Pin", value: "pin" },
    ];

    const optionsForCardType = [
        { label: "Select ", value: "" },
        { label: "Type 1", value: "card" },
        { label: "Type 2", value: "cash" },
        { label: "Type 3", value: "pin" },
    ];


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    }; 
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const capitalCompanyName = parseLoginRes?.companyName?.toUpperCase();
    return (
        <>  
         {    capitalCompanyName?.includes("IJ") ?  
   
           <></>
           :
          <>
            <div className="col-12  ">
                <div className="p-3">
                    <div className=" h-full ">
                        <div>
                            <table className="cp_table w-full">
                                <tbody>
                                    <tr className="text-lg">
                                        <td className="w-21rem ">Customer Id</td>
                                        <td> ETC7363773</td>
                                    </tr>

                                    <tr className="text-lg">
                                        <td>Customer Name</td>
                                        <td> Hamza Akram</td>
                                    </tr>

                                    <tr className="text-lg">
                                        <td>Phone Number</td>
                                        <td>0304-2828588</td>
                                    </tr>
                                    <tr className="text-lg">
                                        <td>
                                            Amount ( in $ )<span className="steric">*</span>
                                        </td>
                                        <td>
                                            {" "}
                                            <InputText type="text" id="amount" value={formik.values.amount} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("amount") }, "input_text")} />
                                            {getFormErrorMessage("amount")}
                                        </td>
                                    </tr>
                                    <tr className="text-lg">
                                        <td>
                                            Processing Fee:<span className="steric"> *</span>
                                        </td>
                                        <td>
                                            {" "}
                                            <InputText type="text" id="processingFee" value={formik.values.processingFee} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("processingFee") }, "input_text")} />
                                            {getFormErrorMessage("processingFee")}
                                        </td>
                                    </tr>
                                    <tr className="text-lg">
                                        <td>
                                            Totall Amount: <span className="steric">*</span>
                                        </td>
                                        <td>
                                            {" "}
                                            <InputText type="text" id="TotallAmount" value={formik.values.TotallAmount} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("TotallAmount") }, "input_text")} />
                                            {getFormErrorMessage("TotallAmount")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <p className="w-full ml-3 mr-3 text-lg steric">
                Note: For multi-line accounts, it is important to note that the wallet balance should be attributed to the parent line. If you assign the wallet balance to a child line, it will not be applied towards the renewal or change of plans. The wallet balance is exclusively utilized from the
                parent line.
            </p>

            <div className="col-12  ">
                <div className="p-3">
                    <div className=" h-full ">
                        <div>
                            <table className="cp_table w-full">
                                <tbody>
                                    <tr className="text-lg">
                                        <td className="w-21rem">
                                            Payment Mode<span className="steric">*</span>
                                        </td>
                                        <td >
                                            <Dropdown  
                                            className="w-15rem"
                                                id="paymentMode"
                                                options={options}
                                                value={formik.values.paymentMode}
                                                onChange={(e) => {
                                                    formik.setFieldValue("paymentMode", e.value);
                                                    formik.handleChange(e);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    {
                                        formik.values.paymentMode=="card" ? 
                                        <>
                                        <tr className="text-lg">
                                            <td  className="w-21rem ">
                                                Credit Card Number
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo1") }, "input_text")} type="text" id="cardNo1" value={formik.values.cardNo1} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("cardNo1")}
                                            <InputText  className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo2") }, "input_text")} type="text" id="cardNo2" value={formik.values.cardNo2} onChange={formik.handleChange}/>
                                            <InputText  className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo3") }, "input_text")} type="text" id="cardNo3" value={formik.values.cardNo3} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("cardNo3")}
                                            <InputText  className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo4") }, "input_text")} type="text" id="cardNo4" value={formik.values.cardNo4} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("cardNo4")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
Select Crad TYpe
                                            </td>
                                            <td >
                                            <Dropdown  
                                            className="w-15rem"
                                                id="cardType"
                                                options={optionsForCardType}
                                                value={formik.values.cardType}
                                                onChange={(e) => {
                                                    formik.setFieldValue("cardType", e.value);
                                                    formik.handleChange(e);
                                                }}
                                            />
                                        </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                Security Code
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("securityCode") }, "input_text")} type="password" id="securityCode" value={formik.values.securityCode} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("securityCode")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                EXP Date
                                            </td>
                                            <td>
                                            <Calendar id="expDate" value={formik.values.expDate} onChange={formik.handleChange} showIcon style={{ width: "15rem" }} />
                                            {getFormErrorMessage("expDate")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                Name On Card
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("name") }, "input_text")} type="text" id="name" value={formik.values.name} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("name")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                            Receipt Number
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid(" receiptNumber") }, "input_text")} type="text" id="receiptNumber" value={formik.values.receiptNumber} onChange={formik.handleChange}/>
                                            {getFormErrorMessage(" receiptNumber")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                Zip Code
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("Zip") }, "input_text")} type="text" id="Zip" value={formik.values.Zip} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("Zip")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                               City
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("City") }, "input_text")} type="text" id="City" value={formik.values.City} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("City")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                State
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("State") }, "input_text")} type="text" id="State" value={formik.values.State} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("State")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                                Billing Address 1
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address1") }, "input_text")} type="text" id="address1" value={formik.values.address1} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("address1")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-lg">
                                            Billing Address 2
                                            </td>
                                            <td>
                                            <InputText  className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address2") }, "input_text")} type="text" id="address2" value={formik.values.address2} onChange={formik.handleChange}/>
                                            {getFormErrorMessage("address2")}
                                            </td>
                                        </tr>
                                        </>
                                        :
                                        formik.values.paymentMode=="pin" ?  <tr className="text-lg">
                                        <td>
                                            Pin <span className="steric">*</span>
                                        </td>
                                        <td>
                                            {" "}
                                            <InputText type="text" id="pin" value={formik.values.pin} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("pin") }, "input_text")} />
                                            {getFormErrorMessage("pin")}
                                        </td>
                                    </tr>
                                        :""
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-content-between">
            <Button label="Close" onClick={()=>{setOpenDialogeForWallet(false)}} />
            <Button label="Submit" type="submit"/>
            </div></>
                                } 
        </>
    );
};

export default DialogeForWallet;
