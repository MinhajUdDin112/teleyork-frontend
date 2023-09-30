import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import BASE_URL from "../../../../config";
import Axios from "axios";

const AllEnrollments = () => {

    const [allEnrollments, setAllEnrollments] = useState([])

    console.log('allEnrollments', allEnrollments)

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    const [dateRange, setDateRange] = useState(null);
    const [search, setSearch] = useState(null);
    const [master, setMaster] = useState(null);
    const [distributor, setDistributor] = useState(null);
    const [retailer, setRetailer] = useState(null);
    const [employee, setEmloyee] = useState(null);

    const masterOptions = [{ name: "Corporate Master", code: "CM" }];
    const distributorOptions = [{ name: "Distributor", code: "DB" }];
    const retailerOptions = [{ name: "Retailer", code: "RT" }];
    const employeeOptions = [{ name: "Employee", code: "EP" }];

    const getAllEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/all?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {
                setAllEnrollments(res?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    };

    useEffect(() => {
        getAllEnrollments()
    }, []);

    return (
        <div className="card bg-pink-50">
            {/* <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">All Enrollments</h3>
            </div>
            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} showIcon selectionMode="range" readOnlyInput className="w-25rem" style={{ width: "5px" }} />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Search</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name" className="w-25rem text-base" />
                    </div>
                </div>
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold ">Master</p>
                        <Dropdown placeholder="Select Master" value={master} options={masterOptions} onChange={(e) => setMaster(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Distributor</p>
                        <Dropdown placeholder="Select Distributor" value={distributor} options={distributorOptions} onChange={(e) => setDistributor(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                </div>
                <div className=" flex p-0 mx-3">
                    <div className="mr-5">
                        <p className="m-0 text-sm font-semibold ">Retailer</p>
                        <Dropdown placeholder="Select Retailer" value={retailer} options={retailerOptions} onChange={(e) => setRetailer(e.value)} optionLabel="name" className="w-25rem flex align-items-center" />
                    </div>
                    <div>
                        <p className="m-0 text-sm font-semibold ">Employee</p>
                        <Dropdown placeholder="Select Employee" value={employee} options={employeeOptions} onChange={(e) => setEmloyee(e.value)} optionLabel="name" className="w-25rem flex align-items-center text-sm" />
                    </div>
                </div>
                <div className="flex justify-content-end pt-1">
                    <Button label="Submit" className=" w-15rem bg-green-200 border-none" />
                </div>
            </div>
            <div className="card p-3 mx-5 border-noround bg-green-200 ">
                <p className="text-sm font-semibold">Search Result: 0</p>
            </div> */}
            <div className="card mx-5 p-0 border-noround">
                {/* <div className="flex justify-content-end border-bottom-2 bg-orange-200 px-5 py-2">
                    <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText>
                </div> */}
                <div className="">
                    <DataTable value={allEnrollments} showGridlines resizableColumns columnResizeMode="fit">
                        <Column header="#" field="SNo"></Column>
                        <Column header="Option" field="Option"></Column>
                        <Column header="Enrollment ID" field="enrollmentId"></Column>
                        <Column header="Name" field={(item) => `${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}`}></Column>
                        <Column header="Address" field="address1"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column header="DOB" field={(item) => item?.DOB ? item?.DOB.split('T')[0] : ""}></Column>
                        <Column header="Plan Name" field="plan.name"></Column>
                        <Column header="Plan Price" field="plan.price"></Column>
                        <Column header="Phone Cost" field="Phonecost"></Column>
                        <Column header="Amount Paid by Customer" field="Amountpaid"></Column>
                        <Column header="Posting Date" field="Postingdate"></Column>
                        <Column header="ESN Number" field="EsnNumber"></Column>
                        <Column header="Telephone Number" field="Telephone"></Column>
                        <Column header="Activation Call" field="Activationcall"></Column>
                        <Column header="Activation Call Date Time" field="Activationcalldatetime"></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Handover Equipment" field="Handover"></Column>
                        <Column header="Rejected Reason" field="Rejectedreason"></Column>
                        <Column header="Enroll Type" field="Enrolltype"></Column>
                        <Column header="Reviewer Note" field="Reviewernote"></Column>
                    </DataTable>
                </div>
            </div>
            <br />
        </div>
    );
};

export default AllEnrollments;
