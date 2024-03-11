import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faClock,
	faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const RestaurantMenu = () => {
	const { resId } = useParams();

	const dummy = "Dummy Data";

	const resInfo = useRestaurantMenu(resId);
	const [showIndex, setShowIndex] = useState(0);
	const [show, setShow] = useState(true);

	if (resInfo === null) return <Shimmer />;

	const {
		name,
		cuisines,
		costForTwoMessage,
		locality,
		areaName,
		sla,
		totalRatingsString,
		avgRating,
		feeDetails,
	} = resInfo?.cards[0]?.card?.card?.info;

	const categories =
		resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
			(c) =>
				c.card?.["card"]?.["@type"] ===
				"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
		);
	console.log(categories, "caacac");

	return (
		<div className='mt-14'>
			<div className='w-6/12 m-auto'>
				<div className='flex justify-between mb-4'>
					<div>
						<h1 className='font-bold text-4xl mb-4'>{name}</h1>
						<div className='text-lg italic'>
							<p className=''>{cuisines.join(", ")}</p>
							<p>
								{locality}, {areaName},{" "}
								{sla.lastMileTravelString}
							</p>
						</div>
					</div>
					<div className='flex-col flex  border border-solid border-gray-300 w-28 align-middle rounded-lg'>
						<div className='flex flex-row text-xl justify-center my-3 align-middle text-green-700'>
							<FontAwesomeIcon icon={faStar} className='mt-1' />
							<p>{avgRating}</p>
						</div>

						<span className=' border-t border-gray-300 justify-center py-3 align-middle text-center'>
							{totalRatingsString}
						</span>
					</div>
				</div>
				<div className='text-xl text-gray-600 mb-7'>
					<p>{feeDetails.message}</p>
				</div>
				<div className='text-2xl'>
					<span>
						<FontAwesomeIcon icon={faClock} />{" "}
						<span className='pl-3'>{sla.slaString}</span>,
						<FontAwesomeIcon
							icon={faIndianRupeeSign}
							className='pl-5'
						/>
						<span className='pl-3'>{costForTwoMessage}</span>
					</span>
				</div>
			</div>
			{/* categories accordions */}
			{categories.map((category, index) => (
				// controlled component
				<RestaurantCategory
					key={category?.card?.card.title}
					data={category?.card?.card}
					showItems={index === showIndex && true}
					setShowIndex={() => setShowIndex(index)}
					setShow={() =>
						index === showIndex ? setShow(!show) : setShow(true)
					}
					show={show}
				/>
			))}
		</div>
	);
};

export default RestaurantMenu;
