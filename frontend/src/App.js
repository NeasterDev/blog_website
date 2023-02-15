import React from "react";
import Login from "./components/Login";

import "./App.css";
import Home from "./components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Register";
import BlogPost from "./components/BlogPost";
import RenderBlogPosts from "./components/RenderBlogPosts";
import Nav from "./components/Nav";
import ViewSinglePost from "./components/ViewSinglePost";
import UserPosts from "./components/UserPosts";

class App extends React.Component {
  // Constructor for app component
  constructor(props) {
    super(props);
    // creates the state for this component
    this.state = {
      token: "",
      username: "",
      password: "",
      id: "",
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

  // saves a new user to the database
  onRegister = () => {
    // fetch request to save user to db
    fetch("http://localhost:8080/api/user/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // this header does not need the JWT
      },
      method: "POST", // tells the server that this is a post request
      body: JSON.stringify({
        username: this.state.username, // sends the username and password from state, to the server
        password: this.state.password,
      }),
    }).then((res) => {
      if (res.ok) {
        // if the response was ok, take them to the login page
        window.location.href = "/login";
      } else {
        // if it wasnt ok, set the error message
        this.setState({
          ...this.state,
          error:
            "Error creating user. You may have already created an account.",
        });
      }
    });
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
    fetch("http://localhost:8080/api/user/current", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return this.setState({ ...this.state, token: localStorage.getItem("token"),  username: data.username });
      });
  }

  // when the component updates, check if there is a new token and save it to localStorage
  componentDidUpdate(prevProps, prevState) {
    if (this.state.token !== prevState.token) {
      localStorage.setItem("token", this.state.token);
    }
    if (this.state.username !== prevState.username) {
      localStorage.setItem("username", this.state.username);
    }
  }

  render() {
    return (
      <div className="text-center">
        <Nav />
        <div className="container">
          {this.state.username ? (
            <h3 className="mt-2">
              Welcome <span id="logged-in-user">{this.state.username}</span>
            </h3>
          ) : null}
          <Routes>
            <Route
              path="/"
              element={
                !this.state.token || !this.state.token === "" ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Home />
                )
              }
            />
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
            <Route
              path="/createpost"
              element={
                !this.state.token || !this.state.token === "" ? (
                  <Navigate replace to="/" />
                ) : (
                  <BlogPost username={this.state.username} />
                )
              }
            />
            <Route
              path="/blogposts"
              element={
                !this.state.token || !this.state.token === "" ? (
                  <Navigate replace to="/" />
                ) : (
                  <UserPosts />
                )
              }
            />
            <Route
              path="/blogposts/:username/:id/:entry"
              element={<ViewSinglePost loggedInUser={this.state.username} />}
            />{" "}
            {/*useParams to get the value of id */}
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
