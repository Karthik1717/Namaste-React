import React from "react";
import { CDN_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice.js";
import veg from "../assets/veg.png";
import nonveg from "../assets/non-veg.png";

export const ItemList = ({ items }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((store) => store.cart.items);

	const handleAddItem = (item) => {
		console.log(item);
		dispatch(addItem(item));
	};

	return (
		<div>
			{items.map((item) => (
				<div
					key={item.card.info.id}
					data-testid='foodItem'
					className='p-2 m-2 border-gray-400 border-b-2 text-left flex justify-between text-2xl pb-16'
				>
					<div className='w-9/12'>
						<div>
							<img
								src={item.card.info.isVeg === 1 ? veg : nonveg}
								className='w-[40px] mt-2 mb-1'
							/>
						</div>
						<div className='pb-2 font-semibold'>
							<span>{item.card.info.name}</span>
							<span>
								{" "}
								- ₹
								{(item.card.info.price ||
									item.card.info.variantsV2.pricingModels[0]
										.price) / 100}
							</span>
						</div>
						<p className='text-lg text-gray-500 italic mt-3'>
							{item.card.info.description}
						</p>
					</div>
					<div className='w-3/12 px-4'>
						<div className='absolute'>
							<button
								className='p-2 mx-[88px] mt-28 rounded-lg bg-black text-white shadow-lg text-lg'
								onClick={() => handleAddItem(item)}
							>
								Add +
							</button>
						</div>
						<img
							src={CDN_URL + item.card.info.imageId}
							className='h-36 w-[100%] rounded-lg mt-4'
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default ItemList;
