import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";  

import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { getAllTemplateAction, submitTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
import BASE_URL from "../../../../config";
import ReactPaginate from "react-paginate";
import TemplateSearchBar from "./TemplateSearchBar";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Draft = () => {  
    const [visible, setVisible] = useState(false);
    const [templatebody, setTemplatebody] = useState("");

    const [currentPage, setCurrentPage] = useState(0); // Add currentPage state
    const [searchResults, setSearchResults] = useState([]);
    const [allDraft, setAllDraft] = useState([]);
    
    const dispatch = useDispatch();
    const { getAllTemplate, getAllTemplateLoading, submitTemplate, submitTemplateLoading } = useSelector((state) => state.notification);

    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
     const userId = parseLoginRes?._id;


    
    const navigate = useNavigate();

    // Local state to track loading state for each row
    const [loadingStates, setLoadingStates] = useState({});

    // Define the handleView function
    const handleView = (rowData) => {
        const { templateId } = rowData;
        navigate(`/draftall/${templateId}`);
    };
    
    

    // Actions
    const renderActions = (rowData) => {
        const templateId = rowData.templateId;

        // Determine if the button is in a loading state
        const isLoading = loadingStates[templateId];

        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="View" onClick={() => handleView(rowData)} className="w-6rem" />
                {/* Conditionally render the loader or the Send button */}
                {isLoading ? (
                    <ProgressSpinner style={{ width: "40px", height: "40px", color: "blue" }} strokeWidth="4" animationDuration=".5s" />
                ) : (
                    <Button
                        label="Send"
                        onClick={() => handleSend(rowData)}
                        className="w-6rem"
                        disabled={isLoading} // Disable the button when it's in a loading state
                    />
                )}
            </div>
        );
    };

    // Function to handle sending the template
    const handleSend = async (rowData) => {
        const { templateId } = rowData;

        // Set loading state to true for the current row
        setLoadingStates((prevState) => ({
            ...prevState,
            [templateId]: true,
        }));

        try {
            const body = {
                userId: parseLoginRes?._id,
                templateId: templateId,
            };

            // Dispatch the action to submit the template
            await dispatch(submitTemplateAction(body));

            // Show success toast when the action is successful
            toast.success("Template sent successfully!", {
                position: "top-right",
                autoClose: 3000, // Toast auto-closes after 3 seconds
            });
        } catch (error) {
            // Show error toast if there's an error
            toast.error("Failed to send template. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            // Set loading state to false after the action is complete
            setLoadingStates((prevState) => ({
                ...prevState,
                [templateId]: false,
            }));
        }
    };

  

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    const getAllDraft = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/draft?userId=${userId}`);
        setAllDraft(response?.data?.data);
    };

    useEffect(() => {
        getAllDraft();
    }, []);

    // Function to handle the search
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    const filteredResults = allDraft.filter((template) => {
      return (
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.templateId.toString().includes(searchTerm)
      );
    });
    setSearchResults(filteredResults);
  };

    // Constants for pagination
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allDraft.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Render the visible items based on the current page
    const visibleItems = allDraft.slice(offset, offset + itemsPerPage);
        const messageBody=(rowData) => {
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
              <ToastContainer />
            <div className="flex bar-place"></div>
            <div className="flex bar-place">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Draft</h3>
            </div>
            <div className=" mb-3">
        <TemplateSearchBar onSearch={handleSearch} />
      </div>
            </div>
           
            <div className="card mx-5 p-0 border-noround">
                {getAllTemplateLoading ? (
                    <ProgressSpinner style={{ width: "40px", height: "40px", color: "blue" }} strokeWidth="4" animationDuration=".5s" />
                ) : (
                    <div className="">
                        <DataTable tableStyle={{ minWidth: "90rem" }} value={searchResults.length > 0 ? searchResults : visibleItems} showGridlines>
                            <Column header="Template Id" field="templateId"></Column>
                            <Column header="Name" field="name"></Column>
                            <Column header="Message" field={messageBody}></Column>
                            <Column header="Type" body={type}></Column>
                            <Column header="Subject" field="notification_subject"></Column>
                            <Column header="UploadAt" body={createdAtFormatted}></Column>
                            <Column header="UploadBy" field="createdByUser"></Column>
                            <Column header="Status" field="status"></Column>
                            <Column header="Draft SMS Count" field="draftSMSCount"></Column>
                            <Column header="Sent SMS Count" field="sentSMSCount"></Column>
                            <Column header="" body={renderActions} style={{ width: "220px" }}></Column>
                        </DataTable>
                        <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
                    </div>
                )}
            </div>    
            <Dialog
                header="Message Body"
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

export default Draft;
