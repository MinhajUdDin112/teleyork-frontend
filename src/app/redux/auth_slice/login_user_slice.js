import Axios from 'axios';
import appUrl from '../../constants/appUrl';
import { axiosApi } from '../../services/axios_api';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const loginUserReducer = createSlice({
    name: 'loginUser',
    initialState: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                return { loading: true }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                localStorage.setItem('accessToken',action.payload.token);
                localStorage.setItem('refreshToken',action.payload.refreshToken);

                return { loading: false, user: action.payload }
            })
            .addCase(loginUser.rejected, (state, action) => {
                return {
                    loading: false,
                    success:false,
                    error: action.payload
                }
            });
    },
});

export default loginUserReducer.reducer;

// Thunks
export const loginUser = createAsyncThunk('loginUser/fetch', async (body, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await Axios.post(appUrl.baseUrl + appUrl.loginUser, body);
        return fulfillWithValue(data.data);
    } catch (error) {
        throw rejectWithValue(error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message)

    }

});

