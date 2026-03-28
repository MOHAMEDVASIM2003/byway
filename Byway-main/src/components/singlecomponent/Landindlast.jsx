import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import img1 from '../../Asstes/ladingbottom1.jpg';
import img2 from '../../Asstes/landingbottom2.jpg';

const Section = ({ image, imageLeft, title, text, buttonLabel }) => (
  <Box sx={{
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', md: imageLeft ? 'row' : 'row-reverse' },
    alignItems: 'center',
    gap: { xs: '24px', md: '48px' },
    py: { xs: 4, md: 6 },
  }}>
    <Box sx={{
      width: { xs: '100%', md: '45%' },
      height: { xs: '220px', sm: '280px', md: '360px' },
      borderRadius: '20px',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <Box component="img" src={image}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.04)' } }}
      />
    </Box>
    <Box sx={{ width: { xs: '100%', md: '55%' }, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography sx={{ fontSize: { xs: '22px', md: '30px' }, fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: 400, color: '#475569', lineHeight: 1.7 }}>
        {text}
      </Typography>
      <Button sx={{
        fontSize: '14px', fontWeight: 600, color: '#fff',
        background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
        borderRadius: '10px', width: 'fit-content', px: 3, py: 1.2,
        boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
        '&:hover': { background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', transform: 'translateY(-2px)' },
        transition: 'all 0.25s ease',
      }}>
        {buttonLabel}
      </Button>
    </Box>
  </Box>
);

const Landindlast = () => (
  <Box sx={{ width: '90%', mx: 'auto', py: { xs: 2, md: 4 } }}>
    <Section
      image={img2}
      imageLeft={true}
      title="Become an Instructor"
      text="Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love — reach learners globally and build a rewarding career."
      buttonLabel="Start Your Instructor Journey"
    />
    <Box sx={{ borderTop: '1px solid #F1F5F9', mx: { xs: 0, md: 4 } }} />
    <Section
      image={img1}
      imageLeft={false}
      title="Transform Your Life Through Education"
      text="Learners around the world are launching new careers, advancing in their fields, and enriching their lives. Join thousands of students already learning on Byway today."
      buttonLabel="Explore Courses"
    />
  </Box>
);

export default Landindlast;
