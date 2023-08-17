import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../config";

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        user: JSON.parse( localStorage.getItem("userData") )??"",
        accessToken: JSON.parse( localStorage.getItem("accessToken") )??"",
        refreshToken : JSON.parse( localStorage.getItem("refreshToken") )??"",
        loading: false,
        error: null,
    },
    reducers: {
        clearUserData: (state) => {
             state.user = ""
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("userData")
        },
      },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload.data))
            localStorage.setItem('accessToken', JSON.stringify(action.payload.data.token))
            localStorage.setItem('refreshToken', JSON.stringify(action.payload.data.refreshToken))
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchUserLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { clearUserData } = LoginSlice.actions;
export default LoginSlice.reducer;

export const fetchUserLogin = createAsyncThunk("user/login", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/web/user/login`, body);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
