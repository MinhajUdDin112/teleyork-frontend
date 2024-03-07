import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import "./billingmodel_configurations/css/updatebill.css";
import AddNewFeature from "./add_newfeature";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function UpdateBill({ rowData, setUpdatePlanVisibility, setRefresh, optionsForInventoryType }) {
    console.log(rowData);
    //const toast=Toast
    const [currentBillingId, setCurrentBillingId] = useState("");
    const [newDiscount, setNewDiscount] = useState(false);
    const [newFeature, setNewFeature] = useState(false);
    const [allPlan, setAllPlan] = useState([]);
    const [allDiscount, setAllDiscount] = useState([]);
    const [allFeature, setAllFeature] = useState([]);
    const [inventoryTypeOptions, setInventoryTypeOptions] = useState([]);
    let additionalFeature = [];
    for (let i = 0; i < rowData.additionalFeature.length; i++) {
        additionalFeature.push(rowData.additionalFeature[i]._id);
    }
    let oneTimeCharge = [];
    for (let i = 0; i < rowData.monthlyCharge.length; i++) {
        oneTimeCharge.push(rowData.monthlyCharge[i]._id);
    }
    let selecteddiscount = [];
    for (let i = 0; i < rowData.selectdiscount.length; i++) {
        selecteddiscount.push(rowData.selectdiscount[i]._id);
    }
    const formik = useFormik({
        // validationSchema: validationSchema,
        initialValues: {
            billingmodel: rowData.billingmodel,
            oneTimeCharge: rowData.oneTimeCharge,
            monthlyCharge: oneTimeCharge,
            inventoryType: rowData.inventoryType,
            dueDate: rowData.dueDate,
            paymentMethod: rowData.paymentMethod,
            selectdiscount: selecteddiscount,
            BillCreationDate: rowData.BillCreationDate,
            additionalFeature: additionalFeature,
            latefeeCharge: rowData.latefeeCharge,
            applyLateFee: rowData.applyLateFee,
            subsequentBillCreateDate: rowData.subsequentBillCreateDate,
        },
        onSubmit: async (values, actions) => {
            let selectdiscount = [];
            for (let i = 0; i < Object.keys(formik.values.selectdiscount).length; i++) {
                selectdiscount.push(formik.values.selectdiscount[i]._id);
            }
            let additionalfeature = [];
            for (let i = 0; i < Object.keys(formik.values.additionalFeature).length; i++) {
                additionalfeature.push(formik.values.additionalFeature[i]._id);
            }
            let paymentMethod = [];
            for (let i = 0; i < Object.keys(formik.values.paymentMethod).length; i++) {
                paymentMethod.push(formik.values.paymentMethod[i]._id);
            }
            const dataToSend = {
                ServiceProvider: parseLoginRes?.company,
                oneTimeCharge: formik.values.oneTimeCharge,
                monthlyCharge: formik.values.monthlyCharge,
                dueDate: formik.values.dueDate,
                paymentMethod: formik.values.paymentMethod,
                selectdiscount: formik.values.selectdiscount,
                BillCreationDate: formik.values.BillCreationDate,
                additionalFeature: formik.values.additionalFeature,
                latefeeCharge: formik.values.latefeeCharge,
                applyLateFee: formik.values.applyLateFee,
                subsequentBillCreateDate: formik.values.subsequentBillCreateDate,
            };

            try {
                const response = await Axios.put(`${BASE_URL}/api/web/billing/billconfig?id=${rowData._id}`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Bill Updated Successfully");

                    setTimeout(() => {
                        setUpdatePlanVisibility(false);
                        setRefresh((prev) => !prev);
                    }, 1000);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
    });
    const addDiscount = async () => {
        const dataToSend = {
            ServiceProvider: parseLoginRes?.company,
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
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const optionsForPayment = [
        { label: "Select Payment Method", value: "" },
        { label: "Cash", value: "Cash" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "Money Order", value: "Money Order" },
        { label: "E-Check", value: "E-Check" },
        { label: "Skip Payment", value: "Skip Payment" },
    ];
    const optionsForCreation = [
   
            { label: "On Activation", value: "On Activation" },
            { label: "After QA Approval ", value: "On QA Approval" },
       
    ];

    const getDiscount = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/discount/getalldiscounts`);
            setAllDiscount(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const getFeature = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/feature/getallfeatures`);
            setAllFeature(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    useEffect(() => {
        getDiscount();
        getBillingModelList();
        getFeature();
    }, []);
    useEffect(() => {
        if (formik.values.inventoryType !== "") {
            Axios.get(`${BASE_URL}/api/web/plan/getByInventoryType?inventoryType=${formik.values.inventoryType}&serviceProvider=${parseLoginRes.company}`).then((res) => {
                setAllPlan(res?.data?.data || []);
            });
        }
    }, [formik.values.inventoryType]);
    useEffect(() => {
        async function fetchData() {
            if (formik.values.billingmodel !== "") {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/billingModel/getInventoryByBillModel?BillModelId=${currentBillingId}`);
                    let obj = [];
                    let data = res?.data?.data;
                    data.forEach((item) => {
                        let obj2 = {};
                        obj2.inventoryType = item;
                        obj.push(obj2);
                    });
                    setInventoryTypeOptions(obj);
                } catch (error) {
                    //toast.error(error?.response?.data?.msg);
                }
            }
        }
        fetchData();
    }, [currentBillingId]);
    const getBillingModelList = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`);
            // setBillingModelOptions(res?.data?.data || [])
            let billingmodel = res?.data?.data;
            let id;
            billingmodel.map((item) => {
                if (item.billingModel === formik.values.billingmodel) {
                    id = item._id;
                }
            });
            setCurrentBillingId(id);
        } catch (error) {
            toast.current.show({ severity: "error", summary: "Plan Updation", detail: error?.response?.data?.msg });
        }
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className=" flex flex-wrap flex-row justify-content-around">
                <div className="field-width mt-3 ">
                    <label className="field_label text-md  mb-2">One Time Charges</label>
                    <div className="latefeecharge flex flex-wrap flex-row justify-content-left align-items-center ">
                        <InputText id="oneTimeCharge" value={formik.values.oneTimeCharge} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <p>$</p>
                    </div>
                </div>
                <div className="mt-3 field-width ">
                    <label className="field_label mb-2 text-md">Inventory Type</label>
                    <Dropdown
                        className="w-full"
                        id="inventoryType"
                        options={inventoryTypeOptions}
                        optionLabel="inventoryType"
                        optionValue="inventoryType"
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

                <div className="mt-3 field-width  ">
                    <label className="field_label mb-2 text-md">Monthly Charges</label>
                    <MultiSelect id="monthlyCharge" display="chip" options={allPlan} value={formik.values.monthlyCharge} onChange={(e) => formik.setFieldValue("monthlyCharge", e.value)} optionLabel={(option) => `${option.name} - (${option.planId})`} optionValue="_id" className="w-full" />

                    {formik.touched.monthlyCharge && formik.errors.monthlyCharge ? (
                        <p className="mt-2 ml-2" style={{ color: "red" }}>
                            {formik.errors.monthlyCharge}
                        </p>
                    ) : null}
                </div>
                <div className="mt-3 field-width  ">
                    <label className="field_label mb-2 text-md">First Bill Create Date</label>
                    <Dropdown
                        className="w-full"
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
                <div className="field-width mt-3">
                    <label className="field_label text-md mb-2">Subsequent Bill Create Date </label>
                    <div className="subsequentbillcreatedate flex flex-wrap flex-row justify-content-center align-items-center ">
                        <InputText id="subsequentBillCreateDate" value={formik.values.subsequentBillCreateDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <p>Days From the First Bill Create Date</p>
                    </div>
                </div>
                <div className="field-width mt-3">
                    <label className="field_label text-md mb-2">Due Date</label>
                    <div className="subsequentbillcreatedate flex flex-wrap flex-row justify-content-center align-items-center ">
                        <InputText id="dueDate" value={formik.values.dueDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <p>Days From the Bill Create Date</p>
                    </div>
                </div>
                <div className="field-width mt-3">
                    <label className="field_label text-md mb-2">Late Fee Charge</label>
                    <div className="latefeecharge flex flex-wrap flex-row justify-content-left align-items-center ">
                        <InputText id="latefeeCharge" value={formik.values.latefeeCharge} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <p>$</p>
                    </div>
                </div>
                <div className="field-width mt-3">
                    <label className="field_label text-md mb-2">Apply Late Fee </label>
                    <div className="subsequentbillcreatedate flex flex-wrap flex-row justify-content-center align-items-center ">
                        <InputText id="applyLateFee" value={formik.values.applyLateFee} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <p>Days After the Due Date</p>
                    </div>
                </div>

                <div className="mt-3 field-width  ">
                    <label className="field_label mb-2 text-md">Payment Method</label>

                    <MultiSelect
                        className="w-full"
                        id="paymentMethod"
                        options={optionsForPayment}
                        display="chip"
                        value={formik.values.paymentMethod}
                        onChange={(e) => {
                            formik.setFieldValue("paymentMethod", e.value);
                            formik.handleChange(e);
                        }}
                    />

                    {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                        <p className="mt-2 ml-2" style={{ color: "red" }}>
                            {formik.errors.paymentMethod}
                        </p>
                    ) : null}
                </div>
                <div className="mt-3 field-width  ">
                    <label className="field_label mb-2 text-md">
                        Select Discount
                        {/* <span onClick={showDiscount} style={{ color: "blue", cursor: "pointer" }}>
                            Add Discount
                        </span>{" "} */}
                    </label>
                    <MultiSelect
                        id="selectdiscount"
                        display="chip"
                        options={allDiscount}
                        value={formik.values.selectdiscount}
                        onChange={(e) => formik.setFieldValue("selectdiscount", e.value)}
                        optionLabel={(option) => `${option.discountname} - (${option.amount})`}
                        optionValue="_id"
                        className="w-full"
                    />
                </div>
                <div className="mt-3 field-width  ">
                    <label className="field_label mb-2 text-md">
                        Additional Feature
                        {/* <span onClick={showFeature} style={{ color: "blue", cursor: "pointer" }}>
                            Add Feature
                        </span>{" "} 
                         */}
                    </label>
                    <MultiSelect
                        id="additionalFeature"
                        display="chip"
                        options={allFeature}
                        value={formik.values.additionalFeature}
                        onChange={(e) => formik.setFieldValue("additionalFeature", e.value)}
                        optionLabel={(option) => `${option.featureName} - (${option.featureAmount})`}
                        optionValue="_id"
                        className="w-full"
                    />
                </div>
            </div>

            {newDiscount ? (
                <>
                    <div className="  mt-2 font-bold text-lg ml-5">Discount:</div>
                    <div className="p-fluid formgrid grid mt-3" style={{ alignItems: "center" }}>
                        <div className="field-width">
                            <label className="field_label mb-2 text-lg">Name</label>
                            <InputText id="discountname" value={formik.values.discountname} onChange={formik.handleChange} />
                        </div>
                        <div className="field-width">
                            <label className="field_label mb-2 text-lg"> Amount </label>
                            <InputText id="amount" value={formik.values.amount} onChange={formik.handleChange} />
                        </div>
                        <i className="pi pi-check ml-2" style={{ color: "green", fontSize: "24px", cursor: "pointer" }} onClick={addDiscount}></i>
                    </div>
                </>
            ) : (
                ""
            )}

            <div className="flex flex-wrap justify-content-center mt-4 w-full ">
                <Button label="Submit" className="field-width" type="Submit" />
            </div>
            <Dialog
                header="Add New Feature"
                style={{ width: "80vw" }}
                visible={newFeature}
                onHide={() => {
                    setNewFeature(false);
                }}
            >
                <AddNewFeature formik={formik.values} setNewFeature={setNewFeature} getFeature={getFeature} company={parseLoginRes?.company} />
            </Dialog>
        </form>
    );
}
