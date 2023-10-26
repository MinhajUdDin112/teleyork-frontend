import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../config";
import axios from "axios";
import Toasts from "../../components/react-toast";

//login action
export const loginAction = createAsyncThunk("auth/web/user/login", async (body, { rejectWithValue }) => {
    try {  
       
        let HostUrl=BASE_URL;
        if(window.location.hostname !== "localhost"){  
            HostUrl='http://api.teleyork.com'
        } 
       
        const response = await axios.post(`${HostUrl}/api/web/user/login`, body);  
        
        // Toasts({ success: response.data.msg });    
        console.log("login data ",response.data)
        return response.data;
    } catch (error) {
        // Toasts({ error: "Email and Password incorrect" });   
             console.log(error)
        return rejectWithValue(error);
    }
});
