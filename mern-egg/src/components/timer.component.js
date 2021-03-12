import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endtime: this.props.endtime,
            count: Math.floor((new Date(this.props.endtime).getTime()  + new Date(this.props.endtime).getDate() 
                                - new Date().getTime() - new Date().getDate())/ (1000))
        }
    }

    render() {
        const count = (this.state.count <= 0) ? 0 : this.state.count; 
        const days = Math.floor(count / 86400)
        const counttemp1 = count % 86400
        const hours = Math.floor(counttemp1 / 3600)
        const counttemp2 = counttemp1 % 3600
        const minutes = Math.floor(counttemp2 / 60)
        const seconds = Math.floor(counttemp2 % 60)

        return (
            <div>
                {days} days {hours} hours {minutes} minutes {seconds} seconds 
            </div>
        )
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({ count: this.state.count - 1 }), () => {
                if (this.state.count < 1) {
                    clearInterval(this.myInterval)
                }
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
}
