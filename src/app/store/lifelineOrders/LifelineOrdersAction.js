import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";


//adding customer info during customer enrollment 
export const addCustomerInfoAction = createAsyncThunk("customer/info", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/initialInformation`, body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
