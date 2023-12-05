import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import {Button} from "primereact/button"   
import { Dialog } from 'primereact/dialog';
import AddShipperDetailDialog from "../single_upload_type_Dialogs/add_shipper_detail_dialog";
import EsnSimModelAddDialog from "../single_upload_type_Dialogs/esn_sim_model_device_model_dialog";
export default function SingleUpload({permissions}) {
    const [includeOrders, setIncludeOrders] = useState("");    
    const [devicemodeldialog,setDeviceModelDialog]=useState(false)
    const [addshippermodeldialog,setAddShipperModelDialog]=useState(false)
    const [stateValue, setStateValue] = useState("");
    const [esnsimmodel, setEsnSimModel] = useState("");
    const [shipperId, setShipperId] = useState("");
    const [carrier, setCarrier] = useState("");
    const [areacode, setAreaCode] = useState("");
    const [deviceModel, setDeviceModel] = useState("");
    const [esnsimmodeldialog,setEsnSimModelDialog]=useState(false)
    const areacodeoption = [
        { label: "212 (New York - NY)", value: "212" },
        { label: "332 (New York - NY)", value: "332" },
        { label: "646 (New York - NY)", value: "646" },
        { label: "917 (New York - NY)", value: "917" },
        { label: "718 (New York - NY)", value: "718" },
        { label: "347 (New York - NY)", value: "347" },
        { label: "929 (New York - NY)", value: "929" },
        { label: "716 (New York - NY)", value: "716" },
        { label: "585 (New York - NY)", value: "585" },
        { label: "315 (New York - NY)", value: "315" },
        { label: "518 (New York - NY)", value: "518" },
        { label: "516 (New York - NY)", value: "516" },
        { label: "631 (New York - NY)", value: "631" },
    ];
    const carrieroption = [
        { label: "TMB", value: "tmb" },
        { label: "TELGOOATT", value: "telgoatt" },
        { label: "ATTDUMMY", value: "attdummy" },
    ];
    const shipperidoption = [
        { label: "Arya Phoenix", value: "aryaphoenix" },
        { label: "Dev Team", value: "devteam" },
        { label: "Lisa Braden", value: "lisabraden" },
        { label: "none", value: "none" },
    ];

    const devicemodeloption = [
        { label: "SIM SIM", value: "simsim" },
        { label: "Test Phone 4G", value: "testphone4g" },
        { label: "Svmsung TAB", value: "svmsungtab" },
    ];
    const esnsimmodeloption = [
        { label: "SIM SIM", value: "simsim" },
        { label: "Test Phone 4G", value: "testphone4g" },
        { label: "Svmsung TAB", value: "svmsungtab" },
    ];
    //NC KY PA AL
    const stateoption = [
        { label: "IL FA GA NY MD", value: "IL Value" },
        { label: "FA", value: "FA value" },
        { label: "GA", value: "GA Value" },
        { label: "NY", value: "NY Value" },
        { label: "MD", value: "MD Value" },
    ];
    const includeordersoption = [
        { label: "Home Delivery", value: "homedelivery" },
        { label: "Shipment", value: "shipment" },
        { label: "Retailer Location", value: "retailerlocation" },
        { label: "Event(Taken Away)", value: "event" },
    ];
    const formik = useFormik({
        initialValues: {
            enrollmentid: "",
            includeorders: "",
            state: "",
            esnsim: "",
            esnsimmodel: "",
            shipperid: "",
            carrier: "",
            uccid: "",
            areacode: "",
            device: "",
            devicemodel: "",
            phonetype: "",
        },
        validate: (values) => {
            // Implement your validation logic here
            const errors = {};
            if (!values.includeorders) {
                errors.includeorders = "Includeorder is required";
            }
            if (!values.state) {
                errors.state = "State is required";
            }
            if (!values.esnsimmodel) {
                errors.esnsimmodel = "Esnsimmodel is required";
            }
            if (!values.carrier) {
                errors.carrier = "Carrier is required";
            }
            if (!values.esnsim) {
                errors.esnsim = "esnsim is required";
            }

            if (!values.phonetype) {
                errors.phonetype = "phonetype is required";
            }

            return errors;
        },
    });
    function handleSubmit(){ 

    }
    return (
        <>
            <div className="mt-8">
                <label style={{ display: "block" }}>Enrollment ID</label>
                <InputText value={formik.enrollmentid} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Include Orders <span style={{color:"red"}}>*</span></label>

                <Dropdown
                    value={includeOrders}
                    options={includeordersoption}
                    onChange={(e) => {
                        setIncludeOrders(e.value);
                        formik.values.includeorders = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-4 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>State<span style={{color:"red"}}>*</span></label>

                <Dropdown
                    value={stateValue}
                    options={stateoption}
                    onChange={(e) => {
                        setStateValue(e.value);
                        formik.values.state = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-4 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>ESN/SIM <span style={{color:"red"}}>*</span></label>
                <InputText value={formik.esnsim} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>ESN/SIM Model<span style={{color:"red"}}>*</span>     
                <Button onClick={()=>{setEsnSimModelDialog(true)}} style={{border:"none",padding:"0px",backgroundColor:"transparent"}} disabled={!(permissions.isCreate)}>
                              
                               
                <i  className="pi pi pi-plus" style={{ fontSize: '14px',color:"#fff",padding:"5px",cursor:"pointer",paddingLeft:"10px",borderRadius:"5px",paddingRight:"10px",background:"#00c0ef" }}></i>  
                </Button>
                 </label>
               
                <Dropdown
                    value={esnsimmodel}
                    options={esnsimmodeloption}
                    onChange={(e) => {
                        setEsnSimModel(e.value);
                        formik.values.esnsimmodel = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-3 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Shipper ID<span style={{color:"red"}}>*</span>  
                <Button onClick={()=>{setAddShipperModelDialog(true)}} style={{border:"none",padding:"0px",backgroundColor:"transparent"}} disabled={!(permissions.isCreate)}>
                   
                <i className="pi pi pi-plus" style={{ fontSize: '14px',color:"#fff",padding:"5px",cursor:"pointer",paddingLeft:"10px",borderRadius:"5px",paddingRight:"10px",background:"#00c0ef" }}></i>
                   </Button>  
                   </label>
                <Dropdown
                    value={shipperId}
                    options={shipperidoption}
                    onChange={(e) => {
                        setShipperId(e.value);
                        formik.values.shipperid = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-3 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Carrier<span style={{color:"red"}}>*</span></label>

                <Dropdown
                    value={carrier}
                    options={carrieroption}
                    onChange={(e) => {
                        setCarrier(e.value);
                        formik.values.carrier = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-4 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>UCCID</label>
                <InputText value={formik.uccid} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Area Code</label>

                <Dropdown
                    value={areacode}
                    options={areacodeoption}
                    onChange={(e) => {
                        setAreaCode(e.value);
                        formik.values.areacode = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-4 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Device</label>
                <InputText value={formik.device} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}><span>Device Model</span>  
                <Button onClick={()=>{ setDeviceModelDialog(true)}} style={{border:"none",padding:"0px",backgroundColor:"transparent"}} disabled={!(permissions.isCreate)}>
                   
                
                 <i  className="pi pi pi-plus" style={{marginLeft:"5px", fontSize: '14px',color:"#fff",padding:"5px",cursor:"pointer",paddingLeft:"10px",borderRadius:"5px",paddingRight:"10px",background:"#00c0ef" }}></i> 
                   </Button>
                  </label>

                <Dropdown
                    value={deviceModel}
                    options={devicemodeloption}
                    onChange={(e) => {
                        setDeviceModel(e.value);
                        formik.values.devicemodel = e.value;
                    }}
                    optionLabel="label"
                    placeholder="--Select--"
                    className="mt-3 w-full md:w-14rem"
                />
            </div>
            <div className="mt-8">
                <label style={{ display: "block" }}>Phone Type<span style={{color:"red"}}>*</span></label>
                <InputText value={formik.phonetype} onChange={formik.handleChange} className="mt-4 w-full md:w-14rem" />
            </div>  
              <div style={{width:"100vw"}} className="mt-8"> 
                <Button style={{marginLeft:"50%",transform:"translate(-50%)"}} label="Submit" onClick={handleSubmit} disabled={!(permissions.isManage)}/>
              </div>         
              <Dialog visible={esnsimmodeldialog} onHide={()=>{
                setEsnSimModelDialog(false)
              }}>   
                      <EsnSimModelAddDialog/>
                </Dialog>  
                <Dialog visible={devicemodeldialog} onHide={()=>{
                setDeviceModelDialog(false)
              }}>   
                      <EsnSimModelAddDialog/>
                </Dialog>   
                <Dialog visible={addshippermodeldialog} onHide={()=>{
                setAddShipperModelDialog(false)
              }}>   
                    <AddShipperDetailDialog/>
                </Dialog>
        </>    
    );
}
