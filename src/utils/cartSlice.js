import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
	},
	reducers: {
		addItem: (state, action) => {
			if (state.items.length === 0) {
				state.items.push(action.payload);
				state.items[0].card.count = 1;
			} else {
				const updatedState = state.items.filter(
					(item) => action.payload.card.info.id === item.card.info.id
				);
				if (updatedState.length === 0) {
					state.items.push(action.payload);
					state.items[state.items.length - 1].card.count = 1;
				} else {
					state.items.forEach((item, idx) => {
						if (action.payload.card.info.id === item.card.info.id) {
							state.items[idx].card.count += 1;
						}
					});
				}
			}
		},
		removeItem: (state) => {
			state.items.pop();
		},
		clearCart: (state) => {
			state.items.length = 0;
		},
	},
});

console.log(cartSlice);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
