import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataTable } from "primereact/datatable";
import { useFormik } from "formik";
import "./css/billing_configuration.css";
import { Toast } from "primereact/toast";
import ListAllBilling from "./components/billingmodel_configurations/billing_model_configurations";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UpdateBill from "./components/update_bill";
import { Card } from "primereact/card";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const BillingConfiguration = () => {
    const [configBillingModel, setConfigBillingModel] = useState(false);
    const [currentBillingId, setCurrentBillingId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const toast2 = useRef(null);
    const [newDiscount, setNewDiscount] = useState(false);
    const [currentRow, setCurrentRow] = useState();
    const [updatePlanVisibility, setUpdatePlanVisibility] = useState(false);
    const [newFeature, setNewFeature] = useState(false);
    const [allPlan, setAllPlan] = useState([]);
    const [allDiscount, setAllDiscount] = useState([]);
    const [allFeature, setAllFeature] = useState([]);
    const [refreshOnBillingConfig, setRefreshOnBillingConfig] = useState(false);
    const [configData, setconfigData] = useState();
    const formik = useFormik({
        // validationSchema: validationSchema,
        initialValues: {
            billingmodel: "",
            inventoryType: "",
            oneTimeCharge: "",
            monthlyCharge: [],
            dueDate: "",
            paymentMethod: [],
            selectdiscount: [],
            discountname: "",
            amount: "",
            BillCreationDate: "",
            additionalFeature: [],
            featureName: "",
            featureAmount: "",
            latefeeCharge: "",
            applyLateFee: "",
            subsequentBillCreateDate: "",
        },
        onSubmit: async (values, actions) => {
            const dataToSend = {
                ServiceProvider: parseLoginRes?.company,
                billingmodel: formik.values.billingmodel,
                inventoryType: formik.values.inventoryType,
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
                const response = await Axios.post(`${BASE_URL}/api/web/billing/billconfig`, dataToSend);
                if (response?.status === 200 || response?.status === 201) {
                    toast.success("Bill Configured Successfully");
                    getConfigData();
                    actions.resetForm();
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        },
    });

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [optionsForBillingmodel, setOptionsForBillingModel] = useState([]);
    const [optionsForInventoryType, setOptionForInventoryType] = useState([]);
    const [onChangeBillingModel, setOnChangeBillingModel] = useState(false);
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
    const getConfigData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/billing/getBillConfig`);
            setconfigData(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const getBillingModelList = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`);
            console.log("data for billing model is", res.data.data);
            setOptionsForBillingModel(res?.data?.data || []);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };
    const getInventoryList = async () => {   
         if(formik.values.billingmodel !== ""){
        try {
            const res = await Axios.get(`${BASE_URL}/api/billingModel/getInventoryByBillModel?BillModelId=${currentBillingId}`);
            let obj = [];
            let data = res?.data?.data;
            data.forEach((item) => {
                let obj2 = {};
                obj2.inventoryType = item;
                obj.push(obj2);
            });
            setOptionForInventoryType(obj);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        } 
    }
    };

    useEffect(() => {
        getDiscount();
        getConfigData();
        getFeature();
    }, [refresh]);
    useEffect(() => {
        getBillingModelList();
    }, [refreshOnBillingConfig]);
    useEffect(() => {
        getInventoryList();
    }, [onChangeBillingModel]);
    useEffect(() => {
        if (formik.values.inventoryType !== "") {
            Axios.get(`${BASE_URL}/api/web/plan/getByInventoryType?inventoryType=${formik.values.inventoryType}&serviceProvider=${parseLoginRes.company}`).then((res) => {
                setAllPlan(res?.data?.data || []);
            });
        }
    }, [formik.values.inventoryType]);

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

    const addFeature = async () => {
        const dataToSend = {
            ServiceProvider: parseLoginRes?.company,
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

    {
        /*   useEffect(() => {
        const getPlan = async () => {
            try {
                const res = await Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLoginRes?.company}`);
                setAllPlan(res?.data?.data || []);

            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        };
        getPlan();
    }, []);
*/
    }

    return (
        <Card>
            <Dialog
                header="Billing Model Configurations"
                visible={configBillingModel}
                className="pt-0"
                style={{ width: "80vw" }}
                onHide={() => {
                    setConfigBillingModel(false);
                    setRefreshOnBillingConfig((prev) => !prev);
                }}
            >
                <ListAllBilling />
            </Dialog>

            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <h3 className="font-bold mb-3">Billing Configuration</h3>
                <div className="">
                    <div className=" ">
                        <div className=" flex flex-wrap flex-row justify-content-around  ">
                            <div className="field-width  " style={{ marginTop: "10px" }}>
                                <label className="field_label  text-md">Billing Model </label>
                                <Dropdown
                                    className="w-full mt-1"
                                    id="billingmodel"
                                    options={optionsForBillingmodel}
                                    value={formik.values.billingmodel}
                                    placeholder="Select Billing Model"
                                    optionLabel="billingModel"
                                    optionValue="billingModel"
                                    onChange={(e) => {
                                        console.log("E is ", e);
                                        formik.setFieldValue("billingmodel", e.value);
                                        let id;
                                        optionsForBillingmodel.map((item) => {
                                            if (item.billingModel === e.value) {
                                                id = item._id;
                                            }
                                        });
                                        formik.handleChange(e);
                                        setCurrentBillingId(id);
                                        setOnChangeBillingModel((prev) => !prev);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.billingmodel && formik.errors.billingmodel ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.billingmodel}
                                    </p>
                                ) : null}
                            </div>
                            <Toast ref={toast2} />

                            <div className="mt-3 field-width ">
                                <label className="field_label text-md">Inventory Type</label>
                                <Dropdown
                                    className="w-full  mt-1"
                                    id="inventoryType"
                                    placeholder="Select Inventory Type"
                                    options={optionsForInventoryType}
                                    value={formik.values.inventoryType}
                                    optionLabel="inventoryType"
                                    optionValue="inventoryType"
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
                            <div className="field-width mt-3">
                                <label className="field_label text-md">One Time Charges</label>
                                <InputText id="oneTimeCharge" className="w-full  mt-1" placeholder="Enter One Time Charges" value={formik.values.oneTimeCharge} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>
                            <div className="mt-3 field-width  ">
                                <label className="field_label   text-md">Monthly Charges</label>
                                <MultiSelect
                                    id="monthlyCharge"
                                    display="chip"
                                    options={allPlan}
                                    placeholder="Monthly Charges"
                                    value={formik.values.monthlyCharge}
                                    onChange={(e) => formik.setFieldValue("monthlyCharge", e.value)}
                                    optionLabel={(option) => `${option.name} - (${option.planId})`}
                                    optionValue="_id"
                                    className="w-full  mt-1"
                                />

                                {formik.touched.monthlyCharge && formik.errors.monthlyCharge ? (
                                    <p className="mt-2 ml-2" style={{ color: "red" }}>
                                        {formik.errors.monthlyCharge}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mt-3 field-width  ">
                                <label className="field_label  text-md">First Bill Create Date</label>
                                <Dropdown
                                    className="w-full  mt-1"
                                    id="BillCreationDate"
                                    placeholder="First Bill Create Date"
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
                                <label className="field_label text-md">Subsequent Bill Create Date </label>
                                <InputText id="subsequentBillCreateDate" className="w-full  mt-1" placeholder="No of Days From First Bill Create Date" value={formik.values.subsequentBillCreateDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>
                            <div className="field-width mt-3">
                                <label className="field_label text-md">Due Date</label>
                                <InputText id="dueDate" placeholder="No of days From Bill Create Date" className="w-full  mt-1" value={formik.values.dueDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>
                            <div className="field-width mt-3">
                                <label className="field_label text-md">Late Fee Charge</label>
                                <InputText id="latefeeCharge" placeholder="Late Fee Charge" value={formik.values.latefeeCharge} className="w-full  mt-1" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>
                            <div className="field-width mt-3">
                                <label className="field_label text-md">Apply Late Fee </label>
                                <InputText id="applyLateFee" placeholder="No of Days from Due Date" className="w-full  mt-1" value={formik.values.applyLateFee} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            <div className="mt-3 field-width  ">
                                <label className="field_label  text-md">Payment Method</label>

                                <MultiSelect
                                    className="w-full  mt-1"
                                    id="paymentMethod"
                                    placeholder="Select Payment Method"
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
                            <div className="mt-3 field-width ">
                                <label className="field_label  text-md">
                                    Select Discount OR{" "}
                                    <span onClick={showDiscount} style={{ color: "blue", cursor: "pointer" }}>
                                        Add Discount
                                    </span>{" "}
                                </label>
                                <MultiSelect
                                    id="selectdiscount"
                                    display="chip"
                                    placeholder="Select Discounts"
                                    options={allDiscount}
                                    value={formik.values.selectdiscount}
                                    onChange={(e) => formik.setFieldValue("selectdiscount", e.value)}
                                    optionLabel={(option) => `${option.discountname} - (${option.amount})`}
                                    optionValue="_id"
                                    className="w-full mt-1"
                                />
                            </div>
                            <div className="mt-3 field-width ">
                                <label className="field_label  text-md">
                                    Additional Feature OR{" "}
                                    <span onClick={showFeature} style={{ color: "blue", cursor: "pointer" }}>
                                        Add Feature
                                    </span>{" "}
                                </label>
                                <MultiSelect
                                    id="additionalFeature"
                                    display="chip"
                                    placeholder="Select Additional Features"
                                    options={allFeature}
                                    value={formik.values.additionalFeature}
                                    onChange={(e) => formik.setFieldValue("additionalFeature", e.value)}
                                    optionLabel={(option) => `${option.featureName} - (${option.featureAmount})`}
                                    optionValue="_id"
                                    className="w-full mt-1"
                                />
                            </div>
                        </div>
                        {newDiscount ? (
                            <div>
                                <div className="discountmain flex flex-wrap  flex-row justify-content-around">
                                    <div className="discount_field_width">
                                        <label className="field_label mb-2 text-lg">Discount Name</label>
                                        <InputText id="discountname" className="w-full" value={formik.values.discountname} onChange={formik.handleChange} />
                                    </div>
                                    <div className="discount_field_width">
                                        <label className="field_label mb-2 text-lg">Discount Amount </label>
                                        <InputText id="amount" className="w-full" value={formik.values.amount} onChange={formik.handleChange} />
                                    </div>
                                    <Button className="discount_field_width mt-4" label="Add Discount" onClick={addDiscount} />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                        {newFeature ? (
                            <>
                                <div className="featuremain flex flex-wrap  flex-row justify-content-around">
                                    <div className="feature_field_width">
                                        <label className="field_label mb-2 text-lg">Name</label>
                                        <InputText id="featureName" className="w-full" value={formik.values.featureName} onChange={formik.handleChange} />
                                    </div>
                                    <div className="feature_field_width">
                                        <label className="field_label mb-2 text-lg"> Amount </label>
                                        <InputText id="featureAmount" className="w-full" value={formik.values.featureAmount} onChange={formik.handleChange} />
                                    </div>
                                    <Button className="feature_field_width mt-4" label="Add Feature" onClick={addFeature} />
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        <div className="text-right mr-5 mt-4">
                            <Button label="Submit" type="Submit" />
                        </div>
                    </div>
                </div>
            </form>

            <div>
                <h3 className="font-bold">Configurations</h3>
                <Dialog
                    visible={updatePlanVisibility}
                    style={{ width: "80vw" }}
                    header="Update Billing Configuration "
                    onHide={() => {
                        setUpdatePlanVisibility(false);
                    }}
                >
                    <UpdateBill rowData={currentRow} setRefresh={setRefresh} optionsForInventoryType={optionsForInventoryType} setUpdatePlanVisibility={setUpdatePlanVisibility} />
                </Dialog>
                <DataTable value={configData} showGridlines resizableColumns columnResizeMode="fit">
                    <Column
                        header="Billing Model"
                        field="billingmodel"
                        body={(rowData) => {
                            return <p>{rowData?.billingmodel}</p>;
                        }}
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                    />
                    <Column
                        header="Inventory Type"
                        field="inventoryType"
                        body={(rowData) => {
                            return <p>{rowData?.inventoryType}</p>;
                        }}
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                    />
                    <Column header="One Time Charge" field="oneTimeCharge" body={(rowData) => `$${rowData.oneTimeCharge}`} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />

                    <Column header="Monthly Charges" body={(rowData) => rowData?.monthlyCharge?.map((mc) => mc.name).join(", ")} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Bill Create Date" field="BillCreationDate" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Due Date" field="Due Date" body={(rowData) => `${rowData?.dueDate} Days from Bill Create Date`} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Days from First Bill Create Date" field="subsequentBillCreateDate" headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Late Fee   " field="Late Fee" body={(rowData) => `$${rowData.latefeeCharge}`} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header=" Apply Late Fee " field="Apply Late Fee" body={(rowData) => `After ${rowData.applyLateFee} Days from Due Date`} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />

                    <Column header="Feature" body={(rowData) => rowData?.additionalFeature?.map((sd) => `${sd.featureName} - $${sd.featureAmount}`).join(", ")} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column header="Discount" body={(rowData) => rowData?.selectdiscount?.map((sd) => `${sd.discountname} - $${sd.amount}`).join(", ")} headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }} />
                    <Column
                        header="Payment Method"
                        field="paymentMethod"
                        headerStyle={{
                            color: "white",
                            backgroundColor: "#81AEB9",
                            fontWeight: "normal",
                            fontSize: "large",
                        }}
                        body={(rowData) => rowData.paymentMethod.join(", ")}
                    />
                    <Column
                        header="Actions"
                        headerStyle={{ color: "white", backgroundColor: "#81AEB9", fontWeight: "normal", fontSize: "large" }}
                        body={(rowData) => {
                            return (
                                <>
                                    <Button
                                        label="Update"
                                        className=" pt-2 pb-2"
                                        onClick={() => {
                                            setCurrentRow(rowData);
                                            setUpdatePlanVisibility(true);
                                        }}
                                    />
                                    <Button
                                        label="Delete"
                                        className="ml-4 pt-2 pb-2"
                                        onClick={() => {
                                            Axios.delete(`${BASE_URL}/api/web/billing/deletebillconfig?billId=${rowData._id}`)
                                                .then(() => {
                                                    toast.success("Plan Deleted Successfully ");
                                                    setRefresh((prev) => !prev);
                                                })
                                                .catch((err) => {
                                                    toast.error("Plan Deletion Failed");
                                                });
                                        }}
                                    />
                                </>
                            );
                        }}
                    ></Column>
                </DataTable>
            </div>
        </Card>
    );
};

export default BillingConfiguration;
