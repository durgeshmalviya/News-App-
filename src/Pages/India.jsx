import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import gsap from "gsap";

export default function NewsIndia() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://bing-video-search1.p.rapidapi.com/videos/search",
        params: {
          q: "news in india today",
        },
        headers: {
          "X-RapidAPI-Key": "3e1c209175mshd280390482053d2p1aedcfjsna62d5aa47d85",
          "X-RapidAPI-Host": "bing-video-search1.p.rapidapi.com",
        },
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
    <Container
      maxWidth="xl"
      sx={{
        background: "black",
        padding: "20px",
        margin: "0px 30px 0px 0px",
      }}
    >
      <Box maxWidth="md" style={{margin:'20px 20px 20px 50px'}}>
        
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
                      style={{ width: "100%", height: "300px" }}
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
  );
}
