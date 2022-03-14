import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Converter from './Converter';

const Weather = () => {

    const [ weather, setweather ] = useState({});
    const [converter, setConverter] = useState(0)
    const [isFh, setIsFh] = useState (true)

    useEffect(() => {
        const handleError= () => {
          }
        const success = position => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4d21cca75053d2f7b78487affbc5aca`)
           .then (res =>{
            setweather(res.data);
            setConverter(res.data.main.temp-273.15);
           }
           )   
        }

        navigator.geolocation.getCurrentPosition(success,handleError)
      },[])
    const convertTemp = () => {
        if (isFh){ 
            setConverter(converter * 5/9 + 32)
            setIsFh(false)
        } else {
            setConverter(converter -32 *5/9 )
            setIsFh(true)
        }
    

    }


    return (
        <div className='card'>
      <h1 className='tittle'>Weather App</h1>
      <h4 className='subtittle'>{weather.name} {weather.sys?.country}</h4> <br/>
      <h3 className='description'>"{weather.weather?.[0].description}"</h3> <br/>
      <img className='Icon' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
      <p>{converter} <span>{isFh ? ' °C' : ' °F'} </span> </p>
      <ul>
      <h2 className='text'>Wind speed: <span>{weather.wind?.speed} m/s </span></h2> <br/>
      <h2 >Clouds: <span>{weather.clouds?.all}%  </span></h2><br/>
      <h2 >Pressure: <span>{weather.main?.pressure} mb </span> </h2> <br/>
      </ul>
      <button onClick={convertTemp}><b>{isFh ? ' °F' : ' °C'} </b></button>

        </div>
    );
};

export default Weather;