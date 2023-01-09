import { Component } from "react";
import { connect } from "react-redux";
import {
	toggleChangeCurrency,
	toggleIsOpen,
} from "../../../redux/feature/currencySlice";
import "./DropDown.scss";
import { getCartTotal } from "../../../redux/feature/cartSlice";
import clientRequest from "../../../apollo/clientRequest";
import { CURRENCY_DETIALS } from "../../../apollo/services";

class DropDown extends Component {
	constructor() {
		super();
		this.onButtonClick = this.onButtonClick.bind(this);
		this.onOptionClick = this.onOptionClick.bind(this);

		this.state = {
			options: [],
		};
	}
	componentDidMount() {
		clientRequest(CURRENCY_DETIALS).then((data) => {
			this.setState({
				options: data.data.currencies,
			});
		});
	}
	componentDidUpdate() {
		this.props.getCartTotal(this.props.currency.selectedOption);
	}

	render() {
		const { isOpen, selectedOption } = this.props.currency;
		const { isCartOpen } = this.props.cart;

		return (
			<>
				{isOpen && (
					<div
						className={
							isCartOpen
								? "dropdown-container__list reversed"
								: "dropdown-container__list"
						}>
						<ul className='dropdown-list'>
							{this.state.options.map((el, i) => (
								<li onClick={(e) => this.onOptionClick(el.symbol)} key={i}>
									{el.symbol + " " + el.label}
								</li>
							))}
						</ul>
					</div>
				)}
				<button onClick={this.onButtonClick}>
					{selectedOption}
					<span className={isOpen ? "arrow-up" : "arrow-down"}></span>
				</button>
			</>
		);
	}

	onButtonClick() {
		this.props.toggleIsOpen();
	}

	onOptionClick(value) {
		this.props.toggleChangeCurrency(value);
		this.props.toggleIsOpen();
	}
}

const mapStateToProps = (state) => {
	return {
		currency: state.currency,
		cart: state.cart,
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleChangeCurrency: (item) => dispatch(toggleChangeCurrency(item)),
	toggleIsOpen: () => dispatch(toggleIsOpen()),
	getCartTotal: (item) => dispatch(getCartTotal(item)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(DropDown);
