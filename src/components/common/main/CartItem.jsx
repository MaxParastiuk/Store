import { Component } from "react";
import AttributesList from "../attributes/AttributesList";
import {
	getCartTotal,
	decrease,
	increase,
} from "../../../redux/feature/cartSlice";
import { connect } from "react-redux";
import Slider from "../slider/Slider";

class CartItem extends Component {
	componentDidMount() {
		this.props.getCartTotal(this.props.currency.selectedOption);
	}

	render() {
		const { isFromModal, item } = this.props;
		const { name, gallery, prices, attributes, quantityItem } = item;

		return (
			<li className='modal_content_item'>
				<div className='leftside__content_describe'>
					<p className='content_product-name text-cart'>{name}</p>
					{prices
						.filter(
							(el) => el.currency.symbol === this.props.currency.selectedOption
						)
						.map((el, index) => (
							<p key={index} className='content_product_price text-price'>
								{el.currency.symbol + el.amount}
							</p>
						))}

					<ul className='product_attribute__list'>
						{attributes.map((attribute, index) => (
							<AttributesList
								product={this.props.item}
								key={index}
								attribute={attribute}></AttributesList>
						))}
					</ul>
				</div>
				<div className='rightside__content'>
					<div className='content_quantity'>
						<button
							className='quantity_button'
							onClick={() => this.props.increase(this.props.item)}>
							+
						</button>
						<p className='quntity_item_number'>{quantityItem}</p>
						<button
							className='quantity_button'
							onClick={() => this.props.decrease(this.props.item)}>
							-
						</button>
					</div>
					<div className='content_product_img'>
						{isFromModal ? (
							<img className='product_img' src={gallery[0]} alt='#' />
						) : (
							<Slider
								img={gallery[0]}
								gallery={gallery}
								isFromCart={true}></Slider>
						)}
					</div>
				</div>
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.currency,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getCartTotal: (item) => dispatch(getCartTotal(item)),
	decrease: (item) => dispatch(decrease(item)),
	increase: (item) => dispatch(increase(item)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartItem);
