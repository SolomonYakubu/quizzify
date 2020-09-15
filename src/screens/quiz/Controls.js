import React, { useContext } from "react";
import { store } from "../../store";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function Controls(props) {
	const globalState = useContext(store);

	const { questionNumber } = globalState.state;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				paddingTop: "40px",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<div className="progress">
				Question {props.count} of {questionNumber}
			</div>
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
