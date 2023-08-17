import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./logInSlice";
import AddTemplateReducer from "./createTemplateSlice";
import GetAllTemplateReducer from "./getAllTemplateSlice";
import GetOneTemplateReducer from "./getOneTemplateSlice";
import GetZipCodeReducer from "./zipcodeSlice";
import postCustomerInfoReducer from "./customerPersonalInfoSlice";

const store = configureStore({
    reducer: {
        login: LoginReducer,
        getZipCode: GetZipCodeReducer,
        addtemplate: AddTemplateReducer,
        getalltemplates: GetAllTemplateReducer,
        getOneTemplate: GetOneTemplateReducer,
        customerinfo: postCustomerInfoReducer,
    },
});

export default store;
