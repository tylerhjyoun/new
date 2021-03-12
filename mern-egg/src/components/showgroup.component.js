import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../Groups.css';

const Group = props => (
    <tr>
        <td>{props.group.groupName}</td>
        {/*<Link to={`/users/${props.group.groupMembers[0]}`}>       
            <td>{props.group.groupMembers}</td>
        </Link>*/}
        {/* <td>...members...</td> */}
        <td>{props.group._id}</td>
        {/* Remove the delete button later on */}
    </tr>
);

export default class showGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group: [],
            groupmembers: []
        }  
    
    }


    componentDidMount() {
            console.log(this.props.match.params.id);
            axios.get(`http://localhost:5000/groups/` + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        group: response.data,
                        groupmembers: response.data.groupMembers
                    });
                    console.log(this.state.group)
                })
                .catch((error) => {
                    console.log(error);
                })
        }




    render() {
        const data = Array.from(this.state.groupmembers);
        const listUsers = data.map((d) => <li key={d.username}><Link to={'/home/users/' + d.id}>{d.username}</Link></li>);
        return (
            <div>
                <h2>Group Name: {this.state.group.groupName}</h2>
                <h2>Group Size: {this.state.group.groupCount}</h2>
                <h2>Group Members:</h2>
                <ul className="UserList">{listUsers}</ul>
                <table className="table">
                <thead className="thead-custom">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}
