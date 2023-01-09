import { Component } from "react";
import "./Category.scss";
import { GET_PRODUCTS_BY_CATEGORY } from "../../../apollo/services";
import clientRequest from "../../../apollo/clientRequest";
import CategoryItem from "../../common/main/CategoryItem";
import CartModal from "../../common/cartModal/CartModal";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/feature/cartSlice";

class CategoryPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
		};
	}

	componentDidMount() {
		clientRequest(GET_PRODUCTS_BY_CATEGORY, {
			input: { title: window.location.pathname.slice(1) },
		}).then((data) =>
			this.setState({
				products: data.data.category.products,
			})
		);
	}

	addToCartProduct = (item) => {
		this.props.addToCart(item);
	};

	render() {
		return (
			<div className='container main'>
				<h2 className='products-title'>
					{this.state.categoryName ? this.state.categoryName : this.props.title}
				</h2>
				<ul className='products-list'>
					{this.state.products.map((item, index) => (
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
	};
};

const mapDispatchToProps = (dispatch) => ({
	addToCart: (newItem) => dispatch(addToCart(newItem)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CategoryPage);
