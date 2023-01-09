import { Component } from "react";
import CategoryPage from "./CategoryPage";

export default class CategoryTech extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "tech",
		};
	}

	render() {
		return <CategoryPage title={this.state.title}></CategoryPage>;
	}
}
