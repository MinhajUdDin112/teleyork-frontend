import React,{useState,useEffect} from "react";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";  
import "./add_units_components/sim_singleupload/css/style.css"
import { Button } from "primereact/button";
import { useFormik } from "formik"; 
import { useLocation } from "react-router-dom";
import Header from "./add_unit-flow_page_header.js";
import CellPhoneBulkUpload from "./add_units_components/cell_phone_bulkupload/cell_phone_bulkupload.js";
import CellPhoneSingleUpload from "./add_units_components/cell_phone_singleupload/cell_phone_singleupload.js";
import SIMSingleUploadAddProvision from "./add_units_components/sim_singleupload/add_stock_provision.js";
import { provision, unit, type,simprovision } from "./assets.js";
import TabletBulkUploadAddAndAssignNonActivateProvision from "./add_units_components/tablet_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddActivateProvision from "./add_units_components/sim_bulk_upload/addactivate_provision.js";
import SIMBulkUploadAddPreActivatedProvision from "./add_units_components/sim_bulk_upload/add_preactivated_provision.js";
import SIMBulkUploadAddAndAssignNonActivateProvision from "./add_units_components/sim_bulk_upload/add_and_assign_non_activate_provision.js";
import SIMBulkUploadAddProvision from "./add_units_components/sim_bulk_upload/add_stock_provision.js";
import TabletBulkUploadAddProvision from "./add_units_components/tablet_bulk_upload/add_stock_provision.js";
import TabletBulkUploadAddActivateProvision from "./add_units_components/tablet_bulk_upload/addactivate_provision.js";
import TabletBulkUploadReprovision from "./add_units_components/tablet_bulk_upload/reprovision.js";
import TabletBulkUploadAddPreActivatedProvision from "./add_units_components/tablet_bulk_upload/add_preactivated_provision.js";
import {SIMSingleUploadAddAndAssignNonActivateProvision} from "./add_units_components/sim_singleupload/add_and_assign_non_activate_provision.js";
import SIMSingleUploadAddActivateProvision from "./add_units_components/sim_singleupload/addactivate_provision.js";
import SIMSingleUploadAddPreActivatedProvision from "./add_units_components/sim_singleupload/add_preactivated_provision.js";
import TabletSingleUploadAddProvision from "./add_units_components/tablet_single_upload/add_stock_provision.js";
import TabletSingleUploadAddActivateProvision from "./add_units_components/tablet_single_upload/addactivate_provision.js";
import TabletSingleUploadAddAndAssignNonActivateProvision from "./add_units_components/tablet_single_upload/add_and_assign_non_activate_provision.js";
import TabletSingleUploadAddPreActivatedProvision from "./add_units_components/tablet_single_upload/add_preactivated_provision.js";
import TabletSingleUploadReprovision from "./add_units_components/tablet_single_upload/reprovision.js";
const AddUnits = ({ setActiveComponent }) => {          
    const location = useLocation();
    const currentPath = location?.pathname  
    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)
    
        const isCreate = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "create"
            )
          )
        );
        setIsCreate(isCreate)
    
        const isManage = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "manage"
            )
          )
        );
        setIsManage(isManage)
    
      }; 
      const [isManage,setIsManage]=useState(null)  
      const [isCreate,setIsCreate]=useState(null) 
    
     useEffect(()=>{ 
       actionBasedChecks()
     },[])    
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
                            Inventory Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.unit} name="unit" options={unit} onChange={formik.handleChange} placeholder="Select an option" className="field-width" />
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Upload Type <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.upload} name="upload" options={type} onChange={formik.handleChange} placeholder="Select an option" className="field-width" />
                    </div>
                    {formik.values.unit !== "Cell Phone" ? (
                        <div className="mr-3 mb-3 mt-3">
                            <p className="m-0">
                                Provision Type <span style={{ color: "red" }}>*</span>
                            </p>
                            <Dropdown value={formik.values.provision} name="provision" options={formik.values.unit === "SIM" ?simprovision:provision} onChange={formik.handleChange} placeholder="Select an option" className="field-width" />
                        </div>
                    ) : undefined}
                </div>
            </div>
            {formik.values.unit === "Cell Phone" ? (
                formik.values.upload === "Single" ? (
                    <CellPhoneSingleUpload permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Bulk" ? (
                    <CellPhoneBulkUpload permissions={{isCreate:isCreate}} />
                ) : undefined
            ) : formik.values.unit === "SIM" ? (
                formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <SIMSingleUploadAddProvision permissions={{isCreate:isCreate}} />
                )  : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMSingleUploadAddAndAssignNonActivateProvision permissions={{isCreate:isCreate}} />
                ): formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <SIMSingleUploadAddPreActivatedProvision permissions={{isCreate:isCreate}}/>
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <SIMBulkUploadAddProvision  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <SIMSingleUploadAddActivateProvision  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <SIMBulkUploadAddActivateProvision  permissions={{isCreate:isCreate}}/>
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMBulkUploadAddAndAssignNonActivateProvision permissions={{isCreate:isCreate}} />
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <SIMBulkUploadAddPreActivatedProvision permissions={{isCreate:isCreate}}/>
                ) : undefined
            ) : formik.values.unit === "Tablet" ? (
                formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <TabletBulkUploadAddProvision permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <TabletBulkUploadAddActivateProvision permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletBulkUploadAddAndAssignNonActivateProvision  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "reprovision" ? (
                    <TabletBulkUploadReprovision  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <TabletBulkUploadAddPreActivatedProvision  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <TabletSingleUploadAddProvision permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <TabletSingleUploadAddActivateProvision permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletSingleUploadAddAndAssignNonActivateProvision permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "reprovision" ? (
                    <TabletSingleUploadReprovision permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <TabletSingleUploadAddPreActivatedProvision  permissions={{isCreate:isCreate}}/>
                ) :undefined
            ) : undefined}
        </>
    );
};

export default AddUnits;
