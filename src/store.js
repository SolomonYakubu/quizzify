import React, { createContext, useReducer } from "react";

const initialState = {
	count: 0,
	completed: false,
	score: 0,
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "completeTrue":
				//const newState = 0;
				return { completed: true };
			case "correct":
				return { score: state.score + 10 };
			case "reset":
				return { score: 0, completed: false, count: 0 };
			default:
				throw new Error();
		}
	}, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
