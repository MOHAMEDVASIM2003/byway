
import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Rating, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../../Asstes/logo.svg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';

// Custom styled components for the review box
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '400px',
  position: 'absolute',
  top: '80px',
  left: '80%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    '0%': { opacity: 0, transform: 'translateY(0px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '85%',
    padding: '15px',
    top: '80px',
  },
}));

const StyledTypography = styled(Typography)({
  color: '#1a1a1a',
  fontWeight: '600',
  fontSize: '1.2rem',
  textAlign: 'center',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#e8e8e8',
    },
  },
  '& .MuiInputBase-input': {
    height: '35px',
    padding: '8px 12px',
    color: '#333',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
});

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffca28', // Gold for filled stars
  },
  '& .MuiRating-iconHover': {
    color: '#ffb300',
  },
  '& .MuiRating-iconEmpty': {
    color: '#ccc',
  },
});

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: '600',
  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
  },
});

const Individualheader = (props) => {
  const [message, setmessage] = useState('');
  const [boxvisible, setboxvisible] = useState(false);
  const data = useSelector((state) => state.userdetail);
  const [rating, setrating] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handlereview = () => {
    setboxvisible((prev) => !prev);
  };

  const handlesubmit = () => {
    axios
      .post('http://localhost:5000/review/setreview', {
        username: data.username,
        message: message,
        rating: rating,
        courseid: props.courseid,
      })
      .then((res) => {
        setSnackbar({ open: true, message: res.data.message || 'Review submitted successfully!', severity: 'success' });
        setmessage('');
        setrating(0);
        setboxvisible(false);
      })
      .catch((err) => {
        setSnackbar({ open: true, message: err.response?.data?.message || 'Error submitting review', severity: 'error' });
      });
  };

  useEffect(() => {
    console.log(data, 'redux data');
  }, [data]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    <Box
      sx={{
        width: '100vw',
        height: { xs: '12vh', sm: '14vh' },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        background: '#0F172A',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Box
        sx={{
          width: '100%',
          py: 2,
          px: { xs: 4, sm: 8 },
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <img src={logo} style={{ width: '31px', height: '40px' }} alt="Byway logo" />
          <Typography
            sx={{
              height: 'fit-content',
              fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
              color: 'white',
              fontWeight: '500',
            }}
          >
            Byway
          </Typography>
        </Box>
        {boxvisible && (
          <StyledBox>
            <StyledTypography>Share Your Thoughts</StyledTypography>
            <StyledTextField
              variant="outlined"
              size="small"
              placeholder="Write what's on your mind"
              value={message || ''}
              onChange={(e) => setmessage(e.target.value)}
              aria-label="Feedback input"
            />
            <StyledRating
              value={rating}
              onChange={(e, newValue) => setrating(newValue)}
              precision={0.5}
              aria-label="Rating"
            />
            <StyledButton onClick={handlesubmit}>Send</StyledButton>
          </StyledBox>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            position: 'absolute',
            right: { xs: '16px', sm: '64px' },
            justifyContent: 'center',
            alignItems: 'center',
            mt: '7px',
          }}
        >
          <Box
            onClick={handlereview}
            role="button"
            aria-label="Toggle review form"
            sx={{ cursor: 'pointer' }}
          >
            <StarIcon sx={{ color: 'white' }} />
          </Box>
          <Typography sx={{ color: 'white', fontSize: { xs: '12px', sm: '14px' } }}>
            Provide rating
          </Typography>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Individualheader;