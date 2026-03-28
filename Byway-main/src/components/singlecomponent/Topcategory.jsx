import React, { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';

const categoryData = [
  { name: 'Web Development', count: 45, color: '#DBEAFE', icon: '💻' },
  { name: 'Data Science', count: 32, color: '#D1FAE5', icon: '📊' },
  { name: 'UI/UX Design', count: 28, color: '#FEF3C7', icon: '🎨' },
  { name: 'Mobile Development', count: 24, color: '#FCE7F3', icon: '📱' },
  { name: 'Cybersecurity', count: 19, color: '#EDE9FE', icon: '🔐' },
  { name: 'Cloud Computing', count: 22, color: '#CFFAFE', icon: '☁️' },
  { name: 'Machine Learning', count: 35, color: '#FFF7ED', icon: '🤖' },
  { name: 'Business', count: 41, color: '#F0FDF4', icon: '💼' },
];

const Topcategory = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? categoryData : categoryData.slice(0, 4);

  return (
    <Box sx={{ width: '90%', mx: 'auto', py: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '26px' }, fontWeight: 700, color: '#0F172A' }}>
            Top Categories
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>
            Explore our most popular learning paths
          </Typography>
        </Box>
        <Typography
          onClick={() => setShowAll(p => !p)}
          sx={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6', cursor: 'pointer', '&:hover': { color: '#2563EB', textDecoration: 'underline' } }}
        >
          {showAll ? 'See Less' : 'See All'}
        </Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: '12px', md: '20px' },
      }}>
        {displayed.map((cat, index) => (
          <Card key={index} sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '10px', padding: { xs: '16px', md: '20px' },
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #F1F5F9',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #BFDBFE',
            },
          }}>
            <Box sx={{
              width: { xs: '56px', md: '68px' }, height: { xs: '56px', md: '68px' },
              borderRadius: '16px',
              background: cat.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: { xs: '24px', md: '28px' },
            }}>
              {cat.icon}
            </Box>
            <Typography sx={{ fontSize: { xs: '13px', md: '15px' }, fontWeight: 600, color: '#0F172A', textAlign: 'center' }}>
              {cat.name}
            </Typography>
            <Typography sx={{
              fontSize: '12px', fontWeight: 500, color: '#fff',
              background: '#3B82F6', borderRadius: '20px', px: 1.5, py: 0.3,
            }}>
              {cat.count} courses
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Topcategory;
