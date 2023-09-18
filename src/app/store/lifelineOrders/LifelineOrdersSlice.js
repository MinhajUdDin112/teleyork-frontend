import { createSlice } from "@reduxjs/toolkit";
import { addCustomerInfoAction } from "./LifelineOrdersAction";
import { addCustomerAddressAction } from "./LifelineOrdersAction";
import { addQuestion1Action } from "./LifelineOrdersAction";
import { fetchPlanListAction } from "./LifelineOrdersAction";

export const lifelineOrdersSlice = createSlice({
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
             state.addCustomerInfoError = action.error.message;
             state.addCustomerInfoLoading = false;
     
        });
    },
});




 export const customerAddressSlice = createSlice({
    name: "customerAddress",
    initialState: {
        
        //add customer address initial states
        addCustomerAddress: null,
        addCustomerAddressLoading: false,
        addCustomerAddressError: null,
    },
    extraReducers: (builder) => {
        //add customer basic info reducer function
        builder.addCase(addCustomerAddressAction.pending, (state, action) => {
            state. addCustomerAddressLoading = true;
        });
        builder.addCase(addCustomerAddressAction.fulfilled, (state, action) => {
            state.addCustomerAddress = action.payload;
            state. addCustomerAddressLoading = false;
        });
        builder.addCase(addCustomerAddressAction.rejected, (state, action) => {
             state. addCustomerAddressError = state.action;
           
        });
    },
});



export const Question1Slice = createSlice({
    name: "question1",
    initialState: {
        //add Question 1  initial states
        addQuestion1: null,
        addQuestion1Loading: false,
        addQuestion1Error: null,
    },
    extraReducers: (builder) => {
        //add Question 1  reducer function
        builder.addCase(addQuestion1Action.pending, (state, action) => {
            state.addQuestion1Loading = true;
        });
        builder.addCase(addQuestion1Action.fulfilled, (state, action) => {
            state.addQuestion1 = action.payload;
            state. addQuestion1Loading = false;
        });
        builder.addCase(addQuestion1Action.rejected, (state, action) => {
             state.addQuestion1Error = state.action;
           
        });
    },
});



//fetch plan list slice

 export  const PlanListSlice = createSlice({
    name: 'PlanList',
    initialState:{
        planData: [],
        loading: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPlanListAction.pending, (state) => {
          state.loading = 'loading';
        })
        .addCase(fetchPlanListAction.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.planData = action.payload;
        })
        .addCase(fetchPlanListAction.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.error.message;
        });
    },
  });








export const lifelineOrdersReducer = lifelineOrdersSlice.reducer;
export const customerAddressReducer = customerAddressSlice.reducer;
export const question1Reducer = Question1Slice.reducer;
export const planListReducer = PlanListSlice.reducer;
