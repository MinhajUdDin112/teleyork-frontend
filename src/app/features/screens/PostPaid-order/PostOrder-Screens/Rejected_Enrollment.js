import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { DateTime } from "luxon";
import { Column } from "primereact/column";
import Axios from "axios";
import { Dialog } from "primereact/dialog";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Rejected_Enrollments = () => {
    const [selectedEnrollments, setSelectedEnrollments] = useState(null);
    const [rowClick, setRowClick] = useState(true);
   const [reasonbody,setReasonBody]=useState(null) 
   const [visible,setVisible]=useState(false)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        enrollment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdFilter: { value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO },
        createdTo: { value: null, matchMode: FilterMatchMode.LESS_THAN_OR_EQUAL_TO },
    });
    const [createDateToFilterValue, setCreatedDateToFilterValue] = useState("");
    const [enrollmentIdFilterValue, setEnrollmentIdFilterValue] = useState("");
    const [createDateFilterValue, setCreatedDateFilterValue] = useState("");
    const [globalFilterValue, setGlobalFilterValue] = useState("");
       

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
            const parsedDate = DateTime.fromJSDate(new Date(e.value));
            let easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
            easternDateTime = easternDateTime.set({
                hour: 23,
                minute: 59,
                second: 0,
            });

            const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
            const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
            const value2=etDateObject.toSeconds()
            setCreatedDateToFilterValue(e.value)
            _filters["createdTo"].value = value2
            setFilters(_filters);
        } else {
            const parsedDate = DateTime.fromJSDate(new Date(e.value));
            const easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
            const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
            const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
            const value=etDateObject.toSeconds()

            setCreatedDateFilterValue(e.value);
            _filters["createdFilter"].value = value
            setFilters(_filters);
        }
    };
    const [dateRange, setDateRange] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [allEnrollments, setAllEnrollments] = useState([]);
    const [CsrId, setCsrId] = useState();
    const [zipCode, setZipCode] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openDialogeForActivate, setOpenDialogeForActivate] = useState(false);
    const [isButtonLoading, setisButtonLoading] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState();
    const [isEnrolmentId, setIsEnrolmentId] = useState();
    const [expandedRows, setExpandedRows] = useState([]);

    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);

    const location = useLocation();
    const currentPath = location?.pathname;

    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div>
    //             <DataTable value={[data]} stripedRows>
    //                 <Column field="DOB" header="DOB" body={(rowData) => (rowData?.DOB ? rowData.DOB.split("T")[0] : "")} />
    //                 <Column field="plan.name" header="Plan Name" />
    //                 <Column field="createdBy?.name" header="Created BY" />
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
    //                 <Column field="rejectedReason" header="Rejected Reason" />
    //                 <Column field="Enrolltype" header="Enroll Type" />
    //                 <Column field="Reviewernote" header="Reviewer Note" />
    //             </DataTable>
    //         </div>
    //     );
    // };

    const handleEnrollmentIdClick = (rowData) => {
        navigate("/customer-profile", { state: { selectedId: rowData._id } });
        localStorage.setItem("selectedId", JSON.stringify(rowData._id));
    };

    const navigate = useNavigate();

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
   
     // Get role name  from login response
     const roleName = parseLoginRes?.role?.role;
     const toCapital = roleName ? roleName.toUpperCase() : "DEFAULT_VALUE";


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
    }, []);

    const getAllEnrollments = async () => {
        setIsLoading(true);
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${parseLoginRes?._id}&accountType=Postpaid`);
            if (res?.status === 200 || res?.status === 201) {
                if (!res?.data?.data) {
                    toast.error(res?.data?.msg);
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
                            createdFilter:DateTime.fromFormat(item.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() ,
                            createdTo: DateTime.fromFormat(item.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds(),
                      
                    }));
      
                  setAllEnrollments(updatedData);
                }
    
                setIsLoading(false);
                localStorage.removeItem("zipData");
            }
        } catch (error) {
             toast.error( error?.response?.data?.msg);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllEnrollments();
    }, []);

    const viewRow = async (rowData) => {
        setisButtonLoading(true);
        const _id = rowData._id;
        setSelectedEnrollmentId(_id);
        try {
            const response = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${_id}`);
            if (response?.status === 201 || response?.status === 200) {
                localStorage.setItem("basicData", JSON.stringify(response.data));
                localStorage.setItem("address", JSON.stringify(response.data));
                const storeData=true;
                localStorage.setItem("fromRejected", JSON.stringify(storeData));
                let storedData = JSON.parse(localStorage.getItem("fromIncomplete")) || {};
                if (storedData) {
                    storedData = false;
                    localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                } else {
                    storedData = false;
                    localStorage.setItem("fromIncomplete", JSON.stringify(storedData));
                }
                navigate("/post-enrollment");
                setisButtonLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
        setisButtonLoading(false);
    };

    const approveRow = async (rowData) => {
        setisButtonLoading(true);
        const approvedBy = parseLoginRes?._id;
        const enrolmentId = rowData?._id;
        const approved = true;
        const dataToSend = { approvedBy, enrolmentId, approved };
        try {
            const response = await Axios.patch(`${BASE_URL}/api/user/approval`, dataToSend);
            if (response?.status === 201 || response?.status === 200) {
                toast.success("Approved");
                setisButtonLoading(false);
                getAllEnrollments();
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            setisButtonLoading(false);
        }
    };
    const actionTemplate = (rowData) => {  
        const createduser = rowData?.createdBy?.name
        const toCapitalCreatedUser = createduser.toUpperCase();
        const userName = parseLoginRes?.userName
        const toCapitalUserName=userName.toUpperCase();
       
        if(toCapitalCreatedUser==toCapitalUserName){
            return (
                  
                <Button label="Edit" onClick={() => viewRow(rowData)} className=" p-button-success mr-2 ml-2 pt-1 pb-1 " text raised disabled={isButtonLoading} />
            );
        }
        else{
            return null
        } 
    };

   
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
                    <label className=" p-2" style={{ fontSize: "19px", textAlign: "center", color: "grey" }}>
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
        <div className="card ">  
        <div className="card p-0 ">
            <ToastContainer />
            <div className="flex justify-content-between ">
                <div className="">
                    <h3 className=" font-bold   pl-2 mt-4"><strong>Rejected Enrollments</strong></h3>
                </div>
            </div>
            {/* <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Date Range</p>
                        <Calendar id="range" value={dateRange} onChange={(e) => setDateRange(e.value)} selectionMode="range" showIcon readOnlyInput style={{ width: "23rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-sm font-semibold ">Search</p>
                        <InputText value={search} onChange={(e) => setSearch(e.value)} placeholder="Search by Customer F Name, L Name, Enrollment ID" style={{ width: "23rem" }} />
                    </div>
                    <div className="p-1">
                        <Button label="Search" className="mt-4 text-sm bg-green-200 border-none w-7rem" />
                    </div>
                </div>
            </div> */}
            {/* <div className="card p-3 mx-5 border-noround bg-green-200 "><p className="text-sm font-semibold">Search Result: 0</p></div> */}
            <div >
                <div className="flex justify-content-end   ">{/* <InputText className="w-15rem my-2 text-base h-2.5rem" placeholder="Keyword Search"></InputText> */}</div>
                {isButtonLoading ? <ProgressSpinner  className="flex flex-wrap justify-content-center flex-row mt-4" />: null}

                <div className="">
                    <DataTable selectionMode={rowClick ? null : 'checkbox'} selection={selectedEnrollments} onSelectionChange={(e) => setSelectedEnrollments(e.value)} value={allEnrollments} filters={filters} globalFilterFields={["enrollmentId", "name"]} header={header} emptyMessage="No customers found." stripedRows resizableColumns size="small"  paginator rows={10} rowsPerPageOptions={[25, 50]} >
                        {/* <Column expander style={{ width: "3em" }} /> */}
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
               
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
                        <Column  field="createdBy.name" header="Created By" />
                        {
                            toCapital.includes("CSR") ? "":<Column field="rejectedBy.name" header="Rejected By" />
                        }
                        {
                            toCapital.includes("CSR") ? "": <Column
                            field="Rejected At"
                            header="Rejected At"
                            body={(rowData) =>
                                new Date(rowData.rejectedAt)
                                    .toLocaleDateString("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    .replace(/\//g, "-")
                            }
                        />
                        }

                        <Column field="reajectedReason" header="Rejected Reason"   
                           body={(rowData) => {   
                            if(rowData.reajectedReason !== undefined){
                            let template = rowData.reajectedReason;                           ;
                            let shortline = template.substring(0, 10);
                            let fullline = template.substring(15, template.length);
                          
                            return (
                                <div id="template">
                                    {template.length > 10 ? (
                                        <p>
                                            {shortline}
                                            <span
                                                style={{ color: "black", cursor: "pointer", fontSize: "28px", lineHeight:'0px' }}
                                                onClick={(e) => {
                                                    setReasonBody(rowData.reajectedReason);
                                                    setVisible(true);
                                                }}
                                            >...
                                            </span>
                                        </p>
                                    ) : (
                                        <p>{template}</p>
                                    )}
                                </div>
                            );
                           }}}  
                         />
                        
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

     <Column header="Actions" body={actionTemplate}></Column>
                    </DataTable>
                </div>
            </div>
            <br />   
            <Dialog
                            header="Rejected Reason"
                            visible={visible}
                            style={{ width: "50vw" }}
                            draggable={false}
                            onHide={() => {
                                setVisible(false);
                            }}
                        >
                         <p>{reasonbody}</p>
                        </Dialog>
            </div>
        </div>
    );
};

export default Rejected_Enrollments;
