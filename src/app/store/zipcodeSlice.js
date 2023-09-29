import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import axios from "axios";

const zipCode = createSlice({
    name: "zipcode",
    initialState: {
        serviceAvailability: {},
        isvald: false,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchZipCode.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchZipCode.fulfilled, (state, action) => {
            state.serviceAvailability = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchZipCode.rejected, (state, action) => {
            state.error = state.action;
        });
    },
});

export default zipCode.reducer;

export const fetchZipCode = createAsyncThunk("users/zipcode", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/verifyZip`, body);
         // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});