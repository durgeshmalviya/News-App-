import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Link,
  Container,

  Box,
} from '@mui/material';
import Review from './Review';
import './Style.css'

import Health from './Health';
import gsap from "gsap";
const News1 = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    const getData1 = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=country=us&israel&lang=en&api-key=j9ChuhP6QhQa5rcjdYUexoS5M6JYGN2P'
        );
        setData1(response.data.response.docs);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data1:', error);
      }
    };

    getData1();
  }, []);

  useEffect(() => {

    const getData2 = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=russia&ukrain&api-key=j9ChuhP6QhQa5rcjdYUexoS5M6JYGN2P&max=150'
        );
        setData2(response.data.response.docs);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data2:', error);
      }
    };

    getData2();
  }, []);


  useEffect(() => {

    const getData3 = async () => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=top+headlines&api-key=j9ChuhP6QhQa5rcjdYUexoS5M6JYGN2P&max=150'
        );
        setData3(response.data.response.docs);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data2:', error);
      }
    };

    getData3();
  }, []);
  const handleCardHover = (card) => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
    });
  };

  const handleCardHoverOut = (card) => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
    });
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
  };


  return (
    <> <Box maxWidth='xl' style={{ marginTop: '20px', color: 'red', background: '#fdfdfd' }}><marquee>
      {data1.map((article, index) => (
        <Link href={article.web_url} key={index} target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          <Typography variant="h6" style={{ color: 'red' }}>{article.headline.main}</Typography>
        </Link>

      ))}
    </marquee></Box>
      <Container maxWidth="xl" sx={{ background: '#fdfdfd' }} className=''>
        <Container maxWidth='lg' component='div' className='shadow-lg'><Review /></Container>
        <Container maxWidth='xl' style={{ padding: '10px', background: '#fdfdfd' }}>
          <Grid container spacing={2}>
            {data1.map((article, index) => (
              <Grid item xs={12} sm={12} key={index}>
                <Link href={article.web_url} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}

                >
                  <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {article.multimedia.length > 0 && (
                      <CardMedia className='card3 '
                        component="img"
                        alt="Article Image"
                        image={`https://www.nytimes.com/${article.multimedia[0].url}`}
                        style={{
                          padding: '10px',
                          height: '410px',
                        }}
                      />
                    )}
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {article.headline.main}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {article.source}
                      </Typography>
                      <Typography variant="body2">
                        {article.abstract}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Health />
        <Container maxWidth='lg' style={{ padding: '10px', background: '#fdfdfd' }}>
          <Grid container spacing={2}>
            {data2.map((article, index) => (
              <Grid item xs={12} sm={12} key={index}>
                <Link href={article.web_url} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
                  <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {article.multimedia.length > 0 && (
                      <CardMedia
                        component="img"
                        alt="Article Image"
                        image={`https://www.nytimes.com/${article.multimedia[0].url}`}
                        style={{
                          padding: '10px',
                          height: '410px',
                        }}
                      />
                    )}
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {article.headline.main}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {article.source}
                      </Typography>
                      <Typography variant="body2">
                        {article.abstract}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>

    </>
  );
};

export default News1;
