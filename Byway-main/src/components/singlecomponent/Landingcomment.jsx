import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import jane from '../../Asstes/janeimg.jpg';

const reviews = [
  { name: 'Jane Doe', role: 'UI/UX Designer', text: "Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia." },
  { name: 'Mark Smith', role: 'Full Stack Developer', text: "The React course completely transformed my career. The step-by-step approach and real-world projects made everything click. I landed a new job within 3 months!" },
  { name: 'Priya Patel', role: 'Data Analyst', text: "Byway's data science track is incredibly comprehensive. From Python basics to advanced ML models — the curriculum is well-structured and the instructors are world-class." },
  { name: 'Carlos Rivera', role: 'Product Manager', text: "I've tried many online platforms, but Byway stands out for its quality and depth. The courses are practical, the community is supportive, and the certificates are recognized by employers." },
  { name: 'Aisha Johnson', role: 'Graphic Designer', text: "The Figma course on Byway completely elevated my design skills. Clear explanations, real industry examples, and excellent hands-on exercises. Highly recommend to any aspiring designer!" },
  { name: 'Tom Chen', role: 'DevOps Engineer', text: "Cloud computing courses here are excellent. The instructors clearly have real-world experience and it shows. The practical labs were especially valuable for my work." },
];

const LandingComment = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (carouselRef.current) {
        const w = carouselRef.current.clientWidth;
        if (w < 600) setCardWidth(w - 32);
        else if (w < 900) setCardWidth((w - 32) / 2);
        else setCardWidth((w - 48) / 3);
      }
    };
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        setScrollPosition(prev => {
          const max = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          return prev >= max ? 0 : prev + 1;
        });
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (carouselRef.current) carouselRef.current.scrollLeft = scrollPosition;
  }, [scrollPosition]);

  const scroll = (dir) => {
    setScrollPosition(prev => {
      const step = cardWidth + 20;
      const max = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      return dir === 'left' ? Math.max(0, prev - step) : Math.min(max, prev + step);
    });
  };

  return (
    <Box sx={{ width: '100%', background: '#F8FAFC', py: { xs: 5, md: 7 } }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <Box sx={{ width: '90%', maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: '20px', md: '26px' }, fontWeight: 700, color: '#0F172A' }}>
              What Our Students Say
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>
              Real stories from real learners
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <IconButton onClick={() => scroll('left')} sx={{
              background: '#1E293B', color: '#fff', width: 40, height: 40,
              '&:hover': { background: '#3B82F6', transform: 'scale(1.1)' }, transition: 'all 0.2s',
            }}>
              <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} />
            </IconButton>
            <IconButton onClick={() => scroll('right')} sx={{
              background: '#1E293B', color: '#fff', width: 40, height: 40,
              '&:hover': { background: '#3B82F6', transform: 'scale(1.1)' }, transition: 'all 0.2s',
            }}>
              <ArrowForwardIosIcon sx={{ fontSize: '16px' }} />
            </IconButton>
          </Box>
        </Box>

        <Box ref={carouselRef} sx={{ overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', gap: '20px', transition: 'none' }}>
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <Box key={index} sx={{
                flex: `0 0 ${cardWidth}px`,
                background: '#fff',
                borderRadius: '16px',
                p: 3,
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: '1px solid #F1F5F9',
                display: 'flex', flexDirection: 'column', gap: '12px',
                transition: 'box-shadow 0.25s',
                '&:hover': { boxShadow: '0 8px 28px rgba(59,130,246,0.12)', border: '1px solid #BFDBFE' },
              }}>
                <FormatQuoteIcon sx={{ color: '#3B82F6', fontSize: '32px' }} />
                <Typography sx={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, flex: 1 }}>
                  {review.text}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mt: 1 }}>
                  <Avatar src={jane} alt={review.name} sx={{ width: 44, height: 44, border: '2px solid #BFDBFE' }} />
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{review.name}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{review.role}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingComment;
