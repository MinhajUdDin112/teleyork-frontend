import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomLoading from "../../components/custom_spinner";
import { getSentAllTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
import ReactPaginate from 'react-paginate';
import TemplateSearchBar from "./TemplateSearchBar";
import { Dialog } from "primereact/dialog";  
const BASE_URL=process.env.REACT_APP_BASE_URL
const Sent = () => {    
    const [visible, setVisible] = useState(false);
    const [templatebody, setTemplatebody] = useState("");

    const [allSent, setAllSent] = useState([])
    const [currentPage, setCurrentPage] = useState(0); 
    const [searchResults, setSearchResults] = useState([]);


    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);
    

    const companyId = parseLoginRes?.compony

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
  const messageBody=(rowData) => {
    let template = rowData.template;
    let shortline = template.substring(0, 10);
    let fullline = template.substring(15, template.length);
   
    return (
        <div id="template">
        {template.length > 10 ?<p>
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
        </p>:<p>{template}</p> 
}
    </div>
    );
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
                    <div>
                        <DataTable tableStyle={{minWidth:"90rem"}}  value={searchResults.length > 0 ? searchResults : visibleItems} showGridlines>
                            <Column header="Template Id" field="templateId" />
                            <Column header="Name" field="name" />
                            <Column header="Message" field={messageBody} />
                            <Column header="Type" body={type} />
                            <Column header="Subject" field="notification_subject"></Column>
                            <Column header="SentAt" body={createdAtFormatted}></Column>
                            <Column header="SentBy" field="createdByUser" ></Column>
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
            <Dialog
                header="Message Body"
                visible={visible}
                style={{ width: "50vw" }}      
                draggable={false}
                onHide={() => {
                    setVisible(false);
                }}
            >
                <div dangerouslySetInnerHTML={{ __html: `<p>${templatebody}</p>` }} />
            </Dialog>
        </div>
    );
};

export default Sent;
