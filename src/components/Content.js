import React, { useState } from "react";
import Display from "./Display";
import Options from "./Options.js";
import questions from "./QuestionStore";
import Controls from "./Controls.js";

const Content = () => {
	const [question] = useState(questions);
	const [correctOption, setCorrect] = useState(false);
	const [id, SetId] = useState(Math.floor(1 + Math.random() * question.length));

	const quest = question
		.filter((question) => question.id === id)
		.map((question) => question.question);
	const option = question
		.filter((question) => question.id === id)
		.map((question) => question.options);
	const correct = question
		.filter((question) => question.id === id)
		.map((question) => question.correct);

	const validate = (e) => {
		if (e.toString() === correct.toString()) {
			console.log("correct");
			setCorrect(true);
		} else {
			console.log("incorrect");
		}

		setTimeout(() => {
			setCorrect(false);
			SetId(Math.floor(1 + Math.random() * question.length));
		}, 1000);
	};

	return (
		<div>
			<Display question={quest} />
			<Options options={option} validate={validate} correct={correctOption} />
			<Controls />
		</div>
	);
};

export default Content;
