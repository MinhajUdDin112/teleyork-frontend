import Axios from "axios";
import React, { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export const DialogeForHistory = ({selectedId}) => {
const [isHistory, setIsHistory] = useState()

    const getCustomerProfileData = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/user/userDetails?userId=${selectedId}`);
            if (res?.status == 200 || res?.status == 201) {
                setIsHistory(res?.data?.data || []);
                console.log("is History is",res?.data?.data)
            }
        } catch (error) {}
    };
    useEffect(() => {
        getCustomerProfileData();
    }, [])
    return (
        <>
            <div className="pt-3">
                <div className="grid">
                    <div className="col-12 lg:col-6 ">
                        <div className="p-3 ">
                            <div className="card h-full flex flex-column overflow-x">
                                <div>
                                    <table className="cp_table w-full text-left">
                                        <tbody>
                                            <tr>
                                                <td>CreatedBy</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>Created Date </td>
                                                <td>{setIsHistory}</td>
                                            </tr>

                                            <tr>
                                                <td>Approved By</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>Rejected By</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 lg:col-6 ">
                        <div className="p-3 ">
                            <div className="card h-full flex flex-column overflow-x">
                                <div>
                                    <table className="cp_table w-full text-left">
                                        <tbody>
                                           
                                        <tr>
                                                <td>CreatedBy</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>Created Date </td>
                                                <td>{setIsHistory}</td>
                                            </tr>

                                            <tr>
                                                <td>Approved By</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>Rejected By</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td>{setIsHistory}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
