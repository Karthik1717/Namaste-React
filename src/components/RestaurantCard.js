import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
	const { resData } = props;

	const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
		resData?.info;

	return (
		<div className='res-card m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200'>
			<img
				className='res-logo rounded-lg'
				alt='res-logo'
				src={CDN_URL + cloudinaryImageId}
			/>
			<h3 className='font-bold py-4 text-lg'>{name}</h3>
			<h4>{cuisines.join(", ")}</h4>
			<h4>{avgRating} stars</h4>
			<h4>{costForTwo}</h4>
			<h4>{sla?.slaString} minutes</h4>
		</div>
	);
};

export const withVegLabel = (RestaurantCard) => {
	return (props) => {
		return (
			<div>
				<label className='absolute bg-black text-white rounded-lg m-1 p-1 ml-4'>
					Veg
				</label>
				<RestaurantCard resData={props.resData} />
			</div>
		);
	};
};

export default RestaurantCard;
