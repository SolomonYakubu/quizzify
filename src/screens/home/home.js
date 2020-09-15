import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../store";
import "./style.css";
const Content = (props) => {
	const globalState = useContext(store);
	const { count } = globalState.state;
	const { dispatch } = globalState;
	const [isValid, setIsValid] = useState(false);
	let history = useHistory();
	const onChange = (value) => {
		dispatch({ type: "setCount", value });
		if (parseInt(value) < 1 || value === "") {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
	};

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
					style={{ fontFamily: "Poppins", fontSize: "16px", margin: "20px" }}
				>
					Input Number Of Questions
				</label>
				<input
					type="number"
					value={count}
					required
					className="input"
					onChange={(e) => onChange(e.target.value)}
				/>

				<button className="button" onClick={redirect}>
					Take Quiz
				</button>
			</div>
		</div>
	);
};

export default Content;
