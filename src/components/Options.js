import React, { useState } from "react";
import "./style.css";
const Options = (props) => {
	const [option] = props.options;
	const [right, setRight] = useState(true);
	//console.log(props.correct);
	const check = (e) => {
		if (e.value.toString() === props.correct.toString()) {
			e.className = "option-btn correct";
		} else {
			e.className = "option-btn red";
		}
		setTimeout(() => {
			e.className = "option-btn";
		}, 900);
	};
	return (
		<div className="options">
			<div className="options-container">
				{option.map((opt, index) => (
					<button
						className={right ? "option-btn" : null}
						value={opt}
						key={index}
						onClick={(e) => {
							props.validate(e.target.value);
							check(e.target);
							// if (e.target.value.toString() === props.correct.toString()) {
							// e.target.className = "option-btn correct";
							// }
						}}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
};

export default Options;
