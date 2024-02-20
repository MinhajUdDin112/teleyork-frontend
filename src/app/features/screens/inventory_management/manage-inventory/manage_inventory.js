import React, { useState } from "react";
import AddUnits from "./add_units/add_units_flow_page.js";
import { Card } from "primereact/card";  
import { useLocation } from "react-router-dom";     
import "././add_units/add_units_components/sim_singleupload/css/style.css"
import { useEffect } from "react";
import InventoryDashboard from "./inventory_dashboard/inventory_dashboard_flow_page";
import CreateAssignBox from "./create_assign_box/create_assign_box";
import UpdateInventory from "./update_inventory/UpdateInventory";
import ChangeESNSIMStatus from "./change_ESN/esn_sim_status";
import { useNavigate } from "react-router-dom";
import AdjustmentFlowPage from "./adjustment/adjustment_flow_page";  
import DropshipOrdersFlowPage from "../dropship_orders/dropship_orders_flow_page"; 
import Untagged_MEID_DEVICEID from "./untagged_meid_deviceid/untagged_meid_deviceid.js";
import ManagePhoneRequests from "./manage_phone_requests/manage_phone_requests_flow_page.js";  
import ReturnMerchandise from "./return_merchandise/return_merchandise.js";
import Equipment_And_Accessories_Request from "./equipment_and_accessories_request/equipment_and_accessories_request.js";
import ReportingFlowPage from "./reportings/reportings_flow-page.js";
let InventoryManagment = [
    {
        component: "AddUnits",
        title: "Add Units",
        imgsrc: "/images/inventory/inventory_add.png",
    }, 
    {
        component: "UpdateInventory",
        title: "Update Inventory",
        imgsrc: "/images/inventory/Update Inventory.png",
    },
    {
        component: "InventoryDashboard",
        title: "Inventory Dashboard",
        imgsrc: "/images/inventory/icon-data-chart.png",
    },
   /* {
        component: "Reportings",
        title: "Reportings",
        imgsrc: "/images/Inventory Module.png",
    },     
    { 
        component: "ReturnMerchandise",
        title: "Return Merchandise",
        imgsrc: "/images/Inventory Module.png",
          
    }, 
    {
        component: "ManagePhoneRequests",
        title: "Manage Phone Requests",
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
        component:"Untagged_MEID_DEVICEID", 
        title:"Untagged MEID/DEVICE ID", 
        imgsrc:"/images/Inventory Module.png",
    }, 
    { 
        component:"Equipment_And_Accessories_Request", 
        title:"Equipment & Accessories Request", 
        imgsrc:"/images/Inventory Module.png",
    } */
];
const Manage_inventory = () => {     
    const location = useLocation();
    const currentPath = location?.pathname  
    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)
    
        const isCreate = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "create"
            )
          )
        );
     
        const isManage = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "manage"
            )
          )
        );
        setPermissions({isCreate:isCreate,isManage:isManage})
    
      }; 
       
     const [permission,setPermissions]=useState({})
     useEffect(()=>{ 
       actionBasedChecks()
     },[])     
    let navigate=useNavigate()
    const [activeComponent, setActiveComponent] = useState(null);

    const handleImageClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <Card>
            {activeComponent === "AddUnits" ? (
                <AddUnits setActiveComponent={setActiveComponent} />
            ) : activeComponent === "UpdateInventory" ? (
                <UpdateInventory setActiveComponent={setActiveComponent} permissions={permission}/>
            ) : activeComponent === "ManagePhoneRequests" ? (
                <ManagePhoneRequests setActiveComponent={setActiveComponent} />
            ) :activeComponent === "CreateAssignBox" ? (
                <CreateAssignBox setActiveComponent={setActiveComponent} />
            ) :activeComponent === "Reportings" ? (
                <ReportingFlowPage setActiveComponent={setActiveComponent} />
            ) :activeComponent === "DropshipOrdersFlowPage" ? (
                <DropshipOrdersFlowPage />
            ) : activeComponent === "ChangeESN_SIM" ? (
                <ChangeESNSIMStatus setActiveComponent={setActiveComponent} />
            ) : activeComponent === "ReturnMerchandise" ? (
                <ReturnMerchandise setActiveComponent={setActiveComponent} />
            ) :  activeComponent === "Adjustment" ? (
                <AdjustmentFlowPage setActiveComponent={setActiveComponent} />
            ) : activeComponent === "InventoryDashboard" ? (
                <InventoryDashboard setActiveComponent={setActiveComponent} />
            ) :activeComponent === "Untagged_MEID_DEVICEID" ? (
                <Untagged_MEID_DEVICEID setActiveComponent={setActiveComponent} />
            ) : activeComponent === "Equipment_And_Accessories_Request" ? (
                <Equipment_And_Accessories_Request setActiveComponent={setActiveComponent} />
            ) : (
                <div>
                     <h1 className="font-bold ml-5"> Manage Inventory</h1>
                    <div className="flex justify-content-left flex-wrap pt-3 mt-4 "> 
                   
                        <>
                            {InventoryManagment.map((inventory) => (
                                <Card
                                    style={{
                                       
                                        backgroundColor: "#fff",
                                        marginBottom: "20px",
                                        fontWeight:"900", 
                                        width:"300px",
                                        cursor:"pointer"
                                    }} 
                                    className="manage-inventory ml-5"
                                    onClick={() => {
                                    inventory.title === "Dropship Orders" ? navigate("/dropshiporders"):handleImageClick(inventory.component) 
                                    }}
                                >
                                    <img
                                        src={inventory.imgsrc}
                                        alt=" img"
                                        style={{
                                            borderRadius: "6px 6px 0px 0px",
                                            height: "100%",
                                            width: "50%",
                                            marginLeft:"50%" , 
                                            transform:"translate(-50%)",
                                        }}
                                        // Set the active component when image 1 is clicked
                                    />
                                    <div className="flex justify-content-center font-bold " style={{ fontSize: "17px",fontWeight:"normal",fontFamily:"Inter", marginTop: "35px", color: "grey" }}>
                                        <p>{inventory.title}</p>
                                    </div>
                                </Card>
                            ))}
                        </>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Manage_inventory;
