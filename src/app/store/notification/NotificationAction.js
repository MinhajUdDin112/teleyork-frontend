import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../../config";
import Toasts from "../../components/react-toast";

//add template action
export const addTemplateAction = createAsyncThunk("notification/api/sms/addTemplate", async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/sms/addTemplate`, body);
        if (response.status === 200) {
            Toasts({ success: `Template ${response.data.msg}` });
            return response.data;
        }
    } catch (error) {
        // Toasts({ error: `Template ${error}` });s
        return error;
    }
});

//get list of all templates action
export const getAllTemplateAction = createAsyncThunk("notification/sms/template/draft", async ({ rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/template/all?companyId=645a85198cd1ff499c8b99cd`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
});

//get one template action
export const getOneTemplateAction = createAsyncThunk("notification/sms/template/${id}", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/template/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

//get all sent templates action
export const getSentAllTemplateAction = createAsyncThunk("notification/sms/template/sent", async ({ rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/template/sent`);
        return response.data;
    } catch (error) {
        return error;
    }
});

//show all sent data action
export const getSentByTemplateIdAction = createAsyncThunk("notification/sms/sent", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/sent?templateId=${body.templateId}&compony=${body.company}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

//send template action
export const submitTemplateAction = createAsyncThunk("notification/sms/send", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/sms/send?sentBy=${body.userId}&templateId=${body.templateId}&compony=${body.company}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

//show all draft data action
export const getDraftByTemplateIdAction = createAsyncThunk("notification/sms/draft", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/sms/draft/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});
