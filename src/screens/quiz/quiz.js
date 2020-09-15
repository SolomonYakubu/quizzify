import React, { useState, useEffect, useContext } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "../../db/QuestionStore";
import Controls from "./Controls.js";
import { store } from "../../store";

const Content = (props) => {
	const [question] = useState(questions);
	const [questionId, setQuestionId] = useState([]);
	const [id, SetId] = useState(1);
	const [clicked, setClicked] = useState(0);
	const [index, setIndex] = useState(1);
	const [time, setTime] = useState(10);

	const [shuffled, setShuffled] = useState(false);
	//context api
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { count } = globalState.state;

	//data fetching
	const quest = question
		.filter((question) => question.id === id)
		.map((question) => question.question);
	const option = question
		.filter((question) => question.id === id)
		.map((question) => question.options);
	const correct = question
		.filter((question) => question.id === id)
		.map((question) => question.correct);
	//
	//function will take care of moving to next question
	const next = () => {
		setTime(10);

		if (count > 1) {
			dispatch({ type: "count" });
			SetId(questionId[index]);
		} else {
			dispatch({ type: "completeTrue" });
		}
		setClicked(0);
		setIndex((index) => index + 1);
	};
	//Timer function
	const timer = () => {
		setTime((time) => time - 1);
	};
	//shuffle an array without repeating values
	const shuffle = (arr) => {
		arr.sort(() => Math.random() - 0.5);
	};
	//Checked if shuffled is true, then shuffle questionId

	if (shuffled) {
		shuffle(questionId);
		SetId(questionId[0]);
		setShuffled(false);
	}

	useEffect(() => {
		setQuestionId(question.map((id) => id.id));

		setShuffled(true);

		setInterval(timer, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [question]);

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
