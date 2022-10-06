import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
    // method to call the logout route to the server
    logout = () => {
        fetch("http://localhost:8080/api/user/logout", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token") // JWT Token necessary to make calls to the server
            },
            method: "POST",
        }).then(res => {
            if (res.ok) {
                localStorage.removeItem("token"); // removes the token from localstorage to logout of the client
            }
            window.location.reload(true); // reload the window to send the user back to login page
        })
    }

  render() {
    return (
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/">
              <button className="c-nav-link nav-link-focus">Home</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login">
              <button className="c-nav-link nav-link-focus">Login</button>
            </Link>
          </li>
          <li className="nav-item" >
            <Link to="/register">
              <button className="c-nav-link nav-link-focus">Register</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/createpost">
              <button className="c-nav-link nav-link-focus">Create post</button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blogposts">
              <button className="c-nav-link nav-link-focus">View your posts</button>
            </Link>
          </li>
          <li className="nav-item">
            <button className="c-nav-link nav-link-focus" onClick={this.logout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
  }
}
