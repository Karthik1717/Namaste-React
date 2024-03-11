import React from "react";
import ItemList from "./ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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
		<div className='mt-10'>
			<div className='w-6/12 bg-gray-100 shadow-lg p-4 mx-auto my-4 '>
				<div
					className='flex justify-between cursor-pointer'
					onClick={handleClick}
				>
					<span className='font-bold text-3xl ml-4 mb-4 mt-2'>
						{data.title} ({data.itemCards?.length})
					</span>
					<FontAwesomeIcon
						icon={show ? faChevronUp : faChevronDown}
						className='text-3xl mr-5 mt-4'
					/>
				</div>
				{showItems && show && <ItemList items={data.itemCards} />}
			</div>
		</div>
	);
};

export default RestaurantCategory;
