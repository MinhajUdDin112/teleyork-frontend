import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "./css/inventory_dashboard.css";
import { FreeIcon, InuseIcon, StockIcon } from "../../../../../../../utility";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function SIMCompleteStockReport({ unitType, billingModel }) {
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const [freeInventory, setFreeInventory] = useState(0);
    const [completeFreeInventory, setCompleteFreeInventory] = useState([]);
    const [usedInventory, setUsedInventory] = useState(0);
    const [completeUsedInventory, setCompleteUsedInventory] = useState([]);
    const [completeUsedInventoryVisiblity, setCompleteUsedInventoryVisibility] = useState(false);

    const [completeFreeInventoryVisiblity, setCompleteFreeInventoryVisibility] = useState(false);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/simInventory/getByBillModel?serviceProvider=${parseLoginRes.company}&UnitType=${unitType}&billingModel=${billingModel}&status=available`)
            .then((resfree) => {
                setFreeInventory(resfree.data.result.length);
                setCompleteFreeInventory(resfree.data.result);
            })
            .catch((error) => {});
    }, [unitType, billingModel]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/simInventory/getByBillModel?serviceProvider=${parseLoginRes.company}&UnitType=${unitType}&billingModel=${billingModel}&status=inUse`)
            .then((resinuse) => {
                setUsedInventory(resinuse.data.result.length);
                setCompleteUsedInventory(resinuse.data.result);
            })
            .catch((error) => {});
    }, [unitType, billingModel]);
    return (
        <>
            <div className="flex flex-wrap flex-row maininventory justify-content-center" style={{ position: "absolute", marginTop: "7rem" }}>
                <div
                    className="inventory_module card"
                    onClick={() => {
                        setCompleteFreeInventoryVisibility((prev) => !prev);
                    }}
                    style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "left" }}
                >
                    <FreeIcon />
                    <h2 style={{ fontSize: "14px", marginLeft: "10px" }}>Free </h2>
                    <h1 style={{ marginLeft: "50%", fontSize: "38px", color: "#C68301", fontFamily: "Almarai" }}>{freeInventory}</h1>
                </div>
                <div
                    className="inventory_module card ml-6"
                    onClick={() => {
                        setCompleteUsedInventoryVisibility((prev) => !prev);
                    }}
                    style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "left" }}
                >
                    <InuseIcon />
                    <h2 style={{ fontSize: "14px", marginLeft: "10px" }}>In Use</h2>
                    <h1 style={{ marginLeft: "50%", fontSize: "38px", color: "#7270D1", fontFamily: "Almarai" }}>{usedInventory}</h1>
                </div>
                <div className="inventory_module card ml-6" style={{ width: "20%", display: "flex", alignItems: "center", justifyContent: "left" }}>
                    <StockIcon />
                    <h2 style={{ fontSize: "14px", marginLeft: "10px" }}>Stock</h2>
                    <h1 style={{ marginLeft: "50%", fontSize: "38px", color: "#00C9BD", fontFamily: "Almarai" }}>{usedInventory + freeInventory}</h1>
                </div>
            </div>
            <Dialog
                draggable={false}
                header="Free Inventories"
                visible={completeFreeInventoryVisiblity}
                onHide={() => {
                    setCompleteFreeInventoryVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable tableStyle={{ minWidth: "60rem" }} value={completeFreeInventory} stripedRows>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="Model" header="Model" />
                </DataTable>
            </Dialog>
            <Dialog
                draggable={false}
                header="Used Inventories"
                visible={completeUsedInventoryVisiblity}
                onHide={() => {
                    setCompleteUsedInventoryVisibility(false);
                }}
                style={{ overflowX: "auto" }}
            >
                <DataTable tableStyle={{ minWidth: "60rem" }} value={completeUsedInventory} stripedRows>
                    <Column field="SimNumber" header="SimNumber" />

                    <Column field="box" header="Box" />

                    <Column field="Model" header="Model" />
                </DataTable>
            </Dialog>
        </>
    );
}
