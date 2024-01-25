import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { DateTime } from "luxon";
export default function ProvisioningQueue({ BASE_URL, userid }) {
    const [provisioningqueueenrollments, setProvisioningQueueEnrollments] = useState(0);
    useEffect(() => { 
        let isMounted=true
        Axios.get(`${BASE_URL}/api/user/provisionedEnrollmentUserList?userId=${userid}`)
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
                        return DateTime.fromFormat(enrollment.nladEnrollmentDate, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                  
                  
                    }); 
                    if(isMounted){
                    setProvisioningQueueEnrollments(enrollmentsInCurrentShift.length); 
                    }
                } 
                else{ 
                 if(isMounted){ 
                    setProvisioningQueueEnrollments(0)
                 }
                }
            })
            .catch((err) => { 
                if(isMounted){ 
                    setProvisioningQueueEnrollments(0)
                }
            }); 
            return ()=>{ 
                isMounted=false
            }
    }, [userid]);
    return <h2 className="text-center">{provisioningqueueenrollments}</h2>;
}
