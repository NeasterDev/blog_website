import React from "react";
import Login from "./components/Login";

import "./App.css";
import Home from "./components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";

class App extends React.Component {
  // Constructor for app component
  constructor(props) {
    super(props);
    // creates the state for this component
    this.state = {
      token: "",
      username: "",
      password: "",
      error: "",
    };
  }

  // login function
  onLogin = () => {
    // fetch the login route that spring security provides
    fetch("http://localhost:8080/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // declare this as a POST request
      method: "POST",
      // send the body as json
      body: JSON.stringify({
        // we are sending the username and password from state (what is typed in to the login form)
        username: this.state.username,
        password: this.state.password,
      }),
    })
      // get the token from the header labeled authorization
      .then((res) => res.headers.get("authorization"))
      .then((token) => {
        // if there is a token
        if (token) {
          // change the state of the token to the JSON web token we just received
          this.setState({ ...this.state, token: token });
        } else {
          // If there is no token that means the login was unsuccessful
          this.setState({
            // set the state of error
            ...this.state,
            error: "Unable to login with username and password.",
          });
        }
      });
  };

  onRegister = () => {
    console.log("Register called");
    console.log(this.state.username);
    fetch("http://localhost:8080/api/user/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then(res => {
      if (res.ok) {
        window.location.href = "/login";
      } else {
        this.setState({ ...this.state, error: "Error creating user. You may have already created an account."})
      }
    })
  };

  // When the username text field changes
  onUsernameChange = (e) => {
    // update the state of username to the value of the input
    this.setState({ ...this.state, username: e.target.value });
  };
  // When the password input changes
  onPasswordChange = (e) => {
    // set the state of password to the value of the input
    this.setState({ ...this.state, password: e.target.value });
  };

  // sets the token to token saved in local storage if there is one
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ ...this.state, token: localStorage.getItem("token")});
    }

  }

  // when the component updates, check if there is a new token and save it to localStorage 
  componentDidUpdate(prevProps, prevState) {
    if (this.state.token !== prevState.token) {
      localStorage.setItem("token", this.state.token);
    }
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !this.state.token || !this.state.token === "" ? (
                <Login
                  onUsernameChange={this.onUsernameChange}
                  onPasswordChange={this.onPasswordChange}
                  onLogin={this.onLogin}
                  error={this.state.error}
                />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onUsernameChange={this.onUsernameChange}
                onPasswordChange={this.onPasswordChange}
                onRegister={this.onRegister}
                error={this.state.error}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
