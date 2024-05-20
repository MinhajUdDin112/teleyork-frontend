import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PrepaidAllEnrollments = ({enrollmentType,setCurrentSelected,setShowAllEnrollments}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [createDateToFilterValue, setCreatedDateToFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO}, 
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO}
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [enrollmentIdFilterValue, setEnrollmentIdFilterValue] = useState("");
    const [createDateFilterValue, setCreatedDateFilterValue] = useState("");
    const [filteredDates, setFilteredDates] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleEnrollmentIdClick = (rowData) => {  
        setCurrentSelected(rowData)
          setShowAllEnrollments(prev=>!prev)
    };
    // Get role name  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
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
    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${parseLoginRes?._id}&accountType=${enrollmentType}`);
            if (res?.status === 200 || res?.status === 201) {
                if (!res?.data?.data) {
                    toast.success(" No enrollments have been received from the previous department yet");
                } else if (res?.data?.data) {
                    const updatedData = res?.data?.data.map((item) => ({
                        ...item,
                        enrollment: item.isSelfEnrollment ? "Self Enrollments" : "Enrollment",
                        name: `${item?.firstName ? item?.firstName.toUpperCase() : ""} ${item?.lastName ? item?.lastName.toUpperCase() : ""}`,
                        createdDate: new Date(item.createdAt)
                            .toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                            })
                            .replace(/\//g, "-"),
                        createdTo: item.createdAt,
                    }));

                    setAllEnrollments(updatedData);
                }
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(`${error?.response?.data?.msg}`);
            setIsLoading(false);
        }
    };
    useEffect(() => {  
        setAllEnrollments([])
        getAllEnrollments();
    }, [enrollmentType]);
    const header = () => {
        return (
            <div className="flex flex-wrap justify-content-center mt-2">
                <Dropdown
                    className="mt-2 w-15rem ml-4"
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
                <InputText value={globalFilterValue} onChange={onGlobalFilterValueChange} className="w-15rem ml-4 mt-2" placeholder="Search By Name or Enrollment ID" />
                <div className="w-45rem ml-4 mt-2">
                    <Calendar
                        className="w-21rem"
                        value={createDateFilterValue}
                        dateFormat="mm/dd/yy"
                        placeholder="Start Date"
                        onChange={(e) => {
                            onNameDateEnrollmentIdValueFilter(e, "createdAt");
                        }}
                        showIcon
                    />
                    <label className="p-2" style={{ fontSize: "19px", textAlign: "center", color: "grey" }}>
                        To
                    </label>
                    <Calendar
                        className="w-21rem"
                        value={createDateToFilterValue}
                        dateFormat="mm/dd/yy"
                        placeholder="End Date"
                        onChange={(e) => {
                            onNameDateEnrollmentIdValueFilter(e, "createdTo");
                        }}
                        showIcon
                    />
                </div>
            </div>
        );
    };
    return (
        <>
            <ToastContainer className="custom-toast-container" />
            <div>
                <div>
                    <div className="flex font-bold pt-2">
                        <div className="mt-2 ml-2 pt-2 pl-1">
                            <h3>
                                <strong>Enrollments</strong>
                            </h3>
                        </div>                       
                    </div>
                    <div>
                        {isButtonLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}

                        <DataTable
                            value={filteredDates || allEnrollments}
                            selection={selectedRows}
                            onSelectionChange={(e) => setSelectedRows(e.value)}
                            size="small"
                            stripedRows
                            resizableColumns
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[25, 50]}
                            filters={filters}
                            globalFilterFields={["name", "enrollmentId"]}
                            header={header}
                            emptyMessage="No customers found."
                        >
                            {/* <Column expander style={{ width: "3em" }} /> */}
                            {/* <Column header="SNo" style={{ width: "3em" }} body={(rowData, rowIndex) => (rowIndex + 1).toString()} /> */}
                            <Column selectionMode="multiple" style={{ width: "3em" }} />
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
                            <Column header="Address" field="address1"></Column>
                            <Column header="City" field="city"></Column>
                            <Column header="State" field="state"></Column>
                            <Column header="Zip" field="zip" />
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
                            <Column field="contact" header="Contact" />
                            <Column field="createdBy.name" header="Created By" />
                            <Column field="createdDate" header="Created At" />
                        </DataTable>
                        {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
                    </div>
                </div>
                <br />
            </div>
        </>
    );
};
export default PrepaidAllEnrollments;
