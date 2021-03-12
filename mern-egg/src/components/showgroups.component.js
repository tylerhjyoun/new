import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Timer from './timer.component'
import axios from 'axios'
import Select from 'react-select'

// const Group = props => (
//     <tr>
//         <td>{props.group.groupName}</td>
//         <Link to={`/users/${props.group.groupMembers[0]}`}>       
//             <td>{props.group.groupMembers}</td>
//         </Link>
//         {/* <td>...members...</td> */}
//         <td>{props.group.groupCount}</td>
//         <td>
//             <button class = "RemoveButton" 
//             href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</button>
//         </td>
//     </tr>
// );
const Group = props => (
    <tr>
        <td><Link to={'/home/groups/' + props.group._id}>{props.group.groupName}</Link></td>
        {/*<Link to={`/users/${props.group.groupMembers[0]}`}>       
            <td>{props.group.groupMembers}</td>
        </Link>*/}
        {/* <td>...members...</td> */}
        <td>{props.group.groupCount}</td>
        {/*<td>
            <a href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</a>
        </td>*/}
        {/* Remove the delete button later on */}
    </tr>
);

export default class showGroup extends Component {
    constructor(props) {
        super(props)
        this.deleteGroup = this.deleteGroup.bind(this)
        this.state = {
            groups: []
        }  
    
    }


    componentDidMount() { 
        axios.get(`http://localhost:5000/groups`)
            .then(res => {
                console.log(res.data)
                let groupsData = res.data
                this.setState({
                    groups: res.data,
                });
     
                let final = []; // empty array
                const token = { token: localStorage.getItem('data') }
     
                console.log(token);
                var userId = '';
     
                axios.post(`http://localhost:5000/login/token`, token)
                    .then((response) => {
                        console.log(response.data.id.id);
                        this.setState({
                            id: response.data.id.id,
                        });
     
                        for (var i = 0; i < groupsData.length; i++) { 
                            var curr = groupsData[i]
                            
                            const arrOfGroupMembers = curr["groupMembers"];
                            for (var j = 0; j < arrOfGroupMembers.length; j++) {
                                var temp = arrOfGroupMembers[j]
                                // console.log(temp)
                                if (temp["id"] == response.data.id.id) { 
                                    final.push(curr)
                                    console.log(curr)
                                } 
                            }
                        }
     
                        console.log(final)
                        this.setState({
                            groups: final
                        })
     
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
     
        }

    deleteGroup(id){
        axios.delete('http://localhost:5000/groups/'+id)
            .then(response => { console.log(response.data)});
        this.setState({
            groups: this.state.groups.filter(el => el._id !== id)
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
               <Link to='/home/group'> Add Group </Link>
               <input class="form-control" id="myInput" type="text" placeholder="Search.."/>
            <table className="table">
            <thead className="thead-custom">
                <tr>
                    <th>Your Groups</th>
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


