import React, { useState } from "react";
import AddUnits from "./add_units/add_units_flow_page.js";
import { Card } from "primereact/card";  
import InventoryDashboard from "./inventory_dashboard/inventory_dashboard_flow_page";
import CreateAssignBox from "./create_assign_box/create_assign_box";
import UpdateInventory from "./UpdateInventory";
import ChangeESNSIMStatus from "./change_ESN/esn_sim_status";
import { useNavigate } from "react-router-dom";
import AdjustmentFlowPage from "./adjustment/adjustment_flow_page";  
import DropshipOrdersFlowPage from "../dropship_orders/dropship_orders_flow_page";
let InventoryManagment = [
    {
        component: "AddUnits",
        title: "Add Units",
        imgsrc: "/images/Inventory Module.png",
    },    
    {
        component: "CreateAssignBox",
        title: "Create/Assign BOX",
        imgsrc: "/images/Inventory Module.png",
    },  
    {
        component: "DropshipOrdersFlowPage",
        title: "Dropship Orders",
        imgsrc: "/images/Inventory Module.png",
    },
    {
        component: "UpdateInventory",
        title: "Update inventory",
        imgsrc: "/images/Inventory Module.png",
    },
    {
        component: "ChangeESN_SIM",
        title: "Change ESN/SIM",
        imgsrc: "/images/Inventory Module.png",
    },
    {
        component: "Adjustment",
        title: "Adjustment",
        imgsrc: "/images/Inventory Module.png",
    },        
    {
        component: "InventoryDashboard",
        title: "Inventory Dashboard",
        imgsrc: "/images/Inventory Module.png",
    },
];
const Manage_inventory = () => { 
    let navigate=useNavigate()
    const [activeComponent, setActiveComponent] = useState(null);

    const handleImageClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            {activeComponent === "AddUnits" ? (
                <AddUnits setActiveComponent={setActiveComponent} />
            ) : activeComponent === "UpdateInventory" ? (
                <UpdateInventory setActiveComponent={setActiveComponent} />
            ) :activeComponent === "CreateAssignBox" ? (
                <CreateAssignBox setActiveComponent={setActiveComponent} />
            ) :activeComponent === "DropshipOrdersFlowPage" ? (
                <DropshipOrdersFlowPage />
            ) : activeComponent === "ChangeESN_SIM" ? (
                <ChangeESNSIMStatus setActiveComponent={setActiveComponent} />
            ) : activeComponent === "Adjustment" ? (
                <AdjustmentFlowPage setActiveComponent={setActiveComponent} />
            ) : activeComponent === "InventoryDashboard" ? (
                <InventoryDashboard setActiveComponent={setActiveComponent} />
            ) : (
                <>
                    <div className="card font-semibold" style={{ fontSize: "1.6rem", color: "grey", fontWeight: "bold" }}>
                        Manage Inventory
                    </div>
                    <div className="flex justify-content-around flex-wrap pt-3">
                        <>
                            {InventoryManagment.map((inventory) => (
                                <Card
                                    style={{
                                        width: "17em",
                                        height: "17em",
                                        backgroundColor: "#fff",
                                        marginBottom: "20px",
                                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",cursor:"pointer"
                                    }}
                                    onClick={() => {
                                    inventory.title === "Dropship Orders" ? navigate("/dropshiporders"):handleImageClick(inventory.component) 
                                    }}
                                >
                                    <img
                                        src={inventory.imgsrc}
                                        alt=" image-1"
                                        style={{
                                            borderRadius: "6px 6px 0px 0px",
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "contain",
                                        }}
                                        // Set the active component when image 1 is clicked
                                    />
                                    <div className="flex justify-content-center" style={{ fontSize: "14px",fontFamily:"Inter", marginTop: "35px", color: "grey" }}>
                                        <p>{inventory.title}</p>
                                    </div>
                                </Card>
                            ))}
                        </>
                    </div>
                </>
            )}
        </>
    );
};

export default Manage_inventory;
