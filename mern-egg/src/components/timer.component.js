import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endtime: this.props.endtime,
            count: Math.floor((new Date(this.props.endtime).getTime() - new Date().getTime()) / (1000))
        }
    }

    render() {
        const { count } = this.state
        const hours = Math.floor(count / 3600)
        const counttemp = count % 3600
        const minutes = Math.floor(counttemp / 60)
        const seconds = Math.floor(counttemp % 60)

        return (
            <div>
                {hours}:{minutes}:{seconds}
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

