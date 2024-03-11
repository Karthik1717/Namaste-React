import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "../mocks/resMenu.mocks.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
	return Promise.resolve({
		json: () => {
			return Promise.resolve(MOCK_DATA);
		},
	});
});

it("Should load Restaurant Menu Component", async () => {
	await act(async () =>
		render(
			<BrowserRouter>
				<Provider store={appStore}>
					<Header />
					<RestaurantMenu />
					<Cart />
				</Provider>
			</BrowserRouter>
		)
	);

	const accordionHeader = screen.getByText("Main Course (13)");

	fireEvent.click(accordionHeader);

	expect(screen.getAllByTestId("foodItem").length).toBe(13);
	const addBtns = screen.getAllByRole("button", { name: "Add +" });
	fireEvent.click(addBtns[0]);
	const cartText = screen.getByText("Cart - (1 items)");
	expect(cartText).toBeInTheDocument();
	fireEvent.click(addBtns[1]);
	expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();
	expect(screen.getAllByTestId("foodItem").length).toBe(15);
	fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));
	expect(screen.getAllByTestId("foodItem").length).toBe(13);
	expect(screen.getByText("Cart is empty")).toBeInTheDocument();
});
