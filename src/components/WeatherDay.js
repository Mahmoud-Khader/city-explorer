import React, { Component } from 'react'
import Weather from './weather';

export class WeatherDay extends Component {
    render() {
        return (
            <div>
         {this.state.localWeatherData.map((weatherData,index) => {
          return <Weather description={weatherData.description} date={weatherData.date} key={index} />

          
        })}
            </div>
        )
    }
}

export default WeatherDay
