import React, { useContext, useState, useEffect, useCallback } from "react";

import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "../../store";

import "./style.css";
const Home = (props) => {
	//context api
	const globalState = useContext(store);
	const { count } = globalState.state;
	const { dispatch } = globalState;

	//local states
	const [weapon, setWeapon] = useState("blade");
	const [time, setTime] = useState(0);
	const [isValid, setIsValid] = useState(false);
	const [spearMode, setSpearMode] = useState(false);

	//history api, for navigating routes
	let history = useHistory();
	const onChange = (value) => {
		dispatch({ type: "setCount", payload: value });
		if (parseInt(value) < 1 || value === "") {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	};

	//a function to set duration by using the value of weapon
	// const setDuration = () => {

	// };

	const onDropChange = useCallback((e) => {
		const value = e.target.value;
		setWeapon((weapon) => value);
	}, []);

	useEffect(() => {
		switch (weapon) {
			case "blade":
				setTime((time) => 10);
				break;
			case "sword":
				setTime((time) => 30);
				break;
			case "spear":
				setTime((time) => 60);
				setSpearMode(true);
				break;
			default:
				setTime((time) => 10);
		}
	}, [onDropChange, weapon]);

	//a function to redirect to quiz page if all requirements are met
	const redirect = () => {
		if (isValid) {
			dispatch({ type: "setDuration", payload: time });
			if (spearMode) {
				dispatch({ type: "setSpearMode", payload: true });
			} else {
				dispatch({ type: "setSpearMode", payload: false });
			}
			history.push("/quiz");
		} else {
			toast.error("Enter a valid number", {
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				fontFamily: "Poppins",
				//	toastId: "toast",
				progress: undefined,
			});
		}
	};

	return (
		<div className="container">
			<div className="title">Welcome QuizNinja</div>

			<div className="item-con">
				<ToastContainer limit={1} />
				<label
					style={{ fontFamily: "Poppins", fontSize: "16px", marginTop: "30px" }}
				>
					Input Number Of Questions
				</label>
				<input
					type="number"
					// placeholder="Input Number of Questions"
					value={count}
					required
					className="input"
					onChange={(e) => onChange(e.target.value)}
				/>
				<div className="dropdown-container">
					<label
						style={{ fontFamily: "Poppins", fontSize: "16px", margin: "10px" }}
					>
						Choose your weapon
					</label>
					<select className="dropdown" value={weapon} onChange={onDropChange}>
						<option value="blade">Blade</option>
						<option value="sword">Sword</option>
						<option value="spear">Spear</option>
					</select>
				</div>

				<button className="button" onClick={redirect}>
					Take Quiz
				</button>
			</div>
		</div>
	);
};

export default Home;
