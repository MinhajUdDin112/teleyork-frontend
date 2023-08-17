import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config";

const GetAllTemplateSlice = createSlice({
    name: "getAllTemplates",
    initialState: {
        templates: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(GetAllTemplates.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(GetAllTemplates.fulfilled, (state, action) => {
            state.templates = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(GetAllTemplates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default GetAllTemplateSlice.reducer;

export const GetAllTemplates = createAsyncThunk("add/template", async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/template/draft`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
