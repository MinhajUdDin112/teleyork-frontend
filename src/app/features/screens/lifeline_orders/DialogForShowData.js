import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DialogForShowData = ({ allData }) => {
  let remainingData = Array.isArray(allData) ? allData : [allData]; // Convert to an array if it's not already an array

  return (
    <>
      <div className="card mx-5 p-0 border-noround">
        <div className="flex" style={{ padding: '25px' }}>
          <div className="mb-3" style={{ position: 'absolute', right: '120px' }}></div>
        </div>
        <div className="" style={{ marginTop: '30px', padding: '15px' }}>
          <DataTable value={remainingData} showGridlines resizableColumns columnResizeMode="fit">
            <Column header="DOB" field={(item) => (item?.DOB ? item?.DOB.split('T')[0] : '')} />
            <Column header="Plan Name" field="plan.name" />
            <Column header="Plan Price" field="plan.price" />
            <Column header="Phone Cost" field="Phonecost" />
            <Column header="Amount Paid by Customer" field="Amountpaid" />
            <Column header="Posting Date" field="Postingdate" />
            <Column header="ESN Number" field="EsnNumber" />
            <Column header="Telephone Number" field="Telephone" />
            <Column header="Activation Call" field="Activationcall" />
            <Column header="Activation Call Date Time" field="Activationcalldatetime" />
            <Column header="Status" field="status" />
            <Column header="Handover Equipment" field="Handover" />
            <Column header="Rejected Reason" field="Rejectedreason" />
            <Column header="Enroll Type" field="Enrolltype" />
            <Column header="Reviewer Note" field="Reviewernote" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default DialogForShowData;
