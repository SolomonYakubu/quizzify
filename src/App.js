import React, { useState, useContext, useEffect } from "react";
import Quiz from "./screens/quiz/quiz";
import Home from "./screens/home/home";
import Finish from "./screens/finish/Finish";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { store } from "./store";

function App() {
	const globalState = useContext(store);
	const { completed } = globalState.state;

	const [questionNumber, setQuestionNumber] = useState("");
	const onChange = (e) => {
		setQuestionNumber(e);
	};

	return (
		<div className="App">
			<Router>
				<Route exact path="/">
					<Home questionNumber={questionNumber} onChange={onChange} />
				</Route>
				<Route path="/quiz">
					{completed ? <Finish /> : <Quiz questionNumber={questionNumber} />}
				</Route>
			</Router>
		</div>
	);
}

export default App;
