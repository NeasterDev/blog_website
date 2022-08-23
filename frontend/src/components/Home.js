import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    logout = () => {
        fetch("http://localhost:8080/api/user/logout", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            method: "POST",
        }).then(res => {
            if (res.ok) {
                localStorage.removeItem("token");
            }
            window.location.reload(true);
        })
    }

    render() {
        return (
            <div>
                <h1>Home page</h1>
                <Link to="/login">Login</Link><br/>
                <Link to="/register">Register</Link><br/>
                <Link to="/createpost">Create post</Link>
                <Link to="/blogposts">View posts</Link>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}