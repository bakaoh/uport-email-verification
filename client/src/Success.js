import React, { Component } from 'react';

class Success extends Component {

  render() {
    return (
      <div class="container success">
        <div class="email"></div>
        <h4>Success!</h4>
        <h5>We emailed a confirmation link to joe@uport.me.</h5>
        <p>Open the mail and follow the link to complete the verification process</p>
      </div>
    );
  }
}

export default Success;