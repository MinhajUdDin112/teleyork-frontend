// import React, { useState } from "react";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// const NfsModal = ({ displayModal, setDisplayModal }) => {
//     const tabledata = [
//         {
//             invoiceno: "2023-03-65910",
//             invicetype: "New Signup Plan Purchase",
//             paymentmode: "Credit Card",
//             type: "CR",
//             credit: "0.00",
//             debit: "0.00",
//             balance: "0.00",
//             createddate: "Mar-24-2023",
//             void: "N",
//         },
//     ];

//     const renderFooter = () => {
//         return (
//             <div className="flex justify-content-between">
//                 <Button label="Submit" onClick={() => setDisplayModal(false)} />
//                 <Button label="Close" onClick={() => setDisplayModal(false)} />
//             </div>
//         );
//     };
//     return (
//         <div>
//             <Dialog header="Add NSF/Fraud Invoice" visible={displayModal} style={{ width: "80vw" }} footer={renderFooter()}>
//                 <DataTable value={tabledata}>
//                     <Column field="invoiceno" header="Invoice No." />
//                     <Column field="invicetype" header="Invoice Type" />
//                     <Column field="paymentmode" header="Payment Mode" />
//                     <Column field="type" header="Type" />
//                     <Column field="credit" header="Credit" />
//                     <Column field="debit" header="Debit" />
//                     <Column field="balance" header="Balance" />
//                     <Column field="createddate" header="Created Date" />
//                     <Column field="void" header="Void" />
//                 </DataTable>
//                 <div>
//                     <div>
//                         <p>CustomerID:</p>
//                         <p>Telephone Number:</p>
//                         <p>Customer Name:</p>
//                         <p>Address:</p>
//                         <p>Invoice Type:</p>
//                         <p>Invoice Amount:</p>
//                         <p>Ref.No:</p>
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default NfsModal;
