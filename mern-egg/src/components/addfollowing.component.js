import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.username}</td>
        <td>
            <a href="#" onClick={() => {
                props.addFollowing(props.user._id)
            }
            }>follow</a>
        </td>
    </tr>
);


export default class AddFollowing extends Component {
    constructor(props) {
        super(props)
        this.addFollowing = this.addFollowing.bind(this)

        this.state = {
            id: '',
            following: [],
            users: [],
        }
    }


    componentDidMount() {
        const token = { token: sessionStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(response => {
                        this.setState({ following: response.data.following })
                        console.log(this.state.following)
                        let user = sessionStorage.getItem('data');
                        const usertoken = user
                        axios.get(`http://localhost:5000/users`, { headers: { "Authorization": `Bearer ${usertoken}` } }) // get all users
                            .then(res => {
                                this.setState({
                                    users: res.data.filter((el) => !this.state.following.includes(el._id)).filter(el => el._id !== this.state.id)
                                });
                            })
                            .catch((error) => {
                                console.log(error);
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

    filteredUserList() {
        return this.state.users.filter(currentuser => {
            console.log(currentuser)
            return <User user={currentuser} addFollowing={this.addFollowing} key={currentuser._id} />
        })
    }

    userList() {
        // const filteredUsers = this.state.users.filter((user) => {
        //     return this.state.following.some((f) => {
        //         return f === user._id
        //     })
        // })
        return this.state.users.map(currentuser => { // filteredUsers is an array of objects
            return <User user={currentuser} addFollowing={this.addFollowing} key={currentuser._id} />
        })
    }

    addFollowing(id) {
        axios.post('http://localhost:5000/users/addfollowing/' + this.state.id, { id })
            .then(response => { console.log(response.data) });
        axios.post('http://localhost:5000/users/addfollower/' + id, { id: this.state.id })
            .then(response => { console.log(response.data) });

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h2>Logged Users </h2>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div >
        );
    }
}
// export default class AddFriend extends Component {
//     constructor(props) {
//         super(props)

//         this.onSubmit = this.onSubmit.bind(this);
//         this.onChangeUsers = this.onChangeUsers.bind(this);

//         this.state = {
//             username: '',
//             friends: [],
//             users: []
//         }    
//     }

//     componentDidMount(){
//         axios.get(`http://localhost:5000/users`)
//             .then(res => {
//                 this.setState({
//                      users: res.data.map(user=>user.username)
//                 })            
//             })
//             .catch((error) => {
//                 console.log(error);
//               })

//     } 

//     onChangeUsers(e){
//         this.setState({
//             friends: e
//         }    
//         )
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const user = {
//             friends: this.state.friends.map(function(item) {
//                 return item['label']
//             }),
//         }


//         console.log(user)

//         axios.post(`http://localhost:5000/users/addfriend`, user)
//             .then(
//                 (res) => console.log(res.data),
//                 auth.logout(() => {
//                     console.log(this.props.history)
//                     this.props.history.push("/home")
//                 })
//             )
//             .catch((error) => {
//                 console.log(error);
//               })

//         this.setState({
//             groupName: '',
//             groupMembers: [],
//             groupCount: 0
//         })

//     }


//     render(){
//         const userList = [];
//         this.state.users.forEach(function(element) {
//             userList.push({label: element, value: element})
//         })

//         const users = this.state.users.map(user=> {
//               return <li key={user.username}> {user.username} </li>
//          })
//         return (
//             <div>

//                <h2>Add Friend</h2>  
//                 <form onSubmit={this.onSubmit}>     
//                     <div> 
//                     <label>Users: </label>
//                                        <Select isMulti ref="userInput" setValue={this.state.friends} options={userList} onChange={this.onChangeUsers}
//                                         />

//                         </div>
//                     <input type="submit" value="Create Group" className="btn btn-primary"/>
//                 </form>
//             </div>    
//         )
//         }
// }



// import React, { Component, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'

// const User = props => (
//     <tr>
//         <td>{props.user.friends}</td>
//     </tr>
// );

// export default class addFriend extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: '',
//             friends: [],
//             users: [],
//             id: ''
//         }
//     }

//     componentDidMount() {
//         const token = { token: sessionStorage.getItem('data') }
//         axios.post(`http://localhost:5000/login/token`, token)
//             .then((res) => {
//                 this.setState({ id: res.data.id.id })
//             }
//             )
//             .catch((error) => {
//                 console.log(error);
//             })
//         axios.get(`http://localhost:5000/users/` + this.state.id)
//             .then(res => {
//                 this.setState({ username: res.data.username });
//                 this.setState({ friends: res.data.friends })
//             })
//             .catch((error) => {
//                 console.log(error);
//             })

//     }

//     userList() {
//         return this.state.users.map(currentuser => {
//             return <User user={currentuser} key={currentuser._id} />
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h2>Logged Users </h2>

//                 <table className="table">
//                     <thead className="thead-light">
//                         <tr>
//                             <th>Username</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.userList()}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }
// export default function Login(props) {
//     const [user, setUser] = useState('');
//     const [friends, setFriends] = useState([]);
//     const [users, setUsers] = useState([])
//     const [usertoken, setToken] = useState('')


//     const User = props => (
//         <tr>
//             <td>{props.user.username}</td>
//         </tr>
//     );

//     useEffect(() => {
//         console.log(usertoken)
//         axios.post(`http://localhost:5000/login/token`, usertoken)
//             .then((res) => {
//                 setUser(res.data.user.username)
//             }
//             )
//             .catch((error) => {
//                 console.log(error);
//             })
//         console.log(props.match.params.id)
//         axios.get('http://localhost:5000/users/' + props.match.params.id)
//             .then(res => {
//                 console.log(res)
//                 setUser(res.username)
//                 setFriends(res.friends)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//         axios.get('http://localhost:5000/users/')
//             .then(res => {
//                 if (res.data.length > 0) {
//                     setUsers(res.data.map(user => user.username))
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             })

//     }, []);

//     function onChangeFriends(e) {
//         setFriends(e.target.value)
//         console.log(friends)
//     }
//     function onSubmit(e) {
//         e.preventDefault();
//         const data = {
//             friends: friends
//         }

//         axios.post(`http://localhost:5000/users/addfriend/` + props.match.params.id, data)
//             .then(res => {
//                 console.log(res.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }


//     function friendslist() {
//         return users.map(currentuser => {
//             return <User user={currentuser} key={currentuser._id} />
//         })
//     }

//     return (
//         <div>
//             <h2> My Friends </h2>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {friendslist()}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

