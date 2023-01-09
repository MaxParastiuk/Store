import { Component } from "react";
import CategoryPage from "./CategoryPage";

export default class CategoryClothes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "clothes",
		};
	}

	render() {
		return <CategoryPage title={this.state.title}></CategoryPage>;
	}
}
