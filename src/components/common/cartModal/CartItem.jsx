import { Component } from "react";
import AttributesList from "./attributes/AttributesList";

export default class CartItem extends Component {
	componentDidMount() {
		this.props.getCartTotal(this.props.selectedCurrency);
	}
	render() {
		const { name, gallery, prices, attributes, quantityItem } = this.props.item;

		return (
			<li className='modal_content_item'>
				<div className='content_describe'>
					<p className='content_product-name text-cart'>{name}</p>
					{prices
						.filter((el) => el.currency.symbol === this.props.selectedCurrency)
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
					<img className='product_img' src={gallery[0]} alt='#' />
				</div>
			</li>
		);
	}
}
