import React, { createContext, useReducer } from "react";

const initialState = {
	count: "",
	completed: false,
	score: 0,
	questionNumber: 0,
	weapon: "blade",
	time: 0,
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "completeTrue":
				//const newState = 0;
				return { ...state, completed: true };
			case "correct":
				return { ...state, score: state.score + 10 };
			case "reset":
				return { score: 0, completed: false, count: "", questionNumber: 0 };
			case "count":
				return { ...state, count: state.count - 1 };
			case "setCount":
				return {
					...state,
					count: action.payload,
					questionNumber: action.payload,
				};
			case "setWeapon":
				return {
					...state,
					weapon: action.payload,
				};
			case "setTime":
				return {
					...state,
					time: action.payload,
				};
			default:
				throw new Error();
		}
	}, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
export { store, StateProvider };
