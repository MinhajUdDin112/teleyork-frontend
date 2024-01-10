import React from "react";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
export default function DisplayAdvanceSearchApiResponse({ searchData, setSearchBy }) {
    const navigate = useNavigate();
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName.toUpperCase();
    const handleEnrollmentIdClick = (rowData) => {
        setSearchBy(null);
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));
    };
    return (
        <div className="mt-4">
            <h1 className="daterange p-4 ml-4">Search Result </h1>

            <DataTable value={searchData.data} size="small" stripedRows resizableColumns paginator rows={10} rowsPerPageOptions={[25, 50]}>
                <Column
                    header="Enrollment ID"
                    field="enrollmentId"
                    body={(rowData) => (
                        <button style={{ border: "none", backgroundColor: "white", cursor: "pointer" }} onClick={() => handleEnrollmentIdClick(rowData)}>
                            {rowData.enrollmentId}
                        </button>
                    )}
                ></Column>
                <Column header="Enrollment Type" field="enrollment" body={(rowData) => (rowData?.isSelfEnrollment ? <p>Self Enrollment</p> : <p>Enrollment</p>)}></Column>
                <Column header="Name" field="name" body={(rowData) => <p>{rowData.firstName !== undefined ? rowData.lastName !== undefined ? rowData.firstName + " "+rowData.lastName:rowData.lastName:rowData.lastName !== undefined ? rowData.lastName:" "}</p>}></Column>
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
                <Column
                    field="createdAt"
                    header="Created At"
                    body={(rowData) =>
                        new Date(rowData.createdAt)
                            .toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                            })
                            .replace(/\//g, "-")
                    }
                />

                <Column
                    field="assignedToUser[0].name"
                    header="Phase"
                    body={(rowData) => {
                        console.log("row data is ", rowData);
                        return (
                            <span>
                                {/* {rowData.assignedToUser.map((user) => (
                <span key={user?.department?.department}>
                {user?.department?.department}
                </span>
            ))}*/}
                                {rowData.assignedToUser[0] !== undefined ? rowData.assignedToUser[0].department.department : undefined}
                            </span>
                        );
                    }}
                />
            </DataTable>
        </div>
    );
}
