import { Component } from "react";
import { connect } from "react-redux";
import { changeAttributeCart } from "../../../redux/feature/cartSlice";
import { changeAttributeProduct } from "../../../redux/feature/productSlice";

class AttributesList extends Component {
	render() {
		const { id } = this.props.product;
		const { items, name, type } = this.props.attribute;

		return (
			<>
				<li className='attribute_item'>
					<h3 className='attribute_item_title text-cart'>{name}:</h3>
					<ul className='item_list'>
						{items.map((item, index) => (
							<li className='sublist_item' key={index}>
								{type === "text" ? (
									<button
										onClick={() =>
											this.onChangeAttribute(id, item.value, type, name)
										}
										className={
											"sublist_item__button-text" +
											(item.selected ? " active_button-text" : "")
										}>
										{item.value}
									</button>
								) : (
									<button
										onClick={() =>
											this.onChangeAttribute(id, item.value, type, name)
										}
										className={
											"sublist_item__button-swatch " +
											(item.selected ? " active_button-swatch" : "")
										}
										style={{ backgroundColor: item.value }}></button>
								)}
							</li>
						))}
					</ul>
				</li>
			</>
		);
	}
	onChangeAttribute(idProduct, value, type, name) {
		if (!this.props.isFromProduct) {
			this.props.changeAttributeCart({ idProduct, value, type, name });
		} else this.props.changeAttributeProduct({ value, type, name });
	}
}

const mapDispatchToProps = (dispatch) => ({
	changeAttributeCart: (value) => dispatch(changeAttributeCart(value)),
	changeAttributeProduct: (value) => dispatch(changeAttributeProduct(value)),
});

const functionFromConnect = connect(null, mapDispatchToProps);

export default functionFromConnect(AttributesList);
