import React, { useState } from "react";
import { Button } from "primereact/button";
import Preview_Final_component from "../eligiblityForEnrollment/pages/Preview_Final_component";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditPreview from "./EditPreview";
import { useNavigate } from "react-router-dom";
const ViewPreviewData = () => {
    const [showFinalComponent, setShowFinalComponent] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const navigate = useNavigate();
    //get preview  information from local storage
    const previewsRes = localStorage.getItem("viewData");
    const parsepreviewsRes = JSON.parse(previewsRes);
    const previewInfo = parsepreviewsRes?.data;

    const handleEdit = () => {
        navigate("/edit-preview", { state: { data: previewInfo } });
      };
    

    const handleUpdate = (updatedData) => {
        setEditedData(updatedData);
        setIsEditing(false);
    };

    const nextPage = () => {
        setShowFinalComponent(true);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US");
    };

    return (
        <>
            {!showFinalComponent ? (
                <div className="card ">
                    <div className=" sticky-buttons text-right">
                        <Button label="Edit" onClick={handleEdit} />
                    </div>
                    <br></br>
                    {!isEditing ? (
                        <div>
                            <div></div>

                            <br></br>
                            <h2 className="flex flex-row justify-content-center">Preview Enrollment Details</h2>
                            <br />

                            <div className="flex justify-content-around">
                                <div className="border-2 w-5 pt-2">
                                    <div className="flex border-bottom-2">
                                        <p className="w-6 ml-4">First Name:</p>
                                        <p className="w-6">{previewInfo?.firstName}</p>
                                    </div>
                                    <div className="flex border-bottom-2">
                                        <p className="w-6 ml-4">Last Name:</p>
                                        <p className="w-6">{previewInfo?.lastName}</p>
                                    </div>
                                    <div className="flex pt-2 border-bottom-2">
                                        <p className="w-6 ml-4">DOB:</p>
                                        <p className="w-6">{formatDate(previewInfo?.DOB)}</p>
                                    </div>
                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">SSN:</p>
                                        <p className="w-6">{previewInfo?.SSN}</p>
                                    </div>
                                    <div className="flex  ">
                                        <p className="w-6 ml-4">Email:</p>
                                        <p className="w-6">{previewInfo?.email}</p>
                                    </div>
                                </div>
                                <div className="border-2 w-5 ">
                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">Telephone:</p>
                                        <p className="w-6">{previewInfo?.contact}</p>
                                    </div>

                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">Service Address:</p>
                                        <p className="w-6">{previewInfo?.address1}</p>
                                    </div>
                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">City:</p>
                                        <p>{previewInfo?.city}</p>
                                    </div>
                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">State:</p>
                                        <p className="w-6">{previewInfo?.state}</p>
                                    </div>
                                    <div className="flex border-bottom-2 pt-2">
                                        <p className="w-6 ml-4">Zip Code:</p>
                                        <p className="w-6">{previewInfo?.zip}</p>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />
                        </div>
                    ) : (  
                        <EditPreview data={previewInfo} handleUpdate={handleUpdate} />
                    )}
                    <div className=" sticky-buttons text-right">
                        <Button label="Submit" onClick={nextPage} />
                    </div>
                </div>
            ) : (
                <Preview_Final_component enrollment_id={previewInfo?.enrollment_id} />
            )}
        </>
    );
};

export default ViewPreviewData;


// import React, { useState, useEffect } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";

// const ViewPreviewData = (props) => {
//     const [allData, setAllData] = useState([]);

//     // get preview information from local
//     const previewsRes = localStorage.getItem("viewData");
//     const parsepreviewsRes = JSON.parse(previewsRes);
//      const previewInfo = parsepreviewsRes

//     useEffect(() => {
//         const dataArray = previewInfo ? Object.values(previewInfo) : [];
//         setAllData(dataArray);
//     }, []);


//     return (
//         <div className="card bg-pink-50">
//             <div className="card mx-5 p-0 border-noround">
//                 <div className="card mx-3  p-0 border-noround">
//                     <div className="text-right m-3 pt-2">
//                         <Button label="Edit" />
//                     </div>
//                     <DataTable value={allData} showGridlines resizableColumns columnResizeMode="fit">
//                         <Column header="Enrollment ID" field="enrollmentId"></Column>
//                         <Column header="First Name" field="firstName"></Column>
//                         <Column header="Last Name" field="lastName"></Column>
//                         <Column header="Address" field="address1"></Column>
//                         <Column header="City" field="city"></Column>
//                         <Column header="State" field="state"></Column>
//                         <Column header="Zip" field="zip"></Column>
//                         <Column header="DOB" field={(item) => (item?.DOB ? item?.DOB.split("T")[0] : "")}></Column>
//                         <Column header="SSN Number" field="SSN"></Column>
//                         <Column header="Telephone Number" field="contact"></Column>
//                     </DataTable>
//                 </div>
//             </div>
//             <br />
//         </div>
//     );
// };

// export default ViewPreviewData;
