import Axios from "axios";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
export default function Last24AgentSalesChannelChart({ BASE_URL, roleId }) {
    const [data, setData] = useState([["task", "enrollments"]]);
    const options = {
        title: "Sales Channel",
        bars: "vertical",
        is3D: true,
    };
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/dashboard/salesStatsByChannel?userId=${roleId}`)
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
                  
                    const obj = {
                        Auto: 0,
                        "Web Consent": 0,
                        "New Facebook": 0,
                        "Old Facebook": 0,
                        SMM: 0,
                        Email: 0,
                    };
                    response.data.data.enrollments.map((enrollment) => {
                        if (DateTime.fromFormat(enrollment.createdAt, "d LLL yyyy, h:mm a", { zone: "America/New_York" }).toSeconds() >= startCountFrom ) {
                            if (enrollment.salesChannel === "Auto") {
                                obj.Auto++;
                            } else if (enrollment.salesChannel === "Web Consent") {
                                obj["Web Consent"]++;
                            } else if (enrollment.salesChannel === "New Facebook") {
                                obj["New Facebook"]++;
                            } else if (enrollment.salesChannel === "Old Facebook") {
                                obj["Old Facebook"]++;
                            } else if (enrollment.salesChannel === "SMM") {
                                obj["SMM"]++;
                            } else if (enrollment.salesChannel === "Email") {
                                obj["Email"]++;
                            }
                        }
                    });
                    let arr = [["task", "enrollments"]];
                    Object.keys(obj).forEach((item) => { 
                         
                        let arr2 = [item, obj[item]]; 
                        if(obj[item] !== 0){
                        arr.push(arr2); 
                        }
                    });
                    setData(arr);
                    console.log("arr is ", arr);
                } else {
                }
            })
            .catch((error) => {});
    }, [roleId]);
    return (
        <div className="flex flex-wrap justify-content-around flex-row ">
            {data.length !== 1 ? (
                <>
                    <Chart chartType="PieChart" data={data} options={options} className="flex flex-wrap justify-content-center pie-chart" />
                    {/* <Chart chartType="ColumnChart" data={data} options={options} className="flex flex-wrap justify-content-center bar-chart" />*/}
                </>
            ) : undefined}{" "}
        </div>
    );
}
