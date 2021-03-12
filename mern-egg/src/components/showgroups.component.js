import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Timer from './timer.component'
import axios from 'axios'

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
        <td>{props.group.groupName}</td>
        <td>{props.group.groupMembers.map(m => m['username'] + ' ')}</td>
        <td>{props.group.groupCount}</td>
        {/* <td><Timer endtime={props.group.groupEndtime 
            idk how to make the endtime field 
            if each group has events for all of the members then would need to change how we implement create event
                - i tried adding a change user function so that it could be an array but it didnt work yet
        } /></td>  */}
        <td>
            <button class = "RemoveButton" 
            href="#" onClick={() => { props.deleteGroup(props.group._id) }}>delete</button>
        </td>
        {/* <td>
            <button class = "RemoveButton" 
            href="#" onClick={() => { props.addEvent(props.group._id) }}>add event</button>
        </td> */}
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

    // <Link to='/home/event'> Add Event </Link> 
    // how the add event works is a link to the add event page 

    // componentDidMount() { 
    //     axios.get(`http://localhost:5000/groups`)
    //         .then(res => {
    //             console.log(res.data)
    //             const groupsData = res.data
    //             var final = []

    //             for (var i = 0; i < groupsData.length; i++) { 
    //                 var curr = groupsData[i]
    //                 /* bro */
    //                 const usertoken = { usertoken: localStorage.getItem('data') }
    //                 if (curr["groupMembers"] === usertoken) { 
    //                     final.push(curr)
    //                 } 
        
    //             }

    //             this.setState({
    //                 groups: final,
    //             });
                
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //           })

    // }
    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/groups`)
                    .then(response => {
                        const all = response.data; 
                        let usergroups = [];
                        for(let i = 0; i < all.length; i++){
                            const currentgroup = all[i]
                            for(let j = 0; j < currentgroup.groupMembers.length; j++){
                                const currentgroupmembersIds = currentgroup.groupMembers[j]['id']
                                if(currentgroupmembersIds === this.state.id){
                                    usergroups.push(currentgroup)
                                }
                            }
                        }
                        this.setState({
                            groups: usergroups,
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

    groupList(){
        return this.state.groups.map(currentgroup => {
             return <Group group={currentgroup} deleteGroup={this.deleteGroup} key={currentgroup._id}/>})
    }

    render() {
        return (
            <div>

               <h2> Groups </h2>
               <Link className = "btn" to='/home/group'> Add Group </Link>
            <table>
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Members</th>
                    <th>Number of Members</th>
                    {/* <th>Timer</th> */}
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
