import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardMedia, Link, Container } from '@mui/material';
import gsap from 'gsap';

const GNews = () => {
  const [data, setData] = useState([]);
  const cardsRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          'https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=e8043d081e1e0753858062613188740a'
        );
        setData(response.data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.inOut',
        stagger: 0.2,
      });
    }
  }, [data]);

  const handleCardHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
      duration: 0.3,
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: 'none',
      duration: 0.3,
    });
  };

  return (
    <Container maxWidth='xl' style={{ padding: '3%',background: '#464851 ' }}>
      <Grid container spacing={3}>
        {data.map((article, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Link href={article.url} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
              <Card
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                ref={(el) => (cardsRef.current = el)}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <CardMedia
                  component="img"
                  alt="Article Image"
                  image={article.image}
                  style={{
                    padding: '10px',
                    height: '410px',
                  }}
                />
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {article.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {article.source.name}
                  </Typography>
                  <Typography variant="body2">{article.description}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GNews;
