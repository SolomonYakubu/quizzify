import React, { useState, useEffect, useContext } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "../../db/QuestionStore";
import Controls from "./Controls.js";
import { store } from "../../store";

const Quiz = (props) => {
	//context api stuffs
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { count, duration } = globalState.state;

	//Local states
	const [question] = useState(questions);
	const [questionId, setQuestionId] = useState([]);
	const [id, SetId] = useState(1);
	const [clicked, setClicked] = useState(0);
	const [index, setIndex] = useState(1);
	const [time, setTime] = useState(duration);
	const [shuffled, setShuffled] = useState(false);

	//data fetching from question store
	const quest = question
		.filter((question) => question.id === id)
		.map((question) => question.question);
	const option = question
		.filter((question) => question.id === id)
		.map((question) => question.options);
	const correct = question
		.filter((question) => question.id === id)
		.map((question) => question.correct);

	//function will take care of moving to next question
	const next = () => {
		if (count > 1) {
			setTime(duration);
			dispatch({ type: "count" });
			setClicked(0);
			setIndex((index) => index + 1);
			SetId(questionId[index]);
		} else {
			dispatch({ type: "completeTrue" });
		}
	};
	//Timer function
	const timer = () => {
		setTime((time) => time - 1);
	};

	//Checked if shuffled is true, then shuffle questionId

	if (shuffled) {
		//	shuffle(questionId);
		questionId.sort(() => Math.random() - 0.5);
		SetId(questionId[0]);
		setShuffled(false);
	}

	useEffect(() => {
		setQuestionId(question.map((id) => id.id));

		setShuffled(true);

		setInterval(timer, 1000);
		console.log("rendered");
		return () => {
			clearInterval(timer);
		};
	}, [question]);

	//updates time after current time elapses
	useEffect(() => {
		if (time === 0) {
			next();
		}
	}, [time]);

	//a function to validate if option selected is right or wrong
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
	//

	return (
		<div>
			<Controls time={time} count={index} />
			<Display question={quest} />
			<Options options={option} validate={validate} correct={correct} />
		</div>
	);
};

export default Quiz;
