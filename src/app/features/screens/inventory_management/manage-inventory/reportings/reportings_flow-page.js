import React, { useState } from "react";
import ClearEsnReport from "./components/clear_esn_report";
import InventoryDashboard from "./components/inventory_dashboard/inventory_dashboard_flow_page";
export default function ReportingFlowPage({ setActiveComponent }) {
    let component = [
        { component: "clearesnreport", title: "Clear ESN Report" },
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
                            setReportingComponent(item.component);
                        }}
                        className="mt-0"  
                        style={{cursor:"pointer"}}
                    >
                        {item.title}
                    </p>
                ))}
            </div>

            <div style={{ width: "78%", marginLeft: "22%", top: "0px", position: "absolute", height: "50vh" }}>
              
                  { 
                    reportingcomponent === "" ?<InventoryDashboard/>:reportingcomponent === "clearesnreport" ? <ClearEsnReport/>:undefined
                   }
            </div>
        </div>
    );
}
