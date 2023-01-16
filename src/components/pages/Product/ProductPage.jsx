import { Component } from "react";
import { connect } from "react-redux";
import clientRequest from "../../../apollo/clientRequest";
import { GET_PRODUCT_BY_ID } from "../../../apollo/services";
import { addToCart } from "../../../redux/feature/cartSlice";
import { addToSelectedProduct } from "../../../redux/feature/productSlice";
import AttributesList from "../../common/attributes/AttributesList";
import CartModal from "../../common/cartModal/CartModal";
import "./ProductPage.scss";
import slideLeft from "../../../img/slide-left.svg";
import slideRight from "../../../img/slide-right.svg";
class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [],
			loading: true,
			selectedImg: "",
			itter: 1,
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
		this.props.addToCart({ id, item, isFromProduct });
	}

	onNextImg(itemGallery) {
		this.setState({ itter: this.state.itter + 1 });
		if (this.state.itter === itemGallery.length - 1) {
			this.setState({
				itter: 0,
				selectedImg: itemGallery[this.state.itter],
			});
		} else {
			this.setState({ selectedImg: itemGallery[this.state.itter] });
		}
	}

	onPreviousImg(itemGallery) {
		this.setState({ itter: this.state.itter - 1 });
		if (this.state.itter <= 0) {
			this.setState({
				itter: itemGallery.length - 1,
				selectedImg: itemGallery[this.state.itter],
			});
		} else {
			this.setState({ selectedImg: itemGallery[this.state.itter] });
		}
	}

	render() {
		const { loading, selectedImg } = this.state;
		const { description, name, attributes, gallery, prices } =
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
									<img className='main__img_item' src={selectedImg} alt='' />
									<div className='slider'>
										<img
											onClick={() => {
												this.onPreviousImg(gallery);
											}}
											className='slider__item'
											src={slideLeft}
											alt='slideLeft'
										/>
										<img
											onClick={() => this.onNextImg(gallery)}
											className='slider__item'
											src={slideRight}
											alt='slideRight'
										/>
									</div>
								</div>

								{/* DESCRIPTION PRODUCT */}
								<div className='rightside__description-part'>
									<div className='discription__part'>
										<div className='part__left'>
											<h3 className='description_product-name text-cart'>
												{name}
											</h3>
											<ul className='description_attribute__list'>
												{attributes.map((attribute, index) => (
													<AttributesList
														isFromProduct={true}
														product={this.props.product}
														key={index}
														attribute={attribute}></AttributesList>
												))}
											</ul>
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
												className='btn__add-to-cart'
												onClick={() =>
													this.onAddToCart(
														this.props.product.selectedProduct.id,
														this.props.product.selectedProduct,
														true
													)
												}>
												ADD TO CART
											</button>
											<div
												className='decription__text'
												dangerouslySetInnerHTML={{
													__html: `${description}`,
												}}></div>
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
