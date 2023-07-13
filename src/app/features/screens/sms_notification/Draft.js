import Axios from 'axios'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'

const Draft = () => {

    const [allDraft, setAllDraft] = useState([])

    //Get All Draft
    const getAllDraft = async () => {
        try {
            const response = await Axios.get("http://192.168.4.153:2023/api/sms/draft");
            if (response.status === 200) {
                const { data, msg } = response?.data;
                setAllDraft(data);
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllDraft()
    }, []);

    const handleSubmit = () => {
        const response = Axios.post("http://192.168.4.153:2023/api/sms/send/64ad9b07fc04dc6ca623b9c3")
        if (response.status === 200) {
            console.log("Send Successfully")
        }
    }

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Draft Template</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft SMS" onClick={handleSubmit} />
                </div>
                <div className="">
                    <DataTable value={allDraft} showGridlines >
                        <Column header="Uploaded By" field="uploadedBy.name" ></Column>
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

export default Draft