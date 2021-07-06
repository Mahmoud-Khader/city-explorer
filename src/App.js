import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather'
import ErrorMsg from './components/ErrorMsg';


export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapSearch: '',
      show: false,
      cityData: {},
      localWeatherData: [],
      error:'',
      alert:false
    }
  }
  explore = async (e) => {
    e.preventDefault();




    await this.setState({
      mapSearch: e.target.city.value
    })
    console.log(e.target.city.value)

try{

  let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_lOCATIONIQ_KEY}&q=${this.state.mapSearch}&format=json`
  
  let resData = await axios.get(url);
  
  // console.log(resData)
  // console.log(resData.data)
  // console.log(resData.data[0])
  
  let localUrl = `${process.env.REACT_APP_EXPRESS_SERVER}/weather?lat=31.95&lon=35.91&searchQuery=${this.state.mapSearch}`;
  let localReq = await axios.get(localUrl);

  this.setState({
    show: true,
    cityData: resData.data[0],
    localWeatherData: localReq.data,
    alert:false
  })
}
catch(err){
  this.setState({
    error: `${err.message}: ${err.response.data.error}`,
      alert:true
  })
}


    
  }

  render() {
    return (
      <div>
         <ErrorMsg  alert={this.state.alert} error={this.state.error}/>
        
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

      </div>



    )
  }

}

export default App
