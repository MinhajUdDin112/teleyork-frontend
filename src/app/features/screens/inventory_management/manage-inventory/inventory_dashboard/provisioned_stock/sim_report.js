import React from "react";
export default function SIMProvisionedStockReport() {
    const provisionedsimreport = { "Stock": 0, "Used": 0, "Free": 0 }; 
    const colors = {
        "Stock": "#0073b7",
        "Used": "#00c0ef",
        "Free": " #00a65a",
      };
    return (
        <>
         <img src='/images/inventory_dashboard/sim.svg' alt="img" style={{display:"inline-block",width:"40px",height:"auto"}}/>  
             
            <h5 style={{display:"inline-block",position:"absolute",marginTop:"12px"}}>SIM Service</h5>
            {Object.keys(provisionedsimreport).map((item) => (
                <div className="mt-2 flex flex-wrap justify-content-between">
                    <div>
                        <span>{item}</span>
                    </div>
                    <div className="flex justify-content-center align-items-center" style={{ cursor:"pointer",background: `${colors[item]}`, borderRadius: "25px", width: "25px", height: "25px" }}>
                        <span>{provisionedsimreport[item]}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
