import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GetOneTemplateSlice = createSlice({
    name: "getOneTemplates",
    initialState: {
        singleTemplate: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(GetOneTemplate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(GetOneTemplate.fulfilled, (state, action) => {
            state.singleTemplate = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(GetOneTemplate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default GetOneTemplateSlice.reducer;

export const GetOneTemplate = createAsyncThunk("allTemplates", async (id) => {
    try {
        const response = await axios.get(`http://localhost:2023/api/sms/template/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
