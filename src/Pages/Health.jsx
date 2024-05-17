import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Link,


} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function Health() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://gnews.io/api/v4/search?q=health&max=50&apikey=e8043d081e1e0753858062613188740a'
        );
        setData(response.data.articles);
        console.log(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

      
    <Carousel showArrows={true} autoPlay={true} interval={5000} infiniteLoop={true} dynamicHeight={true}>
    {data.map((article, index) => (
      <div key={index}>
        <Card style={{ display: 'flex' }}>
          <CardMedia
            component="img"
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            src={article.image}
            alt={article.title}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {article.description}
            </Typography>
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </Link>
          </CardContent>
        </Card>
      </div>
    ))}
  </Carousel>

  );
}
