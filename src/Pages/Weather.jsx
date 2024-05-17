import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import TypeWriterEffect from 'react-typewriter-effect';

gsap.registerPlugin(CSSPlugin);

const WNews = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const fetchUserLocation = async () => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=73e0ebd16c8baf8838b2af42e24723cb`);
            setUserLocation(response.data.name);
          } catch (error) {
            console.error('Error fetching user location:', error);
          }
        });
      } else {
        console.error('Geolocation is not available in this browser.');
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const fetchData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=73e0ebd16c8baf8838b2af42e24723cb`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchData(userLocation);
    }
  }, [userLocation]);

  const handleSearch = () => {
    fetchData(searchLocation);
  };
  const getImageUrl = (weatherData) => {

    if (weatherData) {
      const weatherCondition = weatherData.weather[0].main;
      if (weatherCondition === 'Clear') {
        return 'https://static.toiimg.com/thumb/msid-66084423,width-550,height-433/66084423.jpg';
      } else if (weatherCondition === 'Clouds') {
        return 'https://www.ile-madere.com/wp-content/uploads/2023/09/00f4c3d55e1780ef2678d85382ab5937.jpg';
      } else if (weatherCondition === 'Rain') {
        return 'https://img.freepik.com/premium-photo/child-autumn-rain_566707-7825.jpg';
      }

    }

    return 'https://openweathermap.org/themes/openweathermap/assets/img/autumn_banner_main_page.jpg';
  };
  const [isHovered, setIsHovered] = useState(false);


  const typographyStyle = {
    width: "100%",
    height: "390px",
    marginTop: "10px",
    transition: "transform 0.2s",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    borderRadius:'10px 90px 10px 10px'
  };

  useEffect(() => {
    if (weatherData) {
      // Create a GSAP timeline for the animation
      const timeline = gsap.timeline();
      
      // Define the animation
      timeline.to('.unblur-content', {
        filter: 'blur(0px)', // Remove the blur
        duration: 1, // Duration of the animation in seconds
      });
    }
  }, [weatherData]);


  const handleHover = () => {
    gsap.to('.unblur-content', {
      filter: 'blur(5px)', // Increase the blur on hover
      duration: 0.5, // Shorter duration for the hover effect
      ease: 'power4.out',
    });
  };

  const handleMouseLeave = () => {
    animateCardBlur(); // Restore the original blur after mouse leaves
  };

  function animateCardBlur() {
    gsap.to('.unblur-content', {
      filter: 'blur(0px)', // Set the initial blur to 0px
      duration: 2, // Duration of 2 seconds
      ease: 'power4.out', // Easing function
    });
  }



  return (

    <Container maxWidth="xl" style={{ backgroundColor: 'black', color: 'white',marginTop:'20px' }}>
      <Box sx={{
        padding: '20px',
        backgroundColor: '#0f2027',
        borderRadius:'0px 0px 90px 0px'
      }}>
        <TextField
          label="Search Location"
          variant="outlined"
          fullWidth
          color="success"
          background=""
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          inputProps={{ style: { color: 'white', background: '#2c5364' } }}
          InputLabelProps={{ style: { color: 'white', fontStyle: 'oblique', fontVariant: 'diagonal-fractions' } }}
        /><br /><br />
        <Button variant="contained" color="primary" fullWidth onClick={handleSearch}
        style={{borderRadius:'0px 0px 90px 0px'}}>Search</Button>
      </Box>
      {weatherData && (
        <Card style={{ background: 'black', color: 'white', }}>
        <div style={{ position: 'relative' }} className="unblur-content">
         
            <img
              src={getImageUrl(weatherData)}
              alt="Weather Background"
              style={typographyStyle}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)',
                color: 'white',
                textAlign: 'center',
                fontSize: '24px',
               
              }}
            >
          <TypeWriterEffect
  startDelay={1000}
  cursorColor="white"
  text={`Weather in ${weatherData.name}, ${weatherData.sys.country}`}
  textStyle={{ fontSize: '24px' }}

  loop={true} 
  cursor={null} 
/>
</div>        
</div>
<CardContent >
            <Typography variant="h5" component="div" >
              Weather in {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <div style={{ background: 'black', color: 'white' }} >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                style={{ width: '50px', height: '50px', }}
              />
              <TypeWriterEffect
                startDelay={1000} 
                cursorColor="white" 
                text={`${weatherData.weather[0].description}`}
                textStyle={{ fontSize: '24px' }}
              />
              <Typography variant="body2" >
               
              </Typography>
            </div>
            <Typography variant="body2" >
              Base: {weatherData.base}
            </Typography>
            <Typography variant="body2" >
              Clouds: {weatherData.clouds.all}%
            </Typography>
            <Typography variant="body2" >
              Coord: Lat {weatherData.coord.lat}, Lon {weatherData.coord.lon}
            </Typography>
            <Typography variant="body2" >
              Date/Time: {new Date(weatherData.dt * 1000).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              ID: {weatherData.id}
            </Typography>
            <Typography variant="body2" >
              Main:
              
              <ul>
                <li>Feels Like: {weatherData.main.feels_like} &#8451;</li>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Pressure: {weatherData.main.pressure} hPa</li>
                <li>Temperature: {weatherData.main.temp} &#8451;</li>
                <li>Max Temperature: {weatherData.main.temp_max} &#8451;</li>
                <li>Min Temperature: {weatherData.main.temp_min} &#8451;</li>
              </ul>
            </Typography>
            <Typography variant="body2" >
              Name: {weatherData.name}
            </Typography>
            <Typography variant="body2">
              Sys:
              <ul>
                <li>Type: {weatherData.sys.type}</li>
                <li>ID: {weatherData.sys.id}</li>
                <li>Country: {weatherData.sys.country}</li>
                <li>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleString()}</li>
                <li>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleString()}</li>
              </ul>
            </Typography>
            <Typography variant="body2" >
              Timezone: {weatherData.timezone}
            </Typography>
            <Typography variant="body2">
              Visibility: {weatherData.visibility} meters
            </Typography>
            <Typography variant="body2" >
              Wind:
              <ul>
                <li>Degree: {weatherData.wind.deg}°</li>
                <li>Gust: {weatherData.wind.gust}</li>
                <li>Speed: {weatherData.wind.speed} m/s</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>

  );
};

export default WNews;



/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Link,
  Container,
  TextField,
  Button,
} from '@mui/material';

const WNews = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const fetchUserLocation = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json?token=49c19e795a6bb2');
      setUserLocation(response.data.city);
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const fetchData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=73e0ebd16c8baf8838b2af42e24723cb`
      );
      setWeatherData(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchData(userLocation);
    }
  }, [userLocation]);

  const handleSearch = () => {
    fetchData(searchLocation);
  };

  return (
    <Container maxWidth="lg">
      <Container maxWidth='md' style={{ background: 'white', padding: '10%' }}>
        <TextField
          label="Search Location"
          variant="outlined"
          fullWidth
          color='success'
          background=''
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Container>
      {weatherData && (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Weather in {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Base: {weatherData.base}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clouds: {weatherData.clouds.all}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coord: Lat {weatherData.coord.lat}, Lon {weatherData.coord.lon}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date/Time: {new Date(weatherData.dt * 1000).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {weatherData.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Main:
              <ul>
                <li>Feels Like: {weatherData.main.feels_like} &#8451;</li>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Pressure: {weatherData.main.pressure} hPa</li>
                <li>Temperature: {weatherData.main.temp} &#8451;</li>
                <li>Max Temperature: {weatherData.main.temp_max} &#8451;</li>
                <li>Min Temperature: {weatherData.main.temp_min} &#8451;</li>
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Name: {weatherData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sys:
              <ul>
                <li>Type: {weatherData.sys.type}</li>
                <li>ID: {weatherData.sys.id}</li>
                <li>Country: {weatherData.sys.country}</li>
                <li>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleString()}</li>
                <li>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleString()}</li>
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timezone: {weatherData.timezone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visibility: {weatherData.visibility} meters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Weather:
              <ul>
                {weatherData.weather.map((weather, index) => (
                  <li key={index}>
                    {weather.description} ({weather.main})
                  </li>
                ))}
              </ul>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wind:
              <ul>
                <li>Degree: {weatherData.wind.deg}°</li>
                <li>Gust: {weatherData.wind.gust}</li>
                <li>Speed: {weatherData.wind.speed} m/s</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WNews;*/
