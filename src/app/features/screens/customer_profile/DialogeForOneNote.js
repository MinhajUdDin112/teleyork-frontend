import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
import { ProgressSpinner } from "primereact/progressspinner";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const DialogeForOneNote = ({enrollmentId,noteId,contact}) => {

    const [cpData, setCpData] = useState([]);
    
   
useEffect(() => {

const getOneNote= async()=>{

try {
  const response = await Axios.get(`${BASE_URL}/api/web/notes/getOne?noteId=${noteId}`)
  if(response?.status===200 || response?.status===201){
            setCpData(response?.data);
          
  }
} catch (error) {
  toast.error(error?.response?.data?.msg)
}
}
getOneNote();

}, [])
    
    return (
        <>
            <div className="">
                <div className=" h-full">
                    <div className="shadow-1 h-full flex flex-column">
                        <hr className="m-0" />

                        {/* Table */}
                        <div>
                            <table className="cp_table w-full text-left">
                                <tbody>
                                    <tr>
                                        <td >Customer ID</td>     
                                        <td style={{width:"25vw"}}>{enrollmentId}</td>
                                       
                                    </tr>
                                    <tr>
                                        <td >Notes</td>     
                                        <td style={{width:"25vw"}}>{cpData?.data?.note}</td>
                                       
                                    </tr>
                                    <tr>
                                        <td >Notes Type</td>     
                                        <td style={{width:"25vw"}}>{cpData?.data?.noteType}</td>
                                       
                                    </tr>
                                    <tr>
                                        <td >Priority</td>     
                                        <td style={{width:"25vw"}}>{cpData?.data?.priority}</td>
                                       
                                    </tr>
                                    <tr>
                                        <td >Posted By</td>     
                                        <td style={{width:"25vw"}}>{cpData?.data?.user?.name}</td>
                                       
                                    </tr>
                                    <tr>
                                        <td >Posted Date & Time</td>     
                                        <td style={{ width: "25vw" }}>{cpData?.data?.createdAt ? new Date(cpData.data.createdAt).toLocaleDateString() : ''}</td>

                                       
                                    </tr>
                                    <tr>
                                        <td >Caller ID</td>     
                                        <td style={{width:"25vw"}}>{contact}</td>
                                       
                                    </tr>
                                </tbody>
                               
                            </table>
                           
                        </div>
                      
                    </div>
                    <div  className="mt-3 text-right">
                    <Button label="Mark Void"/>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default DialogeForOneNote;
