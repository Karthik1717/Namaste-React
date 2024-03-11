import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Test Case", () => {
	it("Should load Contact Us component", () => {
		render(<Contact />);
		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
	});

	it("Should load button inside Contact Us component", () => {
		render(<Contact />);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("Should load input name inside Contact Us component", () => {
		render(<Contact />);
		const inputName = screen.getByPlaceholderText("Name");
		expect(inputName).toBeInTheDocument();
	});

	it("Should load 2 input boxes in the Contact Component", () => {
		render(<Contact />);
		const inputBoxes = screen.getAllByRole("textbox");
		expect(inputBoxes.length).toBe(2);
	});
});
