import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function CellPhoneCompletedStockReport() {
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [completed_cell_phone_report, setCompletedCellPhoneReport] = useState({ Stock: 0, Used: 0, Free: 0 });
    const [current, setCurrent] = useState([]);
    const colors = {
        Stock: "#0073b7",
        Used: "#00c0ef",
        Free: " #00a65a",
    };
    const [currentheader, setCurrentHeader] = useState("");
    const [free_cellphone, setFreeCellPhone] = useState([]);
    const [used_cellphone, setUsedCellPhone] = useState([]);
    const [stock_cellphone, setStockCellPhone] = useState([]);
    const [completereportvisibility, setCompleteReportVisibility] = useState(false);

    function ShowDetails(type) {
        if (type === "Free") {
            setCurrent(free_cellphone);
            setCurrentHeader("Free Cell Phone Stock");
        } else if (type === "Used") {
            setCurrent(used_cellphone);
            setCurrentHeader("Used Cell Phone Stock");
        } else {
            setCurrent(stock_cellphone);
            setCurrentHeader("Complete Cell Phone Stock");
        }
        setCompleteReportVisibility(true);
    }
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/phoneInventory?serviceProvider=${parseLoginRes.company}`)
            .then((resstock) => {
                let obj = {
                    Stock: resstock.data.data.length,
                };
                Axios.get(`${BASE_URL}/api/web/phoneInventory/available?serviceProvider=${parseLoginRes.company}`)
                    .then((resfree) => {
                        obj.Free = resfree.data.data.length;
                        Axios.get(`${BASE_URL}/api/web/phoneInventory/inUse?serviceProvider=${parseLoginRes.company}`)
                            .then((resinuse) => {
                                obj.Used = resinuse.data.data.length;
                                setCompletedCellPhoneReport(obj);
                                setStockCellPhone(resstock.data.data);
                                setFreeCellPhone(resfree.data.data);
                                setUsedCellPhone(resinuse.data.data);
                            })
                            .catch((error) => {});
                    })
                    .catch((error) => {});
            })
            .catch((error) => {});
    }, []);
    return (
        <>
            <img src="/images/inventory_dashboard/cell_phone.svg" style={{ display: "inline-block", width: "50px", height: "auto" }} />
            <h5 style={{ display: "inline-block", position: "absolute", marginTop: "12px" }}>Cell Phone Service</h5>{" "}
            {Object.keys(completed_cell_phone_report).map((item) => (
                <div className="mt-2 flex flex-wrap justify-content-between">
                    <div>
                        <span>{item}</span>
                    </div>
                    <div
                        onClick={() => {
                            ShowDetails(item);
                        }}
                        className="flex justify-content-center align-items-center"
                        style={{ cursor: "pointer", background: `${colors[item]}`, borderRadius: "25px", width: "25px", height: "25px" }}
                    >
                        <span>{completed_cell_phone_report[item]}</span>
                    </div>
                    <Dialog
                        header={currentheader}
                        visible={completereportvisibility}
                        draggable={false}
                        onHide={() => {
                            setCompleteReportVisibility(false);
                        }}
                        style={{ overflowX: "auto" }}
                    >
                        <DataTable className="card" tableStyle={{ minWidth: "60rem" }} value={current} showGridlines>
                            <Column field="SimNumber" header="SimNumber" />
                            <Column field="IMEI" header="IMEI" />
                            <Column field="box" header="Box" />

                            <Column field="Model" header="Model" />
                        </DataTable>
                    </Dialog>
                </div>
            ))}
        </>
    );
}
