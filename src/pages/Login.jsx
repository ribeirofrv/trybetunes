import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = { nome: '', isLoading: false };
    this.HandleInput = this.HandleInput.bind(this);
    this.HandleButton = this.HandleButton.bind(this);
    this.isSaveButtonDisabled = this.isSaveButtonDisabled.bind(this);
  }

  HandleInput({ target }) {
    const { value } = target;
    this.setState({ nome: value });
  }

  async HandleButton() {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState((prevState) => ({ ...prevState, isLoading: true }));
    await createUser({ name: nome });
    history.push('/search');
  }

  isSaveButtonDisabled() {
    const { nome } = this.state;
    const size = 3;

    if (nome.length >= size) return false;

    return true;
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div data-testid="page-login">
        <header>
          <h2>Login</h2>
        </header>
        <section>
          <label htmlFor="name-input">
            Nome
            <input
              id="name-input"
              onChange={ this.HandleInput }
              data-testid="login-name-input"
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.HandleButton }
            disabled={ this.isSaveButtonDisabled() }
          >
            Entrar

          </button>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
