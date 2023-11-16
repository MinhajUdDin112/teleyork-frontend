import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";

export const addRolesAction = createAsyncThunk("addroles", async (body) => {
    try {
        const response = await axios.post('http://dev-api.teleyork.com/api/web/role', body);
      
        return response.data;
    } catch (error) {
        
        throw error;
    }
});

