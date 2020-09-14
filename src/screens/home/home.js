import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../store";
import "./style.css";
const Content = (props) => {
	const globalState = useContext(store);
	const { count } = globalState.state;
	const { dispatch } = globalState;

	const onChange = (value) => {
		//setQuestionNumber(e);
		dispatch({ type: "setCount", value });
	};
	return (
		<div className="container">
			<div className="title">Welcome QuizNinja</div>
			<div className="item-con">
				<label
					style={{ fontFamily: "Poppins", fontSize: "16px", margin: "20px" }}
				>
					Input Number Of Questions
				</label>
				<input
					type="text"
					value={count}
					className="input"
					onChange={(e) => onChange(e.target.value)}
				/>
				<aside>
					<Link to="/quiz">
						<button className="button">Take Quiz</button>
					</Link>
				</aside>
			</div>
		</div>
	);
};

export default Content;
