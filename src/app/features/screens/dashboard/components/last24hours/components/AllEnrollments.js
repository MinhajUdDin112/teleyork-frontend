import Axios from "axios";
import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
export default function AllEnrollments({ BASE_URL, userid }) {
    useEffect(() => { 
        let isMounted=true; 
        Axios.get(`${BASE_URL}/api/user/EnrollmentApprovedByUser?userId=${userid}`)
            .then((response) => {
                const currentDateTime = DateTime.local() 
                .setZone("America/New_York", {
                    keepLocalTime: false,
                })
                .set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                })
                .toFormat("d LLL yyyy, hh:mm a"); 
                let startCountFrom=DateTime.fromFormat(currentDateTime, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds();
                if (response.data.data !== undefined) { 
                    const enrollmentsInCurrentShift = response.data.data.filter((enrollment) => {
                        return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                    
                    }); 
                    if(isMounted){
                    setAllEnrollments(enrollmentsInCurrentShift.length); 
                    }
                } 
                else{ 
                    if(isMounted){ 
                        setAllEnrollments(0)
                    }
                }
            })
            .catch((err) => { 
                if(isMounted){ 
                    setAllEnrollments(0)
                }
            }); 
            return ()=>{ 
                isMounted=false
            }
    }, []);
    const [allEnrollments, setAllEnrollments] = useState(0);
    return <h2 className="text-center">{allEnrollments}</h2>;
}
