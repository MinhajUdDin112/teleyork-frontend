import React, { useState } from "react";
import Axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import UpdateProgram from "./update_acp_programs"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
const ShowPrograms = ({ setEditAcp }) => {
    let objectForEdit = {};

    function setActive(rowData){ 
         return ( 
            <p> {rowData.active === true ? "Active" :"InActive"}</p>
         )
    } 
    function renderBanner(rowData){ 
    return ( 
        <img onError={(e)=>{ 
           e.target.style.display="none"
        }} style={{width:"45px",height:"auto",marginLeft:"50%",transform:"translate(-50%)"}} src={rowData.banner}/>
    )
    }
    let [showAcps, setShowAcps] = useState(null);
    let [showEdit, setShowEdit] = useState(false);
    let [selectedProgram, setSelectedProgram] = useState(null);
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes); 
      const [arrayofcode,setArrayOfCodes]=useState([]) 
      function editAcpProgram(e) {
        if (objectForEdit[e.target.parentElement.parentElement.children[0].textContent] !== undefined) {
            setEditAcp(true);
            setSelectedProgram(objectForEdit[e.target.parentElement.parentElement.children[0].textContent]);
            setShowEdit(true);
        }
    }   
    if (showAcps === null) {
        Axios.get(`${BASE_URL}/api/web/acpPrograms/all?serviceProvider=${parseLoginRes?.company}`) //using dummy service provider
            .then((res) => {
                
                let arr=[]
                 for(let i=0;i<Object.keys(res.data.data).length;i++){ 
                      if(res.data.data[i].code !== undefined){
                    arr.push(res.data.data[i].code) 
                      } 

                 }  
                 setArrayOfCodes(arr)
               
                res.data.data.forEach((element) => {
                    objectForEdit[element.name] = element;
                    element.edit = <span className="pi pi-user-edit" style={{ cursor: "pointer" }} onClick={editAcpProgram}></span>;
                });
               
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
                            <DataTable tableStyle={{ minWidth: "50rem" }} value={showAcps} showGridlines>
                                <Column field="name" header="Name"></Column>
                                <Column field="description" header="Description"></Column> 
                                <Column field={renderBanner} header="Banner"></Column> 
                                <Column field="code" header="Code"></Column>
                                <Column field={setActive} header="Status"></Column>    
                                <Column field="edit" style={{textAlign:"center"}} header="Edit">   
                                </Column>   
                                
                            </DataTable>   
                        </>
                    ) : (
                        <ProgressSpinner className="flex justify-content-center" />
                    )}
                </div>
            ) : (
                <UpdateProgram setShowAcps={setShowAcps} arrayofcodes={arrayofcode} setShowEdit={setShowEdit} selectedProgram={selectedProgram} setEditAcp={setEditAcp} />
            )}
        </div>
    );
};
export default ShowPrograms;
