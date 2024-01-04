import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import "./css/barchart_style.css";
export default function DateRangeEnrollmentStatChart({ BASE_URL, userid, permittedRoutes, startDate, endDate }) {
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = new Date().toISOString();
        }
    }
    const [data, setData] = useState([["Task", "Enrollments"]]);
    const options = {
        title: "Enrollments",
        bars: "vertical",
        is3D: true,
    };
    const obj = {
        rejectedenrollments: { label: "Rejected Enrollments" },
        incompleteenrollments: { label: "Incomplete Enrollments" },
        approvedEnrollments: {
            label: "Approved Enrollments",
        },
        allenrollments: {
            label: "All Enrollments",
        },
        completedenrollments: {
            label: "Completed Enrollments",
        },
        provisioningqueue: {
            label: "Provisioning Queue",
        },
    };
    if (permittedRoutes !== undefined) {
        if (!permittedRoutes.includes("/approved-enrollments")) {
            delete obj.approvedEnrollments;
        }
        if (!permittedRoutes.includes("/rejectedenrollments")) {
            delete obj.rejectedenrollments;
        }
        if (!permittedRoutes.includes("/incompleteenrollments")) {
            delete obj.incompleteenrollments;
        }
        if (!permittedRoutes.includes("/all-enrollments")) {
            delete obj.incompleteenrollments;
        }
        if (!permittedRoutes.includes("/provisioning-queue")) {
            delete obj.provisioningqueue;
        }
        if (!permittedRoutes.includes("/completedenrollments")) {
            delete obj.completedenrollments;
        }
    }
    useEffect(() => {
        setData([["Task", "Enrollments"]]);
        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
                        const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return enrollment.rejectedAt >= startDate && enrollment.rejectedAt <= endDateEnrollment;
                        });
                        if (enrollmentsInDateRange.length !== 0) {
                            setData((prevStat) => [...prevStat, ["Rejected", enrollmentsInDateRange.length]]);
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.approvedEnrollments) {
            Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
                        const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return enrollment.approvedAt >= startDate && enrollment.approvedAt <= endDateEnrollment;
                        });
                        if (enrollmentsInDateRange.length !== 0) {
                            setData((prevStat) => [...prevStat, ["Approved", enrollmentsInDateRange.length]]);
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.allenrollments) {
            Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
                        const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
                        });
                        if (enrollmentsInDateRange.length !== 0) {
                            setData((prevStat) => [...prevStat, ["All", enrollmentsInDateRange.length]]);
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.incompleteenrollments) {
            Axios.get(`${BASE_URL}/api/user/inCompleteEnrollmentUser?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
                    });
                    if (enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Incomplete", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
        if (obj.completedenrollments) {
            Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return enrollment.activatedAt >= startDate && enrollment.activatedAt <= endDateEnrollment;
                    });
                    if (enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Completed", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
        if (obj.provisioningqueue) {
            Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return enrollment.nladEnrollmentDate >= startDate && enrollment.nladEnrollmentDate <= endDateEnrollment;
                    });
                    if (enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Completed", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
    }, [startDate, endDate, userid]);
    console.log("data is", data);
    return (
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                    <Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" />
                </>
            ) : undefined}{" "}
        </div>
    );
}
