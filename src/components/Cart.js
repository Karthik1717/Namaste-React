import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList.js";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
	const cartItems = useSelector((store) => store.cart.items);
	const dispatch = useDispatch();

	const handleClearCart = () => {
		dispatch(clearCart());
	};
	return (
		<div className='text-center m-4 p-4'>
			<h1 className='text-4xl font-bold py-6 mb-5'>Your Cart</h1>
			<div className='w-6/12 m-auto'>
				<div className=''>
					<button
						className='p-4 m-2 bg-black text-white rounded-lg text-2xl'
						onClick={handleClearCart}
					>
						Clear Cart
					</button>
				</div>
				{cartItems.length === 0 && <h1> Cart is empty</h1>}
				<ItemList items={cartItems} />
			</div>
		</div>
	);
};

export default Cart;
