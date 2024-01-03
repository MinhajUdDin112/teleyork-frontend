import React, { useDebugValue, useEffect } from "react";
import EnrollmentByStates from "./components/enrollment_stats/enrollment_stats";
import { useState } from "react";
import Last24HoursEnrollments from "./components/last24hours/Last24HoursEnrollments";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import DateRangeStats from "./components/date_range_stats/date_range_stats";
import "./css/dashboard.css";
const Dashboard = ({ permittedRoutes }) => {
    const [byDate, setByDate] = useState("last24hours");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);

    return (
        <div className="card">
            <div>
                <div className="flex flex-wrap justify-content-center fordropdown ">
                    <Dropdown
                        className="font-semibold dropdown"
                        value={byDate}
                        options={[
                            { label: "Last 24 Hours", value: "last24hours" },
                            { label: "Date Range", value: "daterange" },
                        ]}
                        onChange={(e) => setByDate(e.value)}
                        placeholder="Select Filter Type"
                    />

                    {byDate === "daterange" ? (
                        <div className="date-range flex flex-wrap justify-content-center flex-row ">
                            <Calendar
                                className="mt-5 calendar1 font-bold"
                                value={startDateValue}
                                onChange={(e) => {
                                    setStartDate(null);
                                    setStartDate(new Date(e.value).toISOString());
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
                                    setEndDate(null);
                                    setEndDate(new Date(e.value).toISOString());

                                    setEndDateValue(e.value);
                                }}
                                placeholder="End Date"
                                dateFormat="mm/dd/yy"
                            />
                        </div>
                    ) : undefined}
                </div>
                {byDate === "last24hours" ? (
                    <Last24HoursEnrollments permittedRoutes={permittedRoutes} />
                ) : startDate !== null && endDate !== null ? (
                    <DateRangeStats startDate={startDate} endDate={endDate} permittedRoutes={permittedRoutes} setStartDate={setStartDate} setEndDate={setEndDate} setStartDateValue={setStartDateValue} setEndDateValue={setEndDateValue} />
                ) : undefined}
                <EnrollmentByStates permittedRoutes={permittedRoutes} />
            </div>
        </div>
    );
};

export default Dashboard;
