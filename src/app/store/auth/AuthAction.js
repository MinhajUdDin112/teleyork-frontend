import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL=process.env.REACT_APP_BASE_URL
//login action
export const loginAction = createAsyncThunk("auth/web/user/login", async (body, { rejectWithValue }) => {
    try {

        let HostUrl = BASE_URL;
        if (window.location.hostname !== "localhost") {
            HostUrl = BASE_URL
        }

        const response = await axios.post(`${HostUrl}/api/web/user/login`, body);

        // Toasts({ success: response.data.msg });    
        const allowdPerms = response?.data?.data?.permissions
<<<<<<< HEAD
        console.log('response?.data?.data', response?.data?.data)
        localStorage.setItem("permissions", JSON.stringify(allowdPerms))
=======
        localStorage.setItem("permissions", JSON.stringify(allowdPerms))     
    
>>>>>>> 48fcbe3aa60ddde72d0007146450450850784023
        console.log("login data ", response.data)
        return response.data;
    } catch (error) {
        // Toasts({ error: "Email and Password incorrect" });   

        return rejectWithValue(error);
    }
});
