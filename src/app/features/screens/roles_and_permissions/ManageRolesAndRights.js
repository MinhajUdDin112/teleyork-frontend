
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import Axios from 'axios';
import { Column } from 'primereact/column';  
import ReactPaginate from "react-paginate";
import BASE_URL from '../../../../config'; 
import { Button } from 'primereact/button';  
import { Route,Routes,useNavigate } from 'react-router-dom';
import { Dialog } from "primereact/dialog";   
import ManagePermissions from './ManagePermissions';
export default function BasicDemo() {      
    console.log("in Permissions")
    let [allRoles,setAllRoles]=useState([])    
    const [roleData,setRoleData]=useState(null) 
    let navigate=useNavigate()
        const [currentPage, setCurrentPage] = useState(0);     
    const [visible, setVisible] = useState(false);   
    const [description, setDescription] = useState("");     
    const [navigateToPermissions,setNavigateToPermissions]=useState(false)
    const loginRes = localStorage.getItem("userData");
    const parseLoginRes = JSON.parse(loginRes);      
    const itemsPerPage = 10;
    const pageCount = Math.ceil(allRoles.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const visibleItems = allRoles.slice(offset, offset + itemsPerPage);  
    function renderActions(rowData){ 
      return ( 
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
         <Button label="Permissions"  style={{ cursor: "pointer", marginLeft: "25px", fontSize: "14px", paddingLeft: "27px" }} onClick={()=>{ 
       setRoleData(rowData)
      navigate("/managerolesandrights/Permission")  
      setNavigateToPermissions(true)
         }} /> 
        <Button style={{marginLeft:"25px",fontWeight:"900",backgroundColor:"red",border:"none"}} >
         Delete
        </Button>
    </div>
      )
    }    
    /*
    function  RenderPermissions(rowData){      
       
            const item=rowData.permissions[0];   
             if(item !== undefined){       
                let match=item.subModule.name;
               console.log(Objforcheck.match)
             }
            
        
        useEffect(()=>{ 
            console.log("useeffect is calling") 
       
        },[])
        return (  <div >
                
                          { item !== undefined ?
                          item.actions.length !== 0  ? <>     
                          <h5 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>  
                           {Objforcheck[item.subModule.name]}
                           </h5>
                      <h6 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{item.subModule.name}</h6>   
                         <ul >   {   
                              
                               item.actions.map(item=>( 
                                <li style={{display: "flex", justifyContent:"center",padding:"2px"}}> 
                                    {item.name}
                                </li>
                               ))
                          }    
                            </ul>   
                            </> :undefined:undefined 

    }
                         </div>   
                       
                    
                 
    
        )
    }   */
    const roleDescription = (rowData) => {
        let description = rowData.description;
        let shortline = description.substring(0, 10);
        let fullline = description.substring(15, description.length);
        console.log("body is rendering");
        return (
            <div id="Description">
              { description.length > 10? <p>  
                    {shortline}
                    <span
                        style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
                        onClick={(e) => {
                            setDescription(rowData.description);
                            setVisible(true);
                        }}
                    >
                        {" "}
                        See more
                    </span>
                </p>   :<p>{rowData.description}</p>
                    
    }
            </div>
        );
    };   
    const getAllCompletedEnrollments = async () => {
        try {
            const res = await Axios.get(`${BASE_URL}/api/web/role/all?serviceProvider=${parseLoginRes?.compony}`);
            if (res?.status === 200 || res?.status === 201) {  
                    setAllRoles(res?.data?.data);     
                     }     

        } catch (error) {
            console.error("Error fetching module data:", error?.response);
        }
    };
    useEffect( () => {        
          getAllCompletedEnrollments()
    }, []);
    return (  
        <div className="card bg-pink-50">     
        <Routes> 
            <Route path="/Permission" element={<ManagePermissions setNavigateToPermissions={setNavigateToPermissions} roleData={roleData}/>} />
        </Routes>   {!navigateToPermissions ? 
       <> <div   className="card mx-5 p-0 border-noround">
            <DataTable value={visibleItems} tableStyle={{ minWidth: "50rem" }}  showGridlines>
                <Column field="role" header="Role"></Column>
                <Column field={roleDescription} header="Description"></Column>
                <Column field="active" header="Active"></Column>   
                <Column field={renderActions} header="Actions" style={{ width: "120px" }} ></Column>
            </DataTable> 
            <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} breakLabel={"..."} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />
        
  </div>   
        <Dialog
                header="Role Description"
                visible={visible}
                style={{ width: "50vw" }}
                draggable={false}
                onHide={() => {
                    setVisible(false);
                }}
            >
             <p>{description}</p>
            </Dialog>     
        </>:undefined
}
        </div>
    );
}
        