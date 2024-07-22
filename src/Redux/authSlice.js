import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import persistReducer from "redux-persist/es/persistReducer";
import { authPersistConfig } from "./PersistConfig";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        isAuthenticated: true,
        loading: false, 
        error: null
    },
    reducers: {
        setUser: (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        },
        clearUser: (state) => {
        state.userData = {};
        state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registrationUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registrationUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(registrationUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload : 'Registration failed';
        })
        .addCase(loginUser.pending, (state) => {
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload : 'Login failed';
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.userData = {};
            state.isAuthenticated = false;
        })
        .addCase(refreshToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload : 'Token refresh failed';
        })
        .addCase(activateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(activateUser.fulfilled, (state, action) => {
            state.userData.isActivated = action.payload;
            state.userData.isActivated = true; 
            state.loading = false;
        })
        .addCase(activateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? action.payload : 'Activation failed';
        });
    },
});

    const API_URL = "https://epsaver-p913.onrender.com";

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
export const getLoadingStatus = (state) => state.user.loading;
export const getError = (state) => state.user.error;
export const persistedAuthReducer = persistReducer(authPersistConfig, userSlice.reducer);
export default userSlice.reducer;