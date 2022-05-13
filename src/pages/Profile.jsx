import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = { user: {}, isLoading: false };
    this.UserLogged = this.UserLogged.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.UserLogged);
  }

  async UserLogged() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const { user: {
      name,
      email,
      image,
      description,
    }, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h2>Profile</h2>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ `Imagem de perfil de ${name}` }
            />
            <div>
              <h3>Nome</h3>
              <h4>{ name }</h4>
            </div>
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
            <div>
              <h3>Email</h3>
              <h4>{ email }</h4>
            </div>
            <div>
              <h3>Descrição</h3>
              <h4>{ description }</h4>
            </div>
          </div>)}
      </div>
    );
  }
}

export default Profile;
