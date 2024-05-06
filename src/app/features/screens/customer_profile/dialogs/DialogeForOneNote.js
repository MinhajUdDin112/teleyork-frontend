import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const DialogeForOneNote = ({ enrollmentId, noteId, contact }) => {
    const [cpData, setCpData] = useState([]);
    const [resolvedNotes, setResolvedNotes] = useState(() => JSON.parse(localStorage.getItem("resolvedNotes")) || []);
    const navigate = useNavigate();
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    useEffect(() => {
        const getOneNote = async () => {
            try {
                const response = await Axios.get(`${BASE_URL}/api/web/notes/getOne?noteId=${noteId}`);
                if (response?.status === 200 || response?.status === 201) {
                    setCpData(response?.data);
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            }
        };
        getOneNote();
    }, []);

    useEffect(() => {
        localStorage.setItem("resolvedNotes", JSON.stringify(resolvedNotes));
    }, [resolvedNotes]);

    function markVoid() {
        Axios.put(`${BASE_URL}/api/web/notes/markVoid`, { noteId: cpData?.data._id, markVoid: true })
            .then(() => {
                toast.success("Successfully Void");
            })
            .catch((err) => {
                toast.error("Failed To Mark Void");
            });
    }
    // useEffect(() => {
    //     const getAllNotes = async () => {
    //         try {
    //             const response = await Axios.get(`${BASE_URL}/api/web/notes/all?serviceProvider=${parseLoginRes?.company}`);
    //             if (response?.status === 200 || response?.status === 201) {
    //                 setCpData(response?.data);
    //             }
    //         } catch (error) {
    //             toast.error(error?.response?.data?.msg);
    //         }
    //     };
    //     getAllNotes();
    // },[]);

    const handleResolve = async (noteId) => {
        const data = {
            noteId: noteId,
        };
        try {
            const response = await Axios.post(`${BASE_URL}/api/web/notes/resolveNote`, data);
            if (response?.status === 200 || response?.status === 201) {
                toast.success("Successfully Resolved");
                setResolvedNotes([...resolvedNotes, noteId]);
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const isPreviouslyResolved = (noteId) => {
        const previouslyResolved = JSON.parse(localStorage.getItem("resolvedNotes"));
        return previouslyResolved ? previouslyResolved.includes(noteId) : false;
    };
    // const isResolved = (noteId) => resolvedNotes.includes(noteId);

    return (
        <>
            <div className="">
                <div className=" h-full">
                    <div className="shadow-1 h-full flex flex-column">
                        <hr className="m-0" />

                        {/* Table */}
                        <div>
                            <table className="cp_table w-full text-left" style={{ borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Customer ID</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{enrollmentId}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Notes</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{cpData?.data?.note}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Notes Type</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{cpData?.data?.noteType}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Priority</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{cpData?.data?.priority}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Posted By</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightlightgrey", width: "25vw" }}>{cpData?.data?.user?.name}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Posted Date & Time</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{cpData?.data?.createdAt ? new Date(cpData.data.createdAt).toLocaleDateString() : ""}</td>
                                    </tr>
                                    <tr style={{ border: "1px solid lightgrey" }}>
                                        <td style={{ border: "1px solid lightgrey" }}>Caller ID</td>
                                        <td style={{ border: "1px solid lightgrey", width: "0.4rem" }}>:</td>
                                        <td style={{ border: "1px solid lightgrey", width: "25vw" }}>{contact}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {isPreviouslyResolved(noteId) || resolvedNotes.includes(noteId) ? (
                        <Button className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none mt-4" label="Resolved" disabled />
                    ) : (
                        <Button onClick={() => handleResolve(noteId)} className="bg-blue-700 pl-2 pr-2 pt-1 pb-1 border-none mt-4">
                            Resolve
                        </Button>
                    )}

                    {isPreviouslyResolved(noteId) || resolvedNotes.includes(noteId) ? null : <Button style={{ marginLeft: "0.5rem" }} className="bg-yellow-400 pl-2 pr-2 pt-1 pb-1 border-none" label="Pending" />}
                    <Button style={{ marginLeft: "24rem" }} label="Mark Void" onClick={markVoid} />
                </div>
            </div>
        </>
    );
};

export default DialogeForOneNote;
