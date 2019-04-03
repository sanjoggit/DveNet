import React, {Component} from 'react'
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
    render() {
        const {profile} = this.props;
        console.log('********', profile)
        return (
            <div className="row profile-header bg-info">
                <div className="col-md-8">
                    <h1>{profile.user.name}</h1>
                    <h5>{profile.status}</h5>
                    <p>{profile.bio}</p>
                    {isEmpty(profile.location) ? null : (<p><i className="fas fa-map-marker-alt"></i> {profile.location}</p>)}
                    {isEmpty(profile.githubusername) ? null : (<p><i className="fab fa-github"></i> github.com/{profile.githubusername}</p>)}
                </div>
                <div className="col-md-4 profile-image">
                    <img
                        className="rounded-circle"
                        src={profile.user.avatar}
                        alt=""/>
                        <p>
                            {isEmpty(profile.website) ? null : (
                                <a className="text-white p-2" href={profile.website} target="_blank">
                                    <i className="fas fa-globe fa-2x"></i>
                                </a>
                            )}
                            {isEmpty(profile.social && profile.social.twitter) ? null : (
                                <a className="text-white p-2" href={profile.social.twitter} target="_blank">
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>
                            )}
                            
                            {isEmpty(profile.social && profile.social.facebook) ? null : (
                                <a className="text-white p-2" href={profile.social.facebook} target="_blank">
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                            )}
                        
                            {isEmpty(profile.social && profile.social.linkedin) ? null : (
                                <a className="text-white p-2" href={profile.social.linkedin} target="_blank">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </a>
                            )}

                            {isEmpty(profile.social && profile.social.instagram) ? null : (
                                <a className="text-white p-2" href={profile.social.instagram} target="_blank">
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                            )}

                            {isEmpty(profile.social && profile.social.youtube) ? null : (
                                <a className="text-white p-2" href={profile.social.youtube} target="_blank">
                                    <i className="fab fa-youtube fa-2x"></i>
                                </a>
                            )}

                        </p>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;