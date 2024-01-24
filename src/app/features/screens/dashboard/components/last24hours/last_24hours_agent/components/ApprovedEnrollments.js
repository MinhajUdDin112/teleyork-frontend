import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { DateTime } from "luxon";
export default function ApprovedEnrollments({ role,BASE_URL, userid }) {
    const [approvedenrollments, setApprovedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/approvedEnrollmentList?userId=${userid}`)
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
                    let enrollmentsInCurrentShift; 
                    if(role !== "TEAM LEAD"){
                    enrollmentsInCurrentShift= response.data.data.filter((enrollment) => {   
                        return DateTime.fromFormat(enrollment.approvedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                    
                  
                    }); 
                        
                          } 
                          else{  
                            enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                                return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                  
                 
                            }); 
                          }
                  
                          setApprovedEnrollments(enrollmentsInCurrentShift.length);
                }  
            })
            .catch((err) => {});
    }, [userid]);
    return <h2 className="text-center">{approvedenrollments}</h2>;
}
