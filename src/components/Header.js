import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useState, useContext } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
	const onlineStatus = useOnlineStatus();
	const [btnNameReact, setBtnNameReact] = useState("Login");
	const { loggedInUser } = useContext(UserContext);
	const cartItems = useSelector((store) => store.cart.items);

	return (
		<div className='flex justify-between shadow bg-pink-100 sm:bg-yellow-100 lg:bg-green-100'>
			<div className='logo-container'>
				<img className='w-56' src={LOGO_URL} />
			</div>
			<div className='flex items-center'>
				<ul className='flex p-4 m-4 '>
					<li className='px-4'>
						Online Status : {onlineStatus ? "🟢" : "🔴"}
					</li>
					<li className='px-4'>
						<Link to='/'>Home</Link>
					</li>
					<li className='px-4'>
						<Link to='/about'>About Us</Link>
					</li>
					<li className='px-4'>
						<Link to='/contact'>Contact us</Link>
					</li>
					<li className='px-4'>
						<Link to='/grocery'>Grocery</Link>
					</li>
					<li className='px-4 font-bold'>
						<Link to='/cart'>
							Cart - ({cartItems.length} items)
						</Link>
					</li>
					<button
						className='login'
						onClick={() => {
							btnNameReact === "Login"
								? setBtnNameReact("Logout")
								: setBtnNameReact("Login");
						}}
					>
						{btnNameReact}
					</button>
					<li className='px-4 font-bold'>{loggedInUser}</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
