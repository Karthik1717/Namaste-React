const { render, screen } = require("@testing-library/react");
import RestaurantCard, { withVegLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCard.mock.json";
import MOCK_VEG_DATA from "../mocks/resCard.veg.mocks.json";
import "@testing-library/jest-dom";

it("Should render RestaurantCard component with props Data", () => {
	render(<RestaurantCard resData={MOCK_DATA} />);
	const name = screen.getByText("La Pino'z Pizza");
	expect(name).toBeInTheDocument();
});

it("Should render RestaurantCard component with Veg Label", () => {
	const RestaurantCardVeg = withVegLabel(RestaurantCard);
	render(
		MOCK_VEG_DATA.info.veg ? (
			<RestaurantCardVeg resData={MOCK_VEG_DATA} />
		) : (
			<RestaurantCard resData={MOCK_DATA} />
		)
	);
	const vegText = screen.getByText("Veg");
	expect(vegText).toBeInTheDocument();
});
