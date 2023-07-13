import Axios from 'axios'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'

const Sent = () => {

    const [allSent, setAllSent] = useState([])

    //Get All Draft
    const getAllDraft = async () => {
        try {
            const response = await Axios.get("http://192.168.4.153:2023/api/sms/sent");
            if (response.status === 200) {
                const { data, msg } = response?.data;
                console.log('data', data)
                setAllSent(data);
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllDraft()
    }, []);

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Sent Template</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="">
                    <DataTable value={allSent} showGridlines >
                        <Column header="Sent By" field="sentBy.name" ></Column>
                        <Column header="Tracking ID" field="trackingId" ></Column>
                        <Column header="Template Id" field="templateId" ></Column>
                        <Column header="Name" field="name" ></Column>
                        <Column header="Email" field="email" ></Column>
                        <Column header="Mobile Number" field="mobileNo" ></Column>
                        <Column header="Status" field="status" ></Column>
                        <Column header="Message" field="message" ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default Sent