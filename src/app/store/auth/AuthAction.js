import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../config";
import axios from "axios";
import Toasts from "../../components/react-toast";

//login action
export const loginAction = createAsyncThunk("auth/web/user/login", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/web/user/login`, body);
        // Toasts({ success: response.data.msg });
        return response.data;
        // console.log(response.data);
    } catch (error) {
        // Toasts({ error: "Email and Password incorrect" });
        return rejectWithValue(error);
    }
});
