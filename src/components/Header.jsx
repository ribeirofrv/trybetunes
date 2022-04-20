import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = { userName: '', isLoading: false };
    this.UserLogged = this.UserLogged.bind(this);
  }

  componentDidMount() {
    this.UserLogged();
  }

  async UserLogged() {
    this.setState((prevState) => ({ ...prevState, isLoading: true }));
    const { name } = await getUser();
    this.setState(() => ({ userName: name, isLoading: false }));
  }

  render() {
    const { userName, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <header
        data-testid="header-component"
      >
        <h1>
          <strong>trybe</strong>
          Tunes
        </h1>
        <p data-testid="header-user-name">
          { userName }
        </p>
        <section>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa

          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas

          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil

          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
