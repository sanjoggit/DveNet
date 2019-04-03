import React, {Component} from "react";
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';
import Logo from '../../img/logo.png';

class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this
      .props
      .clearCurrentProfile();
    this
      .props
      .logoutUser();
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;
    const authLinks = (
      <div className="dropdown show">
        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{
              width: '25px',
              marginRight: '5px',
              marginLeft: '5px'
            }}
            title="you must have a gravatar connected to email to display an image"/>
        </a>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <Link className="nav-link" to="/feed">Post Feed</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <a className="dropdown-item nav-link" href="#" onClick={this.onLogoutClick}>Logout</a>
        </div>
      </div>
    ); 
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link sign-up" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul> 
    )
    return (
      <nav className="navbar navbar-expand-sm  mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt=""/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated
              ? authLinks
              : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = state => {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);
