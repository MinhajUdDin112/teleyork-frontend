import React from "react";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import Header from "./add_unit-flow_page_header.js";
import GSMBulkUpload from "./add_units_components/gsm_bulkupload/gsm_bulkupload.js";
import GSMSingleUpload from "./add_units_components/gsm_singleupload/gsm_singleupload.js";
import SIMSingleUploadAddProvision from "./add_units_components/sim_singleupload/add_stock_provision.js";
import { provision, unit, type,simprovision } from "./assets.js";
import CDMABulkUploadAddAndAssignNonActivateProvision from "./add_units_components/cdma_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddActivateProvision from "./add_units_components/sim_bulk_upload/addactivate_provision.js";
import SIMBulkUploadAddPreActivatedProvision from "./add_units_components/sim_bulk_upload/add_preactivated_provision.js";
import SIMBulkUploadAddAndAssignNonActivateProvision from "./add_units_components/sim_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddProvision from "./add_units_components/sim_bulk_upload/add_stock_provision.js";
import CDMABulkUploadAddProvision from "./add_units_components/cdma_bulk_upload/add_stock_provision.js";
import CDMABulkUploadAddActivateProvision from "./add_units_components/cdma_bulk_upload/addactivate_provision.js";
import CDMABulkUploadReprovision from "./add_units_components/cdma_bulk_upload/reprovision.js";
import CDMABulkUploadAddPreActivatedProvision from "./add_units_components/cdma_bulk_upload/add_preactivated_provision.js";
import {SIMSingleUploadAddAndAssignNonActivateProvision} from "./add_units_components/sim_singleupload/add_and_assign_non_activate_provision.js";
import SIMSingleUploadAddActivateProvision from "./add_units_components/sim_singleupload/addactivate_provision.js";
import SIMSingleUploadAddPreActivatedProvision from "./add_units_components/sim_singleupload/add_preactivated_provision.js";
import CDMASingleUploadAddProvision from "./add_units_components/cdma_single_upload/add_stock_provision.js";
import CDMASingleUploadAddActivateProvision from "./add_units_components/cdma_single_upload/addactivate_provision.js";
import CDMASingleUploadAddAndAssignNonActivateProvision from "./add_units_components/cdma_single_upload/add_and_assign_non_activate_provision.js";
import CDMASingleUploadAddPreActivatedProvision from "./add_units_components/cdma_single_upload/add_preactivated_provision.js";
import CDMASingleUploadReprovision from "./add_units_components/cdma_single_upload/reprovision.js";
const AddUnits = ({ setActiveComponent }) => {           
    console.log("calling")
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
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
           
        },
    });
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
                        <p className="m-0">
                            Unit Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.unit} name="unit" options={unit} onChange={formik.handleChange} placeholder="Select an option" className="w-21rem" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Upload Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.upload} name="upload" options={type} onChange={formik.handleChange} placeholder="Select an option" className="w-21rem" />
                    </div>
                    {formik.values.unit !== "GSM" ? (
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provision} name="provision" options={formik.values.unit === "SIM" ?simprovision:provision} onChange={formik.handleChange} placeholder="Select an option" className="w-20rem" />
                        </div>
                    ) : undefined}
                </div>
            </div>
            {formik.values.unit === "GSM" ? (
                formik.values.upload === "Single" ? (
                    <GSMSingleUpload />
                ) : formik.values.upload === "Bulk" ? (
                    <GSMBulkUpload />
                ) : undefined
            ) : formik.values.unit === "SIM" ? (
                formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <SIMSingleUploadAddProvision />
                )  : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMSingleUploadAddAndAssignNonActivateProvision />
                ): formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <SIMSingleUploadAddPreActivatedProvision/>
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <SIMBulkUploadAddProvision />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <SIMSingleUploadAddActivateProvision />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <SIMBulkUploadAddActivateProvision />
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMBulkUploadAddAndAssignNonActivateProvision />
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <SIMBulkUploadAddPreActivatedProvision />
                ) : undefined
            ) : formik.values.unit === "CDMA" ? (
                formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <CDMABulkUploadAddProvision />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <CDMABulkUploadAddActivateProvision />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <CDMABulkUploadAddAndAssignNonActivateProvision />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "reprovision" ? (
                    <CDMABulkUploadReprovision />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <CDMABulkUploadAddPreActivatedProvision />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <CDMASingleUploadAddProvision />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <CDMASingleUploadAddActivateProvision />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <CDMASingleUploadAddAndAssignNonActivateProvision />
                ) : formik.values.upload === "Single" && formik.values.provision === "reprovision" ? (
                    <CDMASingleUploadReprovision />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <CDMASingleUploadAddPreActivatedProvision />
                ) :undefined
            ) : undefined}
        </>
    );
};

export default AddUnits;
