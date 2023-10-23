import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../config";
import axios from "axios";

//login action
export const loginAction = createAsyncThunk("auth/web/user/login", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/web/user/login`, body);
        // Toasts({ success: response.data.msg });    
        // console.log(response?.data?.data?.permissions)
        const allowdPerms = response?.data?.data?.permissions
        localStorage.setItem("permissions", JSON.stringify(allowdPerms))
        return response.data;
    } catch (error) {
        // Toasts({ error: "Email and Password incorrect" });   
        console.log(error)
        return rejectWithValue(error);
    }
});
