import React, { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Plan = () => {
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
                            if (selectedPage < 4) {
                                setSelectedPage((prev) => {
                                    return prev + 1;
                                });
                            }
                        }}
                    />
                </div>
                <br />
                <br />
                <div>
                    <h6>Enrollment ID: ETC175698</h6>
                </div>
                <br />
                <div>
                    <h2 className="flex flex-row justify-content-center">Select Your Affordable Connectivity Program</h2>
                </div>

                <div className="flex justify-content-around flex-wrap">
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Below Extreme Basic</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Extreme Basic ACP Plan</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                    <Card style={{ width: "20em", marginBottom: "20px" }}>
                        <Button label="Free" className="p-button-raised p-button-success w-full" />
                        <div className="mt-5">
                            <p className="font-semibold">Basic lite plan</p>
                        </div>
                        <div className="mt-5">
                            <DataTable value={data}>
                                <Column field="id" header="Data"></Column>
                                <Column field="name" header="Minutes"></Column>
                                <Column field="age" header="Texts"></Column>
                            </DataTable>
                        </div>
                        <div className="mt-3">
                            <p className="font-semibold">Free Every Month</p>
                        </div>
                        <div>
                            <ul>
                                <li>Voice Minutes & Unlimited Texts!</li>
                                <li>Voicemail/Caller Id/3-way Calling</li>
                                <li>911 Access</li>
                                <li>411 Directory Assistance at No Additional Cost</li>
                                <li>Nationwide Coverge on America's Best Networks</li>
                            </ul>
                        </div>
                        <div className="flex justify-content-center">
                            <Button label="SELECT" className="p-button-raised" />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Plan;
