import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Group = props => (
    <tr>
        <td>{props.group.groupName}</td>
        <Link to={`/users/${props.group.groupMembers[0]}`}>       
            <td>{props.group.groupMembers}</td>
        </Link>
        {/* <td>...members...</td> */}
        <td>{props.group.groupCount}</td>
        <td>
            <a href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</a>
        </td>
    </tr>
);

export default class ShowGroups extends Component {
    constructor(props) {
        super(props)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.state = {
            groups: []
        }  
    
    }


    deleteGroup(id){
        axios.delete('http://localhost:5000/groups/'+id)
            .then(response => { console.log(response.data)});
  
        this.setState({
            groups: this.state.groups.filter(el => el._id !== id)
      })    
    }

    componentDidMount() { 
        axios.get(`http://localhost:5000/groups`)
            .then(res => {
                console.log(res.data)
                const groupsData = res.data
                var final = []

                for (var i = 0; i < groupsData.length; i++) { 
                    var curr = groupsData[i]
                    /* bro */
                    const usertoken = { usertoken: localStorage.getItem('data') }
                    if (curr["groupMembers"] === usertoken) { 
                        final.push(curr)
                    } 
        
                }

                this.setState({
                    groups: final,
                });
                
            })
            .catch((error) => {
                console.log(error);
              })

    }

    groupList(){
        return this.state.groups.map(currentgroup => {
             return <Group group={currentgroup} deleteGroup={this.deleteGroup} key={currentgroup._id}/>})
    }

    render() {
        return (
            <div>
               <h2> Logged Groups </h2>
 
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