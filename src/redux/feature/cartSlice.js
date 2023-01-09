import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalAmount: 0,
		totalCount: 0,
		isCartOpen: false,
		tax: 0,
	},
	reducers: {
		addToCart: (state, { payload }) => {
			const indexItem = state.items.findIndex((el) => el.id === payload.id);

			if (indexItem >= 0) {
				state.items[indexItem].quantityItem += 1;
			} else if (payload.isFromProduct) {
				state.items.push({
					...payload.item,
					quantityItem: 1,
				});
			} else {
				state.items.push({
					...payload,
					quantityItem: 1,
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
				});
			}
		},

		decrease: (state, { payload }) => {
			const indexItem = state.items.findIndex((el) => el.id === payload.id);
			if (state.items[indexItem].quantityItem > 1) {
				state.items[indexItem].quantityItem -= 1;
			} else if (state.items[indexItem].quantityItem === 1) {
				const newCartItems = state.items.filter((el) => el.id !== payload.id);
				state.items = newCartItems;
			}
		},
		increase: (state, { payload }) => {
			const indexItem = state.items.findIndex((el) => el.id === payload.id);
			state.items[indexItem].quantityItem += 1;
		},
		toggleCart: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		getCartTotal: (state, { payload }) => {
			let { totalAmount, totalCount } = state.items.reduce(
				(cartTotal, cartItem) => {
					const { prices, quantityItem } = cartItem;
					const findItem = prices.filter(
						(el) => el.currency.symbol === payload
					);

					const { amount } = findItem[0];
					const itemTotal = amount * quantityItem;

					if (quantityItem >= 1) {
						cartTotal.totalCount += quantityItem;
						cartTotal.totalAmount += itemTotal;
					} else {
						cartTotal.totalAmount = 0;
						cartTotal.totalCount = 0;
					}

					return cartTotal;
				},
				{
					totalAmount: 0,
					totalCount: 0,
				}
			);
			state.totalAmount = parseInt(totalAmount.toFixed(2));
			state.totalCount = totalCount;
		},
		changeAttributeCart: (state, { payload }) => {
			const findIndex = state.items.findIndex(
				(el) => el.id === payload.idProduct
			);

			const newAttr = state.items[findIndex].attributes.filter(
				(el) => el.name === payload.name
			);

			state.items[findIndex] = {
				...state.items[findIndex],
				attributes: state.items[findIndex].attributes.map((el) => {
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

		orderCartItems: (state) => {
			state.items = [];
		},

		getTaxFromAmount: (state) => {
			state.tax = Math.round((state.totalAmount * 21) / 100);
		},
	},
});

export const {
	addToCart,
	toggleCart,
	getCartTotal,
	decrease,
	increase,
	changeAttributeCart,
	orderCartItems,
	getTaxFromAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
