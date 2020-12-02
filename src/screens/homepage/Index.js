import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Index() {
  const [userData, setUserData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const token = localStorage.getItem("token");

  async function getData() {
    try {
      const userResponse = await axios.get(
        "http://localhost:3002/user",

        {
          headers: { Authorization: `Bearer ${JSON.parse(token).token}` },
        }
      );
      const quizResponse = await axios.get(
        "http://localhost:3002/user/public/quiz"
      );

      setUserData(userResponse.data.profile);
      setQuizData(quizResponse.data);

      // console.log(quizResponse.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(quizData);
  return (
    <div className="index-container">
      <div> Welcome to quiz ninja {userData.name}</div>
      <div>{quizData.map((item) => item.quiz)}</div>
    </div>
  );
}
