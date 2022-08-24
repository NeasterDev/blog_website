import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  // renders inputs to login, gets the methods to login from App.js props
    render() {
      if (!this.props.token || this.props.token === "") {
        return (
          <div className='login w-25 mt-4 mx-auto'>
            <h2 className="h2 mt-2"><strong>Login</strong></h2>
            <div style={{color: "red"}}>{(this.props.error ? this.props.error: '')}</div>
            <div>
              <label htmlFor="username" className='form-label'>Username:</label>
              <input type="text" id="username" className='form-control' name="username" onChange={this.props.onUsernameChange} />
            </div>
            <div>
              <label htmlFor="password" className='form-label'>Password:</label>
              <input type="password" id="password" className='form-control' name="password" onChange={this.props.onPasswordChange} />
            </div>
            <div>
              <button className='btn btn-light mt-2' onClick={this.props.onLogin}>Submit</button>
            </div>
            <Link to="/register">No Account? Sign up!</Link>
          </div>
        );
      } else { return (<div>Logged In</div>); }
    }
  }