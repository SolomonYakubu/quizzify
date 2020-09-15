import React from "react";
import "./style.css";
const Display = (props) => {
	return (
		<div className="display-container">
			<div className="display">{props.question}</div>
		</div>
	);
};

export default Display;
