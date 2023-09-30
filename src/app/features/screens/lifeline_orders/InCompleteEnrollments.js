import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { Button } from "primereact/button";

const InCompleteEnrollments = () => {

    const [allInCompletedEnrollments, setAllInCompletedEnrollments] = useState([])

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    const getAllInCompletedEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllInCompletedEnrollments(res?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    };

    // const Actions = (rowData) => {
    //     return (
    //         <>
    //             <Button label="Edit Enrollment" className="p-button p-button-sm" />
    //         </>
    //     )
    // }

    useEffect(() => {
        getAllInCompletedEnrollments()
    }, []);

    return (
        <div className="card bg-pink-50">

            <div className="mx-5">
                <div className="">
                    <DataTable value={allInCompletedEnrollments} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo"></Column>
                        <Column header="Enrollment ID" field="enrollmentId"></Column>
                        <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column header="DOB" field="DOB"></Column>
                        <Column header="Plan Name" field="Planname"></Column>
                        <Column header="Enroll Date" field={(item) => item?.createdAt ? item?.createdAt.split('T')[0] : ""}></Column>
                        <Column header="Status" field="status"></Column>
                        {/* <Column header="Actions" body={Actions}></Column> */}
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default InCompleteEnrollments;
