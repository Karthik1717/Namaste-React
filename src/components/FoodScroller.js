import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CDN_URL } from "../utils/constants";

const FoodScroller = ({ items }) => {
	const imageUrl =
		"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					width: "40px",
					height: "40px",
					background: "gray",
					paddingTop: "3px",
				}}
				onClick={onClick}
			/>
		);
	}

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					width: "40px",
					height: "40px",
					background: "grey",
					paddingTop: "3px",
				}}
				onClick={onClick}
			/>
		);
	}
	const settings = {
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 3,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className='slider-container w-3/4 m-auto'>
			<h1 className='text-5xl font-bold py-4'>What's on your mind?</h1>
			<Slider {...settings}>
				{items.map((item) => (
					<div>
						<div>
							<img src={imageUrl + item.imageId} />
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default FoodScroller;
