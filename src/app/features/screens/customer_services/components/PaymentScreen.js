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
import { MultiSelect } from "primereact/multiselect";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PaymentScreen = () => {
    const [isLoading, setIsLoading] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);

    const validationSchema = Yup.object().shape({
        plan: Yup.string().required("please select Payment Mode"),
        product: Yup.string().required("Please Enter Complete Card Number"),
        paymentMode: Yup.string().required("please select Payment Mode"),
        cardNo1: Yup.string().required("Please Enter Complete Card Number"),
        cardNo2: Yup.string().required("Please Enter Complete Card Number"),
        cardNo3: Yup.string().required("Please Enter Complete Card Number"),
        cardNo4: Yup.string().required("Please Enter Complete Card Number"),
        securityCode: Yup.string().required("Please Enter Code"),
        expDate: Yup.string().required("Please Enter Date"),
        receiptNumber: Yup.string().required("Please Enter Number"),
        name: Yup.string().required("Please Enter Name"),
        city: Yup.string().required("Please Enter City"),
        state: Yup.string().required("Please Enter state"),
        zip: Yup.string().required("Please Enter Zip"),
        address1: Yup.string().required("Please Enter Address 1"),
        address2: Yup.string().required("Please Enter Address 2"),
        pin: Yup.string().required("Please Enter Pin"),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            amount: "",
            plan: "",
            product: "",
            paymentMode: "",
            cardNo1: "",
            cardNo2: "",
            cardNo3: "",
            cardNo4: "",
            cardType: "",
            securityCode: "",
            expDate: "",
            receiptNumber: "",
            name: "",
            city: "",
            state: "",
            zip: "",
            address1: "",
            address2: "",
            pin: "",
            totall:"$24",
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
            console.log("data to send is", dataToSend);
            setIsLoading(true);
            try {
                const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                    console.log("Data is", response?.data?.data);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        },
    });

    const options = [
        { label: "Select", value: "" },
        { label: "Plan 1", value: "sim2" },
        { label: "Plan 2", value: "tablet2" },
        { label: "Plan 3", value: "cell2" },
        { label: "Plan 4", value: "sim1" },
        { label: "Plan 5", value: "tablet1" },
        { label: "Plan 6", value: "cell1" },
    ];
    const optionsForPayment = [
        { label: "Select ", value: "" },
        { label: "Credit/Debit card", value: "card" },
        { label: "Cash", value: "cash" },
        { label: "Money Order", value: "money" },
        { label: "Skip Payment", value: "skip" },
    ];
    const optionsForProduct = [
        { label: "Cell Phone", value: "cell" },
        { label: "Tablet", value: "tablet" },
        { label: "Wireless Device", value: "wireless" },
        { label: "Titan", value: "titan" },
        { label: "Sim Card", value: "Sim" },
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

    return (
        <>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <h2 className="font-bold"> Payment</h2>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mt-1 mr-3 ">
                        <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Plan</label>
                        <Dropdown
                            className="w-21rem"
                            id="plan"
                            options={options}
                            value={formik.values.plan}
                            onChange={(e) => {
                                formik.setFieldValue("plan", e.value);
                                formik.handleChange(e);
                            }}
                        />
                    </div>
                    <div className="mt-1 mr-3 ">
                        <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Product</label>
                        <MultiSelect
                            className="w-21rem"
                            value={formik.values.product}
                            display="chip"
                            onChange={(e) => {
                                formik.setFieldValue("product", e.value);
                                formik.handleChange(e);
                            }}
                            options={optionsForProduct}
                            placeholder="Select"
                            filter
                            maxSelectedLabels={5}
                        />
                    </div>
                    <div className="mt-1 mr-3 ">
                        <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Payment Method</label>
                        <Dropdown
                            className="w-21rem"
                            id="paymentMode"
                            options={optionsForPayment}
                            value={formik.values.paymentMode}
                            onChange={(e) => {
                                formik.setFieldValue("paymentMode", e.value);
                                formik.handleChange(e);
                            }}
                        />
                    </div>
                </div>
            </div>

            {formik.values.paymentMode == "card" ? (
                <>
                    <table className="cp_table w-full ml-3">
                        <tbody>
                            <tr className="text-lg">
                                <td className="w-21rem ">Credit Card Number</td>
                                <td>
                                    <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo1") }, "input_text")} type="text" id="cardNo1" value={formik.values.cardNo1} onChange={formik.handleChange} />
                                    {getFormErrorMessage("cardNo1")}
                                    <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo2") }, "input_text")} type="text" id="cardNo2" value={formik.values.cardNo2} onChange={formik.handleChange} />
                                    <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo3") }, "input_text")} type="text" id="cardNo3" value={formik.values.cardNo3} onChange={formik.handleChange} />
                                    {getFormErrorMessage("cardNo3")}
                                    <InputText className={classNames({ "w-7rem mr-3": true, "p-invalid": isFormFieldValid("cardNo4") }, "input_text")} type="text" id="cardNo4" value={formik.values.cardNo4} onChange={formik.handleChange} />
                                    {getFormErrorMessage("cardNo4")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Select Crad TYpe</td>
                                <td>
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
                                <td className="text-lg">Security Code</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("securityCode") }, "input_text")} type="password" id="securityCode" value={formik.values.securityCode} onChange={formik.handleChange} />
                                    {getFormErrorMessage("securityCode")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">EXP Date</td>
                                <td>
                                    <Calendar id="expDate" value={formik.values.expDate} onChange={formik.handleChange} showIcon style={{ width: "15rem" }} />
                                    {getFormErrorMessage("expDate")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Name On Card</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("name") }, "input_text")} type="text" id="name" value={formik.values.name} onChange={formik.handleChange} />
                                    {getFormErrorMessage("name")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Receipt Number</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid(" receiptNumber") }, "input_text")} type="text" id="receiptNumber" value={formik.values.receiptNumber} onChange={formik.handleChange} />
                                    {getFormErrorMessage(" receiptNumber")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Zip Code</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("Zip") }, "input_text")} type="text" id="Zip" value={formik.values.Zip} onChange={formik.handleChange} />
                                    {getFormErrorMessage("Zip")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">City</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("City") }, "input_text")} type="text" id="City" value={formik.values.City} onChange={formik.handleChange} />
                                    {getFormErrorMessage("City")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">State</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("State") }, "input_text")} type="text" id="State" value={formik.values.State} onChange={formik.handleChange} />
                                    {getFormErrorMessage("State")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Billing Address 1</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address1") }, "input_text")} type="text" id="address1" value={formik.values.address1} onChange={formik.handleChange} />
                                    {getFormErrorMessage("address1")}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-lg">Billing Address 2</td>
                                <td>
                                    <InputText className={classNames({ "w-15rem mr-3": true, "p-invalid": isFormFieldValid("address2") }, "input_text")} type="text" id="address2" value={formik.values.address2} onChange={formik.handleChange} />
                                    {getFormErrorMessage("address2")}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : formik.values.paymentMode == "money" ? (
                <>
                    <div className="field ml-5">
                        <label className="field_label text-lg">
                            Receipt Number
                        </label>
                        <InputText type="text" id="receiptNumber" value={formik.values.receiptNumber} onChange={formik.handleChange}  className={classNames({"w-21rem ": true, "p-invalid": isFormFieldValid("receiptNumber") }, "input_text")} />
                        {getFormErrorMessage("receiptNumber")}
                    </div>
                </>
            ) : formik.values.paymentMode == "cash" ? (
                <>
                    <div className="field ml-5">
                        <label className="field_label text-lg">
                           Totall Amount 
                        </label>
                        <InputText type="text" id="totall" value={formik.values.totall} onChange={formik.handleChange}  className={classNames({"w-21rem ": true, "p-invalid": isFormFieldValid("totall") }, "input_text")} />
                        {getFormErrorMessage("totall")}
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default PaymentScreen;
