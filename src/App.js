import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AppHeader from "./components/common/header/AppHeader";
import { Component } from "react";
import ProductPage from "./components/pages/Product/ProductPage";
import CartPage from "./components/pages/Cart/CartPage";
import CategoryPage from "./components/pages/Category/CategoryPage";

class App extends Component {
	render() {
		return (
			<>
				<AppHeader />
				<Routes>
					<Route path='/' element={<Navigate to={"/all"} />}></Route>
					<Route path='/:id' element={<CategoryPage />}></Route>
					<Route path='/cart' element={<CartPage></CartPage>}></Route>
					<Route path='/product/:id' element={<ProductPage />}></Route>
				</Routes>
			</>
		);
	}
}

export default App;
