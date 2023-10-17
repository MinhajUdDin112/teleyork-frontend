import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import BASE_URL from "../../../../config";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
const ManageUser = () => {
    let toastfordelete = useRef(null);
    const [allUsers, setAllUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [visibleDeleteUser, setVisibleDelelteUser] = useState(false);
    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const navigate = useNavigate();
    const actions = (rowData) => {
        return (
            <>
                <div className="flex align-items-center">
                    <Button icon="pi pi-user-edit" rounded outlined onClick={() => handleUserEdit(rowData)} className="mr-2" />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleUserDelete(rowData)} />
                </div>
            </>
        );
    };

    const handleUserEdit = (rowData) => {
        navigate("/edit-user", {
            state: { rowData },
        });
    };
    const handleUserDelete = async (rowData) => {
        setUserId(rowData._id);
        setVisibleDelelteUser(true);
    };
    console.log("parseLoginRes?.compony", parseLoginRes?.compony);
    const getAllUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/user/all?compony=${parseLoginRes?.compony}`);
            console.log("userData", res?.data?.data);
            setAllUsers(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    const redirectToCreateUser = () => {
        navigate("/create-user");
    };

    const redirectToUpdatePermissions = (rowData) => {
        navigate("/createrole", {
            state: { rowData },
        });
    };

    const userTableHeader = () => {
        return (
            <>
                <div className="text-right">
                    <Button label="Add" onClick={redirectToCreateUser} />
                </div>
            </>
        );
    };

    // const permissions = (rowData) => {
    //     return (
    //         <Button label="Update" onClick={() => redirectToUpdatePermissions(rowData)} className='p-button-sm' />
    //     )
    // }

    useEffect(() => {
        getAllUsers();
    }, []);
    function confirmDeleteUser() {
        Axios.delete(`${BASE_URL}/api/web/user?userId=${userId}`)
            .then(() => {
                toastfordelete.current.show({ severity: "success", summary: "Info", detail: "Deleted User Successfully" });
                getAllUsers();
            })
            .catch((err) => {
                toastfordelete.current.show({ severity: "error", summary: "Info", detail: "Deleted User Failed" });
            });

        setVisibleDelelteUser(false);
    }
    function skipDeleteUser() {
        setVisibleDelelteUser(false);
    }
    return (
        <>
            <div className="card">
                <DataTable value={allUsers} tableStyle={{ minWidth: "50rem" }} header={userTableHeader}>
                    <Column field="role.role" header="Role"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="state" header="State"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="zip" header="Zip"></Column>
                    <Column field={(item) => (item?.active === true ? "Active" : "Inactive")} header="Status"></Column>
                    <Column field="createdDate" header="Created Date"></Column>
                    <Column body={actions} header="Actions"></Column>
                    {/* <Column body={permissions} header="Permissions"></Column> */}
                </DataTable>
                <Dialog
                    header="Delete User"
                    visible={visibleDeleteUser}
                    style={{ width: "50vw", overflowX: "hidden", marginLeft: "50%", width: "100%", transform: "translate(-50%)" }}
                    draggable={false}
                    onHide={() => {
                        setVisibleDelelteUser(false);
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <p> Are You Sure to Delete a User ? </p>
                        <div style={{ marginTop: "45px" }}>
                            <Button
                                style={{ marginRight: "45px" }}
                                label="Yes"
                                onClick={() => {
                                    confirmDeleteUser();
                                }}
                            />{" "}
                            <Button
                                label="No"
                                onClick={() => {
                                    skipDeleteUser();
                                }}
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
            <Toast ref={toastfordelete} />
        </>
    );
};

export default ManageUser;
