import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
	name: "currency",
	initialState: {
		selectedOption: "$",
		isOpen: false,
	},
	reducers: {
		toggleChangeCurrency: (state, { payload }) => {
			state.selectedOption = payload;
		},
		toggleIsOpen: (state) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggleChangeCurrency, toggleIsOpen } = currencySlice.actions;

export default currencySlice.reducer;
