import React, { useEffect, useState } from "react";
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

    const [isstatus, setisstatus] = useState();
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


    useEffect(() => {
        (async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/user/dispatchInsight?userId=${parseLoginRes?._id}&accountType=Postpaid`);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                    console.log("Data is", response?.data?.data)
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }
        })();
    }, []);

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
            try {
                const response = await Axios.get(`${BASE_URL}/api/user/dispatchInsight?userId=${parseLoginRes?._id}&accountType=Postpaid&startDate=${formattedStartDate}T00:00:00&endDate=${formattedEndDate}T23:59:59`);
                if (response?.status === 200 || response?.status === 201) {
                    setHistoryData(response?.data?.data);
                    console.log("Data is", response?.data?.data)
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            }

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
    const showData = () => {

    }
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

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
                        <div className="card text-center cursor-pointer" onClick={() => { setisstatus("totall") }}>
                            <h4>
                                Label Created
                            </h4>
                            <h3>
                                {historyData?.totalCount}
                            </h3>
                        </div>
                        <div className="card text-center cursor-pointer" onClick={() => { setisstatus("Printed") }}>
                            <h4>
                                Label Printed
                            </h4>

                            <h3>
                                {historyData?.statusCounts?.labelPrinted}
                            </h3>
                        </div>
                        <div className="card text-center cursor-pointer" onClick={() => { setisstatus("Shipment") }}>
                            <h4>
                                Pre-Shipment
                            </h4>
                            <h3>
                                {historyData?.statusCounts?.preShipment}
                            </h3>
                        </div>
                        <div className="card text-center cursor-pointer" onClick={() => { setisstatus("Transit") }}>
                            <h4>
                                In-Transit
                            </h4>
                            <h3>
                                {historyData?.statusCounts?.inTransit}
                            </h3>
                        </div>
                        <div className="card text-center cursor-pointer" onClick={() => { setisstatus("Dilevered") }}>
                            <h4>
                                Delivered
                            </h4>
                            <h3>
                                {historyData?.statusCounts?.delivered
                                }
                            </h3>
                        </div>
                    </div>

                    <div className=" mt-5">
                        <h3 className="mb-3">
                            Dispatch Insights
                        </h3>
                        {
                            isstatus == "totall" ? <>
                                <DataTable value={historyData?.enrollments
                                } stripedRows resizableColumns size="small" paginator rows={10} rowsPerPageOptions={[25, 50]}>

                                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                                    <Column header="Enrollment ID" field="enrollmentId" body={(rowData) => (
                                        <button style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                            {rowData.enrollmentId}
                                        </button>
                                    )}></Column>


                                    <Column header="Name" field="firstName"></Column>
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
                                    <Column field="createdBy.name" header="Created By" />
                                    {
                                        toCapital.includes("CSR") ? "" :
                                            <Column field="approvedBy.name" header="Approved By" />

                                    }
                                    {
                                        toCapital.includes("CSR") ? "" : <Column
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

                                    <Column />
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
                                {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
                            </>
                                : isstatus == "Printed" ? <>
                                    <DataTable value={historyData?.enrollmentsByStatus?.labelPrinted

                                    } stripedRows resizableColumns size="small" paginator rows={10} rowsPerPageOptions={[25, 50]}>

                                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                                        <Column header="Enrollment ID" field="enrollmentId" body={(rowData) => (
                                            <button style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                                {rowData.enrollmentId}
                                            </button>
                                        )}></Column>


                                        <Column header="Name" field="firstName"></Column>
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
                                        <Column field="createdBy.name" header="Created By" />
                                        {
                                            toCapital.includes("CSR") ? "" :
                                                <Column field="approvedBy.name" header="Approved By" />

                                        }
                                        {
                                            toCapital.includes("CSR") ? "" : <Column
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

                                        <Column />
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
                                    {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}
                                </>
                                    : isstatus == "Shipment" ? <>

                                        <DataTable value={historyData?.enrollmentsByStatus?.
preShipment

                                        } stripedRows resizableColumns size="small" paginator rows={10} rowsPerPageOptions={[25, 50]}>

                                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                                            <Column header="Enrollment ID" field="enrollmentId" body={(rowData) => (
                                                <button style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                                    {rowData.enrollmentId}
                                                </button>
                                            )}></Column>


                                            <Column header="Name" field="firstName"></Column>
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
                                            <Column field="createdBy.name" header="Created By" />
                                            {
                                                toCapital.includes("CSR") ? "" :
                                                    <Column field="approvedBy.name" header="Approved By" />

                                            }
                                            {
                                                toCapital.includes("CSR") ? "" : <Column
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

                                            <Column />
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
                                        {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}</>
                                        : isstatus == "Transit" ? <> <DataTable value={historyData?.enrollmentsByStatus?.inTransit

                                        } stripedRows resizableColumns size="small" paginator rows={10} rowsPerPageOptions={[25, 50]}>

                                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                                            <Column header="Enrollment ID" field="enrollmentId" body={(rowData) => (
                                                <button style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                                    {rowData.enrollmentId}
                                                </button>
                                            )}></Column>


                                            <Column header="Name" field="firstName"></Column>
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
                                            <Column field="createdBy.name" header="Created By" />
                                            {
                                                toCapital.includes("CSR") ? "" :
                                                    <Column field="approvedBy.name" header="Approved By" />

                                            }
                                            {
                                                toCapital.includes("CSR") ? "" : <Column
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

                                            <Column />
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
                                            {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}</>
                                            : isstatus == "Dilevered" ? <> <DataTable value={historyData?.enrollmentsByStatus?.delivered
                                            } stripedRows resizableColumns size="small" paginator rows={10} rowsPerPageOptions={[25, 50]}>

                                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

                                                <Column header="Enrollment ID" field="enrollmentId" body={(rowData) => (
                                                    <button style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }} onClick={() => handleEnrollmentIdClick(rowData)}>
                                                        {rowData.enrollmentId}
                                                    </button>
                                                )}></Column>


                                                <Column header="Name" field="firstName"></Column>
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
                                                <Column field="createdBy.name" header="Created By" />
                                                {
                                                    toCapital.includes("CSR") ? "" :
                                                        <Column field="approvedBy.name" header="Approved By" />

                                                }
                                                {
                                                    toCapital.includes("CSR") ? "" : <Column
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

                                                <Column />
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
                                                {isLoading ? <ProgressSpinner className="flex flex-wrap justify-content-center flex-row mt-4" /> : null}</>
                                                : ""
                        }



                    </div>
                </div>
            </form>
        </div>
    )
}
export default Post_Dispatch_Insight;