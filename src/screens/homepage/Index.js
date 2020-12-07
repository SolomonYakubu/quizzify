import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
export default function Index() {
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  async function getData() {
    try {
      const userResponse = await axios.get(
        `http://localhost:3002/user/${JSON.parse(token).user_id}`,

        {
          headers: { Authorization: `Bearer ${JSON.parse(token).token}` },
        }
      );
      const quizResponse = await axios.get(
        "http://localhost:3002/user/public/quiz"
      );

      setUserData(userResponse.data);
      setQuizData(quizResponse.data);

      // console.log(quizResponse.data);
    } catch (error) {
      const err = error.message.split(" ")[5];
      if (err === "401") {
        try {
          const response = await axios.post(
            "http://localhost:3002/user/refresh-token",
            {
              user_id: JSON.parse(token).user_id,
            },
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(refreshToken)}`,
              },
            }
          );
          await localStorage.setItem("token", JSON.stringify(response.data));
          alert("successful");
          window.location.reload();

          console.log(localStorage.getItem("token"));
        } catch (error) {
          history.push("/sign-in");
        }
      }
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(userData);
  return (
    <div className="index-container">
      <div> Welcome to quiz ninja {userData.name}</div>
      <div>{quizData.map((item) => item.quiz)}</div>
    </div>
  );
}
