import { createSlice } from "@reduxjs/toolkit";

const initialState = ["Model S", "Model 3", "Model X", "Model Y"]

const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {}
})

export const selectCars = state => state.cars;
export default carSlice.reducer;