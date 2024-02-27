import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
export default function TabletCompleteStockReport(){  
  const loginRes = localStorage.getItem("userData"); 
    const parseLoginRes = JSON.parse(loginRes);
    const [completereportvisibility, setCompleteReportVisibility] = useState(false);
    
    const [completedtabletreport,setCompletedTabletReport]=useState({ Stock: 0, Used: 0, Free: 0 }); 
    const [current, setCurrent] = useState([]);
    const colors = {
      Stock: "#0073b7",
      Used: "#00c0ef",
      Free: " #00a65a",
    };     
    const [currentheader, setCurrentHeader] = useState("");
    const [freetablet, setFreeTablet] = useState([]);
    const [usedtablet, setUsedTablet] = useState([]);
    const [stocktablet, setStockTablet] = useState([]);
    function ShowDetails(type) {
        if (type === "Free") {
            setCurrent(freetablet);
            setCurrentHeader("Free Tablet Stock");
        } else if (type === "Used") {
            setCurrent(usedtablet);
            setCurrentHeader("Used Tablet Stock");
        } else {
            setCurrent(stocktablet);
            setCurrentHeader("Complete Tablet Stock");
        }
        setCompleteReportVisibility(true);
    }
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/tabletInventory?serviceProvider=${parseLoginRes.company}`)
            .then((resstock) => {
                let obj = {
                    Stock: resstock.data.data.length,
                };
                Axios.get(`${BASE_URL}/api/web/tabletInventory/available?serviceProvider=${parseLoginRes.company}`)
                    .then((resfree) => {
                        obj.Free = resfree.data.data.length;
                        Axios.get(`${BASE_URL}/api/web/tabletInventory/inUse?serviceProvider=${parseLoginRes.company}`)
                            .then((resinuse) => {
                                obj.Used = resinuse.data.data.length;
                                setCompletedTabletReport(obj);
                                setStockTablet(resstock.data.data);
                                setFreeTablet(resfree.data.data);
                                setUsedTablet(resinuse.data.data);
                            })
                            .catch((error) => {});
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);
    return( 
        <div>    <img src="/images/inventory_dashboard/tablet.svg" alt="img" style={{display:"inline-block",width:"35px",height:"auto"}}/>  
             
            <h5 style={{display:"inline-block",position:"absolute",marginTop:"7px"}}>Tablet Service</h5>
          {  Object.keys(completedtabletreport).map(item=>( 
                <div className="mt-2 flex flex-wrap justify-content-between"> 
                     <div> 
                       <span>{item}</span> 
                     </div> 
                     <div onClick={() => {
                                ShowDetails(item);
                            }} className="flex justify-content-center align-items-center" style={{cursor:"pointer",background:`${colors[item]}`,borderRadius:"25px",width:"25px",height:"25px"}}> 
                       <span style={{ color: "white" }}
                             >{completedtabletreport[item]}</span>
                     </div>
                 </div>
             ))  
             }  
             <Dialog
                header={currentheader} 
                draggable={false}
                visible={completereportvisibility}
                onHide={() => {
                    setCompleteReportVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable  tableStyle={{ minWidth: "60rem" }} value={current} stripedRows>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="IMEI" header="IMEI" />
                </DataTable>
            </Dialog>
        </div>
    )
}