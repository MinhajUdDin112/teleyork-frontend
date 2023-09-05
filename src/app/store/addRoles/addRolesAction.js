import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";

export const addRolesAction = createAsyncThunk("addroles", async (body) => {
    try {
        const response = await axios.post('http://dev-api-ijwireless.teleyork.com/api/web/role', body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


//const BASE_URL = 'http://dev-api-ijwireless.teleyork.com';