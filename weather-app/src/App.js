import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import atmosphere from './images/atmosphere.jpg'
import clouds from './images/clouds.jpg'
import clear from './images/clear.jpg'
import def from './images/default.jpg'
import drizzle from './images/drizzle.jpg'
import Rain from './images/rain.jpg'
import snow from './images/snow.jpg'
import thunderstorm from './images/thunderstorm.jpg'

import atmosphereIcon from './icons/atmosphere.svg'
import cloudsIcon from './icons/clouds.svg'
import clearIcon from './icons/clear.svg'
import defIcon from './icons/default.svg'
import drizzleIcon from './icons/drizzle.svg'
import RainIcon from './icons/rain.svg'
import snowIcon from './icons/snow.svg'
import thunderstormIcon from './icons/thunderstorm.svg'
import searchIcon from './icons/search.svg'
import searchBlanc from './icons/searchBlanc.png'

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('')
  const [degree, setDegree] = useState('')
  const [weather, setWeather] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [cloud, setCloud] = useState('')
  const [rain, setRain] = useState('')
  const [show, setShow] = useState('right-panel')
  const [isCliked, setIsClicked] = useState(false)
  const [hidden, setHidden] = useState('search-mobile')
  const [isSearch, setIsSearch] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=01e4b5b0325a08063d7c2fabf0940e1c`;

  const today = format(new Date(), `HH:mm - EEEE, d MMM yy`);

  const handleChangeClass = () =>{
    if(!isCliked){
      setShow('right-panel-show')
      setHidden('search-mobile-hidden')
    } else{
      setShow('right-panel')
      setHidden('search-mobile')
    }
 
  }
  const handleSearchClass = () =>{
    if(!isSearch){
      setShow('right-panel')
      setHidden('search-mobile')
    } else{
      setShow('right-panel-show')
      setHidden('search-mobile_hidden')
    }
 
  }
  
  const handleCityClick = (cityName) => {
    setSearch(cityName);
    setIsSubmitted(true);
  };
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setPosts(response.data.weather);
        setName(response.data.name)
        setDegree(Math.round(response.data.main.temp - 273.15 ))
        setWeather(response.data.weather[0].main);
        setWind(response.data.wind.speed)
        setHumidity(response.data.main.humidity)
        setCloud(response.data.clouds.all)
        const rainValue = response.data.rain["1h"];
        setRain(rainValue); 
        

      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          alert('City not found')
        } else {
          /* console.log(`Error: ${err.message}`); */
          
        }
      }
    };

    

    if (isSubmitted) {
      fetchPosts();
     
      setIsSubmitted(false);
    }
   
  }, [isSubmitted, url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  
  

  function getBackgroundImage() {
    if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(weather)) {
      return `url(${atmosphere})`;
    } else if (weather === 'Clear') {
      return `url(${clear})`;
    } else if (weather === 'Clouds') {
      return `url(${clouds})`;
    } else if (weather === 'Drizzle') {
      return `url(${drizzle})`;
    } else if (weather === 'Rain') {
      return `url(${Rain})`;
    } else if (weather === 'Snow') {
      return `url(${snow})`;
    } else if (weather === 'Thunderstorm') {
      return `url(${thunderstorm})`;
    } else {
      return `url(${def})`;
    }
  }

  function getIconImage() {
    if (['Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado'].includes(weather)) {
      return `url(${atmosphereIcon})`;
    } else if (weather === 'Clouds') {
      return `url(${cloudsIcon})`;
    } else if (weather === 'Clear') {
        return `url(${clearIcon})`;
    } else if (weather === 'Drizzle' ) {
      return `url(${drizzleIcon})`;
    } else if (weather === 'Rain') {
        return `url(${RainIcon})`;
    } else if (weather === 'Snow') {
         return `url(${snowIcon})`;
    } else if (weather === 'Thunderstorm') {
      return `url(${thunderstormIcon})`;
    } else {
      return `url(${defIcon})`;
    }
  }

  return (
    <div className="App"  style={{ backgroundImage: getBackgroundImage(), minHeight:'100vh', width:'100%', backgroundSize: 'cover' }}>
    
      <main className="left-panel">
        <section>
          <nav>
            <h3>the.weather</h3>
            <img className={hidden} style={{width: "1.8rem"}} src={searchBlanc} onClick={handleChangeClass} alt="search"/>
          </nav>
          <div className="current-weather">
            <h1>{ posts.length ?  degree + '°' : '0°'}</h1>
            <div className="location-time">
              <h2>{ posts.length ?  name : 'Location'}</h2>
              <p className="today">{today}</p>
            </div>
           <div className="weather">
            <div
                  style={{
                    backgroundImage: getIconImage(),
                    backgroundSize: 'cover',
                    width: 'max(2rem,2.838vw)',
                    aspectRatio: 1
                  }}
                ></div>
            <p className="type">{ posts.length ? weather : '-'}</p>
            </div>
          </div>
        </section>

       
      </main>
      <main className={show}>
        <div className="localisation">
        <form onSubmit={handleSubmit}>
        <input
          id="search"
          type="text"
          placeholder="Search location"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsSubmitted(false);
          }}
        />
       
        <button onClick={handleSearchClass}><img  src={searchIcon} alt="search"/></button>
      </form>
          <ul>
            <li onClick={() => handleCityClick("Birmingham")}>Birmingham</li>
            <li onClick={() => handleCityClick("Manchester")}>Manchester</li>
            <li onClick={() => handleCityClick("New York")}>New York</li>
            <li onClick={() => handleCityClick("California")}>California</li>
          </ul>
        </div>
        <div className="line"></div>
        <div className="weather-details">
          
          <ul>
          <span style={{marginBottom: "1rem"}}>weather Details</span>
          
            <li>Cloudy <span>{ posts.length ? wind + ' km/h': '0 km/h'}</span></li>
            <li>Humidity<span>{ posts.length ? humidity + ' %': '0 %'}</span></li>
            <li>Wind <span>{ posts.length ? cloud + ' %': '0 %'}</span></li>
            <li>Rain <span>{ posts.length &&  rain > 0 ? rain + ' mm': '0 mm'}</span></li>
         
          </ul>
        </div>
        <div className="line"></div>
      </main>
    </div>
  );
}

export default App;