import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            <div>
            <h2>{this.props.date}  </h2> 
            <h2> {this.props.description}</h2>  
            </div>
        )
    }
}

export default Weather