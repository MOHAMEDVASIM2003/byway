import React, { useState, useEffect } from 'react';
import { Box, Rating, Typography, Button, Card, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { initialdata } from '../../../slice/Userdetailslice';

const headers = () => ({
  py: 3,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap:'30px',
});

const buttonStyle = {
  position: 'relative',
  height: '50px',
  width: '100%',
  backgroundColor: '#fff',
  border: '2px solid #252525',
  color: '#000',
  transition: 'all 0.5s ease-in-out',
  cursor: 'pointer',
  overflow: 'hidden',
  textTransform: 'none',
  fontWeight: 800,
  letterSpacing: '4px',
  zIndex: 1,
  '&:hover': {
    boxShadow: '1px 1px 20px #252525',
    color: 'white',
    backgroundColor: 'black',
    border: '2px solid #000',
  },
};

const removeButtonStyle = {
  ...buttonStyle,
  '&:hover': {
    boxShadow: '1px 1px 50px #ff0000',
    color: 'white',
    backgroundColor: 'red',
    border: '2px solid #ff0000',
  },
};

const buttonAfterStyle = {
  content: '""',
  position: 'absolute',
  left: 0,
  top: 0,
  backgroundColor: '#000',
  borderRadius: '30px',
  height: '100%',
  width: '100%',
  zIndex: -1,
  transition: 'all 0.5s ease-in-out',
  transform: 'scale(0)',
  '&:hover': {
    transform: 'scale(1)',
  },
};

const removeButtonAfterStyle = {
  ...buttonAfterStyle,
  backgroundColor: '#ff0000',
};

const Carddetail = () => {
  const data = useSelector((state) => state.userdetail);
  const dispatch = useDispatch();
  const username = data.username;
  const navigate = useNavigate();
  const [cartCourses, setCartCourses] = useState([]);
  const [, setcourseid] = useState([]);
  const [price, setprice] = useState(0);
  const [discount] = useState(10);
  const [tax] = useState(20);
  const [total, settotal] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showMsg = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  const handlewhislist = async (course) => {
    try {
      const response = await axios.post('http://localhost:5000/user/wishlistadd', {
        username,
        courseid: course.courseid,
      });
      if (response.status === 200) {
        await handleremove(course, true);
        showMsg('Saved to wishlist');
      }
    } catch (error) {
      showMsg(error.response?.data?.message || 'Error adding to wishlist', 'error');
    }
  };

  const handleremove = async (course, silent = false) => {
    try {
      const response = await axios.post('http://localhost:5000/user/cartremove', {
        username,
        courseid: course.courseid,
      });
      if (response.status === 200) {
        const updated = cartCourses.filter((c) => c.courseid !== course.courseid);
        setCartCourses(updated);
        const updatedCarddata = (data.carddata || []).filter(id => id !== course.courseid);
        dispatch(initialdata({ ...data, carddata: updatedCarddata }));
        if (!silent) showMsg('Course removed from cart');
      }
    } catch (error) {
      showMsg(error.response?.data?.message || 'Error removing course', 'error');
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/cart/cartdetail', { username });
        setCartCourses(response.data || []);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
        showMsg('Failed to load cart', 'error');
      }
    };
    if (username) fetchCartData();
  }, [username]);

  useEffect(() => {
    const ids = cartCourses.map((data) => data.courseid);
    const totalPrice = cartCourses.reduce((acc, data) => acc + parseInt(data.price || '0', 10), 0);
    setcourseid(ids);
    setprice(totalPrice);
  }, [cartCourses]);

  useEffect(() => {
    settotal((price || 0) + tax - discount);
  }, [price, tax, discount]);

  return (
    <Box sx={{ width: '90%', mx: 'auto', height: 'fit-content' }}>
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
    <Box sx={{ width: '100%', height: 'fit-content' }}>
      <Box sx={{ ...headers() }}>
        <Typography fontWeight="bold" fontSize="24px">Shopping Cart</Typography>

        {/* Styled Breadcrumb Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {[
            { label: 'Categories', path: '/category' },
            { label: 'Shopping Cart', path: '/shopingcart' }
          ].map((item, index, arr) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                style={{
                  textDecoration: 'none',
                  fontWeight: 400,
                  fontSize:'14px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: window.location.pathname === item.path ? '#000' : '#fff',
                  color: 'Shopping Cart' === item.label ? '#2563EB' : '#0F172A',
                  transition: '0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = window.location.pathname === item.path ? '#000' : '#fff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {item.label}
              </Link>
              {index < arr.length - 1 && (
                <ArrowForwardIosIcon sx={{ fontSize: '10px', color: '#E2E8F0' }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {/* Cart Content */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
        <Box sx={{ width: '60%' }}>
          <Typography sx={{fontSize:'14px',py:2}}>{cartCourses.length} {cartCourses.length === 1 ? 'Course' : 'Courses'} in Cart</Typography>
          <Box sx={{width:'100%',border:'1px solid #E2E8F0'}}></Box>
          <Box sx={{py:2}}>
            {cartCourses.length > 0 ? (
              cartCourses.map((data) => (
                <Box
                  key={data._id}
                  sx={{
                    width: '100%',
                    height: '40vh',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    mb: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    p: 2,
                  }}
                >
                  <Box sx={{ width: '20vw', height: '100%' }}>
                    <img
                      src={`http://localhost:5000/coursethumbnail/${data.coursethumbnail || ''}`}
                      alt={data.coursename || 'Course Thumbnail'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                    />
                  </Box>
                  <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                        {data.coursename || 'No Name'}
                      </Typography>
                      <Typography sx={{fontSize:'24px',fontWeight:600}}>${data.price || '0'}</Typography>
                      <Typography>by {data.instructorName || 'Unknown Instructor'}</Typography>
                      <Box sx={{display:'flex',gap:'10px'}}><Typography sx={{color:'#FEC84B'}}>{Math.round(data.rating)}</Typography>  <Rating value={data.rating || 0} readOnly /> <Typography sx={{fontSize:'14px',color:'#64748B'}}>{data.totalreview} rating</Typography><Typography sx={{fontSize:'14px',fontWeight:400}}>22 Total Hours.</Typography></Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Button sx={buttonStyle} onClick={() => handlewhislist(data)}>
                        <Box sx={buttonAfterStyle} />
                        Save for later
                      </Button>
                      <Button sx={removeButtonStyle} onClick={() => handleremove(data)}>
                        <Box sx={removeButtonAfterStyle} />
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No courses in cart.</Typography>
            )}
          </Box>
        </Box>

        {/* Summary Section */}
        <Box sx={{ width: '35%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', p: 2 }}>
            <Typography variant="h6" sx={{fontSize:"20px"}}>Order Details</Typography>
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px',border:'1px solid #E2E8F0',background:'#F8FAFC',p:2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',gap:'10px' }}>
                <Typography sx={{fontSize:'16px',fontWeight:400}}>Price</Typography>
                <Typography sx={{fontSize:'18px',fontWeight:600}}>${price || 0}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{fontSize:'16px',fontWeight:400}}>Discount</Typography>
                <Typography sx={{fontSize:'18px',fontWeight:600}}>-${discount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{fontSize:'16px',fontWeight:400}}>Tax</Typography>
                <Typography sx={{fontSize:'18px',fontWeight:600}}>${tax}</Typography>
              </Box>
              <Box sx={{border:'1px solid #E2E8F0'}}></Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{fontSize:'16px',fontWeight:400}}>Total</Typography>
                <Typography sx={{fontSize:'18px',fontWeight:600}}>${total || 0}</Typography>
              </Box>
            </Card>
            <Button sx={buttonStyle} onClick={() => navigate('/checkout')}>
              <Box sx={buttonAfterStyle} />
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Carddetail;
