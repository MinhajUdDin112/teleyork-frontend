import React,{useEffect,useState} from "react"    
import Axios from "axios" 
import { DateTime } from "luxon" 
import Chart from "react-google-charts"
export default function DepartmentWiseRejectedLast24Chart({role,roleId,BASE_URL}){   
      const [data, setData] = useState([["Task", "Enrollments"]]);
    const options = {
        title: "Enrollments",
        bars: "vertical",
        is3D: true,
    };
      useEffect(()=>{  
        let isMounted=true 
        setData([["Task", "Enrollments"]])
      Axios.get(`${BASE_URL}/api/user/rejectedEnrollmentUser?userId=${roleId}`)
      .then((response) => {
          if (response.data.data !== undefined) { 
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
              let qaRejectedEnrollment; 
              let provisioningRejectedEnrollments; 
              if(role === "CSR" || role === "TEAM LEAD"){
                  qaRejectedEnrollment= response.data.data.filter((enrollment) => {   
                    return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom  && enrollment.rejectedBy.department.department === "QA"
       
                  });   
                  provisioningRejectedEnrollments= response.data.data.filter((enrollment) => {   
                    return DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom  && enrollment.rejectedBy.department.department === "PROVISIONING"
                       
        
                 }); 
                      
                        } 
                        else{  /*
                          enrollmentsInCurrentShift= response.data.data.filter((enrollment) => { 
                              return DateTime.fromFormat(enrollment.rejectedAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom
                  
                  }); */  
                        }   
                    
                            let newData = [["Task", "Enrollments"]];
                            if (qaRejectedEnrollment.length !== 0) {
                              newData.push(["QA", qaRejectedEnrollment.length]);
                            }
                            if (provisioningRejectedEnrollments.length !== 0) {
                              newData.push([
                                "Provisioning",
                                provisioningRejectedEnrollments.length,
                              ]);
                            }     if (isMounted) {
                            setData(newData);
                          }

                    
          }
      })
      .catch((err) => {}); 
      return ()=>{ 
        isMounted=false
      }
    },[])
    return ( 
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                    {/*<Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" />*/}
                </>
            ) : undefined}{" "}
        </div>
    )
}