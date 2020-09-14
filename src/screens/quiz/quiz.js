import React, { useState, useEffect, useContext } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "../../db/QuestionStore";
import Controls from "./Controls.js";
import { store } from "../../store";

const Content = (props) => {
	const [question] = useState(questions);
	//	const [count, setCount] = useState(props.questionNumber);
	const [id, SetId] = useState(Math.floor(1 + Math.random() * question.length));
	const [clicked, setClicked] = useState(0);

	const [time, setTime] = useState(10);

	//context api
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { count } = globalState.state;
	const quest = question
		.filter((question) => question.id === id)
		.map((question) => question.question);
	const option = question
		.filter((question) => question.id === id)
		.map((question) => question.options);
	const correct = question
		.filter((question) => question.id === id)
		.map((question) => question.correct);
	const next = () => {
		setTime(10);

		if (count > 1) {
			dispatch({ type: "count" });
			SetId(Math.floor(1 + Math.random() * question.length));
		} else {
			dispatch({ type: "completeTrue" });
			//dispatch({ type: "reset" });
		}
		setClicked(0);
	};
	const timer = () => {
		setTime((time) => time - 1);
	};

	useEffect(() => {
		setInterval(timer, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const validate = (e) => {
		setClicked((clicked) => clicked + 1);
		if (clicked === 0) {
			if (
				e.value.toString().toLowerCase() === correct.toString().toLowerCase()
			) {
				e.className = "option-btn correct";
				dispatch({ type: "correct" });
			} else {
				e.className = "option-btn red";
			}

			setTimeout(() => {
				e.className = "option-btn";

				next();
			}, 1000);
			clearInterval(timer);
		}
	};
	if (time === 0) {
		next();
	}

	return (
		<div>
			<Controls time={time} />
			<Display question={quest} />
			<Options options={option} validate={validate} correct={correct} />
		</div>
	);
};

export default Content;
