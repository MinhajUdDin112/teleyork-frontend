import Axios from "axios";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
export default function ActiveEnrollments({ role, BASE_URL, userid, startDate, endDate }) {
    const [activeEnrollments, setActiveEnrollments] = useState(0);
    useEffect(() => { 
         let isMounted=true
        Axios.get(`${BASE_URL}/api/web/dashboard/getactivesalescsr?userId=${userid}`)
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
                        return enrollment.createdAt >= startDate && enrollment.createdAt <= endDateEnrollment;
                    }); 
                    if(isMounted){
                    setActiveEnrollments(enrollmentsInCurrentShift.length); 
                    }
                } 
                else{
                    setActiveEnrollments(0); 
                    }
            })
            .catch((err) => {   
                if(isMounted){
                setActiveEnrollments(0); 
                }
            }); 
            return ()=>{ 
                isMounted=false
            }
    }, [startDate, endDate, userid]);
    return <h2 className="text-center">{activeEnrollments}</h2>;
}
