import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../components/custom_spinner";
import { getSentAllTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
import BASE_URL from "../../../../config";
import ReactPaginate from 'react-paginate';
import TemplateSearchBar from "./TemplateSearchBar";

const Sent = () => {
    const [allSent, setAllSent] = useState([])
    const [currentPage, setCurrentPage] = useState(0); // Add currentPage state
    const [searchResults, setSearchResults] = useState([]);
    const loginResponse = useSelector((state) => state.login)
    const loginData = loginResponse.loginData
    const companyId = loginData?.compony

    const dispatch = useDispatch();
    const { getSentAllTemplate, getSentAllTemplateLoading } = useSelector((state) => state.notification);
    const navigate = useNavigate();

    const renderActions = (rowData) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button label="View" onClick={() => handleView(rowData)} className="w-8rem" />
            </div>
        );
    };

    const handleView = (rowData) => {
        const { templateId } = rowData;
        navigate(`/sentall/${templateId}`);
    };

    useEffect(() => {
        dispatch(getSentAllTemplateAction());
    }, []);

    const getAllSent = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/template/sent?companyId=${companyId}`);
        setAllSent(response?.data?.data)
    }

    useEffect(() => {
        getAllSent()
    }, []);

    const type = (rowData) => {
        return <div>{rowData.type === 0 ? "SMS" : rowData.type === 1 ? "Email" : "SMS, Email"}</div>;
    };

    // Constants for pagination
  const itemsPerPage = 10;
  const pageCount = Math.ceil(allSent.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  // Function to handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
   // Function to handle the search
   const handleSearch = (searchTerm) => {
    // Implement your search logic here
    const filteredResults = allSent.filter((template) => {
      return (
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.templateId.toString().includes(searchTerm)
      );
    });
    setSearchResults(filteredResults);
  };

  // Render the visible items based on the current page
  const visibleItems = allSent.slice(offset, offset + itemsPerPage);

    const createdAtFormatted = (rowData) => {
        const createdAtDate = new Date(rowData.createdAt);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        };
        return createdAtDate.toLocaleString('en-US', options);
      };

    return (
        <div className="card bg-pink-50">
            <div className="flex bar-place">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Sent</h3>
            </div>
            <div className=" mb-3">
        <TemplateSearchBar onSearch={handleSearch} />
      </div>
            </div>
           
            <div className="card mx-5 p-0 border-noround">
                {getSentAllTemplateLoading ? (
                    <CustomLoading />
                ) : (
                    <div className="">
                        <DataTable value={searchResults.length > 0 ? searchResults : visibleItems} showGridlines>
                            <Column header="Template Id" field="templateId" />
                            <Column header="Name" field="name" />
                            <Column header="Message" field="template" />
                            <Column header="Type" body={type} />
                            <Column header="Subject" field="notification_subject"></Column>
                            <Column header="CreatedAt" body={createdAtFormatted}></Column>
                            <Column header="CreatedBy" field="createdByUser" ></Column>
                            <Column header="Status" field="status" />
                            <Column header="Actions" body={renderActions} style={{ width: "50px" }} />
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
            </div>
        </div>
    );
};

export default Sent;
