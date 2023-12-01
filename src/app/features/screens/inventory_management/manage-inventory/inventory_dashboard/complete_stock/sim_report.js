import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
export default function SIMCompleteStockReport() {
    const loginRes = localStorage.getItem("userData");
    const [completereportvisibility, setCompleteReportVisibility] = useState(false);
    const parseLoginRes = JSON.parse(loginRes);
    const [completedsimreport, setCompletedSimReport] = useState({ Stock: 0, Used: 0, Free: 0 });
    const [current, setCurrent] = useState([]);
    const colors = {
        Stock: "#0073b7",
        Used: "#00c0ef",
        Free: " #00a65a",
    };
    const [currentheader, setCurrentHeader] = useState("");
    const [freesim, setFreeSim] = useState([]);
    const [usedsim, setUsedSim] = useState([]);
    const [stocksim, setStockSim] = useState([]);
    function ShowDetails(type) {
        if (type === "Free") {
            setCurrent(freesim);
            setCurrentHeader("Free SIM Stock");
        } else if (type === "Used") {
            setCurrent(usedsim);
            setCurrentHeader("Used SIM Stock");
        } else {
            setCurrent(stocksim);
            setCurrentHeader("Complete SIM Stock");
        }
        setCompleteReportVisibility(true);
    }
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/simInventory?serviceProvider=${parseLoginRes.compony}`)
            .then((resstock) => {
                let obj = {
                    Stock: resstock.data.data.length,
                };
                Axios.get(`${BASE_URL}/api/web/simInventory/available?serviceProvider=${parseLoginRes.compony}`)
                    .then((resfree) => {
                        obj.Free = resfree.data.data.length;
                        Axios.get(`${BASE_URL}/api/web/simInventory/inUse?serviceProvider=${parseLoginRes.compony}`)
                            .then((resinuse) => {
                                obj.Used = resinuse.data.data.length;
                                setCompletedSimReport(obj);
                                setStockSim(resstock.data.data);
                                setFreeSim(resfree.data.data);
                                setUsedSim(resinuse.data.data);
                            })
                            .catch((error) => {});
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);
    return (
        <>
            <img src="/images/inventory_dashboard/sim.svg" style={{ display: "inline-block", width: "50px", height: "auto" }} />

            <h5 style={{ width: "50px", display: "inline-block", position: "absolute", marginTop: "12px" }}>SIMService</h5>
            {Object.keys(completedsimreport).map((item) => (
                <div className="mt-2 flex flex-wrap justify-content-between">
                    <div>
                        <span>{item}</span>
                    </div>
                    <div className="flex justify-content-center align-items-center" style={{ cursor: "pointer", background: `${colors[item]}`, borderRadius: "25px", width: "25px", height: "25px" }}>
                        <span
                            style={{ color: "white" }}
                            onClick={() => {
                                ShowDetails(item);
                            }}
                        >
                            {completedsimreport[item]}
                        </span>
                    </div>
                </div>
            ))}
            <Dialog
                header={currentheader}
                visible={completereportvisibility}
                onHide={() => {
                    setCompleteReportVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable className="card" tableStyle={{ minWidth: "60rem" }} value={current} showGridlines>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="Model" header="Model" />
                </DataTable>
            </Dialog>
        </>
    );
}
