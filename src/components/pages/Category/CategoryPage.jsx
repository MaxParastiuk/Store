import { Component } from "react";
import "./Category.scss";
import { GET_PRODUCTS_BY_CATEGORY } from "../../../apollo/services";
import clientRequest from "../../../apollo/clientRequest";
import CategoryItem from "../../common/main/CategoryItem";
import CartModal from "../../common/cartModal/CartModal";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/feature/cartSlice";
import { addProducts } from "../../../redux/feature/categorySlice";

class CategoryPage extends Component {
	componentDidUpdate() {
		clientRequest(GET_PRODUCTS_BY_CATEGORY, {
			input: { title: this.props.category.selectedCategory },
		}).then((data) => this.props.addProducts(data.data.category.products));
	}

	addToCartProduct = (item) => {
		this.props.addToCart(item);
	};

	render() {
		const { products } = this.props.category;
		return (
			<div className='container main'>
				<h2 className='products-title'>
					{this.props.category.selectedCategory}
				</h2>
				<ul className='products-list'>
					{products.map((item, index) => (
						<CategoryItem
							key={index}
							onAddToCart={this.addToCartProduct}
							item={item}></CategoryItem>
					))}
				</ul>
				{this.props.cart.isCartOpen && <CartModal />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		category: state.category,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addToCart: (newItem) => dispatch(addToCart(newItem)),
	addProducts: (items) => dispatch(addProducts(items)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CategoryPage);
