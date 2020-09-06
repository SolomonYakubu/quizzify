import React, { useState, useEffect } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "./QuestionStore";
import Controls from "./Controls.js";

const Content = () => {
	const [question] = useState(questions);
	const [correctOption, setCorrect] = useState(false);
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
		setTime(10);
		next();
	}
	const validate = (e) => {
		if (e.toString() === correct.toString()) {
			console.log("correct");
			setCorrect(true);
			setScore(score + 1);
		} else {
			console.log("incorrect");
		}

		setTimeout(() => {
			setCorrect(false);
			setTime(10);
			next();
		}, 1000);
		clearInterval(timer);
	};

	return (
		<div>
			<Display question={quest} />
			<p>{score}</p>
			<Options options={option} validate={validate} correct={correctOption} />
			<Controls />
			<p>{time}</p>
		</div>
	);
};

export default Content;