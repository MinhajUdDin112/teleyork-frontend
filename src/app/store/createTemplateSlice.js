import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config";

const CreateTemplateSlice = createSlice({
    name: "createTemplate",
    initialState: {
        templates: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(AddTemplate.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(AddTemplate.fulfilled, (state, action) => {
            state.templates = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(AddTemplate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default CreateTemplateSlice.reducer;

export const AddTemplate = createAsyncThunk("add/template", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/sms/addTemplate`, body);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});
