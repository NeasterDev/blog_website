import React from 'react';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
// Similar to login, this component has inputs to register and gets its props from App.js
    render() {
      if (!this.props.token || this.props.token === "") {
        return (
          <div className='login w-25 mt-4 mx-auto'>
            <h2 className="h2 mt-2"><strong>Register</strong></h2>
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
              <button className='btn btn-light mt-2' onClick={this.props.onRegister}>Submit</button>
            </div>
            <Link to="/login">Already have an account? Login.</Link>
          </div>
        );
      } else { return (<div>Logged In</div>); }
    }
  }