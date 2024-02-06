import React from "react";
import { Button } from "primereact/button";

const PrepaidEditabaleInvoices = ({ setPaymentModal }) => {
    return (
        <>
            <div className="">
                <div className="flex flex-wrap m-4 mt-3 p-2">
                    <Button icon="pi pi-fw pi-pencil" label="Invoices" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary " />
                    {/* <Button icon="pi pi-fw pi-pencil" label="Echeck Log (PC653)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Autopay Log (PC678)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Discount Credit Log (PC843)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" /> */}
                </div>
            </div>
        </>
    );
};

export default PrepaidEditabaleInvoices;
