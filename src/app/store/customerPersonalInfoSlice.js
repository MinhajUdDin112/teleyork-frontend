import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import axios from "axios";

const customerPersonalInfoSlice = createSlice({
    name: "personalInfo",
    initialState: {
        info: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(postCustomerInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(postCustomerInfo.fulfilled, (state, action) => {
            state.serviceAvailability = action.payload;
            state.loading = false;
        });
        builder.addCase(postCustomerInfo.rejected, (state, action) => {
            state.error = state.action;
        });
    },
});

export default customerPersonalInfoSlice.reducer;

export const postCustomerInfo = createAsyncThunk("customer/info", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/initialInformation`, body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
