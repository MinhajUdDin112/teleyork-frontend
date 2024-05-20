import React, { useState } from "react";
import { Card } from "primereact/card";
import "./add_units_components/sim_singleupload/css/style.css";
const Header = ({ unit }) => {
    const [visible, setVisible] = useState(false);
    const handleVisible = () => {
        setVisible((prev) => !prev);
    };
    return (
        <>
            <div className="addunitdiv">
                <p className="card font-semibold heading">ADD UNITS</p>
            </div>
            <div className="flex flex-wrap justify-content-left">
                <div className="flex flex-wrap justify-content-center">
                    <div className="flex flex-wrap w-full justify-content-left mt-4" style={{ display: "inline" }}>
                        <h3 style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>Add Units</h3>
                        <i className="pi pi-info-circle custom-icon mt-1" onClick={handleVisible} style={{ color: "black", fontWeight: "300", fontSize: "16px", marginLeft: "10px" }}></i>
                    </div>
                    {visible && (
                        <div className="flex flex-wrap justify-content-center">
                            <Card className="card">
                                {visible &&
                                    (unit === "" ? (
                                        <div className="ml-4 mt-2" style={{ textAlign: "justify" }}>
                                            <p>1. if you are adding only sim card to the inventory select "sim" as the unit type when uploading SIMs.</p>
                                            <p>2. If you are adding only Tables/Tagged Tablets to the inventory select "Tablets" as the Inventory type</p>
                                            <p>3. If you are adding only Cell Phones/Tagged Cell Phones to the inventory select "Cell Phones "as the inventory type</p>
                                            <p>4. A tagged device refer to a situation where a sim card is inserted into a device , and they are paired together.</p>
                                        </div>
                                    ) : unit === "SIM" ? (
                                        <div className="ml-4 " style={{ textAlign: "justify" }}>
                                            <p>You are about to load the SIMs in the inventory.</p>
                                            <p>1 Make sure starting digits of your SIM numbers are "8901"</p>
                                            <p>2 Make sure your SIM numbers have 19 or more digits</p>
                                        </div>
                                    ) : unit === "Cell Phone" ? (
                                        <div className="ml-4 " style={{ textAlign: "justify" }}>
                                            <p>You are about to load the Cell Phones/ Tablets in the inventory.</p>
                                            <p>1. Make sure your device numbers have 14 or 15 digits</p>
                                        </div>
                                    ) : (
                                        <div className="ml-3 " style={{ textAlign: "justify" }}>
                                            <p>You are about to load the Tablets in the inventory.</p>
                                            <p>1. Make sure your device numbers have 14 or 15 digits</p>
                                        </div>
                                    ))}
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
