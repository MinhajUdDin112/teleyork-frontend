import React from "react";
import { Button } from "primereact/button";

const EditabaleInvoices = ({ setPaymentModal }) => {
    return (
        <>
            <div className="card p-2 mx-4">
                <div className="flex flex-wrap m-4 mt-3 p-2">
                    <Button icon="pi pi-fw pi-pencil" label="Invoices (PC72)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary " />
                    <Button icon="pi pi-fw pi-pencil" label="Payments (PC463)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" onClick={() => setPaymentModal(true)} />
                    <Button icon="pi pi-fw pi-pencil" label="Detailed Transaction (PC464)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="OCS Purchase (PC465)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Wallet Log (PC466)" className=" text-sm border-round  mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Echeck Log (PC653)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Autopay Log (PC678)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                    <Button icon="pi pi-fw pi-pencil" label="Discount Credit Log (PC843)" className=" text-sm border-round mr-2 mb-2 p-button-outlined p-button-secondary" />
                </div>
            </div>
        </>
    );
};

export default EditabaleInvoices;
