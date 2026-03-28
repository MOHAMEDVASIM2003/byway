import React,{useState,useEffect,useRef} from 'react'
import { Box ,Typography,Card,Rating} from '@mui/material';

import Footer from '../components/wrappedcomponent/Footer';
import Indiviualcoursecontent from '../components/singlecomponent/Indiviualcourse/Indiviualcoursecontent';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Indiviualheader from '../components/wrappedcomponent/Indiviualheader';
import LandingComment from '../components/singlecomponent/Landingcomment';
import Topcourseinstructor from '../components/internalcomponent/Topcourseinstructor';
import StarIcon from '@mui/icons-material/Star';
import janeimg from '../Asstes/janeimg.jpg'
import axios from 'axios';
const Indiviualcourse = () => {
  const location = useLocation();
  const data = location.state.data.courseid;
  const user = useSelector((state) => state.userdetail)
  console.log(data, user, "hai");
  const reviewRef = useRef(1);
  const [review, setreview] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/review/getall')
      .then((res) => setreview(res.data))
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);
  useEffect(() => {
    console.log(review, 'review')
  }, [review])
  return (
    <Box>
      <Indiviualheader courseid={data} />
      <Indiviualcoursecontent username={user.username} courseid={data} coursename={location.state.data.coursename} />
      <Box sx={{ px: 8, mt: '-25px' }}>
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
      <Topcourseinstructor />
      <LandingComment />
      <Footer />
    </Box>
  )
}

export default Indiviualcourse