import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Rating, Avatar, Chip } from '@mui/material';
import axios from 'axios';

const Topinstructor = () => {
  const [topinstructor, setInstructor] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/instructor/allinstructor')
      .then((res) => {
        const data = res.data;
        const filled = [];
        while (filled.length < 10) filled.push(...data);
        setInstructor(filled.slice(0, 10));
      })
      .catch((err) => console.error(err));
  }, []);

  const displayed = topinstructor.slice(0, showAll ? 10 : 4);

  return (
    <Box sx={{ width: '90%', mx: 'auto', py: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '26px' }, fontWeight: 700, color: '#0F172A' }}>
            Top Instructors
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>
            Learn from industry-leading experts
          </Typography>
        </Box>
        {!showAll && (
          <Typography
            onClick={() => setShowAll(true)}
            sx={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6', cursor: 'pointer', '&:hover': { color: '#2563EB', textDecoration: 'underline' } }}
          >
            See All
          </Typography>
        )}
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { xs: '16px', md: '20px' },
      }}>
        {displayed.map((data, index) => (
          <Card key={index} sx={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #F1F5F9',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            pb: 2,
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
              border: '1px solid #BFDBFE',
            },
          }} elevation={0}>
            {/* Banner */}
            <Box sx={{
              width: '100%', height: '80px',
              background: `linear-gradient(135deg, #${['3B82F6', '22C55E', 'F59E0B', 'EF4444', '8B5CF6', '06B6D4', 'EC4899', '10B981'][index % 8]}44 0%, #${['2563EB', '16A34A', 'D97706', 'DC2626', '7C3AED', '0891B2', 'DB2777', '059669'][index % 8]}22 100%)`,
              position: 'relative',
            }} />

            {/* Avatar overlapping banner */}
            <Box sx={{ mt: '-40px', mb: 1.5 }}>
              <Avatar
                src={`http://localhost:5000/instructorprofile/${data.image}`}
                alt={data.name}
                sx={{ width: 80, height: 80, border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', gap: '6px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                {data.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {(data.label || []).slice(0, 2).map((l, i) => (
                  <Chip key={i} label={l} size="small"
                    sx={{ fontSize: '11px', height: '22px', background: '#EFF6FF', color: '#2563EB', fontWeight: 500 }} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Rating size="small" value={4.5} readOnly precision={0.5} sx={{ fontSize: '14px' }} />
                <Typography sx={{ fontSize: '12px', color: '#64748B' }}>({data.totalreview})</Typography>
              </Box>
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                {data.totalStudents} students
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {showAll && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Typography onClick={() => setShowAll(false)}
            sx={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6', cursor: 'pointer', '&:hover': { color: '#2563EB' } }}>
            See Less
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Topinstructor;
