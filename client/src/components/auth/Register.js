import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {registerUser} from "../../actions/authActions";
import propTypes from "prop-types";
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
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
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-6 text-center">Sign Up</h1>
              <form noValidate onSubmit={this.onSubmit}>
              <i className="fas fa-user"></i>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="  text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}></TextFieldGroup>
                <i className="fas fa-envelope"></i>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"/> {/* <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email
                    ? "is-invalid"
                    : ""}`}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}/> {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div> */}
                <i className="fas fa-lock"></i>
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}/>

                <i className="fas fa-lock"></i>
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}/>

                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => {
  return {auth: state.auth, errors: state.errors};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    registerUser
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
