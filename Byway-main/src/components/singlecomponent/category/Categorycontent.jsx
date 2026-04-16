import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Rating, Stack, FormGroup, FormControlLabel, Checkbox, Card, Pagination, Chip, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { mockCourses } from '../../../data/mockData';

const styledbutton = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontSize: '16px',
  fontWeight: 500,
  color: 'black',
  padding: '10px 10px',
});

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const CourseCard = ({ data, index, handlenavigate, page, wishlist, onWishlistToggle, userdata }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const cardKey = data.courseid ? `${data.courseid}-${index}-${page}` : `${index}-${page}`;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      custom={index % 3}
      key={cardKey}
    >
      <Card
        onClick={() => handlenavigate(data)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #F1F5F9',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            border: '1px solid #BFDBFE',
          },
          cursor: 'pointer',
        }}
        elevation={0}
      >
        {/* Thumbnail: real image if from API, gradient fallback for mock */}
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
            <Typography sx={{ fontSize: '48px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
              {data.icon || '📚'}
            </Typography>
          )}
          {data.category && (
            <Chip
              label={data.category}
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(4px)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#334155',
                height: '24px',
              }}
            />
          )}
          {data.level && (
            <Chip
              label={data.level}
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 600,
                height: '22px',
              }}
            />
          )}
          <Tooltip title={wishlist[data.courseid] ? 'Remove from Wishlist' : 'Add to Wishlist'}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onWishlistToggle(data);
              }}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.98)',
                }
              }}
            >
              {wishlist[data.courseid] ? (
                <FavoriteIcon sx={{ color: '#EF4444', fontSize: '20px' }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: '#64748B', fontSize: '20px' }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Typography sx={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#0F172A',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {data.coursename}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#64748B' }}>
            by {data.instructorname}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Rating size="small" value={data.rating} readOnly precision={0.1} sx={{ fontSize: '15px' }} />
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#F59E0B' }}>
              {data.rating}
            </Typography>
            <Typography sx={{ fontSize: '11px', color: '#94A3B8' }}>
              ({data.totalreview?.toLocaleString()})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <AccessTimeIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{data.hours || 22}h</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <MenuBookIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{data.lectures || 155} lectures</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <SignalCellularAltIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{data.level || 'Beginner'}</Typography>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
            pt: 1,
            borderTop: '1px solid #F1F5F9',
          }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              ${data.price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <PeopleAltOutlinedIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                {data.totalbuy?.toLocaleString()} students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

const Categorycontent = (props) => {
  const userdata = useSelector((state) => state.userdetail);
  const data = useSelector((state) => state.userlearn);
  const filtervisible = props.filtervisible;
  const sortBy = props.sortBy || '';
  const [ratingvisible, setratingvisible] = useState(false);
  const [chaptervisible, setchaptervisible] = useState(false);
  const [pricevisible, setpricevisible] = useState(false);
  const [categoryvisible, setcategoryvisible] = useState(false);
  const [chapterseemore, setchapterseemore] = useState(false);
  const [chapterarr, setchapterarr] = useState([]);
  const [tabledata, settabledata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [, setrowcount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const itemsPerPage = 9;
  const arr = ['1-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', 'more than 50'];
  const navigate = useNavigate();

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const chaptercontrol = () => {
    const end = chapterseemore ? arr.length : 4;
    const data = arr.slice(0, end);
    setchapterarr(data);
  };

  useEffect(() => {
    chaptercontrol();
    axios
      .get('http://localhost:5000/course/coursedetail')
      .then((res) => {
        const apiData = res.data;
        const repeatedData = Array(20).fill(apiData).flat();
        setOriginalData(repeatedData);
        settabledata(repeatedData);
        setrowcount(Math.ceil(repeatedData.length / itemsPerPage));
      })
      .catch(() => {
        // Backend not available, use mock data
        setOriginalData(mockCourses);
        settabledata(mockCourses);
        setrowcount(Math.ceil(mockCourses.length / itemsPerPage));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterseemore]);

  useEffect(() => {
    let filteredData = [...originalData];

    if (selectedRating !== null) {
      filteredData = filteredData.filter(course => Math.round(course.rating) === selectedRating);
    }

    if (selectedPrice.length > 0) {
      filteredData = filteredData.filter(course => {
        const p = Number(course.price);
        return selectedPrice.some(range => {
          if (range === 'Under $1500') return p < 1500;
          if (range === '$1500 - $2000') return p >= 1500 && p <= 2000;
          if (range === '$2000 - $2500') return p > 2000 && p <= 2500;
          if (range === 'Over $2500') return p > 2500;
          return false;
        });
      });
    }

    if (selectedCategory.length > 0) {
      filteredData = filteredData.filter(course =>
        selectedCategory.includes(course.category || '')
      );
    }

    if (sortBy === 'Highly rated') {
      filteredData.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'most popular') {
      filteredData.sort((a, b) => b.totalbuy - a.totalbuy);
    } else if (sortBy === 'Newest') {
      filteredData.sort((a, b) => (b.courseid > a.courseid ? 1 : -1));
    }

    settabledata(filteredData);
    setrowcount(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1);
  }, [selectedRating, selectedPrice, selectedCategory, sortBy, originalData]);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = tabledata.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(tabledata.length / itemsPerPage);

  const handlenavigate = (props) => {
    const courses = data.courses || [];
    const courseid = props.courseid;
    const acess = courses.find((data) => data.courseid === courseid);
    if (acess) {
      navigate('/indiviualcourse', { state: { data: props } });
    } else {
      navigate('/course', { state: { data: props } });
    }
  };

  const handleWishlistToggle = (course) => {
    if (!userdata?.username) {
      setSnackbar({ open: true, message: 'Please log in to add courses to wishlist', severity: 'warning' });
      return;
    }

    if (wishlist[course.courseid]) {
      // Remove from wishlist
      axios
        .post('http://localhost:5000/user/wishlistremove', {
          username: userdata.username,
          courseid: course.courseid,
        })
        .then(() => {
          setWishlist(prev => ({ ...prev, [course.courseid]: false }));
          setSnackbar({ open: true, message: `You removed ${course.coursename} from wishlist`, severity: 'success' });
        })
        .catch(err => {
          setSnackbar({ open: true, message: 'Failed to remove from wishlist', severity: 'error' });
          console.error('Failed to remove from wishlist:', err);
        });
    } else {
      // Add to wishlist
      axios
        .post('http://localhost:5000/user/wishlistadd', {
          username: userdata.username,
          courseid: course.courseid,
        })
        .then(() => {
          setWishlist(prev => ({ ...prev, [course.courseid]: true }));
          setSnackbar({ open: true, message: `You added ${course.coursename} to wishlist`, severity: 'success' });
        })
        .catch(err => {
          setSnackbar({ open: true, message: 'Failed to add to wishlist', severity: 'error' });
          console.error('Failed to add to wishlist:', err);
        });
    }
  };

  const handleRatingClick = (value) => {
    setSelectedRating(selectedRating === value ? null : value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setSelectedPrice((prev) =>
      prev.includes(value) ? prev.filter((price) => price !== value) : [...prev, value]
    );
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory((prev) =>
      prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
    );
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px', py: 2 }}>
      {filtervisible && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: { md: '220px' }, width: { xs: '100%', md: 'auto' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={() => setratingvisible((prev) => !prev)}
              sx={{
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography sx={{ textAlign: 'start' }}>Rating</Typography>
              {ratingvisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {ratingvisible && (
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <Box
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  >
                    <Rating
                      name={`rating-${value}`}
                      value={value}
                      size="small"
                      readOnly
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={() => {
                chaptercontrol();
                setchaptervisible((prev) => !prev);
              }}
              sx={{
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Number of Chapters</Typography>
              {chaptervisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {chaptervisible && (
              <FormGroup sx={{ p: '10px' }}>
                {chapterarr.map((data, index) => (
                  <FormControlLabel key={index} control={<Checkbox />} label={data} />
                ))}
                {arr.length > 4 && (
                  <Button
                    onClick={() => {
                      const next = !chapterseemore;
                      setchapterseemore(next);
                      const end = next ? arr.length : 4;
                      setchapterarr(arr.slice(0, end));
                    }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '2px solid #000',
                    }}
                  >
                    <Typography>{chapterseemore ? 'See less' : 'See more'}</Typography>
                    {chapterseemore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </Button>
                )}
              </FormGroup>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={() => setpricevisible((prev) => !prev)}
              sx={{
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Price</Typography>
              {pricevisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {pricevisible && (
              <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }}>
                {['Under $1500', '$1500 - $2000', '$2000 - $2500', 'Over $2500'].map((range) => (
                  <FormControlLabel
                    key={range}
                    control={<Checkbox size="small" value={range} onChange={handlePriceChange} checked={selectedPrice.includes(range)} />}
                    label={range}
                  />
                ))}
              </FormGroup>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={() => setcategoryvisible((prev) => !prev)}
              sx={{
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Category</Typography>
              {categoryvisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {categoryvisible && (
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }} spacing={1}>
                {[...new Set(originalData.map(c => c.category).filter(Boolean))].map((category) => (
                  <FormControlLabel
                    key={category}
                    control={<Checkbox value={category} onChange={handleCategoryChange} checked={selectedCategory.includes(category)} />}
                    label={category}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      )}
      <Box sx={{ width: '100%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: '20px', width: '100%' }}>
          {paginatedData &&
            paginatedData.map((data, index) => (
              <CourseCard
                key={data.courseid ? `${data.courseid}-${index}-${currentPage}` : `${index}-${currentPage}`}
                data={data}
                index={index}
                handlenavigate={handlenavigate}
                page={currentPage}
                wishlist={wishlist}
                onWishlistToggle={handleWishlistToggle}
                userdata={userdata}
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                transition: 'all ease 0.3s, transform ease 0.3s',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  transform: 'scale(1.1)',
                },
              },
            }}
          />
        </Box>
      </Box>
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

export default Categorycontent;
