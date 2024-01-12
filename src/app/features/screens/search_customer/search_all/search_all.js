import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Searchall({ searchValue,callSearchApi, setSearchBy,setSearchByValueClick }) {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState([]);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName.toUpperCase();
    const handleEnrollmentIdClick = (rowData) => { 
        setSearchByValueClick(false)
        setSearchBy(null);
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));
    };
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/search/${searchValue}`)
            .then((response) => {    
                if (typeof response.data.data === 'object' && !Array.isArray(response.data.data)) {
                    console.log('It is an object'); 
                     let arr=[response.data.data] 
                     setSearchData(arr); 
                  }  
                  else{
                setSearchData(response.data.data); 
                  }
            })
            .catch((err) => {
                setSearchData([]);
            });
    }, [callSearchApi]);
    return (
        <div className="card">
            <div className="card mx-5 pl-0 pr-0 pt-0">
                <h1 className="daterange ml-2 mt-2  pt-2">Search Result </h1>

                <DataTable value={searchData} size="small" className="p-1 mt-4" stripedRows resizableColumns paginator rows={10} rowsPerPageOptions={[25, 50]}>
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
                    <Column header="Name" field="name" body={(rowData) => <p>{`${rowData.firstName}  ${rowData.lastName}`}</p>}></Column>
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
                    {toCapital.includes("QA MANAGER") ? <Column field="assignToQa.name" header="Initial Assignee" /> : ""}

                    <Column
                        field="Phase"
                        header="Phase"
                        body={(rowData) => (
                            <span>
                                {rowData.assignedToUser.map((user) => (
                                    <span key={user?.department?.department}>{user?.department?.department}</span>
                                ))}
                            </span>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
}
