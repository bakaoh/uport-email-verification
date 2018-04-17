import React, { Component } from 'react';
import axios from 'axios';

class Splash extends Component {

  constructor() {
    super();
    this.state = { email: '' };
  }

  onChange = (e) => {
    this.setState({ email: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('/register', { email: this.state.email })
      .then((result) => {
        this.props.history.push('/success')
      });
  }

  render() {
    return (
      <div className="container verification">
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
      </div>
    );
  }
}

export default Splash;