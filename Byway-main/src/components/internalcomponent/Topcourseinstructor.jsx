import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Rating, Button } from '@mui/material'
import axios from 'axios'



const Topcourseinstructor = () => {
    const [topcourse, setTopcourse] = useState([]);
    const [showAll, setShowAll] = useState(false);
    

    useEffect(() => {
        axios.get("http://localhost:5000/course/coursedetail")
            .then((res) => {
                // Duplicate the data to ensure at least 10 items
                const data = res.data;
                const duplicatedData = [...data, ...data].slice(0, 10); // Take first 10 items
                setTopcourse(duplicatedData);
            })
            .catch((err) => console.error('Failed to fetch courses:', err));
    }, []);

    useEffect(() => {
        console.log(topcourse);
    }, [topcourse]);

    const styledhead = () => ({
        fontSize: '24px',
        fontWeight: 600,
        color: '#0F172A',
        p: 1
    });

    const styledsee = () => ({
        fontSize: '14px',
        fontWeight: 500,
        height: 'fit-content',
        color: '#3B82F6',
        p: 1,
        cursor: 'pointer',
        textDecoration: 'underline'
    });

    const handleToggleView = () => {
        setShowAll(!showAll);
    };

    return (
        <Box sx={{ width: '95vw', py: 4, display: 'flex', flexDirection: 'column', background: '#F8FAFC', px: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={styledhead()}>More Course By Ronald Richard</Typography>
                {!showAll && (
                    <Typography sx={styledsee()} onClick={handleToggleView}>
                        See All
                    </Typography>
                )}
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                mt: 2
            }}>
                {topcourse && topcourse.slice(0, showAll ? 10 : 4).map((data, index) => (
                    <Card
                        key={index}
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
                        {data.coursethumbnail ? (
                            <img
                                style={{ width: '90%', height: '139px', borderRadius: '20px', objectFit: 'cover' }}
                                src={`http://localhost:5000/coursethumbnail/${data.coursethumbnail}`}
                                alt="course thumbnail"
                            />
                        ) : data.courseimage ? (
                            <img
                                style={{ width: '90%', height: '139px', borderRadius: '20px', objectFit: 'cover' }}
                                src={`/${data.courseimage}`}
                                alt="course thumbnail"
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: '90%',
                                    height: '139px',
                                    borderRadius: '20px',
                                    background: data.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                }}
                            >
                                {data.icon || '📚'}
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '8px' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
                                {data.coursename}
                            </Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
                                by {data.instructorname}
                            </Typography>
                            <Rating size="small" value={data.rating} readOnly />
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
                                22 Total Hours. 155 Lectures. Beginner
                            </Typography>
                            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
                                ${data.price}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
            {showAll && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        variant="text"
                        sx={{ color: '#3B82F6', textTransform: 'none' }}
                        onClick={handleToggleView}
                    >
                        See Less
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Topcourseinstructor;