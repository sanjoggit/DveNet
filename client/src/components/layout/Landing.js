import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from "../common/TextFieldGroup";
import {bindActionCreators} from "redux";
import {registerUser} from "../../actions/authActions";
import {withRouter} from 'react-router-dom';


class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this
        .props
        .history
        .push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this
      .props
      .registerUser(newUser, this.props.history);
  };
  render() {
    const {errors} = this.state;

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 text-center landing-content">
                <div>
                  <h1 className="display-3 mb-4">Created For Developers</h1>
                  <p className="lead">
                    Create a developer profile/portfolio and share posts.
                  </p>
                </div>
                {/* <hr/>
                <Link to="/register" className="btn btn-lg btn-primary mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-outline-success">
                  Login
                </Link> */}
              </div>
              <div className="col-md-4">
                <div className="register-form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <label>Name</label>
                    <TextFieldGroup
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                     />
                     <label>Email</label>
                     <TextFieldGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                     />
                     <label>Password</label>
                     <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                     />
                     <label>Confirm Password</label>
                     <TextFieldGroup
                      placeholder="Confirm Password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                     />
                     <input type="submit" value="Sign up" className="btn btn-info btn-block mt-4"/>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {auth: state.auth, errors: state.errors}
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    registerUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));
