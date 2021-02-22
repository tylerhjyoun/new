import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timer from "./timer.component";

export default class ShowUsers extends Component {
    render(){
        return (
            <div>
               <p> Home </p> 
               <Timer count="3"/>
             </div>
        );
    }
}