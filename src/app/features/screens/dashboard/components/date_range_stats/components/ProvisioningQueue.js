import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
export default function ProvisioningQueue({ BASE_URL, userid, startDate, endDate }) {
    const [provisioningqueueenrollments, setProvisioningQueueEnrollments] = useState(0);
    useEffect(() => {
        let isMounted = true;
        Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`)
            .then((response) => {
                if (response.data.data !== undefined) {
                    let endDateEnrollment = endDate;
                    if (startDate !== null) {
                        if (endDate === null) {
                            endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");
                            endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                        }
                    }
                    const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                        return DateTime.fromFormat(enrollment.nladEnrollmentDate, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.nladEnrollmentDate, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                    });
                    if (isMounted) {
                        setProvisioningQueueEnrollments(enrollmentsInCurrentShift.length);
                    }
                } else {
                    if (isMounted) {
                        setProvisioningQueueEnrollments(0);
                    }
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setProvisioningQueueEnrollments(0);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [startDate, endDate]);
    return <h2 className="text-center">{provisioningqueueenrollments}</h2>;
}
