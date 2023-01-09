import { Component } from "react";
import { connect } from "react-redux";
import {
	getCartTotal,
	decrease,
	toggleCart,
	increase,
} from "../../../redux/feature/cartSlice";
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
								<CartItem
									key={index}
									item={item}
									decrease={this.props.decrease}
									increase={this.props.increase}
									getCartTotal={this.props.getCartTotal}
									selectedCurrency={selectedOption}></CartItem>
							))}
						</div>
						<div className='total_price text-price'>
							<div className='title_total'>Total</div>
							<div className='price_number'>
								{selectedOption + " " + totalAmount}
							</div>
						</div>
						<div className='modal_footer'>
							<button className='footer_view__button'>VIEW BAG</button>
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
	getCartTotal: (item) => dispatch(getCartTotal(item)),
	decrease: (item) => dispatch(decrease(item)),
	toggleCart: () => dispatch(toggleCart()),
	increase: (item) => dispatch(increase(item)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartModal);
