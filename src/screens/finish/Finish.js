import React, { useContext } from "react";
import { store } from "../../store";
import { Link } from "react-router-dom";

import "./style.css";

const Finish = () => {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { score, questionNumber } = globalState.state;

	const reset = () => {
		dispatch({ type: "reset" });
	};

	return (
		<div className="container">
			<div className="items-container">
				<p className="text">
					Hey QuizNinja you completed your quiz successfully...
				</p>
				<p className="text">
					You scored {score} out of {questionNumber * 10}{" "}
				</p>
				<aside>
					<Link to="/">
						{" "}
						<button onClick={reset} className="button">
							Take quiz again
						</button>
					</Link>
				</aside>
			</div>
		</div>
	);
};

export default Finish;
