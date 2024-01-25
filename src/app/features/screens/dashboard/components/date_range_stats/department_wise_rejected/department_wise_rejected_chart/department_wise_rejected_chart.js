import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
import Chart from "react-google-charts";
export default function DepartmentWiseRejectedDateRangeChart({ role, roleId, BASE_URL, startDate, endDate }) {
    const [data, setData] = useState([["Task", "Enrollments"]]);
    const options = {
        title: "Enrollments",
        bars: "vertical",
        is3D: true,
    };
    useEffect(() => {
        let isMounted = true;
        setData([["Task", "Enrollments"]]);
        Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${roleId}`)
            .then((response) => {
                if (response.data.data !== undefined) {
                    let endDateEnrollment = endDate;
                    if (startDate !== null) {
                        if (endDate === null) {
                            endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");
                            endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                        }
                    }
                    let qaRejectedEnrollment;
                    let provisioningRejectedEnrollments;
                    if (role === "CSR" || role === "TEAM LEAD") {
                        qaRejectedEnrollment = response.data.data.filter((enrollment) => {
                            return (
                                DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate &&
                                DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment &&
                                enrollment.rejectedBy.department.department === "QA"
                            );
                        });
                        provisioningRejectedEnrollments = response.data.data.filter((enrollment) => {
                            return (
                                DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate &&
                                DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment &&
                                enrollment.rejectedBy.department.department === "PROVISIONING"
                            );
                        });
                    }
                    if (isMounted) {
                        let newData = [["Task", "Enrollments"]];
                        if (qaRejectedEnrollment.length !== 0) {
                            newData.push(["QA", qaRejectedEnrollment.length]);
                        }
                        if (provisioningRejectedEnrollments.length !== 0) {
                            newData.push(["Provisioning", provisioningRejectedEnrollments.length]);
                        }
                        setData(newData);
                    }
                }
            })
            .catch((err) => {});
        return () => {
            isMounted = false;
        };
    }, [startDate, endDate]);
    return (
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                </>
            ) : undefined}{" "}
        </div>
    );
}
