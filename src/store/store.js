import { configureStore } from "@reduxjs/toolkit";
import  zipCodeReducer  from "./zipcodeSlice";

const store = configureStore({
    reducer: {
        zipCode: zipCodeReducer,
    },
});

export default store;
