import { Component } from "react";
import slideLeft from "../../../img/slide-left.svg";
import slideRight from "../../../img/slide-right.svg";
import "./Slider.scss";

export default class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedImg: this.props.img,
			itter: 1,
		};
	}

	onNextImg(itemGallery) {
		this.setState({ itter: this.state.itter + 1 });
		if (this.state.itter === itemGallery.length - 1) {
			this.setState({
				itter: 0,
				selectedImg: itemGallery[this.state.itter],
			});
		} else {
			this.setState({ selectedImg: itemGallery[this.state.itter] });
		}
	}

	onPreviousImg(itemGallery) {
		this.setState({ itter: this.state.itter - 1 });
		if (this.state.itter <= 0) {
			this.setState({
				itter: itemGallery.length - 1,
				selectedImg: itemGallery[this.state.itter],
			});
		} else {
			this.setState({ selectedImg: itemGallery[this.state.itter] });
		}
	}

	render() {
		const { gallery, isFromCart } = this.props;
		const { selectedImg } = this.state;
		return (
			<>
				<img className='main__img_item' src={selectedImg} alt='' />
				<div className={isFromCart ? "slider__in_cart" : "slider"}>
					<img
						onClick={() => {
							this.onPreviousImg(gallery);
						}}
						className='slider__item'
						src={slideLeft}
						alt='slideLeft'
					/>
					<img
						onClick={() => this.onNextImg(gallery)}
						className='slider__item'
						src={slideRight}
						alt='slideRight'
					/>
				</div>
			</>
		);
	}
}
