import React, { useState } from "react";
import Axios from "axios";
import BASE_URL from "../../../../config";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UpdateProgram from "./update_acp_programs";
const ShowPrograms = ({ setEditAcp}) => {       
  
    let objectForEdit = {};
    function editAcpProgram(e) {
       
        if(objectForEdit[e.target.parentElement.parentElement.children[0].textContent] !== undefined){
            setEditAcp(true);
        setSelectedProgram(objectForEdit[e.target.parentElement.parentElement.children[0].textContent]);
        setShowEdit(true); 
        }
    }
    let [showAcps, setShowAcps] = useState(null);
    let [showEdit, setShowEdit] = useState(false); 
    let [selectedProgram, setSelectedProgram] = useState(null);
    if (showAcps === null) {
        Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=645a85198cd1ff499c8b99cd`) //using dummy service provider 
            .then((res) => {
                console.log(res.data.data);
                res.data.data.forEach((element) => {
                    objectForEdit[element.name] = element;
                    element.edit = <span className="pi pi-user-edit" style={{ cursor: "pointer" }} onClick={editAcpProgram}></span>;
                });
                console.log(objectForEdit);
                if (!showEdit) {
                    setShowAcps(res.data.data);
                }
            })
            .catch((err) => {});
    }

    return (
        <div>
            {!showEdit ? (
                <div style={{ marginTop: "75px" }}>
                    {showAcps !== null ? (
                        <>
                            <DataTable value={showAcps} tableStyle={{}}>
                                <Column field="name" header="Name"></Column>
                                <Column field="description" header="Description"></Column>
                                <Column field="active" header="Active"></Column>
                                <Column field="edit" header="Edit">
                                    {" "}
                                </Column>
                            </DataTable>
                        </>
                    ) : (
                        <ProgressSpinner className="flex justify-content-center" />
                    )}
                </div>
            ) : (
                <UpdateProgram setShowAcps={setShowAcps} setShowEdit={setShowEdit} selectedProgram={selectedProgram} setEditAcp={setEditAcp}  />
            )}
        </div>
    );
};
export default ShowPrograms;
