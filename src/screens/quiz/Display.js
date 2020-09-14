import React from "react";
import "./style.css";
const Display = (props) => {
	return (
		<div className="display-container">
			<p className="display">{props.question}</p>
		</div>
	);
};

export default Display;
