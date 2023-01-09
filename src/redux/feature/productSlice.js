import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: {
		selectedProduct: {},
	},
	reducers: {
		addToSelectedProduct: (state, { payload }) => {
			state.selectedProduct = {
				...payload,
				attributes: payload.attributes.map((att) => {
					return {
						...att,
						items: att.items.map((item, index) => {
							return index === 0
								? { ...item, selected: true }
								: { ...item, selected: false };
						}),
					};
				}),
			};
		},

		changeAttributeProduct: (state, { payload }) => {
			const newAttr = state.selectedProduct.attributes.filter(
				(el) => el.name === payload.name
			);

			state.selectedProduct = {
				...state.selectedProduct,
				attributes: state.selectedProduct.attributes.map((el) => {
					return el === newAttr[0]
						? {
								...el,
								items: el.items.map((item) => {
									return item.value === payload.value
										? { ...item, selected: true }
										: { ...item, selected: false };
								}),
						  }
						: { ...el };
				}),
			};
		},
	},
});

export const { addToSelectedProduct, changeAttributeProduct } =
	productSlice.actions;

export default productSlice.reducer;
