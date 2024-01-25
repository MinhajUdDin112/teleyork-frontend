import Axios from "axios";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
export default function AllEnrollments({ BASE_URL, userid, startDate, endDate }) {
    const [allEnrollments, setAllEnrollments] = useState(0);
    useEffect(() => {
        let isMounted = true;
        Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
            .then((response1) => {
                Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
                    .then((response2) => {
                        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
                            .then((response3) => {
                                let endDateEnrollment = endDate;
                                if (startDate !== null) {
                                    if (endDate === null) {
                                        endDateEnrollment = DateTime.local().setZone("America/New_York", { keepLocalTime: false }).set({ hour: 23, minute: 59, second: 0 }).toFormat("d LLL yyyy, hh:mm a");
                                        endDateEnrollment = DateTime.fromFormat(endDateEnrollment, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                                    }
                                }
                                let data=[]
                                if(response1.data.data !== undefined){ 
                                   data.push(response1.data.data)
                                }  
                                if(response2.data.data !== undefined){ 
                                   data.push(response2.data.data)
                                }  
                                if(response3.data.data !== undefined){ 
                                   data.push(response3.data.data)
                                } 
                                let arr=[]
                                for (let i = 0; i < data.length; i++) {
                                    for (let k = 0; k < data[i].length; k++) {
                                        if (DateTime.fromFormat(data[i][k].createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startDate && DateTime.fromFormat(data[i][k].createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() <= endDateEnrollment) {
                                        arr.push(data[i][k])
                                        }
                                    }
                                }
                                if (isMounted) {
                                    setAllEnrollments(arr.length);
                                }
                            })
                            .catch((err) => {
                                if (isMounted) {
                                    setAllEnrollments(0);
                                }
                            });
                    })
                    .catch((err) => {
                        if (isMounted) {
                            setAllEnrollments(0);
                        }
                    });
            })
            .catch((err) => {
                if (isMounted) {
                    setAllEnrollments(0);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [startDate, endDate, userid]);

    return <h2 className="text-center">{allEnrollments}</h2>;
}
