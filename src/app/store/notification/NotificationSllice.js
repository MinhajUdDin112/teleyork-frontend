import { createSlice } from "@reduxjs/toolkit";
import { addTemplateAction, getAllTemplateAction, getDraftByTemplateIdAction, getOneTemplateAction, getSentAllTemplateAction, getSentByTemplateIdAction, submitTemplateAction } from "./NotificationAction";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        //add template initial states
        addTemplate: null,
        addTemplateLoading: false,
        addTemplateError: null,

        //get all templates initial state
        getAllTemplate: null,
        getAllTemplateLoading: false,
        getAllTemplateError: null,

        //get one template initial state
        getOneTemplate: null,
        getOneTemplateLoading: false,
        getOneTemplateError: null,

        //get all sent template initial state
        getSentAllTemplate: null,
        getSentAllTemplateLoading: false,
        getSentAllTemplateError: null,

        //get all sent by template id initial state
        getSentByTemplateId: null,
        getSentByTemplateIdLoading: false,
        getSentByTemplateIdError: null,

        //submit draft initial states
        submitTemplate: null,
        submitTemplateLoading: false,
        submitTemplateError: null,

        //get draft by template Id initial states
        getDraftByTemplateId: null,
        getDraftByTemplateIdLoading: false,
        getDraftByTemplateIdError: null,
    },
    reducers: {
        clearGetOneTemplateData: (state) => {
            state.getOneTemplate = "";
        },
    },
    extraReducers: (builder) => {
        //add template reducer functions
        builder.addCase(addTemplateAction.pending, (state, action) => {
            state.addTemplateLoading = true;
        });
        builder.addCase(addTemplateAction.fulfilled, (state, action) => {
            state.addTemplate = action.payload;
            state.addTemplateLoading = false;
        });
        builder.addCase(addTemplateAction.rejected, (state, action) => {
            state.addTemplateLoading = false;
            state.addTemplateError = action.error.message;
        });

        ///get all templates reducer function
        builder.addCase(getAllTemplateAction.pending, (state, action) => {
            state.getAllTemplateLoading = true;
        });
        builder.addCase(getAllTemplateAction.fulfilled, (state, action) => {
            state.getAllTemplate = action.payload;
            state.getAllTemplateLoading = false;
        });
        builder.addCase(getAllTemplateAction.rejected, (state, action) => {
            state.getAllTemplateLoading = false;
            state.getAllTemplateError = action.error.message;
        });

        //get one template reducer function
        builder.addCase(getOneTemplateAction.pending, (state, action) => {
            state.getOneTemplateLoading = true;
        });
        builder.addCase(getOneTemplateAction.fulfilled, (state, action) => {
            state.getOneTemplate = action.payload;
            state.getOneTemplateLoading = false;
        });
        builder.addCase(getOneTemplateAction.rejected, (state, action) => {
            state.getOneTemplateLoading = false;
            state.getOneTemplateError = action.error.message;
        });

        //get all sent templates reducer function
        builder.addCase(getSentAllTemplateAction.pending, (state, action) => {
            state.getSentAllTemplateLoading = true;
        });
        builder.addCase(getSentAllTemplateAction.fulfilled, (state, action) => {
            state.getSentAllTemplate = action.payload;
            state.getSentAllTemplateLoading = false;
        });
        builder.addCase(getSentAllTemplateAction.rejected, (state, action) => {
            state.getSentAllTemplateLoading = false;
            state.getSentAllTemplateError = action.error.message;
        });

        //get all sent by template Id reducer function
        builder.addCase(getSentByTemplateIdAction.pending, (state, action) => {
            state.getSentByTemplateIdLoading = true;
        });
        builder.addCase(getSentByTemplateIdAction.fulfilled, (state, action) => {
            state.getSentByTemplateId = action.payload;
            state.getSentByTemplateIdLoading = false;
        });
        builder.addCase(getSentByTemplateIdAction.rejected, (state, action) => {
            state.getSentByTemplateIdLoading = false;
            state.getSentByTemplateIdError = action.error.message;
        });

        //submit draft template reducer function
        builder.addCase(submitTemplateAction.pending, (state, action) => {
            state.submitTemplateLoading = true;
        });
        builder.addCase(submitTemplateAction.fulfilled, (state, action) => {
            state.submitTemplate = action.payload;
            state.submitTemplateLoading = false;
        });
        builder.addCase(submitTemplateAction.rejected, (state, action) => {
            state.submitTemplateLoading = false;
            state.submitTemplateError = action.error.message;
        });

        //get all draft by template id reducer function
        builder.addCase(getDraftByTemplateIdAction.pending, (state, action) => {
            state.getDraftByTemplateIdLoading = true;
        });
        builder.addCase(getDraftByTemplateIdAction.fulfilled, (state, action) => {
            state.getDraftByTemplateId = action.payload;
            state.getDraftByTemplateIdLoading = false;
        });
        builder.addCase(getDraftByTemplateIdAction.rejected, (state, action) => {
            state.getDraftByTemplateIdLoading = false;
            state.getDraftByTemplateIdError = action.error.message;
        });
    },
});

export const { clearGetOneTemplateData } = notificationSlice.actions;
export default notificationSlice.reducer;
