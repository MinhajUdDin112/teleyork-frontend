import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";

//Verify Zip action
export const verifyZipAction = createAsyncThunk("selfEnrollmentapi/enrollment/verifyZip", async (body, { rejectWithValue }) => {
    localStorage.clear("initialInformation");
    localStorage.clear("homeAddress");
    localStorage.clear("selectProgram");
    try {
        const response = await axios.post(`${BASE_URL}/api/enrollment/verifyZip`, body);
        // if (response.status === 200) {
            // Toasts({ success: `Template ${response.data.msg}` });
            localStorage.setItem("zip", JSON.stringify(response.data));
            return response?.data;
        // }
    } catch (error) {
        // Toasts({ error: `Template ${error}` });s
        return rejectWithValue(error);


    }
});
