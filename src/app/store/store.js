import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./logInSlice";
import AddTemplateReducer from "./createTemplateSlice";
import GetAllTemplateReducer from "./getAllTemplateSlice";
import GetOneTemplateReducer from "./getOneTemplateSlice";

const store = configureStore({
    reducer: {
        login: LoginReducer,
        addtemplate: AddTemplateReducer,
        getalltemplates: GetAllTemplateReducer,
        getOneTemplate: GetOneTemplateReducer,
    },
});

export default store;
