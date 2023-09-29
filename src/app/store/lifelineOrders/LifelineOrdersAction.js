import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";


//adding customer personal info during customer enrollment 
export const addCustomerInfoAction = createAsyncThunk("customer/info", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/initialInformation`, body);
        console.log("response of api", response);
        return response;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
});


//adding customer home address  during customer enrollment 
export const addCustomerAddressAction = createAsyncThunk("customer/info", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/homeAddress`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


//adding Question during customer enrollment 
export const addQuestion1Action = createAsyncThunk("customer/info", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/question`, body);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});



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
        console.log(error);
        throw error;
    }
});