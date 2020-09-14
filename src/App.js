import React, { useContext } from "react";
import Quiz from "./screens/quiz/quiz";
import Home from "./screens/home/home";
import Finish from "./screens/finish/Finish";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { store } from "./store";

function App() {
	const globalState = useContext(store);
	const { completed } = globalState.state;

	return (
		<div className="App">
			<Router>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/quiz">{completed ? <Finish /> : <Quiz />}</Route>
			</Router>
		</div>
	);
}

export default App;
