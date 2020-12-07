import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";
const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const localStorage = window.localStorage;

  const onEmailChange = (val) => {
    setEmail(val);
  };

  const onPasswordChange = (val) => {
    setPassword(val.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/signIn",
        {
          email: email,

          password: password,
        },
        {
          headers: { "content-type": "application/json" },
        }
      );
      alert("successful");
      await localStorage.setItem("token", JSON.stringify(response.data));
      await localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refreshToken)
      );
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("refreshToken"));
      history.push("/");

      // if (response.status === 200) {
      //   alert("Successful");
      // } else {
      //   alert("Incorrect details");
      // }
      //console.log(response.data.token);
    } catch (error) {
      const err = error.message.split(" ")[5];
      switch (err) {
        case "401":
          alert("Password incorrect");
          break;
        case "404":
          alert("Incorrect Email address");
          break;
        default:
          alert("Network Error");
      }
      console.error(err);
    }
  };

  return (
    <div className="signin-div-container">
      <form
        className="signin-form"
        method="POST"
        onSubmit={handleSubmit.bind(this)}
      >
        <div className="signin-form-div">
          <h1 className="signin-heading">Sign In</h1>

          <input
            type="text"
            placeholder="Email"
            value={email}
            className="signin-input username"
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="signin-input password"
            onChange={(e) => onPasswordChange(e.target)}
            required
          />

          <input
            type="submit"
            className="signin-input submit"
            value="Sign In Now"
          />
        </div>
      </form>
    </div>
  );
};
export default SignIn;
