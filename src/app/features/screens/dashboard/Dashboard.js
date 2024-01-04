import React, { useEffect } from "react";
import EnrollmentByStates from "./components/enrollment_stats/enrollment_stats";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Last24HoursEnrollments from "./components/last24hours/Last24HoursEnrollments";
import { Calendar } from "primereact/calendar";
import AgentDateRangeStats from "./components/date_range_stats/daterange_agentenrollment/agent_daterange_stats";
import Last24HoursAgentEnrollments from "./components/last24hours/last_24hours_agent/Last24HoursAgentEnrollments";
import DateRangeStats from "./components/date_range_stats/date_range_stats";
import "./css/dashboard.css";
import Axios from "axios";
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
          // Split the sentence into an array of words
          let words = sentence.split(' ');
      
          // Capitalize the first letter of each word
          let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      
          // Join the words back into a sentence
          let capitalizedSentence = capitalizedWords.join(' ');
      
          return capitalizedSentence;
        }; 
      

    useEffect(() => {
        if (parseLoginRes.role.role === "PROVISION MANAGER") {
            Axios.get(`${BASE_URL}/api/web/dashboard/getEnrollmentsForProvision?userId=${userid}`)
                .then((response) => {
                    let arr = [];
                    for (let i = 0; i < response.data.data.length; i++) {
                        console.log("data here is", response.data.data[i]);
                        let obj = {};
                        obj.name =  capitalizedSentence(response.data.data[i].agentName);
                        obj.value = response.data.data[i].agentId;
                        arr.push(obj);
                    }
                    setAgentOptions(arr);
                })
                .catch((err) => {});
        } else if (parseLoginRes.role.role === "TEAM LEAD") {
            Axios.get(`${BASE_URL}/api/web/dashboard/getEnrollmentsForTeamlead?userId=${userid}`)
                .then((response) => {
                    let arr = [];
                    for (let i = 0; i < response.data.data.length; i++) {
                        console.log("data here is", response.data.data[i]);
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
                    let arr = [];
                    for (let i = 0; i < response.data.data.length; i++) {
                        console.log("data here is", response.data.data[i]);
                        let obj = {};
                        obj.name =capitalizedSentence(response.data.data[i].agentName);
                        obj.value = response.data.data[i].agentId;
                        arr.push(obj);
                    }
                    setAgentOptions(arr);
                })
                .catch((err) => {});
        }
    }, []);
    console.log("agentoption is", agentOptions);
    return (
        <div className="card">
            <div>
                <div className="flex flex-wrap justify-content-center fordropdown ">
                    {parseLoginRes.role.role === "TEAM LEAD" || parseLoginRes.role.role === "PROVISION MANAGER" || parseLoginRes.role.role === "QA MANAGER" ? (
                        <Dropdown className="dropdownstyle" value={selectedAgent} onChange={(e) => setSelectedAgent(e.value)} options={agentOptions} optionLabel="name" placeholder="Select Agent" />
                    ) : undefined}
                    <div className="date-range  flex flex-wrap justify-content-center flex-row ">
                        <Calendar
                            className="mt-5 calendar1 font-bold"
                            value={startDateValue}
                            onChange={(e) => {
                                if (e.value !== null) {
                                    setStartDate(new Date(e.value).toISOString());
                                } else {
                                    setStartDate(null);
                                }

                                setStartDateValue(e.value);
                            }}
                            placeholder="Start Date"
                            dateFormat="mm/dd/yy"
                        />
                        <h1 className="inline ml-5  label  mr-5 mt-5 ">To</h1>
                        <Calendar
                            className="mt-5  calendar2 "
                            value={endDateValue}
                            onChange={(e) => {
                                if (e.value !== null) {
                                    setEndDate(new Date(e.value).toISOString());
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

                {startDate !== null || endDate !== null ? (
                    selectedAgent === null ? (
                        <DateRangeStats startDate={startDate} endDate={endDate} permittedRoutes={permittedRoutes} />
                    ) : (
                        <AgentDateRangeStats startDate={startDate} agentid={selectedAgent} endDate={endDate} permittedRoutes={permittedRoutes} />
                    )
                ) : selectedAgent === null ? (
                    <Last24HoursEnrollments permittedRoutes={permittedRoutes} />
                ) : (
                    <Last24HoursAgentEnrollments agentid={selectedAgent} permittedRoutes={permittedRoutes} />
                )}
                {/*
                <EnrollmentByStates permittedRoutes={permittedRoutes} /> */}
            </div>
        </div>
    );
};

export default Dashboard;
