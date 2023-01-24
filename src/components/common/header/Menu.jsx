import { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export default class Menu extends Component {
	render() {
		const { isMenuOpen, categories, onChangeActive } = this.props;
		return (
			<>
				{isMenuOpen ? (
					<div className='menu'>
						<div className='menu__list'>
							{categories.map((item, index) => (
								<Link
									className='menu__list_item'
									to={`/${item.name}`}
									key={index}
									onClick={() => onChangeActive(item.name)}>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				) : null}
			</>
		);
	}
}
