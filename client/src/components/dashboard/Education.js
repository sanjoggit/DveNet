import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick = (id)=>{
        this.props.deleteEducation(id);
    }
  render() {
      const education = this.props.education.map((edu)=>{
        return(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td><Moment format="YY/MM/DD">{edu.from}</Moment>-{edu.to === null ? ('Now'):(<Moment format="YY/MM/DD">{edu.to}</Moment>)}</td>
                <td><button className="btn btn-danger" onClick={()=>this.onDeleteClick(edu._id)}>Delete</button></td>
            </tr>
        )
      });
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th></th>
                </tr>
                    {education}     
            </thead>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}


export default connect(null,{deleteEducation})(Education);