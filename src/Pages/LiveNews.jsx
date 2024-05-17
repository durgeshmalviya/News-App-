import { Grid, Paper, Typography,Container,Box,Link,List,ListItem,istItemText,ListItemIcon,Card,CardContent
} from '@mui/material';
import gsap from "gsap";
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function LiveNews(){
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://bing-video-search1.p.rapidapi.com/videos/search",
        params: {
          q: "live tv",
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
return(
    <>
   
<Container maxWidth="xl" style={{ margin: '0px 0px 0px 0px', background: '#464851', }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={1}>                 
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>     
              <iframe
              position="absolute"
                width="800"
                height="510"
                src="https://abcnews.go.com/video/embed?id=abc_live11"
                allowFullScreen
                frameborder="0"
              ></iframe>
              </div> 
            </Grid>
         
          <Grid container spacing={3}>
        <Grid item xs={12} md={1}> 
        
        
        </Grid></Grid></Grid>
    </Container>

    </>
)

}