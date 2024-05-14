import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterMatchMode } from "primereact/api";
import AllEnrollmentSearchbar from "./AllEnrollmentSearchbar";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Continue } from "../../../../../../../utility";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PrepaidInCompleteEnrollments = () => {
    // State For Select Row
    const [selectedEnrollments, setSelectedEnrollments] = useState(null);
    const [rowClick, setRowClick] = useState(true);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
    });
    const [createDateToFilterValue, setCreatedDateToFilterValue] = useState("");
    const [enrollmentIdFilterValue, setEnrollmentIdFilterValue] = useState("");
    const [createDateFilterValue, setCreatedDateFilterValue] = useState("");
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [fromIncomplete, setFromIncomplete] = useState(null);

    const onGlobalFilterValueChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const onNameDateEnrollmentIdValueFilter = (e, field) => {
        const value = e.target.value;
        let _filters = { ...filters };
        if (field === "enrollment") {
            _filters["enrollment"].value = value;
            setFilters(_filters);
            setEnrollmentIdFilterValue(value);
        } else if (field === "createdTo") {
            setCreatedDateToFilterValue(e.value);
            const updatedDate = new Date(e.value);
            updatedDate.setDate(updatedDate.getDate() + 1);
            _filters["createdTo"].value = new Date(updatedDate).toISOString();
            setFilters(_filters);
        } else {
            setCreatedDateFilterValue(e.value);
            _filters["createdAt"].value = new Date(e.value).toISOString();
            setFilters(_filters);
        }
    };

    const [allInCompletedEnrollments, setAllInCompletedEnrollments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();

    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);

    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();

    // const rowExpansionTemplate = (data) => {

    //     return (
    //         <div>

    //   <DataTable value={[data]} stripedRows >
    //                 <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
    //                 <Column field="createdBy?.name" header="Created BY" />
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="plan.price" header="Plan Price" />
    //                 <Column field="Phonecost" header="Phone Cost" />
    //                 <Column field="Amountpaid" header="Amount Paid by Customer" />
    //                 <Column field="Postingdate" header="Posting Date" />
    //                 <Column field="EsnNumber" header="ESN Number" />
    //                 <Column field="Telephone" header="Telephone Number" />
    //                 <Column field="Activationcall" header="Activation Call" />
    //                 <Column field="Activationcalldatetime" header="Activation Call Date Time" />
    //                 <Column field="status" header="Status" />
    //                 <Column field="Handover" header="Handover Equipment" />

    //                 <Column field="Enrolltype" header="Enroll Type" />
    //                 <Column field="Reviewernote" header="Reviewer Note" />
    //             </DataTable>
    //         </div>
    //     );
    // };

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);

    const actionBasedChecks = () => {
        const loginPerms = localStorage.getItem("permissions");
        const parsedLoginPerms = JSON.parse(loginPerms);

        const isCreate = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "create")));
        setIsCreate(isCreate);

        const isManage = parsedLoginPerms.some((node) => node?.subModule.some((subNode) => subNode?.route === currentPath && subNode?.actions.some((action) => action?.name === "manage")));
        setIsManage(isManage);
    };

    useEffect(() => {
        actionBasedChecks();
        setFromIncomplete(false);
    }, []);

    const getAllInCompletedEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${parseLoginRes?._id}&accountType=Prepaid`);
            if (res?.status === 200 || res?.status === 201) {
                for (let i = 0; i < res?.data?.data?.length; i++) {
                    res.data.data[i].enrollment = res.data.data[i].isSelfEnrollment ? "Self Enrollments" : "Enrollment";
                    res.data.data[i].name = `${res.data.data[i]?.firstName ? (res.data.data[i]?.firstName).toUpperCase() : ""} ${res.data.data[i]?.lastName ? (res.data.data[i]?.lastName).toUpperCase() : ""}`;
                    res.data.data[i].createdDate = new Date(res.data.data[i].createdAt)
                        .toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                        })
                        .replace(/\//g, "-");
                    res.data.data[i].createdTo = res.data.data[i].createdAt;
                }
                res.data.data.sort((a, b) => {
                    const dateComparison = new Date(b.activatedAt) - new Date(a.activatedAt);

                    if (dateComparison !== 0) {
                        return dateComparison;
                    }

                    // If dates are equal, compare by time
                    return new Date(b.activatedAt).getTime() - new Date(a.activatedAt).getTime();
                });

                setAllInCompletedEnrollments(res?.data?.data);

                setIsLoading(false);

                localStorage.removeItem("basicData");
                localStorage.removeItem("address");
                localStorage.removeItem("programmeId");
            }
        } catch (error) {
            toast.error(`Error Fetching Enrollment data: ${error?.response?.data?.msg}`);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllInCompletedEnrollments();
    }, []);

    const viewRow = async (rowData) => {
        setisButtonLoading(true);
        const _id = rowData._id;
        setSelectedEnrollmentId(_id);
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);

            if (response?.status === 201 || response?.status === 200) {
                localStorage.setItem("comingfromincomplete", true);
                localStorage.setItem("prepaidbasicData", JSON.stringify(response.data));
                localStorage.setItem("prepaidaddress", JSON.stringify(response.data));
                navigate("/prepaid-newenrollment");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        setisButtonLoading(false);
    };
    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));
    };

    const header = () => {
        return (
            <div className="flex flex-wrap justify-content-left mt-2 w-full maindiv  " style={{ backgroundColor: "white" }}>
                <div className="flex flex-wrap w-full inputtext" style={{ height: "45px", border: "none", alignItems: "center", backgroundColor: "white" }}>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterValueChange} placeholder="Search..." style={{ height: "35px", marginLeft: "5px", width: "20%" }} />
                    <Dropdown
                        className="enrollment"
                        options={[
                            { label: "Self Enrollment", value: "Self Enrollments" },
                            { label: "Enrollment", value: "Enrollment" },
                            { label: "All Enrollments", value: null },
                        ]}
                        value={enrollmentIdFilterValue}
                        onChange={(e) => {
                            onNameDateEnrollmentIdValueFilter(e, "enrollment");
                        }}
                        placeholder="Enrollment Type"
                    />
                    <div
                        className="cal"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "43%",
                        }}
                    >
                        <span style={{ fontWeight: "400", paddingLeft: "2%" }}>From</span>
                        <Calendar
                            value={createDateFilterValue}
                            dateFormat="mm/dd/yy"
                            // placeholder="Start Date"
                            onChange={(e) => {
                                onNameDateEnrollmentIdValueFilter(e, "createdAt");
                            }}
                            showIcon
                            style={{ height: "30px", width: "40%" }}
                        />
                        <span style={{ fontWeight: "400" }}>To</span>
                        <Calendar
                            value={createDateToFilterValue}
                            dateFormat="mm/dd/yy"
                            // placeholder="End Date"
                            onChange={(e) => {
                                onNameDateEnrollmentIdValueFilter(e, "createdTo");
                            }}
                            showIcon
                            style={{ height: "30px", border: "none", width: "40%" }}
                        />
                    </div>

                    {/* <div className="w-20rem ml-4 mt-2">
                        <label className="p-2" style={{ fontSize: "19px", textAlign: "center", color: "grey" }}>
                            To
                        </label>
                    </div> */}
                </div>
            </div>
        );
        // <div className="flex flex-wrap justify-content-center mt-2">
        //     <Dropdown
        //         className="mt-2 w-15rem ml-4"
        //         options={[
        //             { label: "Self Enrollment", value: "Self Enrollments" },
        //             { label: "Enrollment", value: "Enrollment" },
        //             { label: "All Enrollments", value: null },
        //         ]}
        //         value={enrollmentIdFilterValue}
        //         onChange={(e) => {
        //             onNameDateEnrollmentIdValueFilter(e, "enrollment");
        //         }}
        //         placeholder="Enrollment Type"
        //     />
        //     <InputText value={globalFilterValue} onChange={onGlobalFilterValueChange} className="w-15rem ml-4 mt-2" placeholder="Search By Name or Enrollment ID" />
        //     <div className="w-45rem ml-4 mt-2">
        //         <Calendar
        //             className="w-21rem"
        //             value={createDateFilterValue}
        //             dateFormat="mm/dd/yy"
        //             placeholder="Start Date"
        //             onChange={(e) => {
        //                 onNameDateEnrollmentIdValueFilter(e, "createdAt");
        //             }}
        //             showIcon
        //         />
        //         <label className=" p-2" style={{ fontSize: "19px", textAlign: "center", color: "grey" }}>
        //             To
        //         </label>
        //         <Calendar
        //             className="w-21rem"
        //             value={createDateToFilterValue}
        //             dateFormat="mm/dd/yy"
        //             placeholder="End Date"
        //             onChange={(e) => {
        //                 onNameDateEnrollmentIdValueFilter(e, "createdTo");
        //             }}
        //             showIcon
        //         />
        //     </div>
        // </div>
        //);
    };
    const actionTemplate = (rowData) => {
        return (
            <div className="flex flex-wrap justify-content-center" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading || !isCreate}>
                <Continue />
                {/* <Button label="Continue" className="pb-1 pt-1" onClick={() => viewRow(rowData)} text raised disabled={isButtonLoading || !isCreate} /> */}
            </div>
        );
    };

    return (
        <div className="card ">
            <div className="text-center w-full h-4 heading">
                <h3>INCOMPLETE ENROLLMENTS</h3>
            </div>
            <div className="card p-0 ">
                <div>
                    <DataTable
                        selectionMode={rowClick ? null : "checkbox"}
                        selection={selectedEnrollments}
                        onSelectionChange={(e) => setSelectedEnrollments(e.value)}
                        size="small"
                        value={allInCompletedEnrollments}
                        stripedRows
                        resizableColumns
                        paginator
                        rows={10}
                        filters={filters}
                        globalFilterFields={["enrollmentId", "name"]}
                        header={header}
                        emptyMessage="No customers found."
                        rowsPerPageOptions={[25, 50]}
                        style={{ fontFamily: "Inter", fontSize: "14px" }}
                    >
                        {/* <Column expander style={{ width: "3em" }} /> */}
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>

                        <Column
                            header="Enrollment ID"
                            field="enrollmentId"
                            body={(rowData) => (
                                <button style={{ border: "none", backgroundColor: "white", cursor: "pointer" }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                    {rowData.enrollmentId}
                                </button>
                            )}
                        ></Column>
                        <Column header="Enrollment Type" field="enrollment"></Column>
                        <Column header="Name" field="name"></Column>
                        <Column header="City" field="city"></Column>
                        <Column header="State" field="state"></Column>
                        <Column header="Zip" field="zip"></Column>
                        <Column field="contact" header="Telephone Number" />
                        <Column
                            field="DOB"
                            header="DOB"
                            body={(rowData) =>
                                new Date(rowData.DOB)
                                    .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")
                            }
                        />
                        <Column field="createdDate" header="Created At" />

                        <Column field="createdBy.name" header="Created By" />

                        <Column header="Address" field="address1"></Column>
                        <Column header="Actions" body={actionTemplate}></Column>
                    </DataTable>

                    {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
                </div>
            </div>
        </div>
    );
};

export default PrepaidInCompleteEnrollments;
