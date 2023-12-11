import React, { useEffect, useState,useRef } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";  
import { Dialog } from "primereact/dialog";
import { useParams,useLocation } from "react-router-dom";  
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";
import { getDraftByTemplateIdAction, submitTemplateAction } from "../../../store/notification/NotificationAction";
import Axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL
const ShowDraftAll = () => {      
    const location = useLocation();
    const currentPath = location?.pathname  
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
      const [isManage,setIsManage]=useState(null)  
      const [isCreate,setIsCreate]=useState(null) 
    
     useEffect(()=>{ 
       actionBasedChecks()
     },[])  
    let toast=useRef(null) 
    const [visible, setVisible] = useState(false);
    const [templatebody, setTemplatebody] = useState("");

    const [draftByIdRes, setDraftByIdRes] = useState([])

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getDraftByTemplateId, submitTemplate } = useSelector((state) => state.notification);     
     let loadingSend=useSelector(state=>state.notification.submitTemplateLoading)     
     let submitTemplateError=useSelector(state=>state.notification.submitTemplateError)       
    
  
    const { loginData } = useSelector((state) => state.login);

    // Get id  from login response
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);


    const companyId = parseLoginRes?.compony
        
       
    useEffect(() => {
        dispatch(getDraftByTemplateIdAction(id, companyId));
    }, [id, submitTemplate]);
    const messageBody=(rowData) => {
        let template = rowData.message;
        let shortline = template.substring(0, 10);
        return (
            <div id="template">
               {template.length > 10 ? <p>
                    {shortline}
                    <span
                        style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
                        onClick={(e) => {
                            setTemplatebody(rowData.message);
                            setVisible(true);
                        }}
                    >
                        {" "}
                        See more
                    </span>
                </p>:  <p>{template}</p>
                }
            </div>
        );
    };
    const handleSubmit = () => {
        let body = {
            userId: parseLoginRes?._id,
            templateId: id,
            company: parseLoginRes?.compony,
        };
        dispatch(submitTemplateAction(body));
    };
    const handleBack = () => {
        navigate("/draft");
    };

    const getDraftById = async () => {
        const response = await Axios.get(`${BASE_URL}/api/sms/draft?templateId=${id}&compony=${companyId}`);
        setDraftByIdRes(response?.data?.data)

        
    }

    useEffect(() => {
        getDraftById()
    }, []);  
    useEffect(()=>{   
      
        if(loadingSend){    
        
            toast.current.show({ severity: "success", summary: "Info", detail: "Send Template Successfully" });
                   
       } 
    })

    return (
        <div className="card bg-pink-50">
            <div className="mx-5">
                <h3 className="text-xl font-semibold border-bottom-1 pb-2">Draft Records</h3>
            </div>
            <div className="card mx-5 p-0 border-noround">
                <div className="flex justify-content-between border-bottom-2 bg-orange-200 px-5 py-2">
                    <i className="pi pi-arrow-circle-left flex align-items-center" onClick={() => handleBack()} style={{ cursor: "pointer", fontSize: "2rem" }}></i>
                    <Button className="w-13rem my-2 text-base h-2.5rem font-light" label="Send Draft"  onClick={handleSubmit} />
                </div>
                <div>
                    <DataTable tableStyle={{ minWidth: "90rem" }} value={draftByIdRes} showGridlines>
                        <Column header="Name" field="name"></Column>
                        <Column header="Message" field={messageBody}></Column>
                        <Column header="Status" field="status"></Column>
                        <Column header="Email" field="email"></Column>
                        <Column header="Contact" field="phone"></Column>
                    </DataTable>
                </div>
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
            <Toast ref={toast} />
        </div>
    );
};

export default ShowDraftAll;
