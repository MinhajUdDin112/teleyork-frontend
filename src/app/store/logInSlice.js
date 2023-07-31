import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchUserLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default LoginSlice.reducer;

export const fetchUserLogin = createAsyncThunk("user/login", async (body) => {
    try {
        const response = await axios.post("http://localhost:2023/api/web/user/login", body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
