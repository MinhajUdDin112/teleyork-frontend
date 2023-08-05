import Axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const ShowDraftAll = () => {
    const { id } = useParams();
   const history = useHistory();
    const [allDraftData, setAllDraftData] = useState([]);
    const {user}= useSelector((state)=>state.login)
    const userId = user?.data._id;

    //Get All Draft
    const getDraftData = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/sms/draft/${id}`);
            if (response.status === 200) {
                const { data, msg } = response?.data;
                setAllDraftData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDraftData();
    }, [id]);

    const handleSubmit = () => {
        const response = Axios.post(`${BASE_URL}/api/sms/send?sentBy=${userId}&templateId=${id}`);
        if (response.status === 200) {
            console.log("Sent Successfully");
        }
    };
    const handleBack=()=>{
        history.push("/draft")
    }

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Template Data</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2">
                     <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft SMS" onClick={handleSubmit} />
                </div>
                <div className="">
                    <DataTable value={allDraftData} showGridlines>
                        <Column header="Name" field="name"></Column>
                        <Column header="Message" field="message"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Email" field="email"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default ShowDraftAll;
