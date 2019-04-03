import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const {profile} = this.props; 
    return (
          <div className="card">
            <img className="card-img-top" src={profile.user.avatar} alt="Card image cap" />
            <div className="card-body user-info">
              <h4 className="card-title">{profile.user.name}</h4>
              <p>{profile.status} {isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
              <p>{isEmpty(profile.location) ? null : (<span>  {profile.location}</span>)}</p>
              <hr/>
            </div>
            <div className="card-body user-skill">
              <h5 style={{'textAlign': 'center'}}>Skills</h5>
              <div className="profile-skills">
                {profile.skills.slice(0, 4).map((skill, index)=>{
                  return(
                      <span key={index}>{skill}</span>
                  )
                })}
                <span>...</span>
              </div>
            </div>
            <div className="card-footer">
              <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
            </div>
          </div>
    )
  }
}

ProfileItem.protoTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;