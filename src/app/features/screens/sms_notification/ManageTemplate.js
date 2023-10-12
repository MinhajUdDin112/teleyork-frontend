
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import { getAllTemplateAction, getOneTemplateAction } from "../../../store/notification/NotificationAction";
import CustomLoading from "../../components/custom_spinner";
import { clearGetOneTemplateData } from "../../../store/notification/NotificationSllice";
import BASE_URL from "../../../../config";
import Axios from "axios";
import ReactPaginate from "react-paginate";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import TemplateSearchBar from "./TemplateSearchBar";
const ManageTemplate = () => {
    const [visible, setVisible] = useState(false);
    const [templatebody, setTemplatebody] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
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
    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="Download " onClick={() => handleDownload(rowData)} disabled={getOneTemplateLoading} />
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
         console.log(response)
        setAllTemps(response?.data?.data);
    };

    useEffect(() => {
        getAllTemps();
    }, []);

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
            <div className="flex bar-place">
                <div className="mx-5">
                    <h3 className="text-xl font-semibold border-bottom-1 pb-2">Manage Template</h3>
                </div>
                <div className="flex ">
                    <div className="mb-3">
                        <label>Filter By Type: </label>
                        <Dropdown value={filterType} options={typeFilterOptions} onChange={(e) => handleTypeFilter(e.value)} placeholder="Select a type" />
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
                        <DataTable tableStyle={{ minWidth: "90rem" }} value={searchTerm === "" ? (filterType === "all" ? visibleItems : filteredByType) : searchResults} showGridlines>
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
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: `<p>${templatebody}</p>` }} />
            </Dialog>
        </div>
    );
};

export default ManageTemplate;

