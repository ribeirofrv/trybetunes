import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h2>Edit</h2>
      </div>
    );
  }
}

export default ProfileEdit;
