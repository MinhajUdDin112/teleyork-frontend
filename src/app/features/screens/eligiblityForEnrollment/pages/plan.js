import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { Divider } from "primereact/divider";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const Plan = ({ setActiveIndex, enrollment_id, _id,csr  }) => {

    const [btnState, setBtnState] = useState(true)
    const [apidata, setapidata] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=645a85198cd1ff499c8b99cd`).then((resp) => {
                setapidata(resp.data.data);
            });
        };
        fetchData();
    }, []);

    const handlePlanSelection = (planId) => {
        if (selectedPlanId === planId) {
            setSelectedPlanId(null);
        } else {
            setSelectedPlanId(planId);
        }
    };

    useEffect(() => {
        if (selectedPlanId) { setBtnState(false) } else { setBtnState(true) }
    }, [selectedPlanId]);

    const postData = async () => {
        const data = {
          csr: csr,
          userId: _id,
          plan: selectedPlanId,
        };
    
        try {
          const res = await Axios.post(`${BASE_URL}/api/user/plan`, data);
          if (res?.status === 200 || res?.status === 201) {
            localStorage.setItem("planResponse", JSON.stringify(res.data));
            navigate("/all-enrollments")         
          }
        } catch (error) {
          toast.error("Error posting data:", error);
        }
      };
    
    
    
    return (
        <>
        <ToastContainer/>
            <div className="card">
                <div className="flex flex-row justify-content-between sticky-buttons">
                    <Button label="Back"
                        onClick={() => {
                            setActiveIndex(1);
                        }} />
                    <Button
                        label="Submit"
                        onClick={postData}
                        disabled={btnState}
                    />
                </div>
                <br />
                <div>
                <h5 className="font-bold">ENROLLMENT ID: {enrollment_id}</h5>
                </div>
                <br />
                <div>
                    <h2 className="flex flex-row justify-content-center">Select Your Affordable Connectivity Program</h2>
                </div>

                <div>
                    <div class="wrapper grid justify-content-center">

                        { apidata.map((item) => {
                            return (
                                <div className="col-12 lg:col-3 md:col-4 sm:col-6">
                                    <div class="package brilliant">

                                        <div class="name">{item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}</div>
                                        <div class="price">
                                            <h4 className="mb-0">{item?.price}</h4>
                                        </div>
                                        <div class="trial">{`${item.duration} ${item.durationUnit}`}</div>

                                        <hr />

                                        <div className="plans_table mt-6">
                                            <table className="w_100">
                                                <tr>
                                                    <th>Data</th>
                                                    <th>Minutes</th>
                                                    <th>Texts</th>
                                                </tr>
                                                <tr>
                                                    <td>{item.dataAllowance}</td>
                                                    <td>{item.voiceAllowance}</td>
                                                    <td>{item.textAllowance}</td>
                                                </tr>
                                                <tr>
                                                    <td>{item.dataAllowanceUnit}</td>
                                                    <td>{item.voiceAllowanceUnit}</td>
                                                    <td>{item.textAllowanceUnit}</td>
                                                </tr>
                                            </table>
                                        </div>

                                        <Divider />

                                        <div className="my-3">
                                            <p className="font-semibold">Free Every Month</p>
                                        </div>
                                        <div className="mb-2">
                                            <ul>
                                                <li>Voice Minutes & Unlimited Texts!</li>
                                                <li>Voicemail/Caller Id/3-way Calling</li>
                                                <li>911 Access</li>
                                                <li>411 Directory Assistance at No Additional Cost</li>
                                                <li>Nationwide Coverge on America's Best Networks</li>
                                            </ul>
                                        </div>

                                        <div className="text-right">
                                            <Button
                                                label={selectedPlanId === item?._id ? "Deselect" : "Select"}
                                                iconPos="right"
                                                onClick={() => handlePlanSelection(item?._id)}
                                                disabled={selectedPlanId !== null && selectedPlanId !== "" && selectedPlanId !== item?._id}
                                                className="w_100"
                                            />
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Plan;
