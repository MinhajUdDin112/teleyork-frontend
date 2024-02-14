import React, { useEffect, useState } from "react";
import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const selectedid = localStorage.getItem("selectedId");
const parseselectedid = JSON.parse(selectedid);
const PlanInfo = () => {
    const [currentPlan, setCurrentPlan] = useState({});
    const [additional, setAdditional] = useState();
    const [discount, setDiscount] = useState();
    useEffect(async () => {
        Axios.get(`${BASE_URL}/api/web/invoices/getplanbycustomerid?customerid=${parseselectedid}`)
            .then((res) => {
                console.log("current plan is ", res);
                let additionalnew = "";
                for (let i = 0; i < res?.data?.data?.currentPlan.additionalCharges.length; i++) {
                    if (i + 1 === res?.data?.data?.currentPlan.additionalCharges.length) {
                        let name = res?.data?.data?.currentPlan.additionalCharges[i].name + ":" + res?.data?.data?.currentPlan.additionalCharges[i].amount;
                        additionalnew += name;
                    } else {
                        let name = res?.data?.data?.currentPlan.additionalCharges[i].name + ":" + res?.data?.data?.currentPlan.additionalCharges[i].amount + ",";
                        additionalnew += name;
                    }
                }
                let discountnew = "";
                for (let i = 0; i < res?.data?.data?.currentPlan.discount.length; i++) {
                    if (i + 1 === res?.data?.data?.currentPlan.discount.length) {
                        let name = res?.data?.data?.currentPlan.discount[i].name + ":" + res?.data?.data?.currentPlan.discount[i].amount;
                        discountnew += name;
                    } else {
                        let name = res?.data?.data?.currentPlan.discount[i].name + ":" + res?.data?.data?.currentPlan.discount[i].amount + ",";
                        discountnew += name;
                    }
                }
                setDiscount(discountnew);
                setAdditional(additionalnew);

                setCurrentPlan(res.data.data.currentPlan);
            })
            .catch((err) => { 
                return console.log(err)
            });  
             
    }, []);
    return (
        <div className=" ">
            <div className="flex flex-wrap mx-5">
                <div className="col-3 ">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Plan Name:</p>
                        <p className="text-sm m-0">{currentPlan?.planName}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Bill Cycle Day:</p>
                        <p className="text-sm m-0">
                            From:{currentPlan?.billingPeriod?.from},To:{currentPlan?.billingPeriod?.to}
                        </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Current Plan Price:</p>
                        <p className="text-sm m-0">{currentPlan?.planCharges}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Print Setting:</p>
                        <p className="text-sm m-0">{currentPlan?.printSetting}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Charging type:</p>
                        <p className="text-sm m-0">{currentPlan?.chargingType}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Due Date Is:</p>
                        <p className="text-sm m-0">{currentPlan?.invoiceDueDate}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Additional Feature:</p>
                        <p className="text-sm m-0">{additional}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Discounts:</p>
                        <p className="text-sm m-0">{discount}</p>
                    </div>
                    <div className="mb-1">
                        <p className="font-bold text-sm m-0">Apply Late Fee:</p>
                        <p className="text-sm m-0">{currentPlan?.invoiceDueDate}</p>
                    </div>
                    {/*  <div className="mb-1">
                        <p className="font-bold text-sm m-0">Available Postpaid Limit:</p>
                        <p className="text-sm m-0">765</p>
                    </div>  
                    */}
                </div>
            </div>
        </div>
    );
};

export default PlanInfo;
