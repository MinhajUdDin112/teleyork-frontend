import { createSlice } from "@reduxjs/toolkit";
//import { addCustomerInfoAction } from "./LifelineOrdersAction";
import { addCustomerAddressAction } from "./LifelineOrdersAction";
import { fetchPlanListAction } from "./LifelineOrdersAction";
import { addTermsAction } from "./LifelineOrdersAction";

// export const lifelineOrdersSlice = createSlice({
//     name: "lifelineOrders",
//     initialState: {

//         //add customer info initial states
//         addCustomerInfo: JSON.parse(localStorage.getItem("basicData")) ?? null,
//         addCustomerInfoState:null,
//         addCustomerInfoLoading: false,
//         addCustomerInfoError: null,
//     },
//     extraReducers: (builder) => {
//         //add customer basic info reducer function
//         builder.addCase(addCustomerInfoAction.pending, (state, action) => {
//             state.addCustomerInfoLoading = true;
//         });
//         builder.addCase(addCustomerInfoAction.fulfilled, (state, action) => {
//             state.addCustomerInfoState = action.payload;
//             localStorage.setItem("basicData", JSON.stringify(action.payload));
//             state.addCustomerInfoLoading = false;
//         });
//         builder.addCase(addCustomerInfoAction.rejected, (state, action) => {
//              state.addCustomerInfoError = action.error.message;
//              state.addCustomerInfoLoading = false;
     
//         });
//     },
// });




//  export const customerAddressSlice = createSlice({
//     name: "customerAddress",
//     initialState: {
        
//         //add customer address initial states
//         addCustomerAddress:JSON.parse(localStorage.getItem("addressData")) ?? null,
//         addCustomerAddressLoading: false,
//         addCustomerAddressError: null,
//     },
//     extraReducers: (builder) => {
//         //add customer basic info reducer function
//         builder.addCase(addCustomerAddressAction.pending, (state, action) => {
//             state. addCustomerAddressLoading = true;
//         });
//         builder.addCase(addCustomerAddressAction.fulfilled, (state, action) => {
//             state.addCustomerAddress = action.payload;
//             localStorage.setItem("addressData", JSON.stringify(action.payload.data));
//             state. addCustomerAddressLoading = false;
//         });
//         builder.addCase(addCustomerAddressAction.rejected, (state, action) => {
//              state. addCustomerAddressError = state.action;
           
//         });
//     },
// 



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




  export const termsSlice = createSlice({
    name: "termAndCondition",
    initialState: {
        //add termAndCondition initial states
        addTerms: null,
        addTermsLoading: false,
        addTermsError: null,
    },
    extraReducers: (builder) => {
        //add termAndCondition  reducer function
        builder.addCase(addTermsAction.pending, (state, action) => {
            state.addTermsLoading = true;
        });
        builder.addCase(addTermsAction.fulfilled, (state, action) => {
            state.addTerms = action.payload;
            state.addTermsLoading = false;
        });
        builder.addCase(addTermsAction.rejected, (state, action) => {
             state.addTermsError = state.action;
           
        });
    },
});








//export const lifelineOrdersReducer = lifelineOrdersSlice.reducer;
// export const customerAddressReducer = customerAddressSlice.reducer;
export const planListReducer = PlanListSlice.reducer;
export const addTermReducer = termsSlice.reducer;
