import { CDN_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantCard = (props) => {
	const { resData } = props;

	const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
		resData?.info;

	return (
		<div
			className='res-card m-4 p-4 w-[380px] h-[400px] rounded-lg bg-gray-100 hover:bg-gray-200'
			data-testid='resCard'
		>
			<img
				className='res-logo rounded-lg w-full h-[65%]'
				alt='res-logo'
				src={
					"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
					cloudinaryImageId
				}
			/>
			<h3 className='font-bold py-2 text-3xl whitespace-nowrap overflow-hidden text-ellipsis'>
				{name}
			</h3>

			<i className='fa-solid fa-star' />
			<h4 className='text-lg font-bold'>
				<FontAwesomeIcon icon={faStar} /> {avgRating}
				<span className='ml-2'>{sla?.slaString} minutes</span>
			</h4>
			<h4 className='text-base italic '>{cuisines.join(", ")}</h4>
		</div>
	);
};

export const withVegLabel = (RestaurantCard) => {
	return (props) => {
		return (
			<div>
				<span
					className='absolute bg-black text-white rounded-lg m-1 p-1 ml-4 '
					htmlFor='test'
				>
					Veg
				</span>
				<RestaurantCard resData={props.resData} />
			</div>
		);
	};
};

export default RestaurantCard;
