const { render, screen, fireEvent } = require("@testing-library/react");
import { act } from "react-dom/test-utils";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockRestaurantList.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
	return Promise.resolve({
		json: () => {
			return Promise.resolve(MOCK_DATA);
		},
	});
});
it("Should Search Res List for pizza", async () => {
	await act(async () =>
		render(
			<BrowserRouter>
				<Body />
			</BrowserRouter>
		)
	);
	const cardsBeforeSearch = screen.getAllByTestId("resCard");
	expect(cardsBeforeSearch.length).toBe(9);

	const searchBtn = screen.getByRole("button", { name: "Search" });
	const searchInput = screen.getByTestId("searchInput");
	fireEvent.change(searchInput, { target: { value: "pizza" } });
	fireEvent.click(searchBtn);
	const cards = screen.getAllByTestId("resCard");
	expect(cards.length).toBe(1);
});

it("Should Filter top rated restaurant", async () => {
	await act(async () =>
		render(
			<BrowserRouter>
				<Body />
			</BrowserRouter>
		)
	);
	const cardsBeforeFilter = screen.getAllByTestId("resCard");
	expect(cardsBeforeFilter.length).toBe(9);

	const topRatedBtn = screen.getByRole("button", {
		name: "Top Rated Restaurants",
	});
	fireEvent.click(topRatedBtn);

	const cardsAfterFilter = screen.getAllByTestId("resCard");
	expect(cardsAfterFilter.length).toBe(5);
});
