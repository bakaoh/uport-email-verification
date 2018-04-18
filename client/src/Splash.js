import React, { Component } from 'react';
import './Splash.css';
import axios from 'axios';

class Splash extends Component {

  constructor() {
    super();
    this.state = { email: '', success: false };
  }

  onChange = (e) => {
    this.setState({ email: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('/register', { email: this.state.email })
      .then((result) => {
        this.setState({ success: true });
      });
  }

  render() {
    return (
      <div>
        <div className="logo"></div>
        {!this.state.success
          ?
          (<div className="container verification">
            <div className="email"></div>
            <h5>Email Verification</h5>
            <p>Receive a private verification proving you own an email address.
          Share this with others to build your reputation in the decentralized web.</p>

            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.onChange}
                type="email"
                autoComplete="false"
                required
                placeholder="Enter email address" />
              <button className="button">Continue</button>
            </form>
          </div>)
          :
          (<div className="container success">
            <div className="email"></div>
            <h4>Success!</h4>
            <h5>We emailed a confirmation link to {this.state.email}.</h5>
            <p>Open the mail and follow the link to complete the verification process</p>
          </div>)
        }
      </div>
    );
  }
}

export default Splash;