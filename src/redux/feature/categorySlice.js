import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
	name: "category",
	initialState: {
		selectedCategory: "",
		listCategories: [],
		products: [],
	},
	reducers: {
		changeCategory: (state, { payload }) => {
			state.selectedCategory = payload;
		},
		addCategories: (state, { payload }) => {
			state.listCategories = payload;
		},
		addProducts: (state, { payload }) => {
			state.products = payload;
		},
	},
});

export const { changeCategory, addCategories, addProducts } =
	categorySlice.actions;

export default categorySlice.reducer;
