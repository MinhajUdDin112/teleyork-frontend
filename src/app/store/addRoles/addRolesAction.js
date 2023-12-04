import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL
export const addRolesAction = createAsyncThunk("addroles", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/web/role`, body);
      
        return response.data;
    } catch (error) {
        
        throw error;
    }
});

