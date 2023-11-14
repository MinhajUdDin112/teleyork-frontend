import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
export default function RenderOrderData() {
    const datatable = [{}, {}, {}];
    return (
        <DataTable tableStyle={{ minWidth: "3100px"}}  >
            <Column header="#" />
            <Column header="Customer ID" />
            <Column header="Shipper ID" />
            <Column header="Status" />
            <Column header="ESN Number" />
            <Column header="MDN Number" /> 
            <Column header="Carrier Name" /> 
            <Column header="Customer Name" /> 
            <Column header="Phone Model/Accessories" /> 
            <Column header="Amount" /> 
            <Column header="Over Night Shipping Amount" /> 
            <Column header="Payment Method" /> 
            <Column header="Customer Status" /> 
            <Column header="Mailing Address1" />
            <Column header="Mailing Address2" />   
            <Column header="City" /> 
            <Column header="State" /> 
            <Column header="Zip Code" /> 
            <Column header="Request Date" /> 
            <Column header="Agent By" /> 
            <Column header="Process Type" /> 
            

        </DataTable>
    );
}
