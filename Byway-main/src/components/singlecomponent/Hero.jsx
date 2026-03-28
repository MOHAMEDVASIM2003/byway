import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { BackgroundLines } from '../styledcomponent/BackgroundLines';
import img from '../../Asstes/image.jpg';

const Hero = () => {
  return (
    <Box sx={{
      width: '100%',
      minHeight: { xs: 'auto', md: '82vh' },
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{
        width: '100%',
        minHeight: { xs: 'auto', md: '82vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Background lines — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <BackgroundLines sx={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', zIndex: 1 }} />
        </Box>

        {/* Text content */}
        <Box sx={{
          width: { xs: '100%', md: '48%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 5, md: 8 },
          py: { xs: 5, md: 0 },
          zIndex: 2,
          background: { xs: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)', md: 'transparent' },
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box sx={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                background: '#DBEAFE',
                borderRadius: '20px',
                px: 2, py: 0.5,
              }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', letterSpacing: '0.5px' }}>
                  #1 ONLINE LEARNING PLATFORM
                </Typography>
              </Box>

              <Typography sx={{
                fontSize: { xs: '30px', sm: '38px', md: '46px' },
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.15,
                letterSpacing: '-1px',
              }}>
                Unlock Your{' '}
                <Box component="span" sx={{ color: '#3B82F6' }}>Potential</Box>{' '}
                with Byway
              </Typography>

              <Typography sx={{ fontSize: { xs: '14px', md: '16px' }, fontWeight: 400, color: '#475569', lineHeight: 1.7 }}>
                Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth — and we're here to guide you every step of the way.
              </Typography>

              <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap', mt: 1 }}>
                <Button sx={{
                  fontSize: '14px', fontWeight: 600,
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  borderRadius: '10px',
                  px: 3, py: 1.2,
                  boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(59,130,246,0.5)' },
                  transition: 'all 0.25s ease',
                }}>
                  Start Learning Now
                </Button>
                <Button variant="outlined" sx={{
                  fontSize: '14px', fontWeight: 600,
                  color: '#3B82F6',
                  borderColor: '#3B82F6',
                  borderRadius: '10px',
                  px: 3, py: 1.2,
                  '&:hover': { borderColor: '#2563EB', background: '#EFF6FF', transform: 'translateY(-2px)' },
                  transition: 'all 0.25s ease',
                }}>
                  Browse Courses
                </Button>
              </Box>

              {/* Stats row */}
              <Box sx={{ display: 'flex', gap: '24px', mt: 2, flexWrap: 'wrap' }}>
                {[
                  { value: '400+', label: 'Courses' },
                  { value: '30K+', label: 'Students' },
                  { value: '50+', label: 'Instructors' },
                ].map(({ value, label }) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{value}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Hero image */}
        <Box sx={{
          width: { xs: '100%', md: '52%' },
          height: { xs: '240px', sm: '320px', md: '82vh' },
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <motion.div
            style={{ width: '100%', height: '100%' }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          >
            <Box
              component="img"
              src={img}
              alt="Hero"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: { xs: 0, md: '0 0 0 60px' },
              }}
            />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
