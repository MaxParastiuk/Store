import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCart } from "../../../redux/feature/cartSlice";
import CartItem from "./CartItem";
import "./CartModal.scss";

class CartModal extends Component {
	render() {
		const { totalAmount, totalCount, items } = this.props.cart;
		const { selectedOption } = this.props.currency;
		return (
			<>
				{console.log(this.props.cart)}
				<div
					className='modal_backdrop'
					onClick={() => this.props.toggleCart()}></div>
				<div className='modal_container' onClick={(e) => e.stopPropagation()}>
					<div className='modal_paper'>
						<div className='modal_title'>
							<b>My Bag</b>, {totalCount}
							{totalCount > 1 ? " items" : " item"}
						</div>
						<div className='modal_content'>
							{items.map((item, index) => (
								<CartItem key={index} item={item}></CartItem>
							))}
						</div>
						<div className='total_price text-price'>
							<div className='title_total'>Total</div>
							<div className='price_number'>
								{selectedOption + " " + totalAmount}
							</div>
						</div>
						<div className='modal_footer'>
							<Link
								onClick={() => this.props.toggleCart()}
								to='/cart'
								className='footer_view__button'>
								VIEW BAG
							</Link>
							<button className='footer_checkout__button'>CHECK OUT</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		currency: state.currency,
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleCart: () => dispatch(toggleCart()),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartModal);
