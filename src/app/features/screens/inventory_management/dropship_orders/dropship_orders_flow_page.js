import { Card } from "primereact/card";
import React,{useEffect,useState} from "react";
import { Button } from "primereact/button"; 
import { useLocation } from "react-router-dom";
import AcpOrders from "./dropships_components/acp_orders";
import Company from "./dropships_components/company";
import FreePhonesWithoutData from "./dropships_components/free_phones_without_data";
import FreePhonesWithData from "./dropships_components/free_phones_with_data";
import PaidPhones from "./dropships_components/paid_phones";
import SimOnly from "./dropships_components/sim_only";
import PaidPhonesNonLifeline from "./dropships_components/paid_phone_nonlifeline";
import ManageShipperInventoryFlowPage from "./manage_shipper_inventory/manage_shiper_inventory_flow_page";
import PostPaidPhoneNonLifeline from "./dropships_components/post_paid_phone_nonlifeline";
let ComponentData = [
    {
        title: "Company",
        component: Company,
    },
    {
        title: "Free Phones Without Data",
        component: FreePhonesWithoutData,
    },
    {
        title: "Acp Orders",
        component: AcpOrders,
    },
    {
        title: "Free Phones With Data",
        component: FreePhonesWithData,
    },
    {
        title: "Sim Only",
        component: SimOnly,
    },
    {
        title: "Paid Phones",
        component: PaidPhones,
    },
    {
        title: "Paid Phones Non Lifeline",
        component: PaidPhonesNonLifeline,
    },
    {
        title: "Post Paid Phones Non Lifeline",
        component: PostPaidPhoneNonLifeline,
    },
    {
        title: "Acp Orders",
        component: AcpOrders,
    },
];
export default function DropshipOrdersFlowPage() {
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
        setIsCreate(isCreate)
    
        const isManage = parsedLoginPerms.some((node) =>
          node?.subModule.some((subNode) =>
            subNode?.route === currentPath && subNode?.actions.some((action) =>
              action?.name === "manage"
            )
          )
        );
        setIsManage(isManage)
    
      }; 
      const [isManage,setIsManage]=useState(null)  
      const [isCreate,setIsCreate]=useState(null) 
     useEffect(()=>{ 
          actionBasedChecks()  
     },[]) 
    return (
        <Card>
            <div className="card">
                <h5 className="font-semi-bold">Pending Orders</h5>
            </div>
            <div className="flex flex-wrap justify-content-around">
                {ComponentData.map((component) => (
                    <div style={{ marginTop: "44px" }} className="card w-15rem">
                        <h1 style={{ fontSize: "16px" }}>{component.title}</h1>{" "}
                        <div className="mt-12">
                            <component.component />
                        </div>
                    </div>
                ))}
            </div>
            <div className=" card flex flex-wrap justify-content-between">
                <div>
                    <h1 style={{ fontSize: "16px" }} className="font-semibold">
                        Manage Shipper Inventory
                    </h1>
                </div>
                <div>
                    <Button label="Shipper Batch Report" />
                </div>
            </div>
            <ManageShipperInventoryFlowPage permissions={{isCreate:isCreate,isManage:isManage}} />
        </Card>
    );
}
