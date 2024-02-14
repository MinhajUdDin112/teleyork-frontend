import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditPlan from "./edit_plan";
import Axios from "axios";
import { Card } from "primereact/card";
import PlansConfigurations from "./plan_configuration";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const loginRes = localStorage.getItem("userData");
const parseLoginRes = JSON.parse(loginRes);
export default function ListAllPlans() {
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=${parseLoginRes?.compony}`)
            .then((res) => {
                setPlanList(res?.data?.data);
            })
            .catch((err) => {});
    }, []);
    const [planList, setPlanList] = useState([]); 
    const [rowData,setRowData]=useState(null)
    const [editPlanVisibility,setEditPlanVisibility]=useState(false)
    const [addPlanVisibility, setAddPlanVisibility] = useState(false);
    return (
        <Card>
            <Button
                onClick={() => {
                    setAddPlanVisibility(true);
                }}
                className="text-center mr-0"
                style={{ marginTop: "-14px",textAlign:"center", marginLeft: "90%", transform: "translate(-50%)", width: "150px" }}
          label="Add Plan" / >
        
            <Dialog
                header="Add Plan"
                visible={addPlanVisibility}
                style={{ width: "80vw" }}
                onHide={() => {
                    setAddPlanVisibility(false);
                }}
            >
                <PlansConfigurations data={rowData}/>
            </Dialog> 
            <Dialog
                header="Update Plan"
                visible={editPlanVisibility}
                style={{ width: "80vw" }}
                onHide={() => {
                    setEditPlanVisibility(false);
                }}
            >
                <EditPlan data={rowData}/>
            </Dialog>
            <DataTable value={planList} size="small" stripedRows resizableColumns emptyMessage="No Plan found." style={{ marginTop: "44px" }}>
                <Column header="Name" field="name" />
                <Column header="Description" field="description" />

                <Column header="Text Allowance" field="textAllowance" />
                <Column header="Data Allowance" field="dataAllowance" />
                <Column header="Voice Allowance" field="voiceAllowance" />
                <Column header="Actions" body={(rowData)=>{ 
                   return <Button label="Update" onClick={()=>{ setRowData(rowData);setEditPlanVisibility(true)} } className=" p-button-primary mr-2 ml-2 pt-1 pb-1" text raised />;
                }} field="Edit" />
            </DataTable>
        </Card>
    );
}
