import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Rating, Chip } from '@mui/material';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { mockCourses } from '../../data/mockData';

const Topcourse = () => {
  const [topcourse, setTopcourse] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/course/coursedetail')
      .then((res) => {
        const data = res.data;
        const duplicatedData = [...data, ...data].slice(0, 10);
        setTopcourse(duplicatedData);
      })
      .catch(() => {
        setTopcourse(mockCourses.slice(0, 10));
      });
  }, []);

  const displayed = topcourse.slice(0, showAll ? 10 : 4);

  return (
    <Box sx={{ width: '90%', mx: 'auto', py: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography sx={{ fontSize: { xs: '20px', md: '26px' }, fontWeight: 700, color: '#0F172A' }}>
            Top Courses
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>
            Hand-picked courses from our best instructors
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
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #F1F5F9',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
              border: '1px solid #BFDBFE',
            },
          }} elevation={0}>
            <Box sx={{
              width: '100%',
              height: '160px',
              background: data.coursethumbnail ? '#f1f5f9' : (data.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {data.coursethumbnail ? (
                <Box
                  component="img"
                  src={`http://localhost:5000/coursethumbnail/${data.coursethumbnail}`}
                  alt={data.coursename}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : data.courseimage ? (
                <Box
                  component="img"
                  src={`/${data.courseimage}`}
                  alt={data.coursename}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Typography sx={{ fontSize: '44px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                  {data.icon || '📚'}
                </Typography>
              )}
              {data.category && (
                <Chip
                  label={data.category}
                  size="small"
                  sx={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(4px)',
                    fontSize: '11px', fontWeight: 600,
                  }}
                />
              )}
            </Box>
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <Typography sx={{
                fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {data.coursename}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                by {data.instructorname || 'Expert Instructor'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Rating size="small" value={data.rating} readOnly precision={0.1} sx={{ fontSize: '14px' }} />
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B' }}>{data.rating}</Typography>
                <Typography sx={{ fontSize: '11px', color: '#94A3B8' }}>({(data.totalreview || 0).toLocaleString()})</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <AccessTimeIcon sx={{ fontSize: 13, color: '#94A3B8' }} />
                  <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{data.hours || 22}h</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <PeopleAltOutlinedIcon sx={{ fontSize: 13, color: '#94A3B8' }} />
                  <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{(data.totalbuy || 0).toLocaleString()}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                  ${data.price}
                </Typography>
                <Chip label={data.level || 'Beginner'} size="small" sx={{ fontSize: '10px', fontWeight: 600, height: '22px', background: '#F1F5F9', color: '#64748B' }} />
              </Box>
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

export default Topcourse;
