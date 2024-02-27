import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React,{useEffect} from "react";
import "./css/plan_configuration.css";
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";  
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name Is Required"),
    description: Yup.string().required("Description Is Required"),
    dataAllowance: Yup.number().integer("Please enter a valid integer").required("Data Allowance Is Required "),
    voiceAllowance: Yup.number().integer("Please enter a valid integer").required("Voice Allowance Is Required"),
    textAllowance: Yup.number().integer("Please enter a valid integer").required("Text Allowance Is Required"),
    duration: Yup.number().integer("Please enter a valid integer").required("Duration Is Required"),
    price: Yup.number().required("Price Is Required"),
    type: Yup.string().required("Plan Type Is Required"),
    dataAllowanceUnit: Yup.string().required("Data Allowance Unit Is Required"),

    voiceAllowanceUnit: Yup.string().required("Voice Allowance Unit Is Required"),

    textAllowanceUnit: Yup.string().required("Text Allowance Unit Is Required"),

    durationUnit: Yup.string().required("Duration Unit Is Required"),

    inventoryType: Yup.string().required("Inventory Type Is Required"),
});

const dataAllowanceUnitOptions = [
    {
        label: "GB",
        value: "GB",
    },
    {
        label: "MB",
        value: "MB",
    },
];
const voiceAllowanceUnitOptions = [
    {
        label: "Minutes",
        value: "minutes",
    },
    {
        label: "Hours",
        value: "hours",
    },
];
const textAllowanceUnitOptions = [
    {
        label: "SMS",
        value: "sms",
    },
];
const durationUnitOptions = [
    {
        label: "Days",
        value: "days",
    },
];


export default function EditPlan({ data, setEditPlanVisibility,setRefresh }) {  
    const toast = useRef(null);      
  
    const [inventoryTypeOptions,setInventoryTypeOptions]=useState([]) 
    const [billingModelOptions,setBillingModelOptions]=useState([])   
    const getInventoryList=async () => { 
        try{ 
           const res=await Axios.get(`${BASE_URL}/api/inventoryType/all?serviceProvider=${parseLoginRes?.company}`)
              setInventoryTypeOptions(res?.data?.data || [])
             } 
        catch(error){ 
             toast.error(error?.response?.data?.msg);
        }
    }        
    const getBillingModelList=async () => { 
        try{ 
           const res=await Axios.get(`${BASE_URL}/api/billingModel/all?serviceProvider=${parseLoginRes?.company}`)
           setBillingModelOptions(res?.data?.data || [])
             } 
        catch(error){ 
          
            toast.error(error?.response?.data?.msg);
        }
    }    
    useEffect(()=>{ 
       getInventoryList()   
       getBillingModelList()  
    },[])
    const formik = useFormik({
        initialValues: {
            name: data.name,
            updatedBy: parseLoginRes?._id,
            serviceProvider: parseLoginRes?.company,
            description: data.description,
            type: data.type,
            dataAllowance: data.dataAllowance,
            voiceAllowance: data.voiceAllowance,
            textAllowance: data.textAllowance,
            duration: data.duration,
            price: data.price,
            planId: data.planId,
            dataAllowanceUnit: data.dataAllowanceUnit,
            voiceAllowanceUnit: data.voiceAllowanceUnit,
            textAllowanceUnit: "sms",
            durationUnit: data.durationUnit,
            additionalFeatures: ["calls", "minutes"],
            termsAndConditions: "no termsAndConditions",
            restrictions: ["no restriction"],
            inventoryType: data.inventoryType,
        },
        validationSchema,
        onSubmit: (values) => {
            Axios.patch(`${BASE_URL}/api/web/plan?_id=${data._id}`, formik.values)
                .then(() => {
                    toast.current.show({ severity: "success", summary: "Plan Updation", detail: "Plan Updated Successfully" });
                    setTimeout(() => {
                        setEditPlanVisibility(false); 
                        setRefresh(prev=>!prev)
                    }, 1000);
                })
                .catch((err) => {
                    toast.current.show({ severity: "error", summary: "Plan Updation", detail: "Plan Updation Failed" });
                });
        },
    });
    return (
        <Card className="pt-0">
            <div>
                <form onSubmit={formik.handleSubmit} className="flex flex-wrap  flex-row justify-content-around">
                    <div className="mt-2">
                        <label className="block">
                           Plan Name <span className="star">*</span>
                        </label>
                        <InputText className="field-width mt-2" name="name" value={formik.values.name} onChange={formik.handleChange} />
                        {formik.touched.name && formik.errors.name ? <p className="mt-2 ml-1 star">{formik.errors.name}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Descriptions <span className="star">*</span>
                        </label>
                        <InputText className="field-width mt-2" name="description" value={formik.values.description} onChange={formik.handleChange} />
                        {formik.touched.description && formik.errors.description ? <p className="mt-2 ml-1 star">{formik.errors.description}</p> : null}
                    </div>

                    <div className="mt-2">
                        <label className="block">
                           Plan Data Allowance <span className="star">*</span>
                        </label>
                        <InputText keyfilter="int" className="field-width mt-2" name="dataAllowance" value={formik.values.dataAllowance} onChange={formik.handleChange} />
                        {formik.touched.dataAllowance && formik.errors.dataAllowance ? <p className="mt-2 ml-1 star">{formik.errors.dataAllowance}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Data Allowance Unit <span className="star">*</span>
                        </label>
                        <Dropdown options={dataAllowanceUnitOptions} className="field-width mt-2" name="dataAllowanceUnit" value={formik.values.dataAllowanceUnit} onChange={formik.handleChange} />
                        {formik.touched.dataAllowanceUnit && formik.errors.dataAllowanceUnit ? <p className="mt-2 ml-1 star">{formik.errors.dataAllowanceUnit}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Voice Allowance <span className="star">*</span>
                        </label>
                        <InputText keyfilter="int" className="field-width mt-2" name="voiceAllowance" value={formik.values.voiceAllowance} onChange={formik.handleChange} />
                        {formik.touched.voiceAllowance && formik.errors.voiceAllowance ? <p className="mt-2 ml-1 star">{formik.errors.voiceAllowance}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                            Plan Voice Allowance Unit <span className="star">*</span>
                        </label>
                        <Dropdown options={voiceAllowanceUnitOptions} className="field-width mt-2" name="voiceAllowanceUnit" value={formik.values.voiceAllowanceUnit} onChange={formik.handleChange} />
                        {formik.touched.voiceAllowanceUnit && formik.errors.voiceAllowanceUnit ? <p className="mt-2 ml-1 star">{formik.errors.voiceAllowanceUnit}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Text Allowance <span className="star">*</span>
                        </label>
                        <InputText keyfilter="int" className="field-width mt-2" name="textAllowance" value={formik.values.textAllowance} onChange={formik.handleChange} />
                        {formik.touched.textAllowance && formik.errors.textAllowance ? <p className="mt-2 ml-1 star">{formik.errors.textAllowance}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Text Allowance Unit <span className="star">*</span>
                        </label>
                        <Dropdown options={textAllowanceUnitOptions} className="field-width mt-2" name="textAllowanceUnit" value={formik.values.textAllowanceUnit} onChange={formik.handleChange} />
                        {formik.touched.textAllowanceUnit && formik.errors.textAllowanceUnit ? <p className="mt-2 ml-1 star">{formik.errors.textAllowanceUnit}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                            Plan Inventory Type <span className="star">*</span>
                        </label>
                        <Dropdown placeholder="Plan Inventory Type" options={inventoryTypeOptions} optionLabel="inventoryType" optionValue="inventoryType" className="field-width mt-2" name="inventoryType" value={formik.values.inventoryType} onChange={formik.handleChange} />
                        {formik.touched.inventoryType && formik.errors.inventoryType ? <p className="mt-2 ml-1 star">{formik.errors.inventoryType}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                          Plan  Type <span className="star">*</span>
                        </label>
                        <Dropdown placeholder="Plan  Type" options={billingModelOptions} className="field-width mt-2" name="type" optionLabel="billingModel" optionValue="billingModel" value={formik.values.type} onChange={formik.handleChange} />
                        {formik.touched.type && formik.errors.type ? <p className="mt-2 ml-1 star">{formik.errors.type}</p> : null}
                    </div>

                    <div className="mt-2">
                        <label className="block">
                           Plan Duration <span className="star">*</span>
                        </label>
                        <InputText keyfilter="int" className="field-width mt-2" name="duration" value={formik.values.duration} onChange={formik.handleChange} />
                        {formik.touched.duration && formik.errors.duration ? <p className="mt-2 ml-1 star">{formik.errors.duration}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                          Plan Duration Unit <span className="star">*</span>
                        </label>
                        <Dropdown options={durationUnitOptions} className="field-width mt-2" name="durationUnit" value={formik.values.durationUnit} onChange={formik.handleChange} />
                        {formik.touched.durationUnit && formik.errors.durationUnit ? <p className="mt-2 ml-1 star">{formik.errors.durationUnit}</p> : null}
                    </div>
                    <div className="mt-2">
                        <label className="block">
                           Plan Price <span className="star">*</span>
                        </label>
                        <InputText keyfilter="num" className="field-width mt-2" name="price" value={formik.values.price} onChange={formik.handleChange} />
                        {formik.touched.price && formik.errors.price ? <p className="mt-2 ml-1 star">{formik.errors.price}</p> : null}
                    </div>
                    <div className="mt-4 pt-2 ">
                        <Button className="field-width" label="Update Plan" type="Submit" />
                    </div>
                </form>
            </div>
            <Toast ref={toast} />
        </Card>
    );
}
