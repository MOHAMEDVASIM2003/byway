import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  List,
  ListItem,
  Paper,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  PlayCircleOutline,
  ExpandMore,
  AccessTime
} from '@mui/icons-material';
import axios from 'axios';
import Coursedescription from '../Course/Coursedescription';

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Individualcoursecontent = ({ username, courseid, coursename }) => {
  const [coursestatus, setCoursestatus] = useState(null);
  const [coursedetail, setCoursedetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 });
  const [error, setError] = useState('');
  const [updatingVideo, setUpdatingVideo] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [coursedata, setcoursedata] = useState(null);
  const videoRef = useRef(null);
  const [instructordata, setinstructordata] = useState();

  const fetchCourseData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [res1, res2] = await Promise.all([
        axios.post(`${API_BASE_URL}/learning/courseget`, { username, courseid }),
        axios.post(`${API_BASE_URL}/syllabus/syllabusindiviualget`, { courseid }),
      ]);
      console.log('Course Status Response:', res1.data); // Debug log
      console.log('Course Detail Response:', res2.data); // Debug log
      setCoursestatus(res1.data);
      setCoursedetail(res2.data);
      if (res1.data.progress) setProgress(res1.data.progress);
      if (res2.data?.syllabus) {
        const sections = res2.data.syllabus.map(item => item.section);
        setExpandedSections(sections);
      }
    } catch (err) {
      setError(`Failed to fetch course data: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [username, courseid]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  useEffect(() => {
    axios.post("http://localhost:5000/course/courseindiviual", { courseid: courseid })
      .then((res) => {

        setcoursedata(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch course:', err);
      })

  }, [courseid])
  useEffect(() => {
    console.log(coursedata, 'course')
    if (coursedata !== null) {
      axios.post("http://localhost:5000/instructor/instructorgetdetail", { instructorid: coursedata.instructorid })
        .then((res) => {

          setinstructordata(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch instructor:', err);
        })
    }
  }, [coursedata])
  useEffect(() => {
    console.log(instructordata, 'instructor')
  }, [instructordata])

  const handleVideoComplete = async (section, lesson) => {
    const videoKey = `${section}-${lesson}`;
    setUpdatingVideo(videoKey);
    try {
      const response = await axios.post(`${API_BASE_URL}/learning/markVideoViewed`, {
        username,
        courseid,
        section,
        lesson,
      });
      console.log('Mark Video Completed Response:', response.data); // Debug log
      if (response.data.progress) setProgress(response.data.progress);
      await fetchCourseData();
    } catch (err) {
      setError(err.response?.data?.isCompleted
        ? 'This lesson has already been completed.'
        : `Failed to update lesson status: ${err.response?.data?.error || err.message}`);
    } finally {
      setUpdatingVideo(null);
    }
  };

  const handleVideoEnd = () => currentVideo && handleVideoComplete(currentVideo.section, currentVideo.lesson);

  const playVideo = (lesson) => {
    console.log('Playing video:', lesson); // Debug log
    setCurrentVideo(lesson);
  };

  const getVideoUrl = (coursecontent) => coursecontent
    ? `${API_BASE_URL}/${coursecontent.replace(/\\/g, '/')}`
    : '';

  const isVideoCompleted = useCallback((section, lesson) => {
    const completed = coursestatus?.courseid?.coursestatus?.some(
      item => item.section === section && item.lesson === lesson && item.completed
    ) || false;
    console.log(`isVideoCompleted(${section}, ${lesson}):`, completed); // Debug log
    return completed;
  }, [coursestatus]);

  const formatDuration = (lesson) => {
    if (lesson?.lessonduration) {
      return typeof lesson.lessonduration === 'number'
        ? `${lesson.lessonduration}min`
        : lesson.lessonduration.includes('min')
          ? lesson.lessonduration
          : `${lesson.lessonduration}min`;
    }
    return 'N/A';
  };

  const groupedLessons = useMemo(() => {
    if (!coursedetail?.syllabus) {
      console.log('No syllabus data available'); // Debug log
      return {};
    }
    const result = coursedetail.syllabus.reduce((acc, { section, lessons }) => {
      acc[section] = lessons.map(lesson => ({
        ...lesson,
        section,
        completed: isVideoCompleted(section, lesson.lesson)
      }));
      return acc;
    }, {});
    console.log('Grouped Lessons:', result); // Debug log
    return result;
  }, [coursedetail, isVideoCompleted]);

  const handleAccordionChange = (section) => (event, isExpanded) => {
    setExpandedSections(isExpanded
      ? [...expandedSections, section]
      : expandedSections.filter(s => s !== section));
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ ml: 2 }}>Loading course content...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ p: 3 }}>
      <Alert
        severity="error"
        action={<Button onClick={fetchCourseData}>Retry</Button>}
        onClose={() => setError('')}
      >
        {error}
      </Alert>
    </Box>
  );

  if (!coursedetail?.syllabus?.length) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No lessons available for this course.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '95vw', mx: 'auto', p: 3, display: 'flex', flexDirection: 'row' }}>
      {/* Left Side - Video Player Section */}

      <Box sx={{ width: '70vw', mr: 2 }}>
        <Typography sx={{ p: 2,fontSize:'24px',fontWeight:600 }}>{coursename}</Typography>
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 2, height: '80vh' }}>
          {currentVideo ? (
            <Box sx={{ height: '60vh' }}>
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls
                onEnded={handleVideoEnd}
                style={{ display: 'block', objectFit: 'contain' }}
              >
                <source src={getVideoUrl(currentVideo.coursecontent)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{fontSize:'24px',fontWeight:600}} gutterBottom>{currentVideo.lesson}</Typography>
                <Typography variant="body2" color="text.secondary">Section: {currentVideo.section}</Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', height: '80vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center"
                alt="Course Preview"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                <PlayCircleOutline sx={{ fontSize: 60, mb: 1 }} />
                <Typography variant="subtitle1">Select a lesson to start learning</Typography>
              </Box>

            </Box>
          )}
        </Paper>
        <Coursedescription coursedata={coursedata} instructordetail={instructordata} />
      </Box>

      {/* Right Side - Course Info and Completion */}
      <Box sx={{ width: '30vw', height: 'fit-content', display: 'flex', flexDirection: 'column', py: 4 }}>
        <Card elevation={2} sx={{ flex: 3, overflow: 'auto' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Course Completion</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Progress: {progress.percentage}% ({progress.completed}/{progress.total} lessons)
            </Typography>
            {Object.entries(groupedLessons).map(([section, lessons]) => (
              <Accordion
                key={section}
                expanded={expandedSections.includes(section)}
                onChange={handleAccordionChange(section)}
                sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1">{section}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List dense>
                    {lessons.map((lesson, index) => {
                      const videoKey = `${lesson.section}-${lesson.lesson}`;
                      const isUpdating = updatingVideo === videoKey;
                      return (
                        <ListItem
                          key={`${section}-${index}`}
                          sx={{ pl: 2, '&:hover': { backgroundColor: '#f5f5f5' }, cursor: 'pointer' }}
                          onClick={() => playVideo(lesson)}
                        >
                          <Checkbox
                            checked={lesson.completed}
                            disabled
                            sx={{
                              mr: 1,
                              color: '#ccc',
                              '&.Mui-checked': { color: '#1976d2' },
                              '&.Mui-disabled.Mui-checked': { color: '#1976d2' }
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: lesson.completed ? 'bold' : 'normal', color: lesson.completed ? '#1976d2' : 'inherit' }}
                          >
                            {index + 1}. {lesson.lesson}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            <AccessTime sx={{ fontSize: 12, mr: 0.5 }} />{formatDuration(lesson)}
                          </Typography>
                          {isUpdating && <CircularProgress size={16} sx={{ ml: 1 }} />}
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Individualcoursecontent;