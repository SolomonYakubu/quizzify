import React from "react";
import "./style.css";
const Options = (props) => {
	const [option] = props.options;

	return (
		<div className="options">
			<div className="options-container">
				{option.map((opt, index) => (
					<button
						className="option-btn"
						value={opt}
						key={index}
						onClick={(e) => props.validate(e.target)}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	);
};

export default Options;
