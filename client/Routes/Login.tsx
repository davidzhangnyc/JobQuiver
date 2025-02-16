import React, { FC, useState, useEffect } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router";

const Login: FC<any> = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useEffect(() => {
  //   props.verifiedHandler();
  // });
  //saves user's input for username and password
  const setUsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const setPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  //login the user by username and password
  const authLoginHandler = async () => {
    await fetch("login/auth", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response: any) => {
        response.json;
      })
      .then((data: any) => {
        if (data.valid) {
          props.verifiedHandler();
        }
      });
  };
  //login the user by oAuth
  const oAuthLoginHandler = async () => {
    await fetch("/login/oauth", {
      method: "POST",
    });
  };
  //redirect to signup page
  const signupHandler = () => {
    <Redirect to="/signup" />;
  };

  return (
    <div>
      <div className="loginSignupButtonContainer">
        <button onClick={signupHandler}>Signup</button>
        <button onClick={authLoginHandler}>Login</button>
      </div>
    </div>
  );
};

export default Login;
