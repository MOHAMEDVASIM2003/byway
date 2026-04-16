import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Avatar, TextField, Button, Alert
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Indiviualmessage = () => {
  const location = useLocation();
  const data = useSelector((state) => state.userdetail);
  const instructor = location.state?.data || null;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (instructor) fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  const fetchMessages = async () => {
    try {
      const res = await axios.post('http://localhost:5000/message/getConversation', {
        holdername: data.username,
        instructorid: instructor.id,
      });
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlenav=()=>{
    navigate('/user')
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await axios.post('http://localhost:5000/instructormess/addInstructorMessage', {
        id: instructor.id,
        username: data.username,
        message,
      });
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const groupMessagesByDate = () => {
    const grouped = {};
    messages.forEach((msg) => {
      const dateObj = new Date(msg.date);
      const today = new Date();
      const isToday =
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear();
      const dateKey = isToday ? 'Today' : dateObj.toLocaleDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!instructor) {
    return (
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Alert severity="info" sx={{ maxWidth: 400 }}>
          No conversation selected. Please open a message from your profile.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/user')}
          sx={{ textTransform: 'none', backgroundColor: '#0F172A', '&:hover': { backgroundColor: '#1E293B' } }}>
          Go to My Profile
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box sx={{  py: 2, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="text"
          onClick={handlenav}
          sx={{
            color: '#000000', // Black color for the icon
            '&:hover': {
              transform: 'scale(1.1)', 
              background:'white',// Scale on hover
              transition: 'transform 0.3s ease-in-out', // Smooth transition
            },
          }}
        >
          <Box
            sx={{
              transform: 'rotate(180deg)', // Flip the icon to point left
            }}
          >
            <ArrowForwardIosIcon />
          </Box>
        </Button>


        <Avatar
          src={`/${instructor.image}`}
          onError={(e) => {
            if (!e.target.src.includes('localhost')) {
              e.target.src = `http://localhost:5000/instructorprofile/${instructor.image}`;
            }
          }}
          sx={{ width: 60, height: 60 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{instructor.name}</Typography>
      </Box>

      {/* Chat Body */}
      <Box sx={{
        flex: 1,
        px: 3,
        py: 2,
        overflowY: 'auto',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {Object.entries(groupedMessages).map(([date, msgs], idx) => (
          <Box key={idx}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, px: 2, py: 1, borderRadius: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: '#64748b', fontWeight: 500 }}
              >
                {date}
              </Typography>
            </Box>
            {msgs.map((msg, i) => {
              const time = new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const isUser = msg.label === 'req';

              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  {!isUser && (
                    <Avatar
                      src={`/${instructor.image}`}
                      onError={(e) => {
                        if (!e.target.src.includes('localhost')) {
                          e.target.src = `http://localhost:5000/instructorprofile/${instructor.image}`;
                        }
                      }}
                      sx={{ width: 32, height: 32, mr: 1, mt: 'auto' }}
                    />
                  )}
                  <Box
                    sx={{
                      backgroundColor: isUser ? '#0f172a' : '#f1f5f9',
                      color: isUser ? '#ffffff' : '#1e293b',
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: '60%',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography sx={{ fontSize: '0.95rem' }}>{msg.message}</Typography>
                    <Typography sx={{ textAlign: 'right', fontSize: '0.75rem', color: isUser ? '#e2e8f0' : '#64748b', mt: 0.5 }}>
                      {time}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ))}
        <div ref={scrollRef}></div>
      </Box>

      {/* Input Box */}
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>Send</Button>
      </Box>
    </Box>
  );
};

export default Indiviualmessage;