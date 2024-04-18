import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./add_units_components/sim_singleupload/css/style.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./add_unit-flow_page_header.js";
import CellPhoneBulkUpload from "./add_units_components/cell_phone_bulkupload/cell_phone_bulkupload.js";
import CellPhoneSingleUpload from "./add_units_components/cell_phone_singleupload/cell_phone_singleupload.js";
import SIMSingleUploadAddProvision from "./add_units_components/sim_singleupload/add_stock_provision.js";
import { provision, type, simprovision } from "./assets.js";
import TabletBulkUploadAddAndAssignNonActivateProvision from "./add_units_components/tablet_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddActivateProvision from "./add_units_components/sim_bulk_upload/addactivate_provision.js";
import SIMBulkUploadAddPreActivatedProvision from "./add_units_components/sim_bulk_upload/add_preactivated_provision.js";
import SIMBulkUploadAddAndAssignNonActivateProvision from "./add_units_components/sim_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddProvision from "./add_units_components/sim_bulk_upload/add_stock_provision.js";
import TabletBulkUploadAddProvision from "./add_units_components/tablet_bulk_upload/add_stock_provision.js";
import TabletBulkUploadAddActivateProvision from "./add_units_components/tablet_bulk_upload/addactivate_provision.js";
import TabletBulkUploadReprovision from "./add_units_components/tablet_bulk_upload/reprovision.js";
import TabletBulkUploadAddPreActivatedProvision from "./add_units_components/tablet_bulk_upload/add_preactivated_provision.js";
import { SIMSingleUploadAddAndAssignNonActivateProvision } from "./add_units_components/sim_singleupload/add_and_assign_non_activate_provision.js";
import SIMSingleUploadAddActivateProvision from "./add_units_components/sim_singleupload/addactivate_provision.js";
import SIMSingleUploadAddPreActivatedProvision from "./add_units_components/sim_singleupload/add_preactivated_provision.js";
import TabletSingleUploadAddProvision from "./add_units_components/tablet_single_upload/add_stock_provision.js";
import TabletSingleUploadAddActivateProvision from "./add_units_components/tablet_single_upload/addactivate_provision.js";
import TabletSingleUploadAddAndAssignNonActivateProvision from "./add_units_components/tablet_single_upload/add_and_assign_non_activate_provision.js";
import TabletSingleUploadAddPreActivatedProvision from "./add_units_components/tablet_single_upload/add_preactivated_provision.js";
import TabletSingleUploadReprovision from "./add_units_components/tablet_single_upload/reprovision.js";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddUnits = ({ setActiveComponent }) => {
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const validationSchema = Yup.object().shape({
        unitType: Yup.string().required("please select"),
        uploadType: Yup.string().required("please select type "),
        provisionType: Yup.string(),
    });
    const formik = useFormik({
        initialValues: {
            unit: "",
            upload: "",
            provision: "",
            billingModel: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {},
    });
    const location = useLocation();
    const currentPath = location?.pathname;
    const [unitOptions, setUnitOptions] = useState([]);
    const [billingModelList, setBillingModelList] = useState([]);
    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);

        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };
    const [isManage, setIsManage] = useState(null);
    const [currentBillingId, setCurrentBillingId] = useState("");
    const [isCreate, setIsCreate] = useState(null);
    useEffect(() => {
        actionBasedChecks();
        Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
            .then((res) => {
                setBillingModelList(res?.data?.data);
            })
            .catch((err) => {});
    }, []);
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

    return (
        <>
            <Button
                label="Back"
                style={{ position: "absolute", marginLeft: "25px", fontSize: "16px", marginTop: "25px" }}
                onClick={() => {
                    setActiveComponent("");
                }}
            />
            <div style={{ marginTop: "90px" }}>
                <Header unit={formik.values.unit} />
            </div>
            <div>
                <div className="flex flex-wrap mb-3  justify-content-around">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">Billing Model</p>
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
                            className="field-width mt-2"
                        />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0 ">Inventory Type</p>
                        <Dropdown optionLabel="inventoryType" optionValue="inventoryType" value={formik.values.unit} name="unit" options={unitOptions} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Upload Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.upload} name="upload" options={type} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                    </div>
                    {formik.values.unit !== "Cell Phone" ? (
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provision} name="provision" options={formik.values.unit === "SIM" ? simprovision : provision} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                        </div>
                    ) : undefined}
                </div>
            </div>
            {formik.values.unit.includes("CELL") || formik.values.unit.includes("PHONE") ? (
                formik.values.upload === "Single" ? (
                    <CellPhoneSingleUpload unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" ? (
                    <CellPhoneBulkUpload unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : undefined
            ) : formik.values.unit.includes("SIM") ? (
                formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <SIMSingleUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMSingleUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <SIMSingleUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <SIMBulkUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <SIMSingleUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <SIMBulkUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMBulkUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <SIMBulkUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : undefined
            ) : formik.values.unit.includes("TABLET") || formik.values.unit.includes("WIRELESS") ? (
                formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <TabletBulkUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <TabletBulkUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletBulkUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "reprovision" ? (
                    <TabletBulkUploadReprovision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <TabletBulkUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <TabletSingleUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <TabletSingleUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletSingleUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "reprovision" ? (
                    <TabletSingleUploadReprovision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <TabletSingleUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{ isCreate: isCreate }} />
                ) : undefined
            ) : undefined}
        </>
    );
};

export default AddUnits;
