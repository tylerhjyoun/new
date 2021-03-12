import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';
import auth from "./auth"
import axios from 'axios'
import Timer from "./timer.component";
import { withRouter } from 'react-router-dom'
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"
import woman_pic from "../profilepictures/woman_pic.png"

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilepicture: 0,
            id: ''
        }
    }

    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                console.log(this.state.id)
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(res => {
                        this.setState({
                            profilepicture: res.data.profilepicture
                        })
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <nav className="navbar navbar-custom navbar-expand-lg fixed-top">
                <div class="container-fluid">
                    <img className = "egg" src="http://pixelartmaker.com/art/4b4b065c35b8482.png"
                    alt = "Egg" width="20" height="30"
                    ></img>
                    <Link to="/home" className="navbar-brand">Egg Timer</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/home/groups" className="nav-link"> Groups </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/events" className="nav-link"> Events </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/user/friends/addfollowing" className="nav-link"> Users </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/user/friends/showfollowing" className="nav-link"> Friends </Link>
                            </li>
                        </ul>
                        
                        <ul class="nav navbar-nav navbar-right">
                            <button className = "logout" onClick={() => {
                                auth.logout(() => {
                                console.log(this.props.history)
                                this.props.history.push("/")
                                })
                            }}> Logout </button>
                            <img className = "icon" src = {(this.state.profilepicture === 1 ? man_pic : this.state.profilepicture === 2 ? beard_pic : this.state.profilepicture === 3 ? woman_pic : null)}
                                alt = "Icon" width="50" height="50"
                            ></img>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar)