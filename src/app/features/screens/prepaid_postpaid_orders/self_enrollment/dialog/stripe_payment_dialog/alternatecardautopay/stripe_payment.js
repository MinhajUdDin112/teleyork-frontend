import React from "react";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
export default function AlternateCardPaymentStripModule({ setAutoPayDate, cardNumber, cardYear, cardMonth, cvcNumber, setCardNumber, setCvcNumber, setCardYear, setCardMonth, setAlternateCardDetailVisibility }) {
    const daysOfMonth = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
        { label: "13", value: "13" },
        { label: "14", value: "14" },
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "20", value: "20" },
        { label: "21", value: "21" },
        { label: "22", value: "22" },
        { label: "23", value: "23" },
        { label: "24", value: "24" },
        { label: "25", value: "25" },
        { label: "26", value: "26" },
        { label: "27", value: "27" },
        { label: "28", value: "28" },
        { label: "29", value: "29" },
        { label: "30", value: "30" },
        { label: "31", value: "31" },
    ];

    const formik = useFormik({
        initialValues: {
            cardNumber: "",
            cvcNumber: "",
            cardMonth: "",
            cardYear: "",
            autoPayDate: "",
        },
        validationSchema: Yup.object({
            autoPayDate: Yup.string().required("Auto Pay Month Day Is Required"),
            cardNumber: Yup.string()
                .matches(/^[0-9]{14,16}$/, "Must be a Number with 14 to 16 digits")
                .required("Card Number is required"),
            cardMonth: Yup.string().required("Expiry Month  is required").matches(/^\d+$/, "Expiry Month contain only digits").length(2, "Expiry Month must be exactly 2 digits"),
            cardYear: Yup.string().required("Expiry Year  is required").matches(/^\d+$/, "Expiry Year contain only digits").length(2, "Expiry Year must be exactly 2 digits"),
            cvcNumber: Yup.string().required("CVC Number  is required").matches(/^\d+$/, "CVC Number contain only digits").length(3, "CVC Number must be exactly 3 digits"),
        }),
        onSubmit: (values) => {
            setCardNumber(values.cardNumber);
            setCardMonth(values.cardMonth);
            setCardYear(values.cardYear);
            setCvcNumber(values.cvcNumber);
            setAutoPayDate(values.autoPayDate);
            setAlternateCardDetailVisibility(false);
        },
    });

    return (
        <div className="flex flex-row flex-wrap justify-content-between">
            <div className="w-full">
                <div className="mt-2 fieldinpayment">
                    <label>AutoPay Month Day</label>
                    <Dropdown className="w-full mt-2" placeholder="Autopay Month Day" name="autoPayDate" options={daysOfMonth} value={formik.values.autoPayDate} onChange={formik.handleChange} />
                    {formik.errors.autoPayDate && formik.touched.autoPayDate && (
                        <div className="mt-2" style={{ color: "red" }}>
                            {formik.errors.autoPayDate}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-2 fieldinpayment">
                <label>Card Number</label>
                <InputText keyfilter="int" minLength={14} maxLength={16} name="cardNumber" value={formik.values.cardNumber} className="w-full mt-2" placeholder="Card Number" onChange={formik.handleChange} />
                {formik.errors.cardNumber && formik.touched.cardNumber && (
                    <div className="mt-2" style={{ color: "red" }}>
                        {formik.errors.cardNumber}
                    </div>
                )}
            </div>
            <div className="mt-2 fieldinpayment">
                <label>CVC Number</label>
                <InputText keyfilter="int" name="cvcNumber" value={formik.values.cvcNumber} maxLength={3} minLength={3} className="w-full mt-2" placeholder="CVC" onChange={formik.handleChange} />
                {formik.errors.cvcNumber && formik.touched.cvcNumber && (
                    <div className="mt-2" style={{ color: "red" }}>
                        {formik.errors.cvcNumber}
                    </div>
                )}
            </div>

            <div className="mt-2 fieldinpayment">
                <label>Expiry Month</label>
                <InputText keyfilter="int" name="cardMonth" value={formik.values.cardMonth} maxLength={2} minLength={2} className="w-full mt-2" placeholder="Expiry Month" onChange={formik.handleChange} />
                {formik.errors.cardMonth && formik.touched.cardMonth && (
                    <div className="mt-2" style={{ color: "red" }}>
                        {formik.errors.cardMonth}
                    </div>
                )}
            </div>
            <div className="mt-2 fieldinpayment">
                <label>Expiry Year</label>
                <InputText keyfilter="int" name="cardYear" value={formik.values.cardYear} maxLength={2} minLength={2} className="w-full mt-2" placeholder="Expiry Year" onChange={formik.handleChange} />
                {formik.errors.cardYear && formik.touched.cardYear && (
                    <div className="mt-2" style={{ color: "red" }}>
                        {formik.errors.cardYear}
                    </div>
                )}
            </div>
            <div className="w-full">
                <div className="mt-2 fieldinpayment">
                    <Button
                        className="w-full mt-2"
                        label="Submit"
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
