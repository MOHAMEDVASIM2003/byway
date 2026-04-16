import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Instructordetail = () => {
  const location = useLocation();
  const id = location.state.id;
  const [instructordetail, setinstructordetail] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:5000/instructor/instructorgetdetail', { instructorid: id })
      .then((res) => {
        setinstructordetail(res.data);
      })
      .catch((err) => console.error('Failed to fetch instructor:', err));
  }, [id]);

  useEffect(() => {
    console.log(instructordetail);
  }, [instructordetail]);

  return (
    <Box sx={{ width: '90%', ml: '5%', mt: 4 }}>
      {instructordetail.length > 0 && (
        <Box sx={{ display: 'flex', gap: 4 }}>
          {/* Left Column - Details */}
          <Box sx={{ flex: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#0F172A' }}>
                Instructor
              </Typography>
              <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#000' }}>
                {instructordetail[0].name}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#64748B', mt: 1 }}>
                {instructordetail[0].label}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                 
                  width: '100px',
                  height: '80px',
                  p: 1,
                }}
              >
                <Typography sx={{ fontSize: '14px', color: '#334155' }}>
                  Total Students
                </Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#000' }}>
                  {instructordetail[0].totalStudents}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  
                  width: '100px',
                  height: '80px',
                  p: 1,
                }}
              >
                <Typography sx={{ fontSize: '14px', color: '#334155' }}>
                  Total Reviews
                </Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#000' }}>
                  {instructordetail[0].totalreview}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', mb: 1 }}>
                About {instructordetail[0].name}
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#64748B' }}>
                {instructordetail[0].about}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', mb: 1 }}>
                Area Of Expertise
              </Typography>
              <ul style={{ paddingLeft: '20px', color: '#64748B' }}>
                {instructordetail[0].areaofexperience.map((data, index) => (
                  <li key={index} style={{ fontSize: '14px', marginBottom: '8px' }}>
                    {data}
                  </li>
                ))}
              </ul>
            </Box>

            <Box>
              <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', mb: 1 }}>
                Professional Experience
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#64748B' }}>
                {instructordetail[0].professionalexperience}
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Avatar and Buttons */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              sx={{ width: '200px', height: '200px', borderRadius: '50%', bgcolor: '#E0E7FF', objectFit: 'cover', border: '3px solid #E0E7FF' }}
              src={`http://localhost:5000/instructorprofile/${instructordetail[0]?.image}`}
              onError={(e) => {
                if (e.target.src.includes('localhost:5000')) {
                  e.target.src = `/${instructordetail[0]?.image}`;
                }
              }}
            />
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                bgcolor: 'white',
                color: '#1E40AF',
                borderColor: '#1E40AF',
                '&:hover': { bgcolor: '#BFDBFE' },
              }}
            >
              Website
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                bgcolor: 'white',
                color: '#1E40AF',
                borderColor: '#1E40AF',
                '&:hover': { bgcolor: '#BFDBFE' },
              }}
            >
              Twitter
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: '100%',
                bgcolor: 'white',
                color: '#1E40AF',
                borderColor: '#1E40AF',
                '&:hover': { bgcolor: '#BFDBFE' },
              }}
            >
              Youtube
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Instructordetail;