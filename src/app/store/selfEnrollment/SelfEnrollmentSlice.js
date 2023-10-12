import { createSlice } from "@reduxjs/toolkit";
import { verifyZipAction } from "./SelfEnrollmentAction";

const selfEnrollmentSlice = createSlice({
    name: "selfEnrollment",
    initialState: {
        //verify zip initial states
        verifyZip: null,
        verifyZipLoading: false,
        verifyZipError: null,
    },
    extraReducers: (builder) => {
        builder.addCase(verifyZipAction.pending, (state, action) => {
            state.verifyZipLoading = true;
        });
        builder.addCase(verifyZipAction.fulfilled, (state, action) => {
            state.verifyZip = action.payload;
            state.verifyZipLoading = false;
        });
        builder.addCase(verifyZipAction.rejected, (state, action) => {
            state.verifyZipLoading = false;
            state.verifyZipError = action.error.message;
        });
    },
});

export default selfEnrollmentSlice.reducer;
