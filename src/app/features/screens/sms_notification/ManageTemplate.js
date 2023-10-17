import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";   
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";     
import { Route,Routes } from "react-router-dom";
import { getAllTemplateAction, getOneTemplateAction } from "../../../store/notification/NotificationAction";
import CustomLoading from "../../components/custom_spinner";
import { clearGetOneTemplateData } from "../../../store/notification/NotificationSllice";
import BASE_URL from "../../../../config";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";       
import TemplateSearchBar from "./TemplateSearchBar";
import { Toast } from "primereact/toast";
import EditTemplate from "./EditTemplate";
const ManageTemplate = () => { 
    let navigate=useNavigate()
    const [visible, setVisible] = useState(false);   
     let toast=useRef(null)             
     const [navigateToEdit,setNavigateToEdit]=useState(false)
    const [templatebody, setTemplatebody] = useState("");          
    const [visibleDelelteTemplate,setVisibleDelelteTemplate]=useState(false)  
    const [deleteTemplateId,setDeleteTemplateMessage]=useState("")
    const [currentPage, setCurrentPage] = useState(0);       
    const [templateToEdit,setTemplateToEdit]=useState(null)
    const [refresh,setRefresh]=useState(0)
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Add a state for search term
    const [allTemps, setAllTemps] = useState([]);
    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState("all");
    const [filteredByType, setFilteredByType] = useState([]); // New state for filtered data by type
    const { getAllTemplate, getOneTemplate, getAllTemplateLoading, getOneTemplateLoading } = useSelector((state) => state.notification);
    
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    const userId = parseLoginRes?._id;  
    function confirmDeleteTemplate(){ 
        Axios.delete(`${BASE_URL}/api/sms/delete?templateId=${deleteTemplateId}`).then(()=>{  
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Deleted Template Successfully' });
             setRefresh(prevRefresh => prevRefresh + 1)
             setVisibleDelelteTemplate(false)
           }).catch(err=>{   
           
            toast.current.show({ severity: 'error', summary: 'Info', detail: 'Deleted Template Failed' });
             
           })     
           
    }  
    function skipDeleteTemplate(){ 
    setVisibleDelelteTemplate(false)
    }
    const renderActions = (rowData) => {      
        function handleDeleteTemplate(){      
            setDeleteTemplateMessage(rowData._id)  
            setVisibleDelelteTemplate(true)
        }   
        
           function handleEditTemplate(){     
            navigate("/managetemplate/edittemplate")     
            setNavigateToEdit(true)
            setTemplateToEdit(rowData)
           }
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="Download " onClick={() => handleDownload(rowData)} disabled={getOneTemplateLoading} />
                <Button className="pi pi-user-edit" onClick={()=>{handleEditTemplate()}} style={{ cursor: "pointer", marginLeft: "25px", fontSize: "17px", paddingLeft: "27px" }} />
                <Button style={{marginLeft:"25px",fontWeight:"900"}} onClick={()=>{handleDeleteTemplate()}}>
                 Delete
                </Button>
            </div>
        );
    };
    // Constants for pagination
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allTemps.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
     // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Render the visible items based on the current page
    const visibleItems = allTemps.slice(offset, offset + itemsPerPage);

    // Function to handle the search
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update search term state
        // Implement your search logic here
        const filteredResults = allTemps.filter((template) => {
            return template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.templateId.toString().includes(searchTerm);
        });
        setSearchResults(filteredResults);
    };

    // Function to handle type filter
    const handleTypeFilter = (selectedType) => {
        setFilterType(selectedType);

        // Apply type filter
        if (selectedType === "all") {
            setFilteredByType(allTemps); // Show all templates
        } else {
            const filteredResults = allTemps.filter((template) => template.type === parseInt(selectedType));
            setFilteredByType(filteredResults);
        }
    };

    // Options for the type filter dropdown
    const typeFilterOptions = [
        { label: "All", value: "all" },
        { label: "SMS", value: "0" },
        { label: "Email", value: "1" },
        { label: "Both", value: "2" },
    ];

    const handleDownload = (rowData) => {
        const { templateId } = rowData;
        dispatch(getOneTemplateAction(templateId));
    };

    const getAllTemps = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/all?userId=${userId}`);
        setAllTemps(response?.data?.data);
    };

    useEffect(() => {
        getAllTemps();       
        console.log("it is indie ")
    }, [refresh]);

    useEffect(() => {
        if (getOneTemplate?.data) {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([getOneTemplate?.data?.keySequence]);
            // Find the index of the header that contains 'templateId'
            let keys = getOneTemplate?.data?.keySequence;
            const templateIdHeaderIndex = keys.findIndex((row) => row.includes("templateId"));
            // Assuming your value is stored in a variable called 'valueToMap'
            const valueToMap = getOneTemplate?.data?.templateId;
            // Assuming you have a row number where you want to map the value, called 'rowNumberToMap'
            const rowNumberToMap = 1; // Replace 1 with the appropriate row number.

            // Map the value to the specific row and column (assuming the column is 0 in this example)

            if (templateIdHeaderIndex !== -1) {
                XLSX.utils.sheet_add_aoa(ws, [[valueToMap]], { origin: { r: rowNumberToMap, c: templateIdHeaderIndex } });
            }

            XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
            const fileName = `${getOneTemplate?.data?.name}.xlsx`;
            XLSX.writeFile(wb, fileName, { bookType: "xlsx", type: "binary" });
            dispatch(clearGetOneTemplateData());
        }
    }, [getOneTemplate]);

    const templateType = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "Both"}</div>;
    };
    const status = (rowData) => {
        return <div>{rowData.active == true ? "Active" : "False"}</div>;
    };
    const createdAtFormatted = (rowData) => {
        const createdAtDate = new Date(rowData.createdAt);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return createdAtDate.toLocaleString("en-US", options);
    };   
   
    const templateBody = (rowData) => {
        let template = rowData.template;
        let shortline = template.substring(0, 10);
        let fullline = template.substring(15, template.length);
        console.log("body is rendering");
        return (
            <div id="template">
                <p>
                    {shortline}
                    <span
                        style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
                        onClick={(e) => {
                            setTemplatebody(rowData.template);
                            setVisible(true);
                        }}
                    >
                        {" "}
                        See more
                    </span>
                </p>
            </div>
        );
    };

    return (   
        
        <div className="card bg-pink-50">   
        <Routes>
        <Route path="/edittemplate" element={<EditTemplate setRefresh={setRefresh} templatetoedit={templateToEdit} setNavigateToEdit={setNavigateToEdit} />}/>  
        </Routes>    
        <div> 
        {navigateToEdit !== false?undefined :
           <><div className="flex bar-place">
                <div className="mx-5">
                    <h3 className="text-xl font-bold pb-2">Manage Template</h3>
                </div>
                <div className="flex ">
                    <div className="mb-3">
                        <label className="font-bold">Filter By Type: </label>
                        <Dropdown value={filterType} className="font-semibold" options={typeFilterOptions} onChange={(e) => handleTypeFilter(e.value)} placeholder="Select a type" />
                    </div>
                    <div className=" mb-3 ml-5">
                        <TemplateSearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>

            <div className="card mx-5 p-0 border-noround">
                {getAllTemplateLoading ? (
                    <CustomLoading />
                ) : (
                    <div>
                        <DataTable tableStyle={{ minWidth: "115rem" }} value={searchTerm === "" ? (filterType === "all" ? visibleItems : filteredByType) : searchResults} showGridlines>
                            <Column header="Name" field="name"></Column>
                            <Column header="Template ID" field="templateId"></Column>
                            <Column header="Type" body={templateType}></Column>
                            <Column header="Subject" field="notification_subject"></Column>
                            <Column header="CreatedAt" body={createdAtFormatted}></Column>
                            <Column header="CreatedBy" field="createdByUser"></Column>
                            <Column header="Template Body" body={templateBody}></Column>
                            <Column header="Status" body={status}></Column>
                            <Column header="Action" body={renderActions} style={{ width: "120px" }} />
                        </DataTable>
                        <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                    </div>
                )}
            </div>
            <Dialog
                header="Template Body"
                visible={visible}
                style={{ width: "50vw" }}
                draggable={false}
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: `<p>${templatebody}</p>` }} />
            </Dialog>     
                   
            <Dialog
                    header="Delete Template"
                    visible={visibleDelelteTemplate}
                    style={{ width: "50vw", overflowX: "hidden", marginLeft: "50%", width: "100%", transform: "translate(-50%)" }}
                    draggable={false}
                    onHide={() => {
                        setVisibleDelelteTemplate(false);
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <p> Are You Sure to Delete a Template ? </p>
                        <div style={{ marginTop: "45px" }}>
                            <Button
                                style={{ marginRight: "45px" }}
                                label="Yes"
                                onClick={() => {
                                    confirmDeleteTemplate();
                                }}
                            />{" "}
                            <Button
                                label="No"
                                onClick={() => {
                                    skipDeleteTemplate();
                                }}
                            />
                        </div>
                    </div>
                </Dialog> 
            <Toast ref={toast}/>  
            </>  
        } 
       </div>
        </div>
    );
};

export default ManageTemplate;
