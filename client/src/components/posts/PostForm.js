import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions';

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            errors: {}
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({
                errors: newProps.errors
            })
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };
        this.props.addPost(newPost);
        this.setState({
            text: ''
        })
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="col-md-12 post-feed">
                <form onSubmit={this.onSubmit}>
                <img src={this.props.auth.user.avatar} alt="" className=""/>
                    <div className="form-group col-md-12">
                        <TextAreaFieldGroup
                            placeholder="create a post"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            error={errors.text}
                            />
                    </div>
                    <button type="submit" className="btn btn-dark">Share</button>
                </form>
            </div>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return{
        auth: state.auth,
        errors: state.errors,
        post:state.post
    }
}

export default connect(mapStateToProps, {addPost})(PostForm);