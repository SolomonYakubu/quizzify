import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../store";
import "./style.css";
const Home = (props) => {
	const globalState = useContext(store);
	const { count, time } = globalState.state;
	const { dispatch } = globalState;
	const [weapon, setWeapon] = useState("blade");
	const [isValid, setIsValid] = useState(false);

	let history = useHistory();
	const onChange = (value) => {
		dispatch({ type: "setCount", payload: value });
		if (parseInt(value) < 1 || value === "") {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	};
	const weaponSet = () => {
		// if (weapon.toString() === "blade") {
		//
		// } else if (weapon.toString() === "sword") {
		// 	dispatch({ type: "setTime", payload: 30 });
		// }
		switch (weapon) {
			case "blade":
				dispatch({ type: "setTime", payload: 10 });
				break;
			case "sword":
				dispatch({ type: "setTime", payload: 30 });
				break;
			default:
				dispatch({ type: "setTime", payload: 5 });
		}
	};
	console.log(globalState.state.time);
	const onDropChange = (e) => {
		setWeapon(e.target.value);

		weaponSet();
	};

	useEffect(() => {
		return () => {
			weaponSet();
		};
	}, []);
	console.log(globalState.state.time);
	const redirect = () => {
		if (isValid) {
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
