
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import Axios from 'axios';
import { Column } from 'primereact/column';
import ReactPaginate from "react-paginate";
import { Button } from 'primereact/button';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Dialog } from "primereact/dialog";
import { useLocation } from 'react-router-dom';
import ManagePermissions from './ManagePermissions';
const BASE_URL = process.env.REACT_APP_BASE_URL
export default function BasicDemo() {

    let Location = useLocation()

    const [refresh, setRefresh] = useState(false)
    const [deleteRoleLoading, setDeleteRoleLoading] = useState(false)
    let toastref = useRef(null)
    let [allRoles, setAllRoles] = useState([])
    let navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0);
    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState("");

    const [isCreate, setIsCreate] = useState(false);
    const [isManage, setIsManage] = useState(false);

    const location = useLocation();
    const currentPath = location?.pathname

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allRoles.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const visibleItems = allRoles.slice(offset, offset + itemsPerPage);
    function renderActions(rowData) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Button label="Permissions" style={{ cursor: "pointer", marginLeft: "25px", fontWeight: "900", border: "none" }} onClick={() => {

                    navigate(`/managerolesandrights/Permissions?roleId=${rowData._id}`)

                }} disabled={!isManage} />
                <Button style={{ marginLeft: "25px", fontWeight: "900", backgroundColor: "red", border: "none" }} onClick={() => {

                    if (!deleteRoleLoading) {
                        setDeleteRoleLoading(prev => !prev)
                        Axios.delete(`${BASE_URL}/api/web/role?roleId=${rowData._id}`).then(() => {
                            toastref.current.show({ severity: 'success', summary: 'Info', detail: 'Role Deleted Successfully' });
                            setDeleteRoleLoading(prev => !prev)
                            setRefresh(prev => !prev)
                        }).catch(() => {
                            toastref.current.show({ severity: 'error', summary: 'Info', detail: 'Role Deleted Failed' });
                            setDeleteRoleLoading(prev => !prev)
                        })
                    }


                }} disabled={!isManage}>
                    Delete
                </Button>
            </div>
        )
    }
    const roleDescription = (rowData) => {
        let description = rowData.description;
        let shortline = description.substring(0, 10);
        let fullline = description.substring(15, description.length);

        return (
            <div id="Description">
                {description.length > 10 ? <p>
                    {shortline}
                    <span
                        style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
                        onClick={(e) => {
                            setDescription(rowData.description);
                            setVisible(true);
                        }}
                    >
                        {" "}
                        See more
                    </span>
                </p> : <p>{rowData.description}</p>

                }
            </div>
        );
    };
    const getAllRoles = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.compony}`);

            if (res?.status === 200 || res?.status === 201) {

                setAllRoles(res?.data?.data);

            }

        } catch (error) {

        }
    };

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

    useEffect(() => {
        if (Location.pathname === "/managerolesandrights") {
            getAllRoles()
        }
    }, [refresh]);

    return (
        <div className="card" >
            <Routes>
                <Route path=":id" element={<ManagePermissions setRefresh={setRefresh} />} />
            </Routes>   {Location.pathname === "/managerolesandrights" ?
                <> <div className="card mx-5 p-0 border-noround">
                    <DataTable value={visibleItems} tableStyle={{ minWidth: "50rem" }} showGridlines>
                        <Column field="role" header="Role"></Column>
                        <Column field={roleDescription} header="Description"></Column>
                        <Column field="active" header="Active"></Column>
                        <Column field={renderActions} header="Actions" style={{ width: "120px" }} ></Column>
                    </DataTable>
                    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />

                </div>
                    <Dialog
                        header="Role Description"
                        visible={visible}
                        style={{ width: "50vw" }}
                        draggable={false}
                        onHide={() => {
                            setVisible(false);
                        }}
                    >
                        <p>{description}</p>
                    </Dialog>
                </> : undefined

            }
            <Toast ref={toastref} />
        </div>
    );
}
