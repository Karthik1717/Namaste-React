import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import FoodScroller from "./FoodScroller";
import UPDATED_DATA from "./data/updatedData.json";

const Body = () => {
	// Local State Variable - Super powerful variable
	const [listOfRestaurants, setListOfRestraunt] = useState([]);
	const [filteredRestaurant, setFilteredRestaurant] = useState([]);
	const [foodScrollerItems, setFoodScrollerItems] = useState([]);
	const [topRated, setTopRated] = useState(false);

	const [searchText, setSearchText] = useState("");

	const RestaurantCardVeg = withVegLabel(RestaurantCard);

	// Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
	console.log("Body Rendered");

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const filteredList = listOfRestaurants?.filter(
			(res) => res.info.avgRating > 4.3
		);
		const list = topRated ? filteredList : listOfRestaurants;
		setFilteredRestaurant(list);
	}, [topRated]);

	const { setUserName, loggedInUser } = useContext(UserContext);

	const fetchData = async () => {
		const data = await fetch(
			"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
		);

		const json = await data.json();

		const initalRestaurants =
			json?.data?.cards[4]?.card?.card?.gridElements.infoWithStyle
				.restaurants;
		const updatedRestaurantList =
			UPDATED_DATA.cards[0]?.card?.card?.gridElements.infoWithStyle
				.restaurants;

		const updatedRestaurants = [
			...initalRestaurants,
			...updatedRestaurantList,
		];

		// Optional Chaining
		setListOfRestraunt(updatedRestaurants);
		setFilteredRestaurant(updatedRestaurants);

		setFoodScrollerItems(
			json?.data?.cards[0].card?.card?.imageGridCards?.info
		);
	};

	console.log(foodScrollerItems, "scroll");

	const onlineStatus = useOnlineStatus();

	if (onlineStatus === false)
		return <h1>You're offline! Check your connection. </h1>;

	return listOfRestaurants.length === 0 ? (
		<Shimmer />
	) : (
		<div className='body'>
			<div className='filter flex w-3/4 m-auto justify-between py-10'>
				<div className='m-4 p-4 flex items-center text-2xl'>
					<button
						className={`px-4 py-2 m-4 bg-gray-100 rounded-lg cursor-pointer ${
							topRated
								? "topRated-selected"
								: "topRated-unselected"
						}`}
						onClick={() => {
							setTopRated(!topRated);
						}}
					>
						Top Rated Restaurants
					</button>
				</div>
				<div className='search m-4 p-4'>
					<input
						type='text'
						data-testid='searchInput'
						className='border border-solid border-black text-2xl rounded-lg'
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>
					<button
						className='px-4 py-2 bg-green-100 m-4 rounded-lg text-2xl'
						onClick={() => {
							// Filter the restraunt cards and update the UI
							// searchText

							const filteredRestaurant = listOfRestaurants.filter(
								(res) => {
									return res.info.name
										.toLowerCase()
										.includes(searchText.toLowerCase());
								}
							);

							setFilteredRestaurant(filteredRestaurant);
						}}
					>
						Search
					</button>
				</div>
				{/* <div className='m-4 p-4 flex items-center'>
					<label>UserName : </label>
					<input
						className='border border-black px-2 m-2'
						value={loggedInUser}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div> */}
			</div>
			<div>
				<FoodScroller items={foodScrollerItems} />
			</div>
			<div className='flex flex-wrap w-3/4 m-auto py-12'>
				{filteredRestaurant?.map((restaurant) => (
					<Link
						key={restaurant.info.id}
						to={"/restaurants/" + restaurant.info.id}
					>
						{restaurant.info.veg ? (
							<RestaurantCardVeg resData={restaurant} />
						) : (
							<RestaurantCard resData={restaurant} />
						)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Body;
