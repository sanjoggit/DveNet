import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class ProfileGithub extends Component {

  constructor(props){
    super(props);
    this.state = {
      clientId: '14ad647aaa19b9d74eb8',
      clientSecret: 'a6e432b6c81f08936f7abc80b3dd47d6d8f70f20',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }

  componentDidMount(){
    const {username} = this.props;
    const {count, sort, clientId, clientSecret} = this.state;
    console.log('username', username)
    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    .then(res=>res.json())
    .then(data =>{
      this.setState({repos: data});
    }).catch(err=>console.log(err))
    // axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
    // .then(response =>{
    //   console.log('*****', response)
    //     this.setState({repos: data});
    //   }).catch(err=>console.log(err))
  }

  render() {
    const {repos} = this.state;
    console.log('repos', repos)
    const repoItems = repos.map(repo=>{
      return(
       <div className="card card-body mb-2" key={repo.id}>
         <div className="row">
           <div className="col-md-6">
             <h4>
               <Link to={repo.html_url} className="text-info" target="_blank">{repo.name}</Link>
             </h4>
             <p>{repo.description}</p>
           </div>
           <div className="col-md-6">
             <span className="badge badge-info mr-1">
               stars: {repo.stargazers_count}
             </span>
             <span className="badge badge-secondary mr-1">
               Watchers: {repo.watchers_count}
             </span>
             <span className="badge badge-info">
               Forks: {repo.forks_count}
             </span>
           </div>
         </div>
       </div>
       
      )
    })
    
    return (
      <div>
        <hr/>
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub;