import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
 
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import './Pages/Style.css';
import ImgA from './icon.png';
import axios from 'axios';
 
function HideOnScroll(props) {
  const { children, window } = props;
  const [currentTime, setCurrentTime] = useState(new Date());
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
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
    window.location.reload()
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    
    return () => clearInterval(timerID);
  }, []);  
 
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <React.Fragment>

      <HideOnScroll {...props}>
        <AppBar className="brr" sx={{ background: 'white' }}>
          <Toolbar className='text-pink-600'>
            <IconButton
              edge='start'
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{ display: 'block', }}
            >
              <MenuIcon />
            </IconButton>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 user-select-none '>
              <Link to="/" ><img className='w-30 h-10' src={ImgA} /></Link>
            </div>
            <div className='hidden sm:block'>
              {weatherData && (
                <Link to='/Weather'>         
                <div className='justify-center item-center content-center flex flex-wrap gap-2'>                 
                    {weatherData.name && `${weatherData.name}`}&nbsp;
                    {weatherData.main && Math.round(weatherData.main.temp - 273.15)}&deg;
                    <img className='mx-auto w-5 h-5 rounded-full bg-red-100' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}/>{formattedTime}
                </div> </Link>
              )}
            </div>
          </Toolbar>
          <Drawer
            open={menuOpen}
            onClose={closeMenu}
            anchor="left"
            PaperProps={{
              sx: {
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                color: 'red',

              },
            }}
          >

            <List style={{
              margin: '20px 10px 40px 20px'
            }} onClick={closeMenu}>
              <CloseIcon onClose={closeMenu} style={{ cursor: 'pointer', fontSize: '42px', float: 'right', padding: 'px' }} />
              <div className='max-w-screen-xl flex flex-wrap justify-between mx-auto p-4 user-select-none '>
              <Link to="/" ><img className='w-30 h-10' src={ImgA} /></Link>
            </div>
           <br/>
              <ListItem
                className='card1'
                button
                component={RouterLink}
                to="/Usa"
                onClick={closeMenu}

              ><ListItemText><Typography variant='h4'>Top Headlines</Typography></ListItemText>
              </ListItem>
              <ListItem
                className='card2'
                button
                component={RouterLink}
                to="/WNews"
                onClick={closeMenu}

              >
                <ListItemText><Typography variant='h4'>Weather News</Typography></ListItemText>

              </ListItem>
              <ListItem
                button
                className='card1'
                component={RouterLink}
                to="/Sports"
                onClick={closeMenu}

              >
                <ListItemText><Typography variant='h4'><span
                >Sports News & Score</span></Typography></ListItemText>
              </ListItem>
              <ListItem
                button
                className='card1'
                component={RouterLink}
                to="/India"
                onClick={closeMenu}

              >
                <ListItemText><Typography variant='h4'><span
                >India News</span></Typography></ListItemText>
              </ListItem> <ListItem
                button
                className='card1'
                component={RouterLink}
                to="/Live"
                onClick={closeMenu}
              >
                <ListItemText><Typography variant='h4'><span
                >Live News</span></Typography></ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
      </Container>
    </React.Fragment>
  );
}