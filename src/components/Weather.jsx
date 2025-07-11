import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search-icon.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import mist_icon from '../assets/mist.png'
import snow_icon from '../assets/snow.png'
import rain_icon from '../assets/rain.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind1.png'


const Weather = () => {

    const inputRef = useRef()
    const [weatherData,setWeatherData]=useState(false)
    const allIcons={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": mist_icon,
        "04n": mist_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10n": rain_icon,
        "10d": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        
    }

    const search = async (city) =>{
        let api_key ="8156a8b1237764ddcf8b0ba72649ef0d"
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

            const response =await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetch weather data:",error);
        }
    };

    useEffect(()=>{
        search("africa");
    }, []); // intentional

    return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>

        <div className='weather-data'>
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}

    </div>
  )
}

export default Weather