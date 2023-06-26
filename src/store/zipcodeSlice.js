import { createSlice } from "@reduxjs/toolkit";

const zipCode = createSlice({
    name: "zipcode",
    initialState: {
        serviceAvailability: {},
        isvald:false,
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

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchZipCode = createAsyncThunk("users/zipcode", async (body) => {
    try {
        const response = await axios.post("http://127.0.0.1:2023/api/user/verifyZip", body);
        if (response.status == 200) return  {
            serviceAvailability: response.data,
            loading: false,
            isvald:true,
            error: null,
        };
        else return  {
            serviceAvailability: null,
            loading: false,
            isvald:false,
            error: response?.data?.msg,
        };
    } catch (error) {
        return error.message;
    }
});
