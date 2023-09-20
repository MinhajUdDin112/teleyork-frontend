import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchPlanListAction } from "../../../../store/lifelineOrders/LifelineOrdersAction";
import axios from "axios";
import BASE_URL from "../../../../../config";
const Plan = ({ setActiveIndex }) => {
    const [apidata, setapidata] = useState([]);
    const dispatch = useDispatch();

    // const planList = useSelector((state) => {
    //     return state.planListReducer;

    useEffect(() => {
        // dispatch(fetchPlanListAction());
        const fetchData = async () => {
            await axios.get(`${BASE_URL}/api/web/plan/all?serviceProvider=645a85198cd1ff499c8b99cd`).then((resp) => {
                setapidata(resp.data.data);
            });
        };
        fetchData();
    }, []);

     const [selectedPage, setSelectedPage] = useState(0);


    return (
        <>
            <div className="card">
                <div className="flex flex-row justify-content-between">
                    <Button label="Back"
                    onClick={()=>{
                        setActiveIndex(1);
                    }} />
                    <Button
                        label="Continue"
                        onClick={() => {
                            setActiveIndex(3);
                        }}
                    />
                </div>
                <br />
                <div>
                    <h6>Enrollment ID: ETC175698</h6>
                </div>
                <br />
                <div>
                    <h2 className="flex flex-row justify-content-center">Select Your Affordable Connectivity Program</h2>
                </div>

                <div className="flex justify-content-around flex-wrap">
                  
                        {apidata.map((item) => {
                            return (
                                <Card key={item._id} className="p-5 border-noround" style={{ width: "23em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                                <Button label="Free" className="p-button-raised p-button-success w-full border-noround h-2rem text-base font-medium justify-content-center" />
                                <div >
                                    <div className="my-5">
                                        <p className="font-semibold">Name : {item.name}</p>
                                    </div>
                                    <div>
                            
                                        <div className="flex space-between  " >
                                        <p style={{marginRight:'1.5rem' , fontWeight:'700'}}>Data</p>
                                        <p style={{marginRight:'1.5rem', fontWeight:'700'}}>Minutes</p>
                                        <p style={{marginRight:'1.5rem', fontWeight:'700'}}>Texts</p>
                                        <p style={{marginRight:'1.5rem', fontWeight:'700'}}>Duration</p>
                                        </div>
                                        <div className="flex">
                                            <p style={{marginRight:'1.5rem'}}>{item.dataAllowance}</p>
                                            <p style={{marginLeft:'1.5rem'}}>{item.voiceAllowance}</p>
                                            <p style={{marginLeft:'3rem'}}>{item.textAllowance}</p>
                                            <p style={{marginLeft:'3rem'}}>{item.duration}</p>
                                        </div>
                                        <div className="flex">
                                            <p style={{marginRight:'1.5rem'}}>{item.dataAllowanceUnit}</p>
                                            <p style={{marginLeft:'0.8rem'}}>{item.voiceAllowanceUnit}</p>
                                            <p style={{marginLeft:'2rem'}}>{item.textAllowanceUnit}</p>
                                            <p style={{marginLeft:'3rem'}}>{item.durationUnit}</p>
                                        </div>
                                       
                                    </div>
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

                                </div>
                                <div className="flex justify-content-center mb-3">
                            <Button label="SELECT" className="p-button-raised w-9rem h-2rem text-base font-medium justify-content-center" />
                        </div>
                    </Card>
                            );
                        })}

                </div>
            </div>
        </>
    );
};

export default Plan;
