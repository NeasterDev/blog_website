import React from 'react';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {

    render() {
      if (!this.props.token || this.props.token === "") {
        return (
          <div>
            <h2>Register</h2>
            <div style={{color: "red"}}>{(this.props.error ? this.props.error: '')}</div>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" onChange={this.props.onUsernameChange} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" onChange={this.props.onPasswordChange} />
            </div>
            <div>
              <button onClick={this.props.onRegister}>Submit</button>
            </div>
            <Link to="/login">Already have an account? Login.</Link>
          </div>
        );
      } else { return (<div>Logged In</div>); }
    }
  }