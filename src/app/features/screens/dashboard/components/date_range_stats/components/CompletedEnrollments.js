import React, { useState, useEffect } from "react";
import Axios from "axios";
import { DateTime } from "luxon";
export default function CompletedEnrollments({ role, BASE_URL, userid, startDate, endDate }) {
    const [completedenrollments, setCompletedEnrollments] = useState(0);
    useEffect(() => { 
        let isMounted=true
        Axios.get(`${BASE_URL}/api/user/completeEnrollmentUser?userId=${userid}`)
            .then((response) => {  
                let isMounted=true
                if (response.data.data !== undefined) {
                    let endDateEnrollment = endDate;
                    if (startDate !== null) {
                        if (endDate === null) {
                            endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");
                            endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                        }
                    }
                    let enrollmentsInCurrentShift;
                    if (role === "CSR" || role === "TEAM LEAD") {
                        enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                    } else {
                        enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                            return DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(enrollment.activatedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment;
                        });
                    }
                     if(isMounted){
                    setCompletedEnrollments(enrollmentsInCurrentShift.length); 
                     }
                } 
                else{ 
                    if(isMounted){ 
                         setCompletedEnrollments(0)
                    }
                }
            })
            .catch((err) => { 
                if(isMounted){ 
                    setCompletedEnrollments(0)
                }
            }); 
            return ()=>{ 
                isMounted=false
            }
    }, [startDate, endDate]);
    return <h2 className="text-center">{completedenrollments}</h2>;
}
