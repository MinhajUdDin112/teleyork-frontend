import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
const BASE_URL=process.env.REACT_APP_BASE_URL
//adding customer personal info during customer enrollment 
// export const addCustomerInfoAction = createAsyncThunk("customer/info", async (body) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/api/user/initialInformation`, body);
       
//         return response;  
//     } catch (error) {
       
//         throw error?.response?.data?.msg;
//     }
// });


//adding customer home address  during customer enrollment 
// export const addCustomerAddressAction = createAsyncThunk("customer/address", async (body) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/api/user/homeAddress`, body);
      
//         return response.data;

//     } catch (error) {
//      
//         throw error;
//     }
// });




//get plan list from plan list api

export const fetchPlanListAction = createAsyncThunk('data/fetchData', async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/web/plan/SPPlans?serviceProvider=645a85198cd1ff499c8b99cd`); 
      return response.data;
      
      
    } catch (error) {
      throw error;
    }
  });


  //post term and condition 
export const addTermsAction = createAsyncThunk("terms/Condition", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/termsAndConditions`, body);
        return response.data;
    } catch (error) {
        
        throw error;
    }
});