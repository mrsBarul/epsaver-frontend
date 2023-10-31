import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig } from "./PersistConfig";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        isAuthenticated: true,
    },
    reducers: {
        setUser: (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        },
        clearUser: (state) => {
        state.userData = {};
        state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registrationUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.userData = {};
            state.isAuthenticated = false;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(activateUser.fulfilled, (state, action) => {
            state.userData.isActivated = action.payload;
            state.userData.isActivated = true; 
        })
        
    },
});

    const API_URL = "http://localhost:8000";

    export const registrationUser = createAsyncThunk(
    "user/registrationUser",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${API_URL}/registration`, userData);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data);
        }
    }
    );

    export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(`${API_URL}/loginProfile`, userData);
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data);
        }
    }
);

    export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
        console.error(error.response?.data);
        throw error;
    }
    });

    export const refreshToken = createAsyncThunk("user/refreshToken", async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.user.userData.refreshToken;
    try {
        const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data);
    }
});



export const activateUser = createAsyncThunk("user/activateUser", async (activationLink) => {
    try {
        const response = await axios.get(`${API_URL}/activate/${activationLink}`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message);
        throw error;
    }
});



export const { setUser, clearUser } = userSlice.actions;
export const getIsAuthenticated = (state) => state.user.isAuthenticated;
export const getUserData = (state) => state.user.userData;
export const persistedAuthReducer = persistReducer(authPersistConfig, userSlice.reducer);
export default userSlice.reducer;