import React, { useState } from "react";
import AddAcpProgram from "./pages/add_acp_programs";
import ShowPrograms from "./pages/show-acp-programs";
import { Button } from "primereact/button";
export default function AcpProgramsFlowPage() {
    let [addAcpPage, setAcpPage] = useState(false);
    let [editAcp, setEditAcp] = useState(false);
    return (
        <div className="card" style={{ position: "relative" }}>
            {!addAcpPage ? (
                !editAcp ? (
                    <div style={{ position: "absolute", right: "30px" }}>
                        <Button
                            label="Add New"
                            style={{ width: "110px" }}
                            onClick={() => {
                                setAcpPage(true);
                            }}
                        />
                    </div>
                ) : undefined
            ) : (
                <div>
                    <Button
                        label="Back"
                        style={{ width: "110px" }}
                        onClick={() => {
                            setAcpPage(false);
                        }}
                    />
                </div>
            )}

            <div> {!addAcpPage ? <ShowPrograms setEditAcp={setEditAcp} /> : <AddAcpProgram />}</div>
        </div>
    );
}
