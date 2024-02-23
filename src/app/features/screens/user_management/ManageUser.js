import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify"; 
import  EditUser from "./EditUser" 
const BASE_URL = process.env.REACT_APP_BASE_URL
const ManageUser = () => { 
     const [showEditUser,setShowEditUser]=useState(false)
    let toastfordelete = useRef(null);
    const [allUsers, setAllUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [visibleDeleteUser, setVisibleDelelteUser] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);
   const [rowData,setRowData]=useState(null)
    const location = useLocation();
    const currentPath = location?.pathname

    // Get user data from ls
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const navigate = useNavigate();
    const actions = (rowData) => {
        return (
            <>
                <div className="flex align-items-center">
                    <Button icon="pi pi-user-edit" rounded outlined onClick={() => handleUserEdit(rowData)} className="mr-2" disabled={!isManage} />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleUserDelete(rowData)} disabled={!isManage} />
                </div>
            </>
        );
    };

    const handleUserEdit = (rowData) => {
         setRowData(rowData) 
         setShowEditUser(prev=>!prev) 
    };
    const handleUserDelete = async (rowData) => {
        setUserId(rowData._id);
        setVisibleDelelteUser(true);
    };

    const getAllUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/user/all?company=${parseLoginRes?.company}`);

            setAllUsers(res?.data?.data || []);
        } catch (error) {
            toast.error(`Error fetching module data: ${error?.response?.data?.msg}`);
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

                <div className="flex justify-content-between">
                    <div className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by Name or Role"
                        />
                    </div>
                    <Button label="Add" onClick={redirectToCreateUser} disabled={!(isCreate || isManage)} />
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



    const filteredUsers = allUsers.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.role.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const actionBasedChecks = () => {

        const loginPerms = localStorage.getItem("permissions")
        const parsedLoginPerms = JSON.parse(loginPerms)

        const isCreate = parsedLoginPerms.some((node) =>
            node?.subModule.some((subNode) =>
                subNode?.route === currentPath && subNode?.actions.some((action) =>
                    action?.name === "create"
                )
            )
        );
        setIsCreate(isCreate)

        const isManage = parsedLoginPerms.some((node) =>
            node?.subModule.some((subNode) =>
                subNode?.route === currentPath && subNode?.actions.some((action) =>
                    action?.name === "manage"
                )
            )
        );
        setIsManage(isManage)

    };

    useEffect(() => {
        actionBasedChecks();
    }, []);

    return (
        <Card className="pl-0 pr-0"> 
          <div className="card mx-5 p-0 ">
            <div>
                <h3 className="mt-1 p-2 pt-4 font-bold ">Manage User</h3>
            </div>
            <div >
                <DataTable value={filteredUsers} tableStyle={{ minWidth: "1400px" }} header={userTableHeader}>
                    <Column field="role.role" header="Role"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="state" header="State"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="zip" header="Zip"></Column>
                    <Column field={(item) => (item?.active === true ? "Active" : "Inactive")} header="Status"></Column>
                    <Column field="createdDate" header="Created Date" body={(rowData) => new Date(rowData.createdDate).toLocaleDateString()}></Column>
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
                 <Dialog  header="Edit User" visible={showEditUser} style={{width:"80vw"}} onHide={()=>{ setShowEditUser(prev=>!prev)}}   > 
                    <EditUser data={rowData} />    
                    </Dialog> 
            </div>
            <Toast ref={toastfordelete} /> 
            </div>
        </Card>
    );
};

export default ManageUser;
