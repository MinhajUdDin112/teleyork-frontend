import React from "react" 
import { DataTable } from "primereact/datatable"; 
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
export default function DisplayAdvanceSearchApiResponse({searchData,setSearchBy}){  
     const navigate=useNavigate()    
     const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const roleName = parseLoginRes?.role?.role;
    const toCapital = roleName.toUpperCase();   
    const handleEnrollmentIdClick = (rowData) => {  
         setSearchBy(null)
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id)); 
    
    };
    

    return( 
       <div> 
            <h1 className="daterange p-4 ml-4">Search Result </h1>      
             
            <DataTable
                            value={searchData.data}
                            size="small"
                            stripedRows
                            resizableColumns
                            paginator
                            rows={10}
                            rowsPerPageOptions={[25, 50]}
                         
                        >
                          
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
                            {
                            toCapital.includes("QA MANAGER") ? <Column field="assignToQa.name" header="Initial Assignee"/>:""
                            }
                          
                            <Column
    field="Phase"
    header="Phase"
    body={(rowData) => (
        <span>
            {rowData.assignedToUser.map((user) => (
                <span key={user?.department?.department}>
                    {user?.department?.department}
                </span>
            ))}
        </span>
    )}
/>

                        
                        </DataTable>
       </div>
    )
}