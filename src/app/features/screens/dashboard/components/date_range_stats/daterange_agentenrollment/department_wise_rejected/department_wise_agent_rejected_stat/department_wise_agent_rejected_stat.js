import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
export default function DepartmentWiseAgentRejectedByDateRange({ startDate, endDate, role, roleId, BASE_URL }) {
    const [qaRejected, setQaRejected] = useState(0);
    const [provisioningRejected, setProvisioningRejected] = useState(0);
    useEffect(() => {
        let isMounted = true;
        Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${roleId}`)
            .then((response) => {
                let endDateEnrollment = endDate;
                if (startDate !== null) {
                    if (endDate === null) {
                        endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");
                        endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                    }
                }
                if (response.data.data !== undefined) {
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
                        setQaRejected(qaRejectedEnrollment.length);
                        setProvisioningRejected(provisioningRejectedEnrollments.length);
                    }
                } else {
                    if (isMounted) {
                        setQaRejected(0);
                        setProvisioningRejected(0);
                    }
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setQaRejected(0);
                    setProvisioningRejected(0);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [startDate, endDate, roleId]);
    return (
        <div className="flex flex-wrap justify-content-around flex-row">
            <div className=" card info">
                <h2 className="w-full text-center">{qaRejected}</h2>
                <p className="w-full text-center">Qa</p>
            </div>
            <div className="card info">
                <h2 className="w-full text-center">{provisioningRejected}</h2>
                <p className="w-full text-center">Provisioning</p>
            </div>
        </div>
    );
}
