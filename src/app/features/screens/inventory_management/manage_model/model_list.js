import { Card } from "primereact/card";
import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import AddModel from "./sub_modules/add_model/add_model";
import { Dropdown } from "primereact/dropdown";
import { csrequirmentphonetype, status } from "./assets";    
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";   
import { useLocation } from "react-router-dom";
export default function ManageModelFlowPage() {      
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
    const formik = useFormik({
        initialValues: {
            model: "",
            modelid: "",
            csrequirmentphonetype: "",
            status: "",
        },
    });
    const [navigatetoaddmodel, setNavigateToAddModel] = useState(false);
    function downloadList() {}
    return (<>  
     {   navigatetoaddmodel ? <AddModel agent={""} setNavigateToAddModel={setNavigateToAddModel}/>:
        <Card>    

            <div className="card flex flex-wrap justify-content-between">
                <div>
                    <h5> Model List</h5>
                </div>
                <div>  
                      <Button style={{border:"none",backgroundColor:"transparent",padding:"0px"}} disabled={!isManage}>  
                    <i
                        className="pi pi pi-download"
                        onClick={() => {
                            downloadList();
                        }}
                        style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                    ></i>  
                    </Button>  
                    <Button style={{border:"none",backgroundColor:"transparent",padding:"0px"}} disabled={!isManage}>  
                    
                    <i
                        className="pi pi pi-plus"
                        onClick={() => {
                            setNavigateToAddModel((prev) => !prev);
                        }}
                        style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                    ></i> 
                    </Button>
                </div>
            </div>
            <Card>
                <div className="flex justify-content-around flex-wrap">
                    <div className="w-20rem mt-4">
                        <label style={{ display: "block" }}>Make/Model</label>  
                        <Button style={{border:"none",backgroundColor:"transparent",padding:"0px"}} disabled={!isManage}>  
                   
                        <i
                            className="pi pi pi-mobile"
                            onClick={() => {
                                setNavigateToAddModel((prev) => !prev);
                            }}
                            style={{ display: "inline-block", marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "12px", borderRight: "unset", cursor: "pointer", paddingLeft: "10px", borderRadius: "0px", paddingRight: "10px", color: "grey", border: "solid rgb(206, 212, 218) 1px" }}
                        ></i>  
                        </Button>
                        <InputText    
                         
                        
                          
                            className=" mt-2 "
                            style={{ display: "inline-block", borderRadius: "0px" }}
                            onChange={(e) => {
                                formik.setFieldValue("model", e.value);
                            }}
                            placeholder="Example: Search By Make/model"
                            value={formik.values.model}
                        />
                    </div>
                    <div className="w-20rem mt-4">
                        <label style={{ display: "block" }}>Model ID</label>
                        <i
                            className="pi pi pi-mobile"
                            onClick={() => {
                                setNavigateToAddModel((prev) => !prev);
                            }}
                            style={{ display: "inline-block", marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "12px", borderRight: "unset", cursor: "pointer", paddingLeft: "10px", borderRadius: "0px", paddingRight: "10px", color: "grey", border: "solid rgb(206, 212, 218) 1px" }}
                        ></i>
                        <InputText
                            className="mt-2"
                            style={{ borderRadius: "0px" }}
                            onChange={(e) => {
                                formik.setFieldValue("modelid", e.value);
                            }}
                            placeholder="Example: 12345..."
                            value={formik.values.modelid}
                        />
                    </div>
                    <div className="w-20rem mt-4">
                        <label style={{ display: "block" }}>CSR Equipment Phone Type</label>

                        <i
                            className="pi pi pi-eye"
                            style={{ display: "inline-block", marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "12px", borderRight: "unset", cursor: "pointer", paddingLeft: "10px", borderRadius: "0px", paddingRight: "10px", color: "grey", border: "solid rgb(206, 212, 218) 1px" }}
                        ></i>
                        <Dropdown
                            options={csrequirmentphonetype}
                            style={{ borderRadius: "0px" }}
                            className=" w-16rem mt-2"
                            onChange={(e) => {
                                formik.setFieldValue("csrequirmentphonetype");
                            }}
                            value={formik.values.csrequirmentphonetype}
                            placeholder="Select An option"
                        />
                    </div>
                    <div className="w-20rem mt-4">
                        <label style={{ display: "block" }}>Status</label>
                        <i
                            className="pi pi pi-copy"
                            style={{ display: "inline-block", marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "12px", borderRight: "unset", cursor: "pointer", paddingLeft: "10px", borderRadius: "0px", paddingRight: "10px", color: "grey", border: "solid rgb(206, 212, 218) 1px" }}
                        ></i>
                        <Dropdown
                            className="w-16rem mt-2"
                            style={{ borderRadius: "0px" }}
                            options={status}
                            onChange={(e) => {
                                formik.setFieldValue("status");
                            }}
                            value={formik.values.status}
                            placeholder="Select An option"
                        />
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-content-center">
                    <Button label="Search" />
                </div>   
                <div style={{overflowY:"auto"}} className="mt-4">     
                   <DataTable style={{minWidth:"3000px"}}> 
                    <Column header="#"/>  
                    <Column header="Action"/> 
                    <Column header="Make Model ID"/> 
                    <Column header="Make"/> 
                    <Column header="Model"/> 
                    <Column header="Model Number"/> 
                    <Column header="Amount"/>  
                    <Column header="Network Type"/>  
                    <Column header="SIM Type"/> 
                    <Column header="FCC ID"/> 
                    <Column header="HAC"/> 
                    <Column header="Wifi"/> 
                    <Column header="Data"/> 
                    <Column header="OS"/> 
                    <Column header="Status"/>  
                    <Column header="Grade"/> 
                    <Column header="M Rating"/> 
                    <Column header="T Rating"/> 
                    <Column header="Voice Only"/> 
                    <Column header="SKU"/> 
                    <Column header="Hotspot Capable"/> 
                    <Column header="CSR Equipment Phone Type"/>  
                    <Column header="HandOver"/> 
                    <Column header="Created Date"/> 
                    <Column header="Created By"/> 
                    <Column header="Updated By"/> 
                    <Column header="Updated Date"/> 
                    
                   </DataTable>  
                   </div>
            </Card>
        </Card>        
        }
        </>
    );
}
