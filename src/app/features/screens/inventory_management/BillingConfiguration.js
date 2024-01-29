import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BillingConfiguration = () => {
    const [newDiscount, setNewDiscount] = useState(false);
    const [newFeature, setNewFeature] = useState(false);
    const [selectedCities, setSelectedCities] = useState(null);
    const [allPlan, setAllPlan] = useState([]);
    const [allDiscount, setAllDiscount] = useState([]);
    const [allFeature, setAllFeature] = useState([]);

    const [configData, setconfigData] = useState();

    const formik = useFormik({
        // validationSchema: validationSchema,
        initialValues: {
            billingmodel: "",
            inventoryType: "",
            oneTimeCharge: "",
            monthlyCharge: [],
            dueDate: "",
            paymentMethod: "",
            selectdiscount: [],
            discountname: "",
            amount: "",
            BillCreationDate: "",
            additionalFeature: [],
            featureName: "",
            featureAmount: "",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                ServiceProvider: parseLoginRes?.compony,
                billingmodel: formik.values.billingmodel,
                inventoryType: formik.values.inventoryType,
                oneTimeCharge: formik.values.oneTimeCharge,
                monthlyCharge: formik.values.monthlyCharge,
                dueDate: formik.values.dueDate,
                paymentMethod: formik.values.paymentMethod,
                selectdiscount: formik.values.selectdiscount,
                BillCreationDate: formik.values.BillCreationDate,
                additionalFeature: formik.values.additionalFeature,
            };

            try {
                const response = await Axios.post(`${BASE_URL}/api/web/billing/billconfig`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Bill Configed Successfully")
                    getConfigData();
                    actions.resetForm();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                console.log("error is", error?.response?.data)
            }
        },
    });


    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const optionsForBillingmodel = [
        { label: "Select Billing Model", value: "" },
        { label: "Prepaid", value: "Prepaid" },
        { label: "Postpaid", value: "Postpaid" },
        { label: "ACP", value: "ACP" },
    ];
    const optionsForInventoryType = [
        { label: "Select Inventory Type", value: "" },
        { label: "Sim Card", value: "SimCard" },
        { label: "Tablet", value: "Tablet" },
        { label: "Cell Phone", value: "CellPhone" },
    ];

    const optionsForPayment = [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "Money Order", value: "Money Order" },
        { label: "E-Check", value: "E-Check" },
        { label: "Skip Payment", value: "Skip Payment" },
    ];
    const optionsForCreation = [{ label: "On Activation", value: "onActivation" }];

    function showDiscount() {
        setNewDiscount(true);
    }
    function showFeature() {
        setNewFeature(true);
    }

    const getDiscount = async () => {

        try {
            const res = await Axios.get(`${BASE_URL}/api/web/discount/getalldiscounts`);
            setAllDiscount(res?.data?.data || []);
            console.log("discountdata  is", res?.data?.data)
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const getFeature = async () => {

        try {
            const res = await Axios.get(`${BASE_URL}/api/web/feature/getallfeatures`);
            setAllFeature(res?.data?.data || []);
            console.log("data is", res?.data?.data)

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const getConfigData = async () => {

        try {
            const res = await Axios.get(`${BASE_URL}/api/web/billing/getall`);
            setconfigData(res?.data?.data || []);
            console.log("config data is", res?.data?.data)

        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    useEffect(() => {

        getDiscount();
        getConfigData();
        getFeature();
    }, []);

    const addDiscount = async () => {
        const dataToSend = {
            ServiceProvider: parseLoginRes?.compony,
            discountname: formik.values.discountname,
            amount: formik.values.amount,
        };

        try {
            const response = await Axios.post(`${BASE_URL}/api/web/discount/adddiscount`, dataToSend);
            if (response?.status == 200 || response?.status == 201) {
                setNewDiscount(false);
                getDiscount();
                toast.success("Discount added successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const addFeature = async () => {
        const dataToSend = {
            ServiceProvider: parseLoginRes?.compony,
            featureName: formik.values.featureName,
            featureAmount: formik.values.featureAmount,
        };

        try {
            const response = await Axios.post(`${BASE_URL}/api/web/feature/addfeature`, dataToSend);
            if (response?.status == 200 || response?.status == 201) {
                setNewFeature(false); // Fix the typo here
                getFeature();
                toast.success("Feature added successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };


    useEffect(() => {
        const getPlan = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLoginRes?.compony}`);
                setAllPlan(res?.data?.data || []);

            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        };
        getPlan();
    }, []);


    const handleGenrateInvoice = () => {

    }
    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button label="Generate Invoice" onClick={() => handleGenrateInvoice(rowData)} className=" p-button-primary mr-2 ml-2 pt-1 pb-1" text raised />
            </div>
        );
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="card">
                    <h3 className="font-bold mb-3">Billing Configuration</h3>
                    <div className=" card flex flex-column ">
                        <div className=" p-fluid formgrid grid flex ">
                            <div className="mt-3 field col-12 md:col-3 ">
                                <label className="field_label mb-2 text-md">Billing Model</label>
                                <Dropdown
                                    className="w-21rem"
                                    id="billingmodel"
                                    options={optionsForBillingmodel}
                                    value={formik.values.billingmodel}
                                    onChange={(e) => {
                                        formik.setFieldValue("billingmodel", e.value);
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.billingmodel && formik.errors.billingmodel ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.billingmodel}
                                    </p>
                                ) : null}
                            </div>

                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">Inventory Type</label>
                                <Dropdown
                                    className="w-21rem"
                                    id="inventoryType"
                                    options={optionsForInventoryType}
                                    value={formik.values.inventoryType}
                                    onChange={(e) => {
                                        formik.setFieldValue("inventoryType", e.value);
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.inventoryType && formik.errors.inventoryType ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.inventoryType}
                                    </p>
                                ) : null}
                            </div>

                            <div className="field col-12 md:col-3 mt-3">
                                <label className="field_label text-md">One Time Charges</label>
                                <InputText id="oneTimeCharge" placeholder="Enter One Time Charges" value={formik.values.oneTimeCharge} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">Monthly Charges</label>
                                <MultiSelect
                                    id="monthlyCharge"
                                    display="chip"
                                    options={allPlan}
                                    value={formik.values.monthlyCharge}
                                    onChange={(e) => formik.setFieldValue("monthlyCharge", e.value)}
                                    optionLabel={(option) => `${option.name} - (${option.planId})`}
                                    optionValue="_id"
                                    className="w-20rem"
                                />

                                {formik.touched.monthlyCharge && formik.errors.monthlyCharge ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.monthlyCharge}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">Bill Create Date</label>
                                <Dropdown
                                    className="w-21rem"
                                    id="BillCreationDate"
                                    options={optionsForCreation}
                                    value={formik.values.BillCreationDate}
                                    onChange={(e) => {
                                        formik.setFieldValue("BillCreationDate", e.value);
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.BillCreationDate && formik.errors.BillCreationDate ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.BillCreationDate}
                                    </p>
                                ) : null}
                            </div>
                            <div className="field col-12 md:col-3 mt-3">
                                <label className="field_label text-md">Due Date</label>
                                <InputText id="dueDate" placeholder="No of days From Bill Create Date" value={formik.values.dueDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>


                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">Payment Method</label>
                                <Dropdown
                                    className="w-21rem"
                                    id="paymentMethod"
                                    options={optionsForPayment}
                                    value={formik.values.paymentMethod}
                                    onChange={(e) => {
                                        formik.setFieldValue("paymentMethod", e.value);
                                        formik.handleChange(e);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.paymentMethod}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">
                                    Select Discount OR{" "}
                                    <span onClick={showDiscount} style={{ color: "blue", cursor: "pointer" }}>
                                        Add Discount
                                    </span>{" "}
                                </label>
                                <MultiSelect
                                    id="selectdiscount"
                                    display="chip"
                                    options={allDiscount}
                                    value={formik.values.selectdiscount}
                                    onChange={(e) => formik.setFieldValue("selectdiscount", e.value)}
                                    optionLabel={(option) => `${option.discountname
                                        } - (${option.amount})`}
                                    optionValue="_id"
                                    className="w-20rem"
                                />
                            </div>
                            <div className="mt-3 field col-12 md:col-3  ">
                                <label className="field_label mb-2 text-md">
                                    Additional Feature OR{" "}
                                    <span onClick={showFeature} style={{ color: "blue", cursor: "pointer" }}>
                                        Add Feature
                                    </span>{" "}
                                </label>
                                <MultiSelect
                                    id="additionalFeature"
                                    display="chip"
                                    options={allFeature}
                                    value={formik.values.additionalFeature}
                                    onChange={(e) => formik.setFieldValue("additionalFeature", e.value)}
                                    optionLabel={(option) => `${option.featureName
                                        } - (${option.featureAmount})`}
                                    optionValue="_id"
                                    className="w-20rem"
                                />

                            </div>
                        </div>
                        {newDiscount ? (
                            <>
                                <div className="  mt-2 font-bold text-lg">Discount:</div>
                                <div className="p-fluid formgrid grid mt-3" style={{ alignItems: "center" }}>
                                    <div className="field col-12 md:col-3">
                                        <label className="field_label mb-2 text-lg">Nmae</label>
                                        <InputText id="discountname" value={formik.values.discountname} onChange={formik.handleChange} />
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <label className="field_label mb-2 text-lg"> Amount </label>
                                        <InputText id="amount" value={formik.values.amount} onChange={formik.handleChange} />
                                    </div>
                                    <i className="pi pi-check ml-2" style={{ color: "green", fontSize: "24px", cursor: "pointer" }} onClick={addDiscount}></i>
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        {newFeature ? (
                            <>
                                <div className="  mt-2 font-bold text-lg">Feature:</div>
                                <div className="p-fluid formgrid grid mt-3" style={{ alignItems: "center" }}>
                                    <div className="field col-12 md:col-3">
                                        <label className="field_label mb-2 text-lg">Nmae</label>
                                        <InputText id="featureName" value={formik.values.featureName} onChange={formik.handleChange} />
                                    </div>
                                    <div className="field col-12 md:col-3">
                                        <label className="field_label mb-2 text-lg"> Amount </label>
                                        <InputText id="featureAmount" value={formik.values.featureAmount} onChange={formik.handleChange} />
                                    </div>
                                    <i className="pi pi-check ml-2" style={{ color: "green", fontSize: "24px", cursor: "pointer" }} onClick={addFeature}></i>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <div className="text-right mr-5">
                            <Button label="Submit" type="Submit" />
                        </div>
                    </div>

                </div>
            </form>

            <div className="card">
                <h3 className="font-bold">Configurations</h3>
                <DataTable value={configData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column header="Billing Model" field="billingmodel" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Inventory Type" field="inventoryType" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column
                        header="One Time Charge"
                        field="oneTimeCharge"
                        body={(rowData) => `$${rowData.oneTimeCharge}`}
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                    />

                    <Column header="Monthly Charges" body={(rowData) => rowData?.monthlyCharge?.map(mc => mc.name).join(', ')} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Bill Creation Date" field="BillCreationDate" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Due Date" field="dueDate" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column
                        header="Feature"
                        body={(rowData) =>
                            rowData?.additionalFeature
                                ?.map((sd) => `${sd.featureName} - $${sd.featureAmount}`)
                                .join(', ')
                        }
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                    />

                    <Column
                        header="Discount"
                        body={(rowData) =>
                            rowData?.selectdiscount
                                ?.map((sd) => `${sd.discountname} - $${sd.amount}`)
                                .join(', ')
                        }
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                    />

                    <Column header="Payment Method" field="paymentMethod" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    {/* <Column header="Actions" body={actionTemplate} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} /> */}
                </DataTable>
            </div>

        </>
    );
};

export default BillingConfiguration;