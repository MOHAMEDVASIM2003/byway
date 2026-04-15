import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, FormControl, Select, OutlinedInput, MenuItem, Card, Pagination } from '@mui/material';
import axios from 'axios';
import search from '../../../Asstes/headersearch.svg';
import arrow from '../../../Asstes/filter.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimationControls } from 'framer-motion';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 148,
    },
  },
};

const boxStyle = {
  width: 'fit-content',
  height: 'fit-content',
};

const formControlStyle = {
  m: 0,
  height: '48px',
  width: 148,
};

const selectStyle = {
  width: 148,
  fontSize: '14px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '.MuiSelect-select': {
    paddingRight: '24px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
  },
  '.MuiSelect-icon': {
    color: '#555',
  },
};

const outlinedInputStyle = {
  height: '40px',
  fontSize: '14px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
  color: '#333',
  paddingRight: '0px',
};

const menuItemStyle = {
  mr: '2%',
  fontSize: '14px',
  padding: '10px 16px',
  '&:hover': {
    backgroundColor: '#e3f2fd',
  },
  '&.Mui-selected': {
    backgroundColor: '#bbdefb',
    fontWeight: 500,
  },
};

// Animation variants for the card
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

// TeacherCard component for individual card with animation
const TeacherCard = ({ data, index, navigate, page }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  const controls = useAnimationControls();

  // Trigger animation when card comes into view or page changes
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  // Generate a unique key for the card
  const cardKey = data._id ? `${data._id}-${index}-${page}` : `${index}-${page}`;

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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          py: 2,
          borderRadius: '20px',
          transition: 'all ease 0.3s, transform ease 0.3s',
          border: '1px solid rgba(255, 255, 255, 0.222)',
          '&:hover': {
            boxShadow: '0px 0px 20px 1px #ffbb763f',
            border: '1px solid rgba(255, 255, 255, 0.454)',
            transform: 'scale(1.05)', // Scale effect on hover
          },
          cursor: 'pointer',
        }}
        elevation={1}
      >
        <img
          style={{ width: '90%', height: '139px', borderRadius: '20px', objectFit: 'cover' }}
          src={data.image ? `http://localhost:5000/instructorprofile/${data.image}` : '/path/to/fallback-image.jpg'}
          onError={(e) => {
            if (e.target.src.includes('localhost:5000')) {
              e.target.src = `/${data.image}`;
            }
          }}
          alt="teacher"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '8px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>{data.name}</Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
            {data.label[0]?.split(',')[0] || 'Instructor'}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '8px',
              mt: 1,
            }}
            onClick={() => navigate('/indiviualmessage', { state: { data } })}
          >
            Send Message
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

const Teachers = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userdetail);
  const [userteachers, setuserteachers] = useState([]);
  const [, setfiltervisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const names = ['Relevance', 'Highly rated', 'Most popular', 'Newest'];
  const [personName, setPersonName] = useState('');

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  useEffect(() => {
    axios
      .post('http://localhost:5000/user/userteacher', { username: data.username })
      .then((res) => {
        const originalData = Array.isArray(res.data) ? res.data : [];
        const repeatedData = Array(20).fill(originalData).flat();
        // Ensure each item has a unique _id
        const dataWithUniqueIds = repeatedData.map((item, index) => ({
          ...item,
          _id: `${item._id || 'teacher'}-${index}`, // Append index to _id to ensure uniqueness
        }));
        setuserteachers(dataWithUniqueIds);
      })
      .catch((err) => {
        console.error('Failed to fetch teacher details:', err);
      });
  }, [data.username]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginated = userteachers.slice(startIdx, startIdx + itemsPerPage);
    setPaginatedData(paginated);
    setTotalPages(Math.ceil(userteachers.length / itemsPerPage));
  }, [userteachers, currentPage]);

  return (
    <Box sx={{py:2}}>
      <Typography sx={{fontSize:'24px',fontWeight:600}}>My Teachers ({userteachers.length})</Typography>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',py:2 }}>
        <Box sx={{ width: '20vw',height:'40px', border: '1px solid #334155', borderRadius: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={search} style={{ width: '20px', height: '20px' }} alt="search icon" />
          <input
            placeholder="Search teacher"
            style={{ width: '89%', border: 'none',outline:'none', height: '90%', fontSize: '14px', fontWeight: '500', color: '#64748B' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px',py:2 }}>
          <Typography sx={{ height: 'fit-content', fontSize: '16px', fontWeight: 400, color: '#0F172A' }}>Sort By</Typography>
          <Box sx={boxStyle}>
            <FormControl sx={formControlStyle}>
              <Select
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput sx={outlinedInputStyle} />}
                renderValue={(selected) => (!selected ? <em style={{ color: '#888' }}>Select</em> : selected)}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={selectStyle}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name} sx={menuItemStyle}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            onClick={() => setfiltervisible((prev) => !prev)}
            sx={{
              height: '48px',
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #0F172A',
              px: 3,
              borderRadius: '8px',
              justifyContent: 'center',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <img src={arrow} alt="filter icon" style={{ width: '24px', height: '24px' }} />
            <Typography sx={{ height: 'fit-content', fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Filter</Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', width: '100%' }}>
          {paginatedData &&
            paginatedData.map((data, index) => (
              <TeacherCard
                key={data._id ? `${data._id}-${index}-${currentPage}` : `${index}-${currentPage}`}
                data={data}
                index={index}
                navigate={navigate}
                page={currentPage}
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center',py:2 }}>
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
                  backgroundColor: '#e0e0e0', // Gray background on hover
                  transform: 'scale(1.1)', // Scale effect on hover
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Teachers;