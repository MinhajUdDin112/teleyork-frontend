import Axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowSentAll = () => {
    const { id } = useParams();
   const history = useHistory();
    const [allSentData, setAllSentData] = useState([]);

    //Get All Draft
    const getSenttData = async () => {
        try {
            const response = await Axios.get(`${BASE_URL}/api/sms/sent/${id}`);
            if (response.status === 200) {
                const { data, msg } = response?.data;
                setAllSentData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSenttData();
    }, [id]);
    const handleBack=()=>{
        history.push("/sent")
    }

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Template Data</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2 my-3">
                     <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                </div>
                <div className="">
                    <DataTable value={allSentData} showGridlines>
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

export default ShowSentAll;
