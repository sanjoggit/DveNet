 import React, { Component } from 'react'
 import PropTypes from 'prop-types';
 import Moment from 'react-moment';
 import {connect} from 'react-redux';
 import {Link} from 'react-router-dom';
 import {deletePost, addLike, removeLike} from '../../actions/postActions';

 class PostItem extends Component {
    onDeleteClick = (id)=>{
        this.props.deletePost(id);  
    }
    onLikeClick = (id)=>{
        this.props.addLike(id);
    }
    onUnLikeClick = (id)=>{
        this.props.removeLike(id);
    }
    findUserLike(likes){
        const {auth} = this.props;
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true;
        } else{
            return false;
        }
    }
   render() {
       const {post, auth, showActions} = this.props;
       const today = new Date();
       const currentSecond = today.getTime()/1000;
       const date = new Date(post.date);
       const postedSeconds = date.getTime() / 1000;
       const calenderStrings = {
        lastDay : '[Yesterday at] LT'
       }
       let timeFormat;
       if(currentSecond - postedSeconds < 86400){
            timeFormat =<Moment fromNow>{post.date}</Moment>
       }
       if((currentSecond - postedSeconds > 86400) && (currentSecond - postedSeconds < 172800)){
            timeFormat =<Moment calendar={calenderStrings}>{post.date}</Moment>
       }
       if(currentSecond - postedSeconds > 172800){
            timeFormat =<Moment format="MMMM Do YYYY, h:mm:ss a">{post.date}</Moment>
       }
     return (
          <div className="card card-body mb-3 post-feed-item">
                  
              <div className="row">
                <div className="col-md-2 card-left">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10 card-right">
                    
                    <small className="text-muted">
                        {timeFormat}
                    </small>
                  <p className="lead">{post.text}</p>
                    {showActions ? (
                        <span>
                            <button onClick={()=>this.onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
                                <i className={this.findUserLike(post.likes) ? 'text-info fas fa-thumbs-up' : 'fas fa-thumbs-up'}></i>
                                <span className="badge badge-light">{post.likes.length}</span>
                            </button>
                            <button onClick={()=>this.onUnLikeClick(post._id)} type="button" className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
                                <i className="far fa-comment"></i> {post.comments.length}
                            </Link>      
                            {post.user === auth.user.id ? (
                                <button type="button" className="btn btn-outline-danger mr-1" onClick={()=>this.onDeleteClick(post._id)}>
                                    <i className="fas fa-times" />
                                </button>
                            ) : null
                            }  
                        </span>) : null}    
                </div>
              </div>
            </div>
     )
   }
 }

 PostItem.defaultProps = {
     showActions: true
 }
 
 PostItem.propTypes = {
     post: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired ,
     deletePost: PropTypes.func.isRequired,
     addLike: PropTypes.func.isRequired,
     removeLike: PropTypes.func.isRequired
 }

 const mapStateToProps = state =>{
     return{
         auth: state.auth
     }
 }

 export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);