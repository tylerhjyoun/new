import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../Users.css';
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"
import woman_pic from "../profilepictures/woman_pic.png"

const User = props => (
    <tr>
        <td>
            <img className="ListIcon" src={(props.user.profilepicture === 1 ? man_pic : props.user.profilepicture === 2 ? beard_pic : props.user.profilepicture === 3 ? woman_pic : null)}
                alt="Icon" width="40" height="40"
            >
            </img>
            {props.user.name}</td>
        <td><Link to={'/home/users/' + props.user._id}>{props.user.username}</Link></td>
        <td>
            <button className="Follow" href="#" onClick={() => {
                props.addFollowing(props.user._id)
            }
            }>Follow</button>
        </td>
    </tr>
);


export default class AddFollowing extends Component {
    constructor(props) {
        super(props)
        this.addFollowing = this.addFollowing.bind(this)
        this.onChangeInput = this.onChangeInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            following: [],
            users: [],
            profilepicture: 0,
            query: ''
        }
    }

    onChangeInput(e) {
        this.setState({
            query: e.target.value
        })
    }


    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(response => {
                        this.setState({ following: response.data.following })
                        let user = localStorage.getItem('data');
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

    onSubmit(e) {
        e.preventDefault();


        if ((this.state.users.map(user => user.username).filter(el => el === this.state.query).length !== 0)) {
            auth.login(() => {
                this.props.history.push('/home/users/' + this.state.users.filter(el => el.username === this.state.query)[0]._id)
            })
            console.log("ok")
        }

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
                <h2>Search Users </h2>
                <form onSubmit={this.onSubmit}> <input
                    onChange={this.onChangeInput}
                /></form>

                <h6> Follow Another User! </h6>
                <table className="table">
                    <thead className="thead-custom">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th></th>
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
