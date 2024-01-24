import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { DateTime } from "luxon";
export default function RejectedEnrollments({ role,BASE_URL, userid }) {
    const [rejectedenrollments, setRejectedEnrollments] = useState(0);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${userid}`)
            .then((response) => {
                const currentDateTime = DateTime.local();
                let etDateTime = currentDateTime.setZone("America/New_York", {
                    keepLocalTime: false,
                });
                etDateTime = etDateTime.set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                });
                const startCountFrom = etDateTime.toFormat("d LLL yyyy, hh:mm a");
                if (response.data.data !== undefined) {
                    let enrollmentsInCurrentShift; 
                    if(role !== "TEAM LEAD"){
                    enrollmentsInCurrentShift= response.data.data.filter((enrollment) => {   
                        return DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                        
                     
                    }); 
                        
                          } 
                          else{  
                            enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                                return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                      
                      
                            }); 
                          }
                  
                          setRejectedEnrollments(enrollmentsInCurrentShift.length);
                }  
            })
            .catch((err) => {});
    }, [userid]);
    return <h2 className="text-center">{rejectedenrollments}</h2>;
}
