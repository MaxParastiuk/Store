import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./feature/cartSlice";
import currencySlice from "./feature/currencySlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./feature/productSlice";
import categorySlice from "./feature/categorySlice";

const rootReducer = combineReducers({
	cart: cartSlice,
	currency: currencySlice,
	product: productSlice,
	category: categorySlice,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export default store;
