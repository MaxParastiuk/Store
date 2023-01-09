import { Component } from "react";
import CategoryPage from "./CategoryPage";

export default class CategoryAll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "all",
		};
	}

	render() {
		return <CategoryPage title={this.state.title}></CategoryPage>;
	}
}
