import { Component } from "react";
import { Link } from "react-router-dom";
import "../../pages/Category/Category.scss";
import addToCart from "../../../img/addToCart.svg";
import { connect } from "react-redux";

class CategoryItem extends Component {
	constructor(props) {
		super(props);
		this.onHover = this.onHover.bind(this);
		this.offHover = this.offHover.bind(this);
	}

	state = {
		onMouse: false,
	};
	render() {
		const { selectedOption } = this.props.currency;
		const { id, name, gallery, prices, inStock } = this.props.item;

		return (
			<>
				{console.log(this.props.item)}
				<li
					className='products-list__item'
					onMouseEnter={this.onHover}
					onMouseLeave={this.offHover}>
					<Link
						to={`/product/${id}`}
						className={inStock === true ? "" : "disable"}>
						<div className='product_img_container'>
							<img className='product_img' src={gallery[0]} alt='product-img' />
							{!inStock && <div className='stock-out'>OUT OF STOCK</div>}
						</div>
						<p className='product_name'>{name}</p>
						{prices
							.filter((el) => el.currency.symbol === selectedOption)
							.map((el, index) => (
								<p key={index} className='product_price'>
									{el.currency.symbol + el.amount}
								</p>
							))}
					</Link>

					{this.state.onMouse && inStock ? (
						<div className='product_btn__addtocart'>
							<img
								onClick={() => this.props.onAddToCart(this.props.item)}
								src={addToCart}
								alt='addtocart'></img>
						</div>
					) : null}
				</li>
			</>
		);
	}

	onHover() {
		this.setState({
			onMouse: true,
		});
	}

	offHover() {
		this.setState({
			onMouse: false,
		});
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		currency: state.currency,
	};
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(CategoryItem);
