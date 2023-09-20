import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import BASE_URL from "../../../../config";
import Axios from "axios"
const UpdateProgram = ({ setShowAcps,setShowEdit, selectedProgram, setEditAcp }) => {
    const formik = useFormik({
        initialValues: {
            name: selectedProgram.name,
            description: selectedProgram.description,
        },
    });
    function handleUpdateAcp() {
        console.log(formik.values);
        let data= {
            "serviceProvider":"645a85198cd1ff499c8b99cd",
            "updatedBy":"645a85198cd1ff499c8b99cd",
            "acpId":selectedProgram._id,
            "name":formik.values.name,
            "description":formik.values.description,
            "banner":" "
        }
        Axios.patch(`${BASE_URL}/api/web/acpPrograms`,data).then (res=>{
            console.log("submit successfully",res.data)
        }).catch(err=>{   

        }) 
        
    }
    return (
        <div>
            <Button
                label="Back"
                onClick={() => {       
                    setEditAcp(false);
                    setShowEdit(false); 
                     setShowAcps(null)
                }}
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                style={{ marginTop: "45px" }}
            >
                <div className="grid p-fluid" style={{ justifyContent: "space-around" }}>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "30em" }}>
                        <p className="m-0">Name:</p>
                        <InputText type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
                    </div>
                    <div className="mr-3 mb-3" style={{ marginTop: "15px", width: "30em" }}>
                        <p className="m-0">Description:</p>
                        <InputText type="text" value={formik.values.description} onChange={formik.handleChange} name="description" />
                    </div>
                </div>
            </form>
            <Button onClick={handleUpdateAcp} label="Update" style={{ marginTop: "15px", marginLeft: "50%", transform: "translate(-50%)" }} />
        </div>
    );
};
export default UpdateProgram;
