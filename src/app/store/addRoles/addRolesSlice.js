import { createSlice } from "@reduxjs/toolkit";
import { addRolesAction } from "./addRolesAction";



const addRolesSlice = createSlice({
    name: "addRoles",
    initialState: {
        //add customer info initial states
        addRole: null,
        addRolesLoading: false,
        addRolesError: null,
    },
    extraReducers: (builder) => {
       
        builder.addCase(addRolesAction.pending, (state, action) => {
            state.addRolesLoading = true;
        });
        builder.addCase(addRolesAction.fulfilled, (state, action) => {
            state.addRole = action.payload;
            state.addRolesLoading = false;
        });
        builder.addCase( addRolesAction.rejected, (state, action) => {
            state.addRolesError = state.action;
        });
    },
});

export default  addRolesSlice.reducer;
