import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import BASE_URL from '../../../../config'
import { Button } from 'primereact/button'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const ManageUser = () => {

    const [allUsers, setAllUsers] = useState([])

    // Get user data from ls
    const loginRes = localStorage.getItem("userData")
    const parseLoginRes = JSON.parse(loginRes)

    const navigate = useNavigate()

    const actions = (rowData) => {
        return (
            <>
                <div className='flex align-items-center'>
                    <Button icon="pi pi-user-edit" rounded outlined onClick={() => handleUserEdit(rowData)} className='mr-2' />
                    <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleUserDelete(rowData)} />
                </div>
            </>
        )
    }

    const handleUserEdit = (rowData) => {
        navigate("/edit-user", {
            state: { rowData }
        });
    };

    const handleUserDelete = async (rowData) => {
        console.log('rowData', rowData)
        try {
            const res = await Axios.delete(`${BASE_URL}/api/web/user?userId=${rowData?._id}`);
            if (res?.status === 200) {
                toast.success("User Deleted")
                getAllUsers()
            }
        } catch (error) {
            console.error("Error fetching module data:", error);
        }

    }
    console.log('parseLoginRes?.compony', parseLoginRes?.compony)
    const getAllUsers = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/user/all?compony=${parseLoginRes?.compony}`);
            console.log('userData', res?.data?.data)
            setAllUsers(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching module data:", error);
        }
    };

    const redirectToCreateUser = () => {
        navigate("/create-user")
    }

    const redirectToUpdatePermissions = (rowData) => {
        navigate("/createrole", {
            state: { rowData }
        });
    }

    const userTableHeader = () => {
        return (
            <>
                <div className='text-right'>
                    <Button label="Add" onClick={redirectToCreateUser} />
                </div>
            </>
        )
    }

    const permissions = (rowData) => {
        return (
            <Button label="Update" onClick={() => redirectToUpdatePermissions(rowData)} />
        )
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <div className="card">
                <DataTable
                    value={allUsers}
                    tableStyle={{ minWidth: '50rem' }}
                    header={userTableHeader}
                >
                    <Column field="role.role" header="Role"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="state" header="State"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="zip" header="Zip"></Column>
                    <Column field={(item) => item?.active === true ? "Active" : "Inactive"} header="Status"></Column>
                    <Column field="createdDate" header="Created Date"></Column>
                    <Column body={actions} header="Actions"></Column>
                    <Column body={permissions} header="Permissions"></Column>
                </DataTable>
            </div>
        </>
    )
}

export default ManageUser