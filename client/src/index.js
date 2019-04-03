import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
//redux setting
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {clearCurrentProfile} from "./actions/profileActions";

const store = createStore(
  allReducers,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear current profile redirect to login
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById("root"));
registerServiceWorker();

export default store;