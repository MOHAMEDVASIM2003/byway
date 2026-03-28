import React, { useState } from 'react'
import { Box, Card, Rating, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios'
const Myreview = () => {
  const data = useSelector((state) => state.userdetail)
  const [review, setreview] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:5000/review/myreview', { holdername: data.username })
      .then(res => setreview(res.data))
      .catch((err) => console.error('Failed to fetch reviews:', err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.username])
  return (
    <Box sx={{ p: 2 ,display:'flex',flexDirection:'column',gap:'24px'}}>
      <Typography sx={{fontSize:'24px',fontWeight:600}}>My Reviews</Typography>
      {
        review && review.map((data) => {
          return (
            

          <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '10px', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                <span style={{ fontSize: '14px', fontWeight: 400 }}>Course name:</span> {data.coursename}
              </Typography>
              <MoreHorizIcon sx={{ cursor: 'pointer', color: '#555' }} />
            </Box>

            <Typography>
              <span style={{ fontSize: '14px', fontWeight: 400 }}>Rating:</span>{' '}
              <Rating readOnly value={data.rating} />
            </Typography>

            <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
              <span style={{ fontSize: '14px', fontWeight: 400 }}>Review:</span> {data.review}
            </Typography>
          </Card>

          )
      })
      }
    </Box>
  )
}

export default Myreview