import React, { useEffect, useState } from 'react'
import { Avatar, Box, Card, Typography } from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Messagedetail = () => {


  const data = useSelector((state) => state.userdetail)
  const [message, setmessage] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:5000/message/getmessagefrominstructor', { holdername: data.username })
      .then((res) => setmessage(res.data))
      .catch(err => console.error('Failed to fetch messages:', err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.username])
  useEffect(() => {
    console.log(message, 'hello')
  }, [message])

  const formatCustomDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getDate();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const getDaySuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getDaySuffix(day)}/${month}/${year}`;
  };



  return (
    <Box sx={{p:2}}>
      {
        message && message.map((data) => {
          return (
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex',gap:'10px',alignItems:'center' }}>
                  <Avatar src={`http://localhost:5000/instructorprofile/${data.image}`}></Avatar>
                  <Typography sx={{height:'fit-content'}}>{data.name}</Typography>
                </Box>
                <Typography>{formatCustomDate(data.message.date)}</Typography>
              </Box>
              <Box>
                <Typography>{data.message.message}</Typography>
              </Box>
            </Card>
          )
        })
      }
    </Box>
  )
}

export default Messagedetail