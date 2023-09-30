import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BASE_URL from "../../../../config";
import Axios from "axios";

const CompletedEnrollments = () => {

    const [allCompletedEnrollments, setAllCompletedEnrollments] = useState([])

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    const getAllCompletedEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllCompletedEnrollments(res?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    };

    useEffect(() => {
        getAllCompletedEnrollments()
    }, []);

    return (
        <div className="card bg-pink-50">

            <div className="mx-5">

                <div className="">
                    <DataTable value={allCompletedEnrollments} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo"></Column>
                        <Column header="Enrollment ID" field="enrollmentId"></Column>
                        <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column header="DOB" field="DOB"></Column>
                        <Column header="ESN" field="ESN"></Column>
                        <Column header="MDN" field="MDN"></Column>
                        <Column header="Plan Name" field="Planname"></Column>
                        <Column header="Plan Price" field="Planprice"></Column>
                        <Column header="Phone Cost" field="Phonecost"></Column>
                        <Column header="Activation Call Made" field="Activationcall"></Column>
                        <Column header="Activation Call Date Time" field="Activationcalldatetime"></Column>
                        <Column header="Commission" field="Commission"></Column>
                        <Column header="Posting Date" field="Postingdate"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Handover Equipment" field="Handover"></Column>
                        <Column header="Option" field="Option"></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default CompletedEnrollments;