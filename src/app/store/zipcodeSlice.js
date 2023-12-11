// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// const BASE_URL=process.env.REACT_APP_BASE_URL
// const zipCode = createSlice({
//     name: "zipcode",
//     initialState: {
//         serviceAvailability: JSON.parse(localStorage.getItem("zipDataForSelf")) ?? null,
//         isvald: false,
//         loading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchZipCode.pending, (state, action) => {
//             state.loading = true;
//         });
//         builder.addCase(fetchZipCode.fulfilled, (state, action) => {
//             state.serviceAvailability = action.payload;
//             localStorage.setItem("zipDataForSelf", JSON.stringify(action.payload.data));
//             state.loading = false;
//         });
//         builder.addCase(fetchZipCode.rejected, (state, action) => {
//             state.error = state.action;
//             state.loading = false;
//         });
//     },
// });

// export default zipCode.reducer;

// export const fetchZipCode = createAsyncThunk("users/zipcode", async (body) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/api/user/verifyZip`, body);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// });