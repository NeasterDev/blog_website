import React from "react";
import { Link, Route } from "react-router-dom";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home page</h1>
                <Link to="/login">Login</Link><br/>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}