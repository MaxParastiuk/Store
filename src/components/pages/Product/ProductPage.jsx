import { Component } from "react";
import { connect } from "react-redux";
import clientRequest from "../../../apollo/clientRequest";
import { GET_PRODUCT_BY_ID } from "../../../apollo/services";
import { addToCart } from "../../../redux/feature/cartSlice";
import { addToSelectedProduct } from "../../../redux/feature/productSlice";
import AttributesList from "../../common/attributes/AttributesList";
import CartModal from "../../common/cartModal/CartModal";
import "./ProductPage.scss";

import Slider from "../../common/slider/Slider";
class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [],
			loading: true,
			selectedImg: "",
		};
	}

	componentDidMount() {
		clientRequest(GET_PRODUCT_BY_ID, {
			id: window.location.pathname.slice(9),
		}).then((data) => {
			this.props.addToSelectedProduct(data.data.product);
			this.setState({
				loading: false,
				selectedImg: data.data.product.gallery[0],
			});
		});
	}

	onChangeSelecetImg(value) {
		this.setState({ selectedImg: value });
	}

	onAddToCart(id, item, isFromProduct) {
		const selectedAttribute = item.attributes.map((i) => {
			return i.items.find((el) => el.selected === true);
		});

		const newId = `${id} ${selectedAttribute.map((el) => el.id)}`;

		this.props.addToCart({
			id: newId,
			item: { ...item, id: newId },
			isFromProduct,
		});
	}

	render() {
		const { loading, selectedImg } = this.state;
		const { brand, description, name, attributes, gallery, prices, inStock } =
			this.props.product.selectedProduct;
		return (
			<>
				{!loading && (
					<div className='product__page container'>
						<div className='product__content'>
							<div className='leftside__list_img'>
								{gallery.map((el, index) => (
									<img
										onClick={() => this.onChangeSelecetImg(el)}
										className='list__img_item'
										alt='list_img'
										src={el}
										key={index}></img>
								))}
							</div>

							<div className='rightside__part'>
								<div className='middle__main_img'>
									<img className='main__img_item' src={selectedImg} alt='' />
								</div>

								{/* ADAPTIVE DESIGN SLIDER FOR MOBILE */}
								<div className='middle__main_slider'>
									<Slider img={selectedImg} gallery={gallery}></Slider>
								</div>

								{/* DESCRIPTION PRODUCT */}
								<div className='rightside__description-part'>
									<div className='discription__part'>
										<div className='part__left'>
											<h2 className='description_product-name text-cart brand'>
												{brand}
											</h2>
											<h3 className='description_product-name text-cart'>
												{name}
											</h3>
											<div className='description_attribute__list'>
												{attributes.map((attribute, index) => (
													<AttributesList
														isFromProduct={true}
														product={this.props.product}
														key={index}
														attribute={attribute}></AttributesList>
												))}
											</div>
										</div>

										<div className='part__right'>
											<div className='part__price'>
												<h4 className='price__title'>PRICE:</h4>
												{prices
													.filter(
														(el) =>
															el.currency.symbol ===
															this.props.currency.selectedOption
													)
													.map((el, index) => (
														<p key={index} className='product_price text-price'>
															{el.currency.symbol + el.amount}
														</p>
													))}
											</div>
											<button
												className={
													inStock
														? "btn__add-to-cart"
														: "btn__add-to-cart disable"
												}
												onClick={() =>
													this.onAddToCart(
														this.props.product.selectedProduct.id,
														this.props.product.selectedProduct,
														true
													)
												}>
												ADD TO CART
											</button>
											<div className='decription__text'>
												{description.replace(/<\/?[a-zA-Z]+>/gi, "")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{this.props.cart.isCartOpen && <CartModal />}
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.currency,
		cart: state.cart,
		product: state.product,
	};
};

const mapDispatchToProps = (dispath) => ({
	addToSelectedProduct: (item) => dispath(addToSelectedProduct(item)),
	addToCart: (item) => dispath(addToCart(item)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ProductPage);
