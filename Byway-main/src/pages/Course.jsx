import React, { useEffect, useState,useRef } from 'react';
import { Box, Typography, Button, Card, Rating, Avatar, Tooltip, Snackbar, Alert } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import axios from 'axios';
import language from '../Asstes/language.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Userheader from '../components/wrappedcomponent/Userheader';
import Footer from '../components/wrappedcomponent/Footer';
import Coursedescription from '../components/singlecomponent/Course/Coursedescription';
import { useSelector, useDispatch } from 'react-redux';
import { initialdata } from '../slice/Userdetailslice';
import facebook from '../Asstes/facebook.svg';
import google from '../Asstes/google.svg';
import microsoft from '../Asstes/microsoft.svg';
import twitter from '../Asstes/twitter.png';
import github from '../Asstes/github.png';
import StarIcon from '@mui/icons-material/Star';
import janeimg from '../Asstes/janeimg.jpg'
import Landingcomment from '../components/singlecomponent/Landingcomment'
const headers = () => ({
  py: 3,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const imgboxstyle = () => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '5px solid #E2E8F0',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.5)',
  },
});

const buttonStyle = {
  position: 'relative',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  padding: '0.5rem 1.25rem',
  backgroundColor: 'rgb(9, 10, 10)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#fff',
  fontWeight: 'bold',
  border: '3px solid rgba(85, 78, 78, 0.3)',
  outline: 'none',
  overflow: 'hidden',
  fontSize: '15px',
  width: '320px',
  textTransform: 'none',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100px',
    height: '100%',
    background:
      'linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 70%)',
    top: 0,
    left: '-100px',
    opacity: 0.6,
    transition: 'left 1.5s ease-out',
  },
  '&:hover::before': {
    left: '100%',
  },
};

const Course = () => {
  const userdata = useSelector((state) => state.userdetail);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [instructordetail, setinstructordata] = useState([]);
  const [coursedata] = useState(location.state?.data || {});
  const reviewRef = useRef(1);
  const [review, setreview] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // Tooltip state
  const [showFirstTooltip, setShowFirstTooltip] = useState(false);
  const [showSecondTooltip, setShowSecondTooltip] = useState(false);

  useEffect(() => {
    setShowFirstTooltip(true);
    const firstTimer = setTimeout(() => setShowFirstTooltip(false), 2000);
    const secondStart = setTimeout(() => setShowSecondTooltip(true), 2000);
    const secondEnd = setTimeout(() => setShowSecondTooltip(false), 7000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondStart);
      clearTimeout(secondEnd);
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/review/getall')
      .then((res) => setreview(res.data))
      .catch((err) => console.error('Reviews fetch failed:', err));
  }, []);
  useEffect(() => {
    console.log(review, 'review')
  }, [review])

  const handlecart = (props) => {
    if (!props.courseid || !userdata.username) {
      setSnackbar({ open: true, message: 'Please log in to add courses to cart', severity: 'warning' });
      return;
    }
    if ((userdata.carddata || []).includes(props.courseid)) {
      setSnackbar({ open: true, message: 'Course already in cart', severity: 'info' });
      return;
    }
    axios
      .post('http://localhost:5000/user/cart', {
        courseid: props.courseid,
        username: userdata.username,
      })
      .then((res) => {
        const updatedCarddata = [...(userdata.carddata || []), props.courseid];
        dispatch(initialdata({ ...userdata, carddata: updatedCarddata }));
        setSnackbar({ open: true, message: res.data.message || 'Added to cart!', severity: 'success' });
      })
      .catch((err) => {
        setSnackbar({ open: true, message: err.response?.data?.message || err.message || 'Failed to add to cart', severity: 'error' });
      });
  };

  useEffect(() => {
    if (coursedata.instructorid) {
      axios
        .post('http://localhost:5000/instructor/instructorgetdetail', {
          instructorid: coursedata.instructorid,
        })
        .then((res) => {
          setinstructordata(res.data);
        })
        .catch((err) => {
          console.error('Instructor fetch failed:', err);
        });
    }
  }, [coursedata]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '& *': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
    >
      {showFirstTooltip && (
        <Box
          sx={{
            position: 'fixed',
            top: '80px', // or adjust to match where course content begins
            right: '20px',
            height: 'fit-content',
            backgroundColor: '#0F172A',
            color: 'white',
            p: 2,
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
          }}
        >
          Great choice! You begin your career with <b style={{ marginLeft: 4 }}>{coursedata.category || 'this course'}</b>
        </Box>
      )}

      {showSecondTooltip && (
        <Box
          sx={{
            position: 'fixed',
            top: '80px', // match the same position as above
            right: '20px',
            height: 'fit-content',
            backgroundColor: '#0F172A',
            color: 'white',
            p: 2,
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
          }}
        >
          See the review of the course and decide
        </Box>
      )}

      <Userheader />
      <Box sx={{ px: 8, display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Box sx={{ ...headers() }}>
            <Link
              sx={{ height: 'fit-content', color: '#000000', fontSize: '14px', fontWeight: 400 }}
              underline="none"
              component={RouterLink}
              to="/"
            >
              Home
            </Link>
            <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
            <Link
              sx={{ height: 'fit-content', color: '#000000', fontSize: '14px', fontWeight: 400 }}
              underline="none"
              component={RouterLink}
              to="/category"
            >
              Categories
            </Link>
            <ArrowForwardIosIcon sx={{ fontSize: '12px' }} />
            <Link
              sx={{ height: 'fit-content', color: '#2563EB', fontSize: '14px', fontWeight: 400 }}
              underline="none"
            >
              {coursedata.coursename || 'Course'}
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography sx={{ fontSize: '40px', fontWeight: 700 }}>
              {coursedata.coursename || 'Course Name'}
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 400, width: '80%' }}>
              {coursedata.bannertext || 'Course description unavailable'}
            </Typography>
            <Rating readOnly value={coursedata.rating || 0}></Rating>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                {instructordetail?.[0] ? (
                  <Avatar
                    sx={{ width: '40px', height: '40px' }}
                    src={`/${instructordetail[0].image}`}
                    onError={(e) => {
                      if (!e.target.src.includes('localhost')) {
                        e.target.src = `http://localhost:5000/instructorprofile/${instructordetail[0].image}`;
                      }
                    }}
                    alt="instructor"
                  />
                ) : (
                  <Avatar sx={{ width: '40px', height: '40px', bgcolor: '#3B82F6', fontSize: '16px', fontWeight: 700 }}>
                    {(coursedata.instructorname || 'I')[0].toUpperCase()}
                  </Avatar>
                )}
                <Typography sx={{ height: 'fit-content' }}>
                  created by {instructordetail?.[0]?.name || coursedata.instructorname || 'Expert Instructor'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <Avatar sx={{ width: '24px', height: '24px' }} src={language} alt="language" />
                <Typography sx={{ height: 'fit-content' }}>{coursedata.language || 'English'}</Typography>
              </Box>
            </Box>
          </Box>
          <Coursedescription coursedata={coursedata} instructordetail={instructordetail} />
        </Box>
        <Box sx={{ width: '350px', py: 2, px: 1 }}>
          <Card
            sx={{
              width: '350px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              gap: '10px',
              border: '1px solid #E2E8F0'
            }}
          >
            {coursedata.coursethumbnail ? (
              <Box>
                <img
                  src={`http://localhost:5000/coursethumbnail/${coursedata.coursethumbnail}`}
                  style={{ width: '320px', height: '200px', borderRadius: '10px', objectFit: 'cover' }}
                  alt="course thumbnail"
                />
              </Box>
            ) : (
              <Box sx={{
                width: '320px',
                height: '200px',
                borderRadius: '10px',
                background: coursedata.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <Typography sx={{ fontSize: '56px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                  {coursedata.icon || '📚'}
                </Typography>
                {coursedata.category && (
                  <Box sx={{
                    position: 'absolute', top: 10, left: 10,
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '6px',
                    px: 1.2, py: 0.3,
                  }}>
                    <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>
                      {coursedata.category}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
            <Button sx={buttonStyle} onClick={() => handlecart(coursedata)}>
              Add to Cart
            </Button>
            <Button
              sx={buttonStyle}
              onClick={() =>
                navigate('/payment', {
                  state: {
                    username: userdata.username || '',
                    courseid: coursedata.courseid || '',
                    coursename: coursedata.coursename || '',
                    price: coursedata.price || 0,
                    thumbnail: coursedata.coursethumbnail
                      ? `http://localhost:5000/coursethumbnail/${coursedata.coursethumbnail}`
                      : null,
                    gradient: coursedata.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    icon: coursedata.icon || '📚',
                    category: coursedata.category || '',
                  },
                })
              }
            >
              Buy Now
            </Button>
            <Box sx={{ width: '100%', border: '1px solid #E2E8F0', mt: '5px', mb: '5px' }}></Box>
            <Typography sx={{ width: '100%', textAlign: 'start' }}>Share</Typography>
            <Box sx={{ width: '320px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Tooltip title="Facebook">
                <Box sx={imgboxstyle()}>
                  <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={facebook} alt="facebook" />
                </Box>
              </Tooltip>
              <Tooltip title="GitHub">
                <Box sx={imgboxstyle()}>
                  <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={github} alt="github" />
                </Box>
              </Tooltip>
              <Tooltip title="Google">
                <Box sx={imgboxstyle()}>
                  <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={google} alt="google" />
                </Box>
              </Tooltip>
              <Tooltip title="Twitter">
                <Box sx={imgboxstyle()}>
                  <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={twitter} alt="twitter" />
                </Box>
              </Tooltip>
              <Tooltip title="Microsoft">
                <Box sx={imgboxstyle()}>
                  <img style={{ width: '24px', height: '24px' }} src={microsoft} alt="microsoft" />
                </Box>
              </Tooltip>
            </Box>
          </Card>
        </Box>
      </Box>
      <Box sx={{px:8,mt:'-25px'}}>
        <Box ref={reviewRef} sx={{ mt: 4, width: '90vw' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Learner Reviews
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px' }}>
            <Box sx={{ width: "300px" }}>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <StarIcon sx={{ color: '#EAB308' }}></StarIcon>
                <Typography>4.6</Typography>
                <Typography>12,33,4455 reviews</Typography>
              </Box>
              <Box sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Rating size='small' value={5} readOnly></Rating>
                  <Typography>80%</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Rating size='small' value={4} readOnly></Rating>
                  <Typography>18%</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Rating size='small' value={3} readOnly></Rating>
                  <Typography>2%</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Rating size='small' value={2} readOnly></Rating>
                  <Typography>3%</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Rating size='small' value={1} readOnly></Rating>
                  <Typography>2%</Typography>
                </Box>

              </Box>
            </Box>
            <Box sx={{ px: 3, width: '100%' }}>
              {review.length === 0 ? (
                <Typography>No reviews available.</Typography>
              ) : (
                review.map((r, i) => (
                  <Card key={i} sx={{ mb: 2, display: 'flex', gap: '30px', p: 2, width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <img src={janeimg} style={{ width: '60px', height: '60px' }} alt="reviewer"></img>
                      <Typography>Mark Doe</Typography>
                    </Box>
                    <Box >
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}> <StarIcon sx={{ color: '#EAB308' }}></StarIcon> <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>{r.rating} </Typography>
                        <Typography sx={{ color: "#334155", fontSize: '14px', fontWeight: '400' }}>Reviewed on 22nd March, 2024</Typography>
                      </Box>
                      <Typography>{r.review}</Typography>
                    </Box>

                  </Card>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Landingcomment />
      <Footer />
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
    </Box>
  );
};

export default Course;
