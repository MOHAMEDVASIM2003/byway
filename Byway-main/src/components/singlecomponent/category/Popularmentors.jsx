import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Rating, Button } from '@mui/material'
import axios from 'axios'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { mockInstructors } from '../../../data/mockData';

const Popularmentors = () => {
    const [topinstructor, setInstructor] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/instructor/allinstructor")
            .then((res) => {
                const data = res.data;
                const duplicatedData = [];
                while (duplicatedData.length < 10) {
                    duplicatedData.push(...data);
                }
                setInstructor(duplicatedData.slice(0, 10));
            })
            .catch(() => {
                console.log('Backend unavailable, using mock instructors');
                setInstructor(mockInstructors);
            });
    }, []);

    const handleToggleView = () => {
        setShowAll(!showAll);
    };

    return (
        <Box sx={{ width: '90vw', ml: '5vw', py: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>Top Instructors</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>Learn from the best educators worldwide</Typography>
                </Box>
                {!showAll && (
                    <Typography
                        sx={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6', cursor: 'pointer', '&:hover': { color: '#2563EB', textDecoration: 'underline' } }}
                        onClick={handleToggleView}
                    >
                        See All
                    </Typography>
                )}
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: '20px',
                mt: 2
            }}>
                {topinstructor.slice(0, showAll ? 10 : 4).map((data, index) => (
                    <Card
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'center',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #F1F5F9',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
                                border: '1px solid #BFDBFE',
                            },
                            cursor: 'pointer',
                        }}
                        elevation={0}
                    >
                        {/* Avatar area */}
                        <Box sx={{
                            width: '100%',
                            height: '140px',
                            background: data.image ? '#f1f5f9' : (data.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {data.image ? (
                                <Box
                                    component="img"
                                    src={`/${data.image}`}
                                    onError={(e) => {
                                        // If public image fails, try backend
                                        if (!e.target.src.includes('localhost')) {
                                            e.target.src = `http://localhost:5000/instructorprofile/${data.image}`;
                                        }
                                    }}
                                    alt={data.name}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Box sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(8px)',
                                    border: '3px solid rgba(255,255,255,0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Typography sx={{ fontSize: '28px', fontWeight: 800, color: '#fff' }}>
                                        {data.initial || (data.name ? data.name[0].toUpperCase() : '?')}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Info */}
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '100%' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', textAlign: 'center' }}>
                                {data.name}
                            </Typography>
                            <Typography sx={{ fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
                                {data.specialty || 'Expert Instructor'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mt: 0.5 }}>
                                <Rating size="small" value={data.rating || 0} readOnly precision={0.1} sx={{ fontSize: '15px' }} />
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#F59E0B' }}>{data.rating || 0}</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                mt: 1,
                                pt: 1.5,
                                borderTop: '1px solid #F1F5F9',
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <PeopleAltOutlinedIcon sx={{ fontSize: 15, color: '#94A3B8' }} />
                                    <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                                        {(data.students || 2400).toLocaleString()} students
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MenuBookIcon sx={{ fontSize: 15, color: '#94A3B8' }} />
                                    <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                                        {data.courses || 5} courses
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
            {showAll && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        variant="text"
                        sx={{ color: '#3B82F6', textTransform: 'none', fontWeight: 600 }}
                        onClick={handleToggleView}
                    >
                        See Less
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Popularmentors
