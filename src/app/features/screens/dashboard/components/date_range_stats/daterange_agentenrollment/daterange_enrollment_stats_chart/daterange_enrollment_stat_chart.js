import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import { DateTime } from "luxon";
import "./css/barchart_style.css";
export default function DateRangeEnrollmentStatChart({ role, BASE_URL, userid, permittedRoutes, startDate, endDate }) {
    let endDateEnrollment = endDate;
    if (startDate !== null) {
        if (endDate === null) {
            endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");

            endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
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
        if (role === "TEAM LEAD" || role === "CSR") {
            obj.activeenrollments = {
                label: "Active Enrollments",
            };
        }
    }
    useEffect(() => {
        setData([["Task", "Enrollments"]]);
        let isMounted = true;
        if (obj.rejectedenrollments) {
            Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
                        let enrollmentsInDateRange;
                        if (role !== "TEAM LEAD") {
                            enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                                return DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                            });
                        } else {
                            enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                                return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                            });
                        }
                        if (isMounted && enrollmentsInDateRange.length !== 0) {
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
                        let enrollmentsInDateRange;
                        if (role !== "TEAM LEAD") {
                            enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                                return DateTime.fromFormat(enrollment.approvedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.approvedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                            });
                        } else {
                            enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                                return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                            });
                        }
                        if (isMounted && enrollmentsInDateRange.length !== 0) {
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
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                        if (isMounted && enrollmentsInDateRange.length !== 0) {
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
                        return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                    });
                    if (isMounted && enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Incomplete", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
        if (obj.activeenrollments) {
            Axios.get(`${BASE_URL}/api/web/dashboard/getactivesalescsr?userId=${userid}`)
                .then((response) => {
                    if (response.data.data !== undefined) {
                        const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                        if (isMounted && enrollmentsInDateRange.length !== 0) {
                            setData((prevStat) => [...prevStat, ["Active", enrollmentsInDateRange.length]]);
                        }
                    }
                })
                .catch((err) => {});
        }
        if (obj.completedenrollments) {
            Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
                    let enrollmentsInDateRange;
                    if (role !== "TEAM LEAD") {
                        enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                    } else {
                        enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                    }
                    if (isMounted && enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Completed", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
        if (obj.provisioningqueue) {
            Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`).then((response) => {
                if (response.data.data !== undefined) {
                    const enrollmentsInDateRange = response.data.data.filter((enrollment) => {
                        return DateTime.fromFormat(enrollment.nladEnrollmentDate, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.nladEnrollmentDate, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                    });
                    if (isMounted && enrollmentsInDateRange.length !== 0) {
                        setData((prevStat) => [...prevStat, ["Provisioning", enrollmentsInDateRange.length]]);
                    }
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [startDate, endDate, userid]);
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
