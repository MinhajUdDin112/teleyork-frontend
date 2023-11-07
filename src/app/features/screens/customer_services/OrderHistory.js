import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react'

const OrderHistory = () => {

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
  <div>
    <div className='card'>
        <h3>Orders</h3>
    </div>
    <div>
    <div className="mt-5">
                    <DataTable value={tabledata1} showGridlines  resizableColumns columnResizeMode="fit" >
                        <Column header="Stage" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Order By" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Order DateTime" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Status" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                       
                    </DataTable>
                </div>
    </div>
  </div>
  </>
  )
}

export default OrderHistory