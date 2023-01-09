import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AppHeader from "./components/common/header/AppHeader";
import { Component } from "react";
import CategoryTech from "./components/pages/Category/CategoryTech";
import CategoryClothes from "./components/pages/Category/CategoryClothes";
import CategoryAll from "./components/pages/Category/CategoryAll";
import ProductPage from "./components/pages/Product/ProductPage";

class App extends Component {
	constructor(props) {
		super(props);
		this.onAddToCart = this.onAddToCart.bind(this);
		this.state = {
			cart: [],
		};
	}

	render() {
		return (
			<>
				<AppHeader cart={this.state.cart} />
				<Routes>
					<Route path='/' element={<Navigate to={"/all"} />}></Route>
					<Route path='/all' element={<CategoryAll />}></Route>
					<Route path='/tech' element={<CategoryTech />}></Route>
					<Route path='/clothes' element={<CategoryClothes />}></Route>
					<Route path='/product/:id' element={<ProductPage />}></Route>
				</Routes>
			</>
		);
	}

	onAddToCart(item) {
		this.setState({ cart: [...this.state.cart, item] });
	}
}

export default App;
