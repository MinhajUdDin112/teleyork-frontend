import React, { useState } from 'react'
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import { toast } from "react-toastify";
import { Dropdown } from 'primereact/dropdown';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const OrderHistory = () => {
  
    const [isLoading, setIsLoading] = useState()
    const [isSearch, setIsSearch] = useState(false)

    const formik = useFormik({
      
        initialValues: {
            type: "",
            startDate:"",
            endDate:""
           
         
        },
        onSubmit: async (values, actions) => {   
            console.log("is calling")
            setIsSearch(true)
            const dataToSend = {
                type: formik.values.type,
                startDate: formik.values.startDate,
                endDate:formik.values.endDate
            };

            setIsLoading(true);
            try {

                const response = await Axios.post(`${BASE_URL}/api/user/initialInformation`, dataToSend);
               
                if (response?.status === 200 || response?.status === 201) {
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                setIsLoading(false);
            } 
        
        },
    });

    const tabledata1 = [
        {     
            Telephone_Number: "",
            Mintues: "",
            Status: "",
           AddedData:"",         
        },
    ];
    const tabledata = [
        {
            ID: "1",
            PlanId: "",
            Plan: "",
            Status: "",
            status: "",
            Activation: "",
            EXPIRATION: "",
            NextRENEWAL:"",
            Mintues: "",
            SMS: "",
            Data:"",         
        },
    ];
    const tabledata3 = [
        {
           
            Telephone_Number: "",
            Mintues: "",
            Status: "",
           AddedData:"",         
        },
        
    ];
    const options = [
       {label:'Select',value:''},
        { label: "Plan History", value: "plan" },
        { label: "Sim History", value: "sim." },
        { label: "Address History", value: "address" },
      
    ];
  return (

  <>
  <div >
   < form onSubmit={formik.handleSubmit}>
    <div className='card'>
        <h3>Customer History</h3>
        <div className="card flex flex-column justify-content-center mx-5 border-noround">
                <div className="flex flex-wrap mx-3 my-3">
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date From:</p>
                        <Calendar id="startDate" value={formik.values.startDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="m-0 pb-1 text-md font-semibold ">Date To:</p>
                        <Calendar id="endDate" value={formik.values.endDate} onChange={formik.handleChange} showIcon style={{ width: "21rem" }} />
                    </div>
                    <div className="mt-1 mr-3 ">
                    <label className="m-0 pb-1 text-md font-semibold flex flex-colum ">Select Report</label>
                    <Dropdown
                    className='w-21rem'
                            id="type"
                            options={options}
                            value={formik.values.type}
                            onChange={(e) => {
                                formik.setFieldValue("type", e.value);
                                formik.handleChange(e);
                            }}
                           
                        />
                    </div>
                    <div>
                        <Button label="Search" type="submit" className="mt-5 text-sm bg-green-400 border-none w-7rem" onClick={()=>{setIsSearch(true) }} />
                    </div>
                </div>
            </div>
    </div>
   
   {
    formik.values.type=='plan'&& isSearch ? 
    <div className="mt-5">
    <DataTable value={tabledata1} showGridlines  resizableColumns columnResizeMode="fit" >
        <Column header="Stage" field="Zip"  headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
        <Column header="Order By" field="Account"  headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
        <Column header="Order DateTime" field="Name"  headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
        <Column header="Status" field="StoreType"  headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
       
    </DataTable>
</div>
    :formik.values.type=='sim'? "" 
    :formik.values.type=='Address'?""
    :""

    
   }
    {/* <div>
    <div className="mt-5">
                    <DataTable value={tabledata1} showGridlines  resizableColumns columnResizeMode="fit" >
                        <Column header="Stage" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Order By" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Order DateTime" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Status" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                       
                    </DataTable>
                </div>


                <div className='card flex justify-content-between'>
<h3>Mintues</h3>
<Button label='Reload Purchase' />
    </div>
    <div>
    <div className="mt-3">
                    <DataTable value={tabledata}  showGridlines resizableColumns columnResizeMode="fit" >
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
    </div>
    <div>
        <div>
       < h3 className='mt-5 mb-5'>Unlimited Plan Loaded Minutes</h3>
       <div className="mt-3">
                    <DataTable value={tabledata3} showGridlines  resizableColumns columnResizeMode="fit" >
                        <Column header="#" field="Sno" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Zip Code" field="Zip" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Account" field="Account" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Name" field="Name" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Store Type" field="StoreType" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Address" field="Address" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="City" field="City" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="State" field="State" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                        <Column header="Contact Phone" field="Contact" resizeable={false} headerStyle={{ color: "white", backgroundColor:'#81AEB9', fontWeight: "normal", fontSize: "large" }} />
                    </DataTable>
                </div>
        </div>
    </div>
    </div> */}
    </form>
  </div>
  </>
  )
}

export default OrderHistory