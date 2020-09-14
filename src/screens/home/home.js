import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Content = (props) => {
	console.log(props.questionNumber);
	return (
		<div className="container">
			<div className="title">Welcome QuizNinja</div>
			<div className="item-con">
				<label style={{ fontFamily: "Poppins", fontSize: "16px" }}>
					Input Number Of Questions
				</label>
				<input
					type="text"
					value={props.questionNumber}
					className="input"
					onChange={(e) => props.onChange(e.target.value)}
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
