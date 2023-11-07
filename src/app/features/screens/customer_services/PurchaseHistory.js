import { Button } from 'primereact/button'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'

const PurchaseHistory = () => {


    const tabledata = [
        {
            ID: "1",
            PlanId: "",
            Plan: "",
            Status: "",
            status: "",
            Activation: "",
            EXPIRATION: "",
            NextRENEWAL:"",
            Mintues: "",
            SMS: "",
            Data:"",         
        },
    ];
    const tabledata1 = [
        {
           
            Telephone_Number: "",
            Mintues: "",
            Status: "",
           AddedData:"",         
        },
    ];
    
  return (
  <>
  <div  className="card bg-pink-50">
    <div className='card flex justify-content-between'>
<h3>Mintues</h3>
<Button label='Reload Purchase' />
    </div>
    <div>
    <div className="mt-3">
                    <DataTable value={tabledata}  showGridlines resizableColumns columnResizeMode="fit" >
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
    </div>
    <div>
        <div>
       < h3 className='mt-5 mb-5'>Unlimited Plan Loaded Minutes</h3>
       <div className="mt-3">
                    <DataTable value={tabledata1} showGridlines  resizableColumns columnResizeMode="fit" >
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
        </div>
    </div>
  </div>
  
  </>
  )
}

export default PurchaseHistory