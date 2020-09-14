import React from "react";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Controls(props) {
	return (
		<div
			style={{ display: "flex", justifyContent: "center", paddingTop: "40px" }}
		>
			<div style={{ width: "100px", color: "#fff" }}>
				<CircularProgressbarWithChildren
					value={props.time}
					maxValue={10}
					strokeWidth={10}
					//styles={{ width: "20px" }}
				>
					<div style={{ fontSize: "37px", color: "#fff" }}>{props.time}</div>
				</CircularProgressbarWithChildren>
			</div>
		</div>
	);
}
export default Controls;
