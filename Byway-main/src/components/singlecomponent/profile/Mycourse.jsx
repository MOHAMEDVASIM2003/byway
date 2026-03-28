import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, FormControl, Select, OutlinedInput, MenuItem, Card, Rating, Pagination, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { saveAs } from 'file-saver';
import search from '../../../Asstes/headersearch.svg';
import arrow from '../../../Asstes/filter.svg';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Mui3dloading from '../../styledcomponent/Mui3dloading';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: 'rgb(27, 27, 27)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  minWidth: 'unset',
  boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.11)',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: 'rgb(150, 94, 255)',
  },
  '& .svgIcon': {
    fill: 'rgb(214, 178, 255)',
    transition: 'fill 0.3s',
  },
  '&:hover .svgIcon': {
    fill: 'rgb(255, 255, 255)',
    animation: 'slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
  '& .icon2': {
    width: '10px',
    height: '5px',
    borderBottom: '2px solid rgb(182, 143, 255)',
    borderLeft: '2px solid rgb(182, 143, 255)',
    borderRight: '2px solid rgb(182, 143, 255)',
    transition: 'border-color 0.3s',
  },
  '&:hover .icon2': {
    borderBottom: '2px solid rgb(235, 235, 235)',
    borderLeft: '2px solid rgb(235, 235, 235)',
    borderRight: '2px solid rgb(235, 235, 235)',
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgb(100, 100, 100)',
    cursor: 'not-allowed',
    '& .svgIcon': {
      fill: 'rgb(150, 150, 150)',
    },
    '& .icon2': {
      borderBottom: '2px solid rgb(150, 150, 150)',
      borderLeft: '2px solid rgb(150, 150, 150)',
      borderRight: '2px solid rgb(150, 150, 150)',
    },
  },
  '@keyframes slide-in-top': {
    '0%': {
      transform: 'translateY(-10px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0px)',
      opacity: 1,
    },
  },
}));

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  '& .MuiTooltip-tooltip': {
    backgroundColor: 'rgb(12, 12, 12)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s',
  },
  '& .MuiTooltip-arrow': {
    color: 'rgb(12, 12, 12)',
  },
});

const DownloadIcon = () => (
  <svg
    className="svgIcon"
    viewBox="0 0 384 512"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
  </svg>
);

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

const Mycourse = () => {
  const user = useSelector((state) => state.userdetail); // Renamed to avoid confusion
  const [, setfiltervisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [coursedetail1, setCoursedetail1] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const names = ['Relevance', 'Highly rated', 'most popular', 'Newest'];
  const [personName, setPersonName] = useState('');

  const handlecertificatedownload = async (courseData) => {
    if (courseData.progress !== 100) {
      setSnackbar({ open: true, message: 'Please complete the course to download the certificate.', severity: 'warning' });
      return;
    }

    try {
      setLoading(true); // Start loading

      const response = await axios.post(
        'http://localhost:5000/certificate/generate',
        {
          courseId: courseData.courseid,
          username: user.username,
          courseName: courseData.coursename,
        },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `${courseData.coursename.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      setSnackbar({ open: true, message: error.response?.data?.error || 'Failed to download certificate. Please try again.', severity: 'error' });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const CourseCard = ({ data, index, page }) => {
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
              transform: 'scale(1.05)',
            },
            cursor: 'pointer',
          }}
          elevation={1}
        >
          <img
            onClick={() => navigate('/indiviualcourse', { state: { data: data } })}
            style={{ width: '90%', height: '139px', borderRadius: '20px' }}
            src={`http://localhost:5000/coursethumbnail/${data.coursethumbnail}`}
            alt="img"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
                {data.coursename}
              </Typography>
              <StyledTooltip
                title={data.progress === 100 ? 'Download Certificate' : 'Complete the course to download certificate'}
                placement="right"
                arrow
              >
                <span>
                  <StyledButton
                    onClick={() => handlecertificatedownload(data)}
                    disabled={data.progress !== 100}
                  >
                    <DownloadIcon />
                    <Box className="icon2" />
                  </StyledButton>
                </span>
              </StyledTooltip>
            </Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
              by {data.instructorname}
            </Typography>
            <Rating size="small" value={data.rating} readOnly /> 
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.progress || 0}
                  sx={{
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#1976d2',
                      transition: 'width 1.5s ease-out',
                    },
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#0F172A' }}>
                {Math.round(data.progress || 0)}%
              </Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>
    );
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  useEffect(() => {
    axios
      .post('http://localhost:5000/learning/coursestaken', {
        username: user.username,
      })
      .then((res) => {
        const originalData = res.data;
        const repeatedData = Array(20).fill(originalData).flat();
        setCoursedetail1(repeatedData);
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({ open: true, message: 'Failed to fetch course details.', severity: 'error' });
      });
  }, [user.username]);

  useEffect(() => {
    console.log(coursedetail1, 'data from coursedetail1');
  }, [coursedetail1]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginated = coursedetail1.slice(startIdx, startIdx + itemsPerPage);
    setPaginatedData(paginated);
    setTotalPages(Math.ceil(coursedetail1.length / itemsPerPage));
  }, [coursedetail1, currentPage]);

  const snackbarEl = (
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
  );

  return loading ? (
    <Box
      sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {snackbarEl}
      <Mui3dloading />
    </Box>
  ) : (
    <Box sx={{py:4}}>
      {snackbarEl}
      <Typography sx={{fontSize:'24px',fontWeight:600}}>My courses {coursedetail1.length}</Typography>
      <Box sx={{ width: '100%',height:'48px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',py:4 }}>
        <Box sx={{ width: '20vw', border: '1px solid #334155', borderRadius: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={search} style={{ width: '20px', height: '20px' }} alt="img" />
          <input
            placeholder="search course"
            style={{ width: '89%', border: 'none', height: '40px',outline: 'none' , fontSize: '14px', fontWeight: '500', color: '#64748B' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
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
            <img src={arrow} alt="img" style={{ width: '24px', height: '24px' }} />
            <Typography sx={{ height: 'fit-content', fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Filter</Typography>
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', gap: '20px', flexDirection: 'column'}}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', width: '100%' }}>
          {paginatedData &&
            paginatedData.map((data, index) => (
              <CourseCard
                key={data.courseid ? `${data.courseid}-${index}-${currentPage}` : `${index}-${currentPage}`}
                data={data}
                index={index}
                page={currentPage}
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center',p:2 }}>
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
    </Box>
  );
};

export default Mycourse;