import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { Toast,ToastContainer } from "react-toastify/dist/components";
const BASE_URL = process.env.REACT_APP_BASE_URL
const ManageDepartment = () => {
  let toastfordelete = useRef(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [visibleDeleteDepartment, setVisibleDeleteDepartment] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isCreate, setIsCreate] = useState(false);
  const [isManage, setIsManage] = useState(false);

  const location = useLocation();
  const currentPath = location?.pathname

  const navigate = useNavigate();

  const loginRes = localStorage.getItem('userData');
  const parseLoginRes = JSON.parse(loginRes);

  const companyId = parseLoginRes?.compony;


  const actions = (rowData) => {
    return (
      <>
        <div className="flex align-items-center">
          <Button
            icon="pi pi-user-edit"
            rounded
            outlined
            onClick={() => handleDepartmentEdit(rowData)}
            className="mr-2"
            disabled={!isManage}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => handleDepartmentDelete(rowData)}
            disabled={!isManage}
          />
        </div>
      </>
    );
  };

  const handleDepartmentEdit = (rowData) => {
    navigate("/edit-department", {
      state: { rowData },
    });
  };

  const handleDepartmentDelete = async (rowData) => {
    setDepartmentId(rowData._id);
    setVisibleDeleteDepartment(true);
  };

  const getAllDepartments = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${companyId}`);
      setAllDepartments(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);
  function confirmDeleteDepartment() {
    Axios.delete(`${BASE_URL}/api/deparments/deleteDepartment?departmentId=${departmentId}`)
      .then(() => {
        toastfordelete.current.show({
          severity: "success",
          summary: "Info",
          detail: "Deleted Department Successfully",
        });
        getAllDepartments();
      })
      .catch((err) => {
        toastfordelete.current.show({
          severity: "error",
          summary: "Info",
          detail: "Deleted Department Failed",
        });
      });

    setVisibleDeleteDepartment(false);
  }


  function skipDeleteDepartment() {
    setVisibleDeleteDepartment(false);
  }

  const filteredUsers = allDepartments.filter((user) => {
    return (
      user.department.toLowerCase().includes(searchText.toLowerCase())

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
    <>
      <div className="card">
        <h3 className="mt-1 ">Manage Department</h3>
      </div>

      <div className="card">

        <DataTable
          value={filteredUsers}
          tableStyle={{ minWidth: "50rem" }}
          header={() => (
            <div className="flex justify-content-between">
              <div className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search by Name"
                />
              </div>
              <Button label="Add" onClick={() => navigate("/create-department")} disabled={!(isCreate || isManage)} />
            </div>
          )}
        >
          <Column field="department" header="Department Name"></Column>
          <Column
            field={(item) => (item?.status === true ? "Active" : "Inactive")}
            header="Status"
          ></Column>
          <Column body={actions} header="Actions"></Column>
        </DataTable>
        <Dialog
          header="Delete Department"
          visible={visibleDeleteDepartment}
          style={{
            width: "50vw",
            overflowX: "hidden",
            marginLeft: "50%",
            width: "100%",
            transform: "translate(-50%)",
          }}
          draggable={false}
          onHide={skipDeleteDepartment}
        >
          <div style={{ textAlign: "center" }}>
            <p> Are You Sure to Delete a Department ? </p>
            <div style={{ marginTop: "45px" }}>
              <Button
                style={{ marginRight: "45px" }}
                label="Yes"
                onClick={confirmDeleteDepartment}
              />{" "}
              <Button label="No" onClick={skipDeleteDepartment} />
            </div>
          </div>
        </Dialog>
      </div>
      <Toast ref={toastfordelete} />
    </>
  );
};

export default ManageDepartment;
