import React, { Component } from 'react'
import {connect} from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import {getPosts} from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {

  componentDidMount(){
      this.props.getPosts();
  }
  render() {
      const {posts,loading} = this.props.post;
      let postContent;

      if(posts === null || loading){
          postContent = <Spinner />
      } else{
          postContent = <PostFeed posts={posts} />;
      }
    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm />
                    <h3>Posts</h3>
                    <hr/>
                    {postContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return{
        post:state.post
    }
}

export default connect(mapStateToProps, {getPosts})(Posts);