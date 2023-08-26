import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Plan = ({ setActiveIndex }) => {
    const [selectedPage, setSelectedPage] = useState(0);
    const data = [{ id: "1500 MB", name: "1500", age: 5000 }];

    return (
        <>
            <div className="card">
                <div className="flex flex-row justify-content-between">
                    <Button label="Back" />
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
                    <Card className="p-5 border-noround" style={{ width: "21em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full border-noround h-2rem text-base font-medium justify-content-center" />
                        <div className="my-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div>
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
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
                        <div className="flex justify-content-center mb-3">
                            <Button label="SELECT" className="p-button-raised w-9rem h-2rem text-base font-medium justify-content-center" />
                        </div>
                    </Card>
                    <Card className="p-5 border-noround" style={{ width: "21em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full border-noround h-2rem text-base font-medium justify-content-center" />
                        <div className="my-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div>
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
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
                        <div className="flex justify-content-center mb-3">
                            <Button label="SELECT" className="p-button-raised w-9rem h-2rem text-base font-medium justify-content-center" />
                        </div>
                    </Card>
                    <Card className="p-5 border-noround" style={{ width: "21em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full border-noround h-2rem text-base font-medium justify-content-center" />
                        <div className="my-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div>
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
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
                        <div className="flex justify-content-center mb-3">
                            <Button label="SELECT" className="p-button-raised w-9rem h-2rem text-base font-medium justify-content-center" />
                        </div>
                    </Card>
                    <Card className="p-5 border-noround" style={{ width: "21em", marginBottom: "20px", boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full border-noround h-2rem text-base font-medium justify-content-center" />
                        <div className="my-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div>
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
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
                        <div className="flex justify-content-center mb-3">
                            <Button label="SELECT" className="p-button-raised w-9rem h-2rem text-base font-medium justify-content-center" />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Plan;
