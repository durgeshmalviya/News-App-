import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import gsap from "gsap";

export default function NewsVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://bing-video-search1.p.rapidapi.com/videos/search",
        params: {
          q: "weather news world",
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
      <Box maxWidth="lg">
        <Grid container spacing={5}>
          {videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} key={`grid-item-${index}`}>
                <Link
                  href={video.contentUrl}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={() => handleCardHover(`#card-${index}`)}
                  onMouseLeave={() => handleCardHoverOut(`#card-${index}`)}
                >
                  <Paper
                    id={`card-${index}`}
                    className="video-card"
                    sx={{ padding: "10px", textAlign: "center" }}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.name}
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
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
              </Grid>
            ))
          ) : (
            <p>Loading videos...</p>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
