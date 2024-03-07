import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./AuthAction";

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        loginData: JSON.parse(localStorage.getItem("userData")) ?? null,
        loginLoading: false,
        loginError: null,
    },
    reducers: {
        logout: (state) => {
            state.loginData = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state, action) => {
            state.loginLoading = true;
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {   

            state.loginData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload.data));
            localStorage.setItem("accessToken", JSON.stringify(action.payload.data.token));
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.data.refreshToken));      
          
            state.loginLoading = false;
            state.loginError = null; 
          
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginError = action.error.message;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
