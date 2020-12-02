import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameChange = (val) => {
    setName(val);
  };
  const onUserNameChange = (val) => {
    setUserName(val);
  };
  const onEmailChange = (val) => {
    setEmail(val);
  };
  const onPasswordChange = (val) => {
    setPassword(val.value);
    if (password === confirmPassword) {
      val.style.borderColor = "green";
    } else {
      val.style.borderColor = "#9f9f9f";
    }
  };
  const onConfirmPasswordChange = (val) => {
    if (password === confirmPassword) {
      val.style.borderColor = "green";
    } else {
      val.style.borderColor = "#9f9f9f";
    }
    setConfirmPassword(val.value);
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };
  //   const profile = ;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          "http://localhost:3002/signUp",
          {
            name: name,
            username: username,
            email: email,
            password: password,
          },
          {
            headers: { "content-type": "application/json" },
          }
        );
        if (response.status === 201) {
          alert("Account created successfully");
          resetForm();
        }
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
        alert("The Username is not available");
      }
    } else {
      alert("Passwords didn't match");
    }
  };
  console.log(name, email, password);

  return (
    <div className="signup-div-container">
      <form
        className="signup-form"
        method="POST"
        onSubmit={handleSubmit.bind(this)}
      >
        <div className="signup-form-div">
          <h1 className="signup-heading">Sign Up</h1>
          <input
            type="text"
            value={name}
            placeholder="Name"
            className="signup-input name"
            onChange={(e) => onNameChange(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            className="signup-input username"
            onChange={(e) => onUserNameChange(e.target.value)}
            required
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="signup-input email"
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="signup-input password"
            onChange={(e) => onPasswordChange(e.target)}
            required
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            className="signup-input password"
            onChange={(e) => onConfirmPasswordChange(e.target)}
            required
          />
          <input
            type="submit"
            className="signup-input submit"
            value="Sign Up Now"
          />
        </div>
      </form>
    </div>
  );
};
export default SignUp;
