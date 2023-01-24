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
import {
	addCategories,
	changeCategory,
} from "../../../redux/feature/categorySlice";

class AppHeader extends Component {
	state = {
		isMenuOpen: false,
	};

	componentDidMount() {
		clientRequest(CATEGORY_NAMES).then((data) => {
			this.props.addCategories(data.data.categories);
		});
		this.props.changeCategory(window.location.pathname.slice(1));
	}

	render() {
		const { totalCount } = this.props.cart;
		const { listCategories, selectedCategory } = this.props.category;
		return (
			<>
				{console.log(selectedCategory)}
				<div className='page__header container'>
					<div className='header '>
						<nav className='header_nav-left'>
							<div
								className='menu__btn'
								onClick={() => this.onOpenOrCloseMenu()}>
								<span></span>
							</div>
							<div className='nav-left'>
								{listCategories.map((item, index) => (
									<Link
										onClick={() => this.props.changeCategory(item.name)}
										className={
											"nav-left__link " +
											(item.name === selectedCategory ? "active" : "")
										}
										to={`/${item.name}`}
										key={index}>
										{item.name}
									</Link>
								))}
							</div>
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
						categories={listCategories}
						isMenuOpen={this.state.isMenuOpen}
						className='nav__menu'></Menu>
				</div>
			</>
		);
	}

	onOpenOrCloseMenu() {
		this.setState({ isMenuOpen: !this.state.isMenuOpen });
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart,
		currency: state.currency,
		category: state.category,
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleCart: () => dispatch(toggleCart()),
	addCategories: (array) => dispatch(addCategories(array)),
	changeCategory: (item) => dispatch(changeCategory(item)),
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(AppHeader);
