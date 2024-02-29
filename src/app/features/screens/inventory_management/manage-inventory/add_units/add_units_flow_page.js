import React,{useState,useEffect} from "react";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup"; 
import { useFormik } from "formik";    
import "./add_units_components/sim_singleupload/css/style.css"
import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./add_unit-flow_page_header.js";
import CellPhoneBulkUpload from "./add_units_components/cell_phone_bulkupload/cell_phone_bulkupload.js";
import CellPhoneSingleUpload from "./add_units_components/cell_phone_singleupload/cell_phone_singleupload.js";
import SIMSingleUploadAddProvision from "./add_units_components/sim_singleupload/add_stock_provision.js";
import { provision,  type,simprovision } from "./assets.js";
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
import ListAllInventories from "../inventory_configurations/inventory_configurations.js";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
const AddUnits = ({ setActiveComponent }) => {          
    const location = useLocation();
    const currentPath = location?.pathname   
    const [unitOptions,setUnitOptions]=useState([])
    const [billingModelList,setBillingModelList]=useState([]) 
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
     const [configInvenoty,setConfigInventory]=useState(false) 
       const [onInventoryConfig,setOnInventoryConfig]=useState(false)
    useEffect(()=>{ 
       actionBasedChecks()
       Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
       .then((res) => {
           setBillingModelList(res?.data?.data);
       })
       .catch((err) => {});

     },[])      
     useEffect(()=>{ 
        Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${parseLoginRes?.company}`)
        .then((res) => {
            setUnitOptions(res?.data?.data)
        })
        .catch((err) => {});
     },[onInventoryConfig])
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
            billingModel:""
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
           
        },
    });
    return (
        <>  
           <Dialog
                header="Inventory Configurations"
                visible={configInvenoty} 
                className="pt-0"
                style={{ width: "80vw" }}
                onHide={() => {
                    setConfigInventory(false); 
                    setOnInventoryConfig(prev=>!prev)
                }}
            >
                <ListAllInventories />
            </Dialog> 
           
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
                        <p className="m-0 ">
                            Inventory Type  
                             
                                    <i disabled={!isCreate}    onClick={() => {
                                        //setAddAgentDialogVisbility((prev) => !prev); 
                                        setConfigInventory(prev=>!prev)
                                    }} 
                                     
                                        className="pi pi pi-plus"
                                        style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "4px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                    ></i>
                                
                        </p>
                        <Dropdown optionLabel="inventoryType" optionValue="_id" value={formik.values.unit} name="unit" options={unitOptions} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                    </div>  
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Billing Model        

                        </p>
                        <Dropdown value={formik.values.billingModel} name="billingModel" optionLabel="billingModel" optionValue="_id" options={billingModelList} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
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
                            <Dropdown value={formik.values.provision} name="provision" options={formik.values.unit === "SIM" ?simprovision:provision} onChange={formik.handleChange} placeholder="Select an option" className="field-width mt-2" />
                        </div>
                    ) : undefined}
                </div>
            </div>
            {formik.values.unit === "Cell Phone" ? (
                formik.values.upload === "Single" ? (
                    <CellPhoneSingleUpload unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Bulk" ? (
                    <CellPhoneBulkUpload unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ) : undefined
            ) : formik.values.unit === "SIM" ? (
                formik.values.upload === "Single" && formik.values.provision === "add_stock" ? (
                    <SIMSingleUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                )  : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMSingleUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ): formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <SIMSingleUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_stock" ? (
                    <SIMBulkUploadAddProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single"  && formik.values.provision === "add_and_activated" ? (
                    <SIMSingleUploadAddActivateProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <SIMBulkUploadAddActivateProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <SIMBulkUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ): formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <SIMBulkUploadAddPreActivatedProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : undefined
            ) : formik.values.unit === "Tablet" || formik.values.unit === "Wireless Device" ? (
                formik.values.upload === "Bulk"  && formik.values.provision === "add_stock" ? (
                    <TabletBulkUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel}  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_activated" ? (
                    <TabletBulkUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletBulkUploadAddAndAssignNonActivateProvision unit={formik.values.unit} model={formik.values.billingModel}  permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk"  && formik.values.provision === "reprovision" ? (
                    <TabletBulkUploadReprovision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Bulk" && formik.values.provision === "add_pre_activated" ? (
                    <TabletBulkUploadAddPreActivatedProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single"  && formik.values.provision === "add_stock" ? (
                    <TabletSingleUploadAddProvision unit={formik.values.unit} model={formik.values.billingModel}  permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_activated" ? (
                    <TabletSingleUploadAddActivateProvision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "add_and_assign_non_activated" ? (
                    <TabletSingleUploadAddAndAssignNonActivateProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}} />
                ) : formik.values.upload === "Single" && formik.values.provision === "reprovision" ? (
                    <TabletSingleUploadReprovision unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) : formik.values.upload === "Single" && formik.values.provision === "add_pre_activated" ? (
                    <TabletSingleUploadAddPreActivatedProvision  unit={formik.values.unit} model={formik.values.billingModel} permissions={{isCreate:isCreate}}/>
                ) :undefined
            ) : undefined} 
           
        </>
    );
};

export default AddUnits;
