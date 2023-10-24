import React, { useState } from "react";
import { Button } from "primereact/button";
import AddUnits from "./add units component/AddUnits";
import { Card } from "primereact/card";
import UpdateInventory from "./UpdateInventory";

const Manage_inventory = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleImageClick = (component) => {
        setActiveComponent(component);
    };

    return (
        
        <>

            {activeComponent === "AddUnits" ? (
                <AddUnits />
            ) : activeComponent === "UpdateInventory" ? (
                <UpdateInventory />
            ) : (  
                <>
                <div className="card" style={{fontSize:'2rem',color:'black'}}>Manage Inventory</div>
                <div className="flex justify-content-around flex-wrap pt-3">
                    <Card
                        style={{
                            width: "17em",
                            height: "17em",
                            backgroundColor: "#aae5e9",
                            marginBottom: "20px",
                            boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <img
                            src="/images/medicaid.jpg"
                            alt=" image-1"
                            style={{
                                borderRadius: "6px 6px 0px 0px",
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            onClick={() => handleImageClick("AddUnits")} // Set the active component when image 1 is clicked
                        />
                        <div className="flex justify-content-center" style={{fontSize:'2rem',color:'black'}}>
                            <p>Add Units</p>
                        </div>
                    </Card>
                    <Card
                        style={{
                            width: "17em",
                            height: "17em",
                            backgroundColor: "#aae5e9",
                            marginBottom: "20px",
                            boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <img
                            src="/images/medicaid.jpg"
                            alt=" image-2"
                            style={{
                                borderRadius: "6px 6px 0px 0px",
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                            }}
                            onClick={() => handleImageClick("UpdateInventory")} // Set the active component when image 2 is clicked
                        />
                        <div className="flex justify-content-center" style={{fontSize:'1.7rem',color:'black'}}>
                            <p>Update Inventory</p>
                        </div>
                    </Card>
                    
                </div>
                </>
            )}
        </>
    );
};

export default Manage_inventory;
