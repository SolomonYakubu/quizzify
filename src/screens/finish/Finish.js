import React, { useContext } from "react";
import { store } from "../../store";

const Finish = () => {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { score } = globalState.state;
	console.log(globalState);
	console.log(score);
	return (
		<div>
			<div style={{ fontSize: "30px", color: "#fff" }}>
				{globalState.state.score}
			</div>
		</div>
	);
};

export default Finish;
