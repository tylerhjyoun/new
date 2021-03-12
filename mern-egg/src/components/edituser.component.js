import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import auth from './auth'
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"


export default class EditUser extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this)


        this.state = {
            username: '',
            password: '',
            profilepicture: 0,

            user: [],
            id: ''
        }
    }
    onChangeUsername(e) {
        console.log(e.target.value)
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        }
        )
    }

    onChangeProfilePicture(e) {
        this.setState({
            profilepicture: e.target.value
        })
    }

    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(res => {
                        this.setState({
                            user: res.data,
                            profilepicture: res.data.profilepicture
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




    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            id: this.state.id,
            profilepicture: this.state.profilepicture
        }

        this.setState({
            username: '',
            password: '',
            profilepicture: 0,
            user: [],
            id: ''
        })

        axios.post(`http://localhost:5000/users/update/` + user.id, user)
            .then((res) => console.log(res.data), alert("Changes Saved!"))
            .catch((error) => {
                console.log(error);
            })
        

    }



    render() {
        return (
            <div className="bg-light">
                <Link to="/home/" className="edit"> Back to home </Link>

                <h2>Edit User</h2>
                <form onSubmit={this.onSubmit}>
                    <b>Current Username: {this.state.user.username}</b>
                    <div>
                        <label>New Username: </label>
                        <input type="text" required value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div>
                        <label>New Password: </label>
                        <input type="text" required value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div>
                        <b> {this.state.profilepicture} </b>
                            <b> Change Profile Picture </b>
                            <select required onChange={this.onChangeProfilePicture}
                            >
                                <option value= "1"> 1 </option>
                                <option value= "2"> 2 </option>
                                <option value= "3"> 3 </option>

                            </select>
                            <div> <b>1</b>
                                <img className="ListIcon" src={egg_pic}
                                    alt="ListIcon" width="40" height="40">
                                </img>
                            </div>
                            <div> <b>2</b>
                                <img className="ListIcon" src={man_pic}
                                    alt="ListIcon" width="40" height="40">
                                </img>
                            </div>
                            <div> <b>3</b>
                                <img className="ListIcon" src={beard_pic}
                                    alt="ListIcon" width="40" height="40">
                                </img>
                            </div>
                        </div>
                    <input type="submit" value="Save Changes" />

                </form>
            </div>
        )
    }
}