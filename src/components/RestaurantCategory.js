import React from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({
	data,
	showItems,
	setShowIndex,
	show,
	setShow,
}) => {
	const handleClick = () => {
		setShowIndex();
		setShow();
	};
	return (
		<div>
			<div className='w-6/12 bg-gray-50 shadow-lg p-4 mx-auto my-4 '>
				<div
					className='flex justify-between cursor-pointer'
					onClick={handleClick}
				>
					<span className='font-bold text-lg'>
						{data.title} ({data.itemCards?.length})
					</span>
					<span>🔽</span>
				</div>
				{showItems && show && <ItemList items={data.itemCards} />}
			</div>
		</div>
	);
};

export default RestaurantCategory;
