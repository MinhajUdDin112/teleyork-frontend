import React, { useState } from "react";
import { Button } from "primereact/button"; 
import { useNavigate } from "react-router-dom";
import CheckEsnCompatibility from "./components/check_esn_compatibility";
import InventoryDashboard from "./components/inventory_dashboard/inventory_dashboard_flow_page";
import SearchEsnDevice from "./components/search_esn_device";
export default function ReportingFlowPage({ setActiveComponent }) { 
    const navigate=useNavigate()
    let component = [
        { component: "clearesnreport", title: "Clear ESN Report" },  
        { 
      component:"checkesncompatibility",title:"Check ESN Compatibility"
        }
    ,{ 
     component:"searchesndevice", 
    title:"Search Esn/Device"
    },
        { component: "cleardevicereport", title: "Clear Device Report" },
        {
            component: "deactivatemdnreport",
            title: "Deactivate MDN Report",
        },
        {
            title: "Swap ESN Batch Report",
            component: "swapesnbatchreport",
        },
        {
            component: "reassigninventoryreport",
            title: "Re-Assign Inventory Report",
        },
        {
            component: "reassigndevicereport",
            title: "Re-Assign Device Report",
        },
        {
            component: "manageunassignedinventory",
            title: "Manage UnAssigned Inventory",
        },
        {
            component: "agentinventoryreport",
            title: "Agent inventory Report ",
        },
        {
            component: "agentdevicereport",
            title: "Agent Device Report",
        },
        {
            component: "manageunassigneddevice",
            title: "Manage Unassigned Device",
        },
        {
            component: "gsmdeviceinventoryforagent",
            title: "GSM Device Inventory for Agents",
        },
    ];
    const [reportingcomponent, setReportingComponent] = useState("");
    return (
        <div style={{ position: "relative" }} >            
       
            <div className="flex flex-column card" style={{ width: "20%", position: "relative", overflow: "hidden" }}>
                {component.map((item) => (
                    <p
                        onClick={() => {  
                              if(item.component === "clearesnreport"){ 
                                navigate("/bulk-clear-esn",{ state: { page: 1 } ,replace:true} )
                              } 
                              else if(item.component === "cleardevicereport"){ 
                                navigate("/bulk-clear-device",{ state: { page: 1 } ,replace:true} )  
                              }  
                              else if(item.component === "deactivatemdnreport"){ 
                                navigate("/bulk-deactivate-mdn",{ state: { page: 1 } ,replace:true} )  
                              }  
                              else{
                            setReportingComponent(item.component); 
                              }
                        }}
                        className="mt-0"  
                    
                   style={{cursor:"pointer",color:`${reportingcomponent === item.component ? "royalblue":""}`}} >
                        {item.title}
                    </p>
                ))}
            </div>

            <div style={{ width: "78%", marginLeft: "22%", top: "0px", position: "absolute", height: "50vh" }}>
            <div >
            <Button
                label="Back"    
                className="mt-4 ml-4"
                style={{position:"absolute"}}
                onClick={() => {
                    setActiveComponent("");
                }}
            />  
            </div>
                  { 
                    reportingcomponent === "" ?<InventoryDashboard/>:  reportingcomponent === "checkesncompatibility" ?<CheckEsnCompatibility/>: reportingcomponent === "searchesndevice" ? <SearchEsnDevice/> :undefined
                   }
            </div>
        </div>
    );
}
