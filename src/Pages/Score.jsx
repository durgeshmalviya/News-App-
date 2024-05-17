import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container,  Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    CardHeader,} from '@mui/material';

export default function Scores() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.cricapi.com/v1/cricScore?apikey=baa01d87-92f9-491f-b15b-91b919986811',
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

  return (
    <Container maxWidth="xl" style={{}}>         
        {data && data.length > 0 ? (
          data.map((score, index) => (
            <Card key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center',textAlign:'center' }}>
               <Grid container spacing={0}>
              &nbsp; &nbsp; <Typography align='center' variant='overline'> {score.status}<br/>
            {score.matchType}</Typography>
              <CardHeader
                avatar={
                  <Avatar src={score.t1img} alt={score.t1} style={{ width: '30px', height: '30px' }} />
                }
                title={score.t1}
                subheader={`Score: ${score.t1s}`}
              />   
            <CardHeader
              avatar={
                <Avatar src={score.t2img} alt={score.t2} style={{ width: '30px', height: '30px' }} />
              }
              title={score.t2}
              subheader={`Score: ${score.t2s}`}
            />            
            </Grid>         
           
            </Card>
          ))
        ) : (
          <p>Loading scores...</p>
        )}
   
    </Container>
  );
}
