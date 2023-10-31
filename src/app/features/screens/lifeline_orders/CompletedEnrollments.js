import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import ReactPaginate from "react-paginate";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import BASE_URL from "../../../../config";
import Axios from "axios";

const CompletedEnrollments = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [allCompletedEnrollments, setAllCompletedEnrollments] = useState([]);
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update search term state
        // Implement your search logic here
        const filteredResults = allCompletedEnrollments.filter((enrollment) => {
            if (enrollment.firstName !== undefined) {
                let tomatch = enrollment.firstName + " " + enrollment.lastName;
                console.log(tomatch)
                if (enrollment.firstName.length === 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
                } else if (enrollment.firstName.length > 0) {
                    return tomatch.toLowerCase().includes(searchTerm.toLowerCase()) || enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
                }
            } else {
                return enrollment.enrollmentId.toString().toLowerCase().includes(searchTerm.toLowerCase());
            }
        });
        setSearchResults(filteredResults);
    };
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allCompletedEnrollments.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const visibleItems = allCompletedEnrollments.slice(offset, offset + itemsPerPage);

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const getAllCompletedEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllCompletedEnrollments(res?.data?.data);
            }
        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    };

    useEffect(() => {
        getAllCompletedEnrollments();
    }, []);

    return (
        <div className="card bg-pink-50">
            <div className="card mx-5 p-0 border-noround">
                <div className="flex " style={{ padding: "25px" }}>
                    <div className=" mb-3" style={{ position: "absolute", right: "120px" }}>
                        <AllEnrollmentSearchbar onSearch={handleSearch} />
                    </div>
                </div>
                <div className="" style={{ marginTop: "30px", padding: "15px" }}>
                    <DataTable value={searchTerm === "" ? visibleItems : searchResults} showGridlines resizableColumns columnResizeMode="fit">
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
                    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                </div>
            </div>
            <br />
        </div> 
    );
};

export default CompletedEnrollments;
