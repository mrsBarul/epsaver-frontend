import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        statusSerial: 'СМОТРЮ',
    },

    reducers: {
        filterSerial: (state, action) => {
            state.statusSerial = action.payload;
        }
    }
})

export const getStatus = state => state.filter.statusSerial;
export const { filterSerial } = filterSlice.actions;
export default filterSlice.reducer;