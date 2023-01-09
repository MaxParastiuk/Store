import { Link } from "react-router-dom";
import { Component } from "react";
import logo from "../../../img/a-logo.svg";
import cart from "../../../img/cart.svg";
import "./AppHeader.scss";
import DropDown from "./DropDown";
import { CATEGORY_NAMES } from "../../../apollo/services";
import clientRequest from "../../../apollo/clientRequest";
import { connect } from "react-redux";
import { toggleCart } from "../../../redux/feature/cartSlice";

class AppHeader extends Component {
	state = {
		dataCategories: [],
		active: window.location.pathname.slice(1),
	};

	render() {
		const { totalCount } = this.props.cart;
		const { dataCategories, active } = this.state;
		return (
			<>
				<div className='page__header'>
					<div className='header container'>
						<nav className='header_nav-left'>
							<ul className='nav-left'>
								{dataCategories.map((item, index) => (
									<li
										key={index}
										className={
											"nav-left__item " + (item.name === active ? "active" : "")
										}>
										<Link
											onClick={(e) => this.onChangeActive(e)}
											to={`/${item.name}`}
											key={index}
											className='nav-left__link '>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						<img src={logo} alt='logo' />
						<nav className='header_nav-right'>
							<DropDown />

							<button
								className='btn_cart'
								onClick={() => this.props.toggleCart()}>
								<img src={cart} alt='cart' />

								<div className='btn_cart__counter'>{totalCount}</div>
							</button>
						</nav>
					</div>
				</div>
			</>
		);
	}

	componentDidMount() {
		clientRequest(CATEGORY_NAMES).then((data) =>
			this.setState({
				dataCategories: data.data.categories,
			})
		);
	}

	onChangeActive = (e) => {
		this.setState({ active: e.target.innerHTML });
	};
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

export default functionFromConnect(AppHeader);
