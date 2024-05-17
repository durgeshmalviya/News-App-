import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Container,Box,Link,List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import gsap from "gsap";
import Scores from './Score';
export default function Sports() {
  const [news, setNews] = useState(null);
const [scores, setScores] = useState(null);
const [videos, setVideos] = useState([]);
const [data, setData] = useState([]);

const fetchData = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.cricapi.com/v1/cricScore?apikey=cea8bc5c-5e54-408d-ae03-2859e1695a9d',
  };

  try {
    const response = await axios.request(options);
    setData(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData();
}, []);



  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'POST',
        url: 'https://yh-finance.p.rapidapi.com/news/v2/list',
        params: {
          region: 'US',
          snippetCount: '28'
        },
        headers: {
          'content-type': 'text/plain',
          'X-RapidAPI-Key': '3e1c209175mshd280390482053d2p1aedcfjsna62d5aa47d85',
          'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
        },
        data: '"Pass in the value of uuids field returned right in this endpoint to load the next page, or leave empty to load first page"'
      };

      try {
        const response = await axios.request(options);
        setVideos(response.data.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

    return (
      <Container maxWidth="xl" style={{margin:'20px 0px 0px 0px',background:'#464851'}}>
        <Typography variant='h1' style={{color:'lightgreen',}}>Sports News</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} style={{ padding: '', minHeight: '500px',background:'#6B7875',color:'lightcyan',padding:'' }}>

              <Typography variant="h4" align='center'>Live Scores</Typography>
              <Scores/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
          <Container
      maxWidth="xl"
      sx={{
        background: "black",
        padding: "20px",
        margin: "0px 30px 0px 0px",
      }}
    >
      <Box maxWidth="xl" style={{margin:''}}>
        
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
         
                <Link
                  href={video.contentUrl}
                  style={{ textDecoration: "none",}}
                  onMouseEnter={() => handleCardHover(`#card-${index}`)}
                  onMouseLeave={() => handleCardHoverOut(`#card-${index}`)}
                >
                  <Paper
                    id={`card-${index}`}
                    className="video-card"
                    sx={{ padding: "10px", textAlign: "center",marginBottom:'20px',background:'gray',color:'white'  }}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.name}
                      loading="lazy"
                      style={{ width: "1  00%", height: "300px" }}
                    />
                    <div className="video-details">
                      <Typography variant="subtitle1">{video.name}</Typography>
                      <Typography variant="body2">{video.description}</Typography>
                    </div>
                    <Typography variant="button" sx={{ marginTop: "10px" }}>
                      Watch Video
                    </Typography>
                  </Paper>
                </Link>
              
            ))
          ) : (
            <p>Loading videos...</p>
          )}
  
      </Box>
    </Container>
            <br/>
            <Grid container spacing={3}>
              
              {news && news.map((article, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Paper elevation={3}>
                    <img
                      src={article.mainMedia[0].gallery.url}
                      alt={article.mainMedia[0].gallery.alt}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography>{article.categoryLabel}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

