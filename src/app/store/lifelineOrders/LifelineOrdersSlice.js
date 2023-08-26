import { createSlice } from "@reduxjs/toolkit";
import { addCustomerInfoAction } from "./LifelineOrdersAction";

const lifelineOrdersSlice = createSlice({
    name: "lifelineOrders",
    initialState: {
        //add customer info initial states
        addCustomerInfo: null,
        addCustomerInfoLoading: false,
        addCustomerInfoError: null,
    },
    extraReducers: (builder) => {
        //add customer basic info reducer function
        builder.addCase(addCustomerInfoAction.pending, (state, action) => {
            state.addCustomerInfoLoading = true;
        });
        builder.addCase(addCustomerInfoAction.fulfilled, (state, action) => {
            state.addCustomerInfo = action.payload;
            state.addCustomerInfoLoading = false;
        });
        builder.addCase(addCustomerInfoAction.rejected, (state, action) => {
            state.addCustomerInfoError = state.action;
        });
    },
});

export default lifelineOrdersSlice.reducer;
