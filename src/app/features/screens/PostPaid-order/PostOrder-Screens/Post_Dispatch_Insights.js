import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import BillingNavbar from "../../customer_profile/modals/BillingNavbar";
import moment from "moment/moment";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Post_Dispatch_Insight = () => {

    const [selectedEnrollments, setSelectedEnrollments] = useState(null);
    const [rowClick, setRowClick] = useState(true);
    const [allCompletedEnrollments, setAllCompletedEnrollments] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [historyData, setHistoryData] = useState();

    const selectedid = localStorage.getItem("selectedId");
    const parseselectedid = JSON.parse(selectedid);
 // Get user data from ls
 const loginRes = localStorage.getItem("userData");
 const parseLoginRes = JSON.parse(loginRes);

  // Get role name  from login response
  const roleName = parseLoginRes?.role?.role;
  const toCapital = roleName ? roleName.toUpperCase() : "DEFAULT_VALUE";

  const navigate = useNavigate();
    const formik = useFormik({

        initialValues: {
            status: "",
            startDate: "",
            endDate: "",
        },
        onSubmit: async (values, actions) => {

            const selectedStartDate = formik.values.startDate;
            const selectedendDate = formik.values.endDate;
            const formattedStartDate = selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD') : '';
            const formattedEndDate = selectedendDate ? moment(selectedendDate).format('YYYY-MM-DD') : '';

            setIsSearch(true);
            const dataToSend = {

                status: formik.values.status,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            };
            console.log("data to send is", dataToSend);
            setIsLoading(true);
            // try {
            //     const response = await Axios.post(`${BASE_URL}/api/user/customerHistory`, dataToSend);
            //     if (response?.status === 200 || response?.status === 201) {
            //         setHistoryData(response?.data?.data);
            //         console.log("Data is",response?.data?.data)
            //     }
            // } catch (error) {
            //     toast.error(error?.response?.data?.msg);
            //     setIsLoading(false);
            // }

        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));      
    };
    const showData=()=>{
        
    }
    return (
        <div>

            <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <h2 className="font-bold"> Dispatch Insights</h2>
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date From:</p>
                        <Calendar id="startDate" value={formik.values.startDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date To:</p>
                        <Calendar id="endDate" value={formik.values.endDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                    </div>

                    <div>
                        <Button
                            label="Search"
                            type="submit"
                            className="mt-4 text-lg bg-green-400 border-none w-7rem pt-3 pb-2 text-center"

                        />
                    </div>
                </div>

<div className="mt-3 text-center">
    <h3>Last 24 Hours insights</h3>
</div>
<hr className="w-50% color-black"></hr>
                <div className="flex justify-content-between mt-5">
                    <div className="card text-center cursor-pointer" onClick={showData}>
                        <h4>
                            Label Created
                        </h4>
                        <h3>
                            10
                        </h3>
                    </div>
                    <div className="card text-center cursor-pointer" onClick={showData}>
                        <h4>
                            Label Printed
                        </h4>
                        <h3>
                            5
                        </h3>
                    </div>
                    <div className="card text-cente cursor-pointer" onClick={showData}>
                        <h4>
                            Pre-Shipment
                        </h4>
                        <h3>
                            5
                        </h3>
                    </div>
                    <div className="card text-center cursor-pointer" onClick={showData}>
                        <h4>
                           In-Transit
                        </h4>
                        <h3>
                        3
                        </h3>
                    </div>
                    <div className="card text-center cursor-pointer" onClick={showData}>
                        <h4>
                           Dilevered
                        </h4>
                        <h3>
                            2
                        </h3>
                    </div>
                </div>

                <div className=" mt-5">
                    <h3 className="mb-3">
                        Dispatch Insights
                    </h3>
                <DataTable  selectionMode={rowClick ? null : 'checkbox'} selection={selectedEnrollments} onSelectionChange={(e) => setSelectedEnrollments(e.value)}   value={ allCompletedEnrollments} 
                            globalFilterFields={['enrollmentId',"name"]}  emptyMessage="No customers found."
                            stripedRows resizableColumns size="small"   paginator rows={10} rowsPerPageOptions={[ 25, 50]}>
                            {/* <Column expander style={{ width: "3em" }} /> */}
                        {/* <Column header="#" field="SNo"></Column> */}       
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
               
                        <Column header="Enrollment ID" field="enrollmentId"  body={(rowData) => (
                    <button style={{border:'none', backgroundColor:'white', cursor:'pointer'}} onClick={() => handleEnrollmentIdClick(rowData)}>
                        {rowData.enrollmentId}
                    </button>
                )}></Column>
                 <Column header="Enrollment Type" field="enrollment"></Column>
                       
                        <Column header="Name" field="name"></Column>
                        <Column header="Address" field="address1"></Column>
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
                        <Column field="createdBy.name" header="Created By"/>
                        {
                            toCapital.includes("CSR") ? "":
                            <Column field="approvedBy.name" header="Approved By" />  
                           
                        }
                        {
                            toCapital.includes("CSR") ? "": <Column
                            field="Approved At"
                            header="Approved At"
                            body={(rowData) =>
                                new Date(rowData.approvedAt)
                                    .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")
                            }
                        />
                        }
                        
                         <Column/>
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
                    {isLoading ? <ProgressSpinner  className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
              
                 </div>
            </div>
        </div>
    )
}
export default Post_Dispatch_Insight;