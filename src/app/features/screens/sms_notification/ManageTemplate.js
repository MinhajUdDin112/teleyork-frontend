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
import TemplateSearchBar from "./TemplateSearchBar";
import Popup from "./Popup";
const ManageTemplate = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allTemps, setAllTemps] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const dispatch = useDispatch();
    const [filterType, setFilterType] = useState("all");
    const [filteredByType, setFilteredByType] = useState([]);

    const { getAllTemplate, getOneTemplate, getAllTemplateLoading, getOneTemplateLoading } = useSelector((state) => state.notification);

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
     const userId = parseLoginRes?._id;

    const togglePopup = (template) => {
        setShowPopup(!showPopup);
        setSelectedTemplate(template);
    };

    const renderActions = (rowData) => {
        return <Button label="Download" onClick={() => handleDownload(rowData)} disabled={getOneTemplateLoading} />;
    };

    const itemsPerPage = 10;
    const pageCount = Math.ceil(allTemps.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const visibleItems = allTemps.slice(offset, offset + itemsPerPage);

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filteredResults = allTemps.filter((template) => {
            return template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.templateId.toString().includes(searchTerm);
        });
        setSearchResults(filteredResults);
    };

    const handleTypeFilter = (selectedType) => {
        setFilterType(selectedType);

        if (selectedType === "all") {
            setFilteredByType(allTemps);
        } else {
            const filteredResults = allTemps.filter((template) => template.type === parseInt(selectedType));
            setFilteredByType(filteredResults);
        }
    };

    const typeFilterOptions = [
        { label: "All", value: "all" },
        { label: "SMS", value: "0" },
        { label: "Email", value: "1" },
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
    }, []);

    useEffect(() => {
        if (getOneTemplate?.data) {
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([getOneTemplate?.data?.keySequence]);

            let keys = getOneTemplate?.data?.keySequence;
            const templateIdHeaderIndex = keys.findIndex((row) => row.includes("templateId"));
            const valueToMap = getOneTemplate?.data?.templateId;
            const rowNumberToMap = 1;

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
                    <div className="">
                        <DataTable
                            value={searchTerm === "" ? (filterType === "all" ? visibleItems : filteredByType) : searchResults}
                            showGridlines
                        >
                            <Column header="Name" field="name"></Column>
                            <Column header="Template ID" field="templateId"></Column>
                            <Column header="Type" body={templateType}></Column>
                            <Column header="Subject" field="notification_subject"></Column>
                            <Column header="CreatedAt" body={createdAtFormatted}></Column>
                            <Column header="CreatedBy" field="createdByUser"></Column>
                            <Column header="Template Body" field="template">
                                {/* Modified renderActionsTemplate */}
                                {(rowData) => {
                                    const templateBodyLines = rowData.template.split("\n");
                                    const firstLine = templateBodyLines[0];
                                    const hasMoreLines = templateBodyLines.length > 1;

                                    return (
                                        <div>
                                            {hasMoreLines ? (
                                                <>
                                                    <div>{firstLine}</div>
                                                    <button onClick={() => togglePopup(rowData)}>See More</button>
                                                </>
                                            ) : (
                                                <div>{firstLine}</div>
                                            )}
                                        </div>
                                    );
                                }}
                            </Column>
                            <Column header="Status" body={status}></Column>
                            <Column header="Action" body={renderActions} style={{ width: "120px" }} />
                        </DataTable>
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                )}
                {showPopup && selectedTemplate && <Popup templateBody={selectedTemplate.template} onClose={() => togglePopup(null)} />}
            </div>
        </div>
    );
};

export default ManageTemplate;


