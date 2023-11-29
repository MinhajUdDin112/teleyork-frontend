import React, { useRef, useState ,useEffect} from "react";
import { useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import AddAgentDetail from "./Dialogs/add_agent_detail";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import * as Yup from "yup";  
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import BASE_URL from "../../../../../../../../config";
import InfoForUsers from "./InfoForUsers/info_for_users";
export default function TabletBulkUploadAddStock() {
    const ref = useRef(null);
    const [filename, setFilename] = useState(null);
    const [addAgentDialogVisibility, setAddAgentDialogVisibility] = useState(false);
    const loginRes = localStorage.getItem("userData");
    const [agent, setAgent] = useState(null);
    const [department, setDepartment] = useState(null);
    const [departmentselected, setDepartmentSelected] = useState(null);
    const parseLoginRes = JSON.parse(loginRes);
    const [carrier, setCarrier] = useState(null);  
    const [fileerror,setFileError]=useState(false)
    useEffect(() => {
        if (department === null) {
            Axios.get(`${BASE_URL}/api/deparments/getDepartments?company=${parseLoginRes.compony}`)
                .then((res) => {
                    console.log(res.data.data);
                    let departmentholder = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        const obj = {};
                        obj.label = res.data.data[i].department;
                        obj.value = res.data.data[i]._id;
                        departmentholder.push(obj);
                    }
                    console.log("department holder is ", departmentholder);
                    setDepartment(departmentholder);
                    console.log(department); // Move this inside the promise callback
                })
                .catch(() => {
                    console.log("error");
                });
        }
    }, []);
    useEffect(() => {
        if (departmentselected !== null) {
            Axios.get(`${BASE_URL}/api/web/user/getByDepartments?department=${departmentselected}`)
                .then((res) => {
                    let agentholder = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        const obj = {};
                        obj.label = res.data.data[i].name;
                        obj.value = res.data.data[i]._id;
                        agentholder.push(obj);
                    }

                    setAgent(agentholder);
                })
                .catch(() => {
                    console.log("error");
                });
        }
    }, [departmentselected]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/api/web/carrier/all`)
            .then((res) => {
                let carrierholder = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    const obj = {};
                    obj.label = res.data.data[i].name;
                    obj.value = res.data.data[i]._id;
                    carrierholder.push(obj);
                }

                setCarrier(carrierholder);
            })
            .catch(() => {
                console.log("error");
            });
    }, []);

    const formik = useFormik({
        validationSchema: Yup.object({
            carrier: Yup.string().required("Carrier is required"),

            AgentName: Yup.string().required("Agent Name is required"),
            agentType: Yup.string().required("Department is required"),
        }),
        initialValues: {
            carrier: "",
            file: "",
            serviceProvider: parseLoginRes?.companyName,
            agentType: "",
            AgentName: "",
            /*team:"",*/
            unitType: "Tablet",
            Uploaded_by: parseLoginRes?._id,
            provisionType: "Add Stock",
        },

        onSubmit: (e) => {
            handlesubmit();
        },
    });
    function handlesubmit() {
        console.log(formik.values);
        console.log("handle submit is called ");

        const formData = new FormData();
        formData.append("file", formik.values.file);
        formData.append("serviceProvider", parseLoginRes?.compony);
        formData.append("Uploaded_by", formik.values.Uploaded_by);
        formData.append("carrier", formik.values.carrier);
        formData.append("agentType", formik.values.agentType);
        formData.append("AgentName", formik.values.AgentName);
        formData.append("unitType", formik.values.unitType);
        formData.append("provisionType", formik.values.provisionType);
        // Perform API call or other actions with the formData

        console.log(formik.errors);
        if (Object.keys(formik.errors).length === 0 ) {  
            if(formik.values.file !== ""){
            formik.values.serviceProvider = parseLoginRes?.compony;
            Axios.post(`${BASE_URL}/api/web/tabletInventory/bulkAddStockTablet`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(() => {
                    console.log("Successfully done");
                    ref.current.show({ severity: "success", summary: "Info", detail: "Added Successfully" });
                })
                .catch((error) => {
                    console.log(error.response.data.msg)   
                ref.current.show({ severity: "error", summary: "Info", detail:error.response.data.msg});
               
                 });
            formik.values.serviceProvider = parseLoginRes?.companyName; }  
            else{ 
                setFileError(true)
            }
        }
    }
    return (
        <>
            <div>
                <div className="flex flex-wrap mb-3 justify-content-around ">
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Carrier <span style={{ color: "red" }}>*</span>
                        </p>
                        <Dropdown value={formik.values.carrier} options={carrier} onChange={(e) => formik.setFieldValue("carrier", e.value)} placeholder="Select an option" className="w-20rem mt-2" />
                        {formik.errors.carrier && formik.touched.carrier && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.carrier}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Company Name <span style={{ color: "red" }}>*</span>
                        </p>
                        <InputText value={formik.values.serviceProvider} name="serviceProvider" disabled className="w-20rem mt-2" />
                    </div>

                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Department/Vendor Name <span style={{ color: "red" }}>* </span>
                        </p>

                        <Dropdown
                            value={formik.values.agentType}
                            options={department}
                            onChange={(e) => {
                                formik.setFieldValue("agentType", e.value);
                                setDepartmentSelected(e.value);
                            }}
                            placeholder="Select an option"
                            className="w-20rem mt-2"
                        />
                        {formik.errors.agentType && formik.touched.agentType && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.agentType}
                            </div>
                        )}
                    </div>
                    <div className="mr-3 mb-3 mt-3">
                        <p className="m-0">
                            Agent Name <span style={{ color: "red" }}>* </span>
                            {formik.values.AgentName !== "" ? (
                                <i
                                    onClick={() => {
                                        setAddAgentDialogVisibility((prev) => !prev);
                                    }}
                                    className="pi pi pi-plus"
                                    style={{ marginLeft: "5px", fontSize: "14px", color: "#fff", padding: "5px", cursor: "pointer", paddingLeft: "10px", borderRadius: "5px", paddingRight: "10px", background: "#00c0ef" }}
                                ></i>
                            ) : undefined}
                        </p>

                        <Dropdown value={formik.values.AgentName} options={agent} onChange={(e) => formik.setFieldValue("AgentName", e.value)} placeholder="Select an option" className="w-20rem mt-2" />
                        {formik.errors.AgentName && formik.touched.AgentName && (
                            <div className="mt-2" style={{ color: "red" }}>
                                {formik.errors.AgentName}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-content-around align-item-center ">
                   <div> <Button
                        onClick={() => {  
                            setFileError(false)
                            let input = document.createElement("input");
                            input.type = "file";
                            input.accept = ".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            input.click();
                            input.onchange = (e) => {
                                setFilename(e.target.files[0].name);

                                formik.setFieldValue("file", e.target.files[0]);
                            };
                        }}
                    >
                        {" "}
                        {filename === null ? "Add File" : filename}
                    </Button>    
                     { fileerror ? <p className="mt-2" style={{color:"red"}}> 
                          File is required
                    </p>  :undefined
}
                    </div>
                    <Button
                        onClick={() => {   
                             if(formik.values.file === ""){ 
                                 setFileError(true)
                             }
                            formik.handleSubmit();
                        }}
                    >
                        Submit{" "}
                    </Button>
                </div>
           
                <>
                    <p className="mt-4">
                        <strong>Notes:</strong>
                        SIM, MDN, Model ID (STANDARD/MICRO/NANO), MSL/PUK,Puk2, PO#,BOX#, Wholesale/Cost Price for SIM, Selling/Retail Price for SIM, UICCID, Zipcode, Activation Fee , MSID,Device ID/IMEI,ACP Co-Pay Amount,ACP Device Reimbursement Amount,Device Retail Price   
                        {formik.values.carrier === ""? <p className="font-bold" style={{display:"inline-block"}}> &nbsp; (Sample file)</p>
                        : <a download={true} href="/images/addAndAssignNonActivateSim (1).xlsx" className="font-bold"> &nbsp; (Sample file)</a>
                        }
                    </p>
                    <p className="mt-4">
                        <strong>Notes:-</strong>
                        Please select carrier to download the (Sample File)    
                       
                         </p>    
                </>        
               <InfoForUsers ProvisionType={"AddStock"}/>
                <Dialog
                    style={{ width: "90vw" }}
                    visible={addAgentDialogVisibility}
                    onHide={() => {
                        setAddAgentDialogVisibility((prev) => !prev);
                    }}
                >
                    <AddAgentDetail AgentName={"Dummy"} />
                </Dialog>
                <Toast ref={ref} />
            </div>
        </>
    );
}
