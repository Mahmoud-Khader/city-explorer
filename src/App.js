import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather'
import ErrorMsg from './components/ErrorMsg';
import Movies from "./components/Movies";

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSearch: '',
      lat: '',
      lon: '',
      show: false,
      cityData: {},
      localWeatherData: [],
      error: '',
      alert: false,
      moviesData: []
    }
  }
  explore = async (e) => {
    e.preventDefault();




    await this.setState({
      mapSearch: e.target.city.value
    })
    console.log(e.target.city.value)

    try {

      let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_lOCATIONIQ_KEY}&q=${this.state.mapSearch}&format=json`

      let resData = await axios.get(url);

      let lat = resData.data[0].lat;
      let lon = resData.data[0].lon;
      // console.log(resData)
      // console.log(resData.data)
      // console.log(resData.data[0])

      let localUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/weather?lat=${lat}&lon=${lon}.91&searchQuery=${this.state.mapSearch}`;
      let localReq = await axios.get(localUrl);

      // let movielocalUrl = `http://localhost:3001/movies?searchQuery=amman`;
      // let movielocalUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/movies?city=${this.state.mapSearch}`;
      let movielocalUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/movies?searchQuery=${this.state.mapSearch}`;
      let movielocalReq = await axios.get(movielocalUrl);
      
      console.log(movielocalUrl+'hello')


      this.setState({
        show: true,
        cityData: resData.data[0],
        localWeatherData: localReq.data,
        alert: false,
        moviesData: movielocalReq.data,
        lat: resData.data[0].lat,
        lon: resData.data[0].lon

      })
      console.log(this.state.moviesData+'  the moviesData')
    }
    catch (err) {
      this.setState({
        error: `${err.message}: ${err.response.data.error}`,
        alert: true
      })
    }



  }

  render() {
    return (
      <div>
        <ErrorMsg alert={this.state.alert} error={this.state.error} />

        <h1>City Explorer</h1>
        <form onSubmit={this.explore}>
          <input type='text' placeholder='Enter The City Name' name='city' />
          <input type='submit' value='Explore' />

        </form>

        <p>City Name : {this.state.cityData.display_name} , Latitude : {this.state.cityData.lat} , longitude : {this.state.cityData.lon}</p>

        {this.state.show &&
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_lOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='' />
        }

        {this.state.localWeatherData.map(weatherData => {
          return <Weather description={weatherData.description} date={weatherData.date} />

          
        })}
        <Movies moviesData={this.state.moviesData} key='idx'/>

      </div>



    )
  }

}

export default App
