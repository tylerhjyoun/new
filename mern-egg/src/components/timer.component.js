import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            count: this.props.count
        }
    }

 render()   {
     const {count} = this.state
     return (
         <div>
            <h1> Test timer: {count} </h1>
         </div>
     )
 }

 componentDidMount(){
     this.myInterval = setInterval(()=> {
        this.setState(prevState => ({count: this.state.count - 1}), ()=>{
            if(this.state.count <1){
                clearInterval(this.myInterval)
            }
        })
     }, 1000)
 }

 componentWillUnmount(){
     clearInterval(this.myInterval)
 }
}

