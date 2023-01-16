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
import Menu from "./Menu";

class AppHeader extends Component {
	state = {
		dataCategories: [],
		active: window.location.pathname.slice(1),
		isMenuOpen: false,
	};

	componentDidMount() {
		clientRequest(CATEGORY_NAMES).then((data) =>
			this.setState({
				dataCategories: data.data.categories,
			})
		);
	}

	render() {
		const { totalCount } = this.props.cart;
		const { dataCategories, active } = this.state;
		return (
			<>
				<div className='page__header container'>
					<div className='header '>
						<nav className='header_nav-left'>
							<div
								className='menu__btn'
								onClick={() => this.onOpenOrCloseMenu()}>
								<span></span>
							</div>
							<ul className='nav-left'>
								{dataCategories.map((item, index) => (
									<Link
										onClick={() => this.onChangeActive(item.name)}
										className={
											"nav-left__link " + (item.name === active ? "active" : "")
										}
										to={`/${item.name}`}
										key={index}>
										{item.name}
									</Link>
								))}
							</ul>
						</nav>
						<img className='logo' src={logo} alt='logo' />
						<nav className='header_nav-right'>
							<DropDown />

							<button
								className='btn_cart'
								onClick={() => this.props.toggleCart()}>
								<img src={cart} alt='cart' />

								{totalCount >= 1 ? (
									<div className='btn_cart__counter'>{totalCount}</div>
								) : null}
							</button>
						</nav>
					</div>
					<Menu
						onChangeActive={this.onChangeActive}
						categories={dataCategories}
						isMenuOpen={this.state.isMenuOpen}
						className='nav__menu'></Menu>
				</div>
			</>
		);
	}

	onChangeActive = (item) => {
		this.setState({ active: item });
	};

	onOpenOrCloseMenu() {
		this.setState({ isMenuOpen: !this.state.isMenuOpen });
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

export default functionFromConnect(AppHeader);
