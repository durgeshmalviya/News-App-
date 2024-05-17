import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        fontSize: '14px',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      &copy; {new Date().getFullYear()} The Head-Lines-Today
    </Box>
  );
};

export default Footer;
