import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getProfiles} from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

 class Profiles extends Component {

 componentDidMount(){
     this.props.getProfiles();
 }
  render() {
      const {profiles, loading} = this.props.profile;
      console.log('***', profiles)
      let profileItems; 
      
    if(profiles === null || loading){
        profileItems = <Spinner />;
    } else{
        if(profiles.length > 0){
            profileItems = profiles.map((profile, i)=>
                {
                    return (
                        <div className="col-md-4" key={profile._id}>
                            <ProfileItem  profile={profile} />
                        </div>
                )}
            )
        } else{
            profileItems = <h3>No profiles found...</h3>
        }
    }

    return (
      <div className="profiles">
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <h1 className="display-4 text-center">Developer Profiles</h1>
                      <p className="lead text-center">
                          Browse and connect with developers
                      </p>
                  </div>
              </div>
            <div className="row">
                {profileItems}
            </div>
                        
          </div>
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return{
        profile: state.profile
    }
}

export default connect(mapStateToProps, {getProfiles})(Profiles);