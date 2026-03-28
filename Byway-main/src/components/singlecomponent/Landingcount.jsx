import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

const Landingcount = () => {
  const counters = [
    { id: 1, target: 400, suffix: '+', label: 'Courses by top mentors' },
    { id: 2, target: 300, suffix: '+', label: 'Expert instructors' },
    { id: 3, target: 30, suffix: 'K+', label: 'Active students' },
    { id: 4, target: 20, suffix: 'K+', label: 'New learners this month' },
  ];

  const [counts, setCounts] = useState(counters.map(() => 0));
  const [animated, setAnimated] = useState(false);
  const counterRef = useRef(null);

  const animateCounters = useCallback(() => {
    if (animated) return;
    setAnimated(true);
    const duration = 2000;
    const incrementTime = 16;
    const totalSteps = duration / incrementTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / totalSteps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(counters.map(c => Math.floor(c.target * eased)));
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCounts(counters.map(c => c.target));
      }
    }, incrementTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) animateCounters(); }); },
      { threshold: 0.3 }
    );
    const node = counterRef.current;
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, [animateCounters]);

  return (
    <Box ref={counterRef} sx={{
      width: '100%',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      py: { xs: 4, md: 5 },
      px: { xs: 3, md: 0 },
    }}>
      <Box sx={{
        maxWidth: '1100px',
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: '24px', md: '0' },
      }}>
        {counters.map((counter, index) => (
          <Box key={counter.id} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            borderRight: { md: index < counters.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' },
          }}>
            <Typography sx={{
              fontSize: { xs: '32px', md: '40px' },
              fontWeight: 800,
              color: '#3B82F6',
              lineHeight: 1,
              letterSpacing: '-1px',
            }}>
              {counts[index]}{counter.suffix}
            </Typography>
            <Typography sx={{
              fontSize: { xs: '13px', md: '14px' },
              fontWeight: 400,
              color: '#94A3B8',
              mt: 0.5,
            }}>
              {counter.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Landingcount;
