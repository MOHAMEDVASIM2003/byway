

import Userheader from '../components/wrappedcomponent/Userheader'
import Footer from '../components/wrappedcomponent/Footer'
import Instructordetail from '../components/singlecomponent/Instructor/Instructordetail'

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Rating, Card } from '@mui/material';

import axios from 'axios';

import StarIcon from '@mui/icons-material/Star';
import janeimg from '../Asstes/janeimg.jpg'

const Instructorprofile = () => {
    const [review, setreview] = useState([]);
      const reviewRef = useRef(null);
    useEffect(() => {
        axios.get('http://localhost:5000/review/getall')
            .then((res) => setreview(res.data))
            .catch((err) => console.error('Failed to fetch reviews:', err));
    }, []);
    useEffect(() => {
        console.log(review, 'review')
    }, [review])
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            '& *': {
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }
            }
        }}>
            <Userheader />
            <Instructordetail />
            <Box sx={{ width: '90vw',ml:'5%' }}>
                <Box ref={reviewRef} sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Learner Reviews
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '30px' }}>
                        <Box sx={{width:'300px'}}>
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
            <Footer />
        </Box>
    )
}

export default Instructorprofile