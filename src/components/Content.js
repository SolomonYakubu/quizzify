import React, { useState, useEffect } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "./QuestionStore";
import Controls from "./Controls.js";

const Content = () => {
	const [question] = useState(questions);

	const [id, SetId] = useState(Math.floor(1 + Math.random() * question.length));
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(10);

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
		SetId(Math.floor(1 + Math.random() * question.length));
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
	if (time === 0) {
		setTimeout(() => {
			setTime(10);
			next();
		}, 300);
	}
	const validate = (e) => {
		if (e.toString().toLowerCase() === correct.toString().toLowerCase()) {
			console.log("correct");

			setScore(score + 1);
		} else {
			console.log("incorrect");
		}

		setTimeout(() => {
			setTime(10);
			next();
		}, 1000);
		clearInterval(timer);
	};

	return (
		<div>
			<Display question={quest} />
			<p>{score}</p>
			<Controls time={time} />
			<Options options={option} validate={validate} correct={correct} />
		</div>
	);
};

export default Content;
