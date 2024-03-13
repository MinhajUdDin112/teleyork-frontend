import React, { useEffect } from "react";
//import EnrollmentByStates from "./components/enrollment_stats/enrollment_stats";
import { useState } from "react";
import { DateTime } from "luxon";
import { Dropdown } from "primereact/dropdown";
import Last24HoursEnrollments from "./components/last24hours/Last24HoursEnrollments";
import { Calendar } from "primereact/calendar";
import AgentDateRangeStats from "./components/date_range_stats/daterange_agentenrollment/agent_daterange_stats";
import Last24HoursAgentEnrollments from "./components/last24hours/last_24hours_agent/Last24HoursAgentEnrollments";
import DateRangeStats from "./components/date_range_stats/date_range_stats";
import "./css/dashboard.css";
import Axios from "axios";
import DepartmentWiseRejectedInLast24 from "./components/last24hours/department_wise_rejected/department_wise_stats/department_wise_stats";
import DepartmentWiseRejectedByDateRange from "./components/date_range_stats/department_wise_rejected/department_wise_rejected_stat/department_wise_rejected_stat";
import DepartmentWiseRejectedDateRangeChart from "./components/date_range_stats/department_wise_rejected/department_wise_rejected_chart/department_wise_rejected_chart";
import Last24HoursSalesChannel from "./components/last24hours/last_24hours_sales_channel/stats/stats";
import DepartmentWiseRejectedLast24Chart from "./components/last24hours/department_wise_rejected/department_wise_rejected_last_24_chart/department_wise_rejected_last_24";
import DepartmentWiseAgentRejectedByDateRange from "./components/date_range_stats/daterange_agentenrollment/department_wise_rejected/department_wise_agent_rejected_stat/department_wise_agent_rejected_stat";
import DepartmentWiseAgentRejectedDateRangeChart from "./components/date_range_stats/daterange_agentenrollment/department_wise_rejected/department_wise_agent_rejected_chart/department_wise_agent_rejected_chart";
import DepartmentWiseAgentRejectedInLast24 from "./components/last24hours/last_24hours_agent/department_wise_rejected/department_wise_stats/department_wise_stats";
import DepartmentWiseAgentRejectedLast24Chart from "./components/last24hours/last_24hours_agent/department_wise_rejected/department_wise_rejected_last_24_chart/department_wise_rejected_last_24";
import DateRangeAgentSalesChannel from "./components/date_range_stats/daterange_agentenrollment/sales_channel/stats/stats";
import Last24HoursAgentSalesChannel from "./components/last24hours/last_24hours_agent/last_24hours_sales_channel/stats/stats";
import DateRangeSalesChannel from "./components/date_range_stats/sales_channel/stats/stats";
import DateRangeSalesChannelChart from "./components/date_range_stats/sales_channel/chart/chart";
import Last24AgentSalesChannelChart from "./components/last24hours/last_24hours_sales_channel/chart/chart";
const Dashboard = ({ permittedRoutes }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [agentOptions, setAgentOptions] = useState([]);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const userid = parseLoginRes._id;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const capitalizedSentence = (sentence) => {
        let words = sentence.split(" ");
        let capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let capitalizedSentence = capitalizedWords.join(" ");
        return capitalizedSentence;
    };
    useEffect(() => {
        if (parseLoginRes.role.role === "PROVISION MANAGER") {
            Axios.get(`${BASE_URL}/api/web/dashboard/getEnrollmentsForProvision?userId=${userid}`)
                .then((response) => {
                    let arr = [{ name: "Select Agent", value: null }];
                    for (let i = 0; i < response.data.data.length; i++) {
                        let obj = {};
                        obj.name = capitalizedSentence(response.data.data[i].agentName);
                        obj.value = response.data.data[i].agentId;
                        arr.push(obj);
                    }
                    setAgentOptions(arr);
                })
                .catch((err) => {});
        } else if (parseLoginRes.role.role === "TEAM LEAD") {
            Axios.get(`${BASE_URL}/api/web/dashboard/getEnrollmentsForTeamlead?userId=${userid}`)
                .then((response) => {
                    let arr = [{ name: "Select Agent", value: null }];
                    for (let i = 0; i < response.data.data.length; i++) {
                        let obj = {};
                        obj.name = capitalizedSentence(response.data.data[i].agentName);
                        obj.value = response.data.data[i].agentId;
                        arr.push(obj);
                    }
                    setAgentOptions(arr);
                })
                .catch((err) => {});
        } else if (parseLoginRes.role.role === "QA MANAGER") {
            Axios.get(`${BASE_URL}/api/web/dashboard/getEnrollmentsForUser?userId=${userid}`)
                .then((response) => {
                    let arr = [{ name: "Select Agent", value: null }];
                    for (let i = 0; i < response.data.data.length; i++) {
                        let obj = {};
                        obj.name = capitalizedSentence(response.data.data[i].agentName);
                        obj.value = response.data.data[i].agentId;
                        arr.push(obj);
                    }
                    setAgentOptions(arr);
                })
                .catch((err) => {});
        }
    }, []);  
    const [selectedModule,setSelectedModule]=useState("")  
    const ModulesOptions=[{ 
     label:"ACP", 
     value:"acp"
    },{ 
        label:"Postpaid", 
        value:"postpaid"
    }]
    return (
        <div className="card">
            <div className="card forrange pt-3 pb-2 flex flex-wrap flex-row  justify-content-center  fordropdown ">  
           {/* <Dropdown className="dropdownstyle mt-2 mr-2" value={selectedModule} onChange={(e) => setSelectedModule(e.value)} options={ModulesOptions} optionLabel="label" optionValue="value" placeholder="Select Module" />  */}
                        {parseLoginRes.role.role === "TEAM LEAD" || parseLoginRes.role.role === "PROVISION MANAGER" || parseLoginRes.role.role === "QA MANAGER" ? (
                    <Dropdown className="dropdownstyle mt-2" value={selectedAgent} onChange={(e) => setSelectedAgent(e.value)} options={agentOptions} optionLabel="name" placeholder="Select Agent" />
                ) : undefined}
                <div className="date-range mt-2  flex flex-wrap justify-content-center flex-row ">
                    <Calendar
                        className=" calendar1 font-bold"
                        value={startDateValue}
                        onChange={(e) => {
                            if (e.value !== null) {
                                const parsedDate = DateTime.fromJSDate(new Date(e.value));
                                const easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
                                const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
                                const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
                                setStartDate(etDateObject.toSeconds());
                            } else {
                                setStartDate(null);
                            }

                            setStartDateValue(e.value);
                        }}
                        placeholder="Start Date"
                        dateFormat="mm/dd/yy"
                    />
                    <h1 className="inline ml-5  label  mr-5 ">To</h1>
                    <Calendar
                        className="  calendar2 "
                        value={endDateValue}
                        onChange={(e) => {
                            if (e.value !== null) {
                                const parsedDate = DateTime.fromJSDate(new Date(e.value));
                                let easternDateTime = parsedDate.setZone("America/New_York", { keepLocalTime: true });
                                easternDateTime = easternDateTime.set({
                                    hour: 23,
                                    minute: 59,
                                    second: 0,
                                });

                                const formattedEasternTime = easternDateTime.toFormat("d LLL yyyy, h:mm a");
                                const etDateObject = DateTime.fromFormat(formattedEasternTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" });
                                setEndDate(etDateObject.toSeconds());
                            } else {
                                setEndDate(null);
                            }
                            setEndDateValue(e.value);
                        }}
                        placeholder="End Date"
                        dateFormat="mm/dd/yy"
                    />
                </div>
            </div>
            <div className=" flex flex-wrap justify-content-center flex-row">
                <div className="content1 card">
                    {startDate !== null || endDate !== null ? (
                        selectedAgent === null ? (
                            <DateRangeStats role={parseLoginRes.role.role} startDate={startDate} selectedModule={selectedModule} endDate={endDate} permittedRoutes={permittedRoutes} />
                        ) : (
                            <AgentDateRangeStats role={parseLoginRes.role.role} startDate={startDate} agentid={selectedAgent} selectedModule={selectedModule} endDate={endDate} permittedRoutes={permittedRoutes} />
                        )
                    ) : selectedAgent === null ? (
                        <Last24HoursEnrollments selectedModule={selectedModule} role={parseLoginRes.role.role} permittedRoutes={permittedRoutes} />
                    ) : (
                        <Last24HoursAgentEnrollments selectedModule={selectedModule} role={parseLoginRes.role.role} agentid={selectedAgent} permittedRoutes={permittedRoutes} />
                    )}
                    {/*
                <EnrollmentByStates permittedRoutes={permittedRoutes} /> */}
                </div>
                {parseLoginRes.role.role === "TEAM LEAD" ? (
                    <div className="content2 card">
                        {selectedAgent === null ? (
                            startDate !== null || endDate !== null ? (
                                <>
                                    <h6 className="sales-channel-stats p-4 ml-4">Date Range Sales Channel</h6>
                                    <DateRangeSalesChannel selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={parseLoginRes._id} startDate={startDate} endDate={endDate} />
                                    <DateRangeSalesChannelChart selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={parseLoginRes._id} startDate={startDate} endDate={endDate} />
                                </>
                            ) : (
                                <>
                                    <h6 className="sales-channel-stats p-4 ml-4">Last 24 Hours Sales Channel</h6>
                                    <Last24HoursSalesChannel selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                    <Last24AgentSalesChannelChart selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                </>
                            )
                        ) : startDate !== null || endDate !== null ? (
                            <>
                                <h6 className="sales-channel-stats p-4 ml-4">Date Range Sales Channel</h6>
                                <DateRangeAgentSalesChannel selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={selectedAgent} startDate={startDate} endDate={endDate} />
                                <DateRangeSalesChannelChart selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={selectedAgent} startDate={startDate} endDate={endDate} />
                            </>
                        ) : (
                            <>
                                <h6 className="sales-channel-stats p-4 ml-4">Last 24 Hours Sales Channel</h6>
                                <Last24HoursAgentSalesChannel selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={selectedAgent} />
                                <Last24AgentSalesChannelChart selectedModule={selectedModule} BASE_URL={BASE_URL} roleId={selectedAgent} />
                            </>
                        )}
                    </div>
                ) : undefined}
                {parseLoginRes.role.role === "TEAM LEAD" || parseLoginRes.role.role === "CSR" ? (
                    <div className="content2 card">
                        {selectedAgent === null ? (
                            startDate !== null || endDate !== null ? (
                                <>
                                    <h6 className="sales-channel-stats p-4 ml-4">Date Range Department Wise Rejected</h6>

                                    <DepartmentWiseRejectedByDateRange selectedModule={selectedModule} startDate={startDate} endDate={endDate} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                    <DepartmentWiseRejectedDateRangeChart selectedModule={selectedModule} startDate={startDate} endDate={endDate} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                </>
                            ) : (
                                <>
                                    <h6 className="sales-channel-stats p-4 ml-4">Last 24 Hours Department Wise Rejected</h6>
                                    <DepartmentWiseRejectedInLast24 selectedModule={selectedModule} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                    <DepartmentWiseRejectedLast24Chart selectedModule={selectedModule} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={parseLoginRes._id} />
                                </>
                            )
                        ) : startDate !== null || endDate !== null ? (
                            <>
                                <h6 className="sales-channel-stats p-4 ml-4">Date Range Department Wise Rejected</h6>

                                <DepartmentWiseAgentRejectedByDateRange selectedModule={selectedModule} startDate={startDate} endDate={endDate} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={selectedAgent} />
                                <DepartmentWiseAgentRejectedDateRangeChart selectedModule={selectedModule} startDate={startDate} endDate={endDate} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={selectedAgent} />
                            </>
                        ) : (
                            <>
                                <h6 className="sales-channel-stats p-4 ml-4">Last 24 Hours Department Wise Rejected</h6>

                                <DepartmentWiseAgentRejectedInLast24 selectedModule={selectedModule} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={selectedAgent} />
                                <DepartmentWiseAgentRejectedLast24Chart selectedModule={selectedModule} role={parseLoginRes.role.role} BASE_URL={BASE_URL} roleId={selectedAgent} />
                            </>
                        )}
                    </div>
                ) : undefined}
            </div>
        </div>
    );
};
export default Dashboard;
