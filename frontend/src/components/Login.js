import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    render() {
      if (!this.props.token || this.props.token === "") {
        return (
          <div>
            <h2>Login</h2>
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
              <button onClick={this.props.onLogin}>Submit</button>
            </div>
            <Link to="/register">No Account? Sign up!</Link>
          </div>
        );
      } else { return (<div>Logged In</div>); }
    }
  }