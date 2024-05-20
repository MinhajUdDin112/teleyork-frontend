import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import Axios from "axios";
import { Dropdown } from "primereact/dropdown";
import CellPhoneCompletedStockReport from "./complete_stock/cell_phone_report";
import TabletCompleteStockReport from "./complete_stock/tablet_report";
import SIMCompleteStockReport from "./complete_stock/sim_report";
//import TabletProvisionedStockReport from "./provisioned_stock/tablet_report";
//import SIMProvisionedStockReport from "./provisioned_stock/sim_report";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function InventoryDashboard({ setActiveComponent }) {
    const validationSchema = Yup.object().shape({});
    const formik = useFormik({
        initialValues: {
            unit: "",
            billingModel: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {},
    });
    const [unitOptions, setUnitOptions] = useState([]);
    const [billingModelList, setBillingModelList] = useState([]);
    const [currentBillingId, setCurrentBillingId] = useState("");
    useEffect(() => {
        async function fetchData() {
            if (formik.values.billingModel !== "") {
                try {
                    const res = await Axios.get(`${BASE_URL}/api/billingModel/getInventoryByBillModel?BillModelId=${currentBillingId}`);
                    let obj = [];
                    let data = res?.data?.data;
                    data.forEach((item) => {
                        let obj2 = {};
                        obj2.inventoryType = item;
                        obj.push(obj2);
                    });
                    setUnitOptions(obj);
                } catch (error) {
                    //toast.error(error?.response?.data?.msg);
                }
            }
        }
        fetchData();
    }, [currentBillingId]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
            .then((res) => {
                setBillingModelList(res?.data?.data);
            })
            .catch((err) => {});
    }, []);
    return (
        <>
            <div className="flex flex-wrap justify-content-center">
                <h1 className=" heading" style={{ fontWeight: "600" }}>
                    INVENTORY DASHBOARD
                </h1>
            </div>
            <hr style={{ border: "1px solid #C68301", opacity: "15%" }} />

            {/*  <h5 className="mt-4 w-full card">Complete Stock Report </h5>   */}
            <div className="flex flex-wrap mb-3  justify-content-left">
                <div className="calendar_field">
                    <p className="field_label ml-2 mt-2">
                        Billing Model <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown
                        value={formik.values.billingModel}
                        name="billingModel"
                        optionLabel="billingModel"
                        optionValue="billingModel"
                        options={billingModelList}
                        onChange={(e) => {
                            formik.setFieldValue("billingModel", e.value);
                            let id;
                            billingModelList.map((item) => {
                                if (item.billingModel === e.value) {
                                    id = item._id;
                                }
                            });
                            setCurrentBillingId(id);
                        }}
                        placeholder="Select an option"
                        className="w-full mt-2"
                    />
                </div>
                <div className="calendar_field">
                    <p className="field_label ml-4 mt-2 ">
                        Inventory Type <span style={{ color: "red" }}>*</span>
                    </p>
                    <Dropdown optionLabel="inventoryType" optionValue="inventoryType" value={formik.values.unit} name="unit" options={unitOptions} onChange={formik.handleChange} placeholder="Select an option" className="w-full mt-2 ml-4" />
                </div>
            </div>
            <div className="flex justify-content-around flex-wrap">
                <SIMCompleteStockReport unitType={formik.values.unit} billingModel={formik.values.billingModel} />
            </div>
            {/* <h5 className="mt-4 w-full card">Provisioned Stock Report </h5>   
              <div className="flex justify-content-around flex-wrap card" >    
               
                  <div className="w-20rem mt-2 card"> 
                   <TabletProvisionedStockReport/>
                  </div> 
                  <div className="w-20rem mt-2 card"> 
                    <SIMProvisionedStockReport/>
                  </div> 
              </div>      */}

            <div className="flex flex-wrap justify-content-end">
                <Button
                    className="btn"
                    label="Back"
                    style={{ marginLeft: "25px", fontSize: "16px", marginTop: "0px" }}
                    onClick={() => {
                        setActiveComponent("");
                    }}
                />
            </div>
        </>
    );
}
