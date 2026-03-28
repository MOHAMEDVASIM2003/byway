import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import play from '../../../Asstes/play.svg';
import graduation from '../../../Asstes/graduation.svg';
import review1 from '../../../Asstes/review.svg';
import axios from 'axios';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const Coursedescription = ({ coursedata, instructordetail }) => {
  const [syllabus, setSyllabus] = useState(null);
  const [syllabusOpen, setSyllabusOpen] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const descriptionRef = useRef(null);
  const instructorRef = useRef(null);
  const syllabusRef = useRef(null);
  const reviewRef = useRef(null);

  const handleScrollTo = (ref, tabName) => {
    setActiveTab(tabName);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleinstructor = (props) => {
    navigate('/instructor', { state: { id: props.id } });
  };

  // Fetch syllabus
  useEffect(() => {
    if (coursedata?.courseid) {
      axios
        .post('http://localhost:5000/syllabus/syllabusindiviualget', { courseid: coursedata.courseid })
        .then((res) => setSyllabus(res.data || { syllabus: [] }))
        .catch((err) => {
          console.error('Failed to fetch syllabus:', err);
          setSyllabus({ syllabus: [] });
        });
    }
  }, [coursedata?.courseid]);

  // Initialize syllabus open/close state
  useEffect(() => {
    if (syllabus?.syllabus) {
      const data = Array.isArray(syllabus.syllabus)
        ? syllabus.syllabus.map((item) => ({ section: item.section, isopen: false }))
        : [];
      setSyllabusOpen(data);
    }
  }, [syllabus]);

  

  const visibleArrow = (section) => {
    const item = syllabusOpen.find((data) => data.section === section);
    return item ? item.isopen : false;
  };

  const toggleSection = (section) => {
    setSyllabusOpen((prev) =>
      prev.map((item) =>
        item.section === section ? { ...item, isopen: !item.isopen } : item
      )
    );
  };

  if (!coursedata) {
    return <Typography>Loading course description...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ py: 4 }}>
        {/* Scroll Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {[
            { label: 'Description', key: 'description', ref: descriptionRef },
            { label: 'Instructor', key: 'instructor', ref: instructorRef },
            { label: 'Syllabus', key: 'syllabus', ref: syllabusRef },
            { label: 'Reviews', key: 'reviews', ref: reviewRef },
          ].map(({ label, key, ref }) => (
            <Button
              key={key}
              onClick={() => handleScrollTo(ref, key)}
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                px: 2,
                py: 1,
                backgroundColor: activeTab === key ? '#000' : '#fff',
                color: activeTab === key ? '#fff' : '#000',
                border: '1px solid #000',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backdropFilter: 'blur(4px)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Description */}
        <Box ref={descriptionRef} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Course Description
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#424242' }}>
            {coursedata.description || 'No description available.'}
          </Typography>
        </Box>

        {/* Certification */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Certification
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#424242' }}>
            After completing this course, you’ll receive a certificate from Byway that verifies your learning.
          </Typography>
        </Box>

        {/* Instructor */}
        {instructordetail?.[0] && (
          <Box ref={instructorRef} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Instructor
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {instructordetail[0].name || 'Unknown Instructor'}
            </Typography>
            <Typography sx={{ mb: 2, fontSize: '14px', color: '#757575' }}>
              {instructordetail[0].label || 'No title available'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                onClick={() => handleinstructor(instructordetail[0])}
                sx={{ width: 120, height: 120, mr: 2 }}
                src={
                  instructordetail[0].image
                    ? `http://localhost:5000/instructorprofile/${instructordetail[0].image}`
                    : undefined
                }
                alt="instructor"
              />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img style={{ width: 24, height: 24 }} src={review1} alt="review" />
                  <Typography sx={{ fontSize: 12, color: '#757575', ml: 1 }}>
                    {instructordetail[0].reviews || '0 Reviews'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img style={{ width: 24, height: 24 }} src={graduation} alt="graduation" />
                  <Typography sx={{ fontSize: 12, color: '#757575', ml: 1 }}>
                    {coursedata.totalbuy || '0 Students'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img style={{ width: 24, height: 24 }} src={play} alt="play" />
                  <Typography sx={{ fontSize: 12, color: '#757575', ml: 1 }}>
                    {instructordetail[0].courses?.length || '0 Courses'}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '16px', color: '#424242' }}>
              {instructordetail[0].professionalexperience || 'No experience details available.'}
            </Typography>
          </Box>
        )}

        {/* Syllabus */}
        <Box ref={syllabusRef}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Syllabus
          </Typography>
          {syllabus?.syllabus?.length > 0 ? (
            syllabus.syllabus.map((data) => (
              <Box key={data.section} sx={{ mb: 2 }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', mb: 1 }}
                  onClick={() => toggleSection(data.section)}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {visibleArrow(data.section) ? <ExpandLessIcon Costello /> : <ExpandMoreIcon />}
                    <Typography sx={{ fontWeight: 'bold' }}>{data.section}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '14px', color: '#757575' }}>
                    {data.lessons.length} lessons
                  </Typography>
                </Box>
                {visibleArrow(data.section) && (
                  <Box sx={{ pl: 4 }}>
                    {data.lessons.map((lesson, index) => (
                      <Typography key={index} sx={{ fontSize: '14px', mb: 1, color: '#424242' }}>
                        {lesson.lesson}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography>No syllabus available</Typography>
          )}
        </Box>

        {/* Reviews */}
        <Box ref={reviewRef} sx={{ mt: 4, width: '60vw' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', }}>
            Reviews
          </Typography>
         
        </Box>
      </Box>
    </Box>
  );
};

export default Coursedescription;