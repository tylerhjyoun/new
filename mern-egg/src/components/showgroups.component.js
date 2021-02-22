import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Group = props => (
    <tr>
        <td>{props.group.groupName}</td>
        <td>{props.group.groupMembers}</td>
        <td>{props.group.groupCount}</td>
    </tr>
);

export default class ShowGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: []
        }  
    }
   
    componentDidMount(){
        axios.get(`http://localhost:5000/groups`)
            .then(res => {
                this.setState({groups: res.data});
            })
            .catch((error) => {
                console.log(error);
              })

    }

    groupList(){
        return this.state.groups.map(currentgroup => {
             return <Group group={currentgroup} key={currentgroup._id}/>})
    }

    render() {
        return (
            <div>
                Logged Users
 
            <table>
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Members</th>
                    <th>Number of Members</th>
                </tr>
            </thead>
                <tbody>
                { this.groupList() }
                </tbody>
            </table>
            </div>    
        );
    }
}