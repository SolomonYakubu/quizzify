import React from "react";
import "./style.css";
const Options = (props) => {
	const [option] = props.options;
	return (
		<div className="options">
			<div className="options-container">
				{option.map((opt) => (
					<button
						className="option-btn"
						style={props.correct ? { background: "green" } : null}
						value={opt.opt}
						key={Math.random() * 20000}
						onClick={(e) => props.validate(e.target.value)}
					>
						{opt.opt}
					</button>
				))}
			</div>
		</div>
	);
};

export default Options;
