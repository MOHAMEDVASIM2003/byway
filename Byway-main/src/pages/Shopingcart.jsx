import React from 'react';
import { Box } from '@mui/material';
import Userheader from '../components/wrappedcomponent/Userheader';
import Footer from '../components/wrappedcomponent/Footer';
import Carddetail from '../components/singlecomponent/Card/Carddetail';

const Shopingcart = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh', // Ensure the container takes at least the full viewport height
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '& *': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
    >
      <Userheader />
      <Box sx={{ flex: 1,py:2 }}> {/* Flexible content area */}
        <Carddetail />
      </Box>
      <Footer />
    </Box>
  );
};

export default Shopingcart;