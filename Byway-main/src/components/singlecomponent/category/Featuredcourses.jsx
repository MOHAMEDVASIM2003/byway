import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Rating, Button, Chip, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { mockCourses } from '../../../data/mockData';
import { useSelector } from 'react-redux';

const Featuredcourses = () => {
    const userdata = useSelector((state) => state.userdetail);
    const [topcourse, setTopcourse] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [wishlist, setWishlist] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/course/coursedetail")
            .then((res) => {
                const data = res.data;
                const duplicatedData = [...data, ...data].slice(0, 10);
                setTopcourse(duplicatedData);
            })
            .catch(() => {
                setTopcourse(mockCourses.slice(0, 10));
            });
    }, []);

    const handleWishlistToggle = (course) => {
        if (!userdata?.username) {
            alert('Please log in to add courses to wishlist');
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
                })
                .catch(err => console.error('Failed to remove from wishlist:', err));
        } else {
            // Add to wishlist
            axios
                .post('http://localhost:5000/user/wishlistadd', {
                    username: userdata.username,
                    courseid: course.courseid,
                })
                .then(() => {
                    setWishlist(prev => ({ ...prev, [course.courseid]: true }));
                })
                .catch(err => console.error('Failed to add to wishlist:', err));
        }
    };

    const handleToggleView = () => {
        setShowAll(!showAll);
    };

    return (
        <Box sx={{ width: '90vw', ml: '5vw', py: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>Top Courses</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>Popular courses loved by thousands of students</Typography>
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
                {topcourse.slice(0, showAll ? 10 : 4).map((data, index) => (
                    <Card
                        key={index}
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
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
                                border: '1px solid #BFDBFE',
                            },
                            cursor: 'pointer',
                        }}
                        elevation={0}
                    >
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
                                <Typography sx={{ fontSize: '44px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                                    {data.icon || '📚'}
                                </Typography>
                            )}
                            {data.category && (
                                <Chip
                                    label={data.category}
                                    size="small"
                                    sx={{
                                        position: 'absolute', top: 10, left: 10,
                                        background: 'rgba(255,255,255,0.92)',
                                        backdropFilter: 'blur(4px)',
                                        fontSize: '11px', fontWeight: 600, color: '#334155',
                                    }}
                                />
                            )}
                            <Tooltip title={wishlist[data.courseid] ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishlistToggle(data);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
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
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <Typography sx={{
                                fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3,
                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            }}>
                                {data.coursename}
                            </Typography>
                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                by {data.instructorname}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Rating size="small" value={data.rating} readOnly precision={0.1} sx={{ fontSize: '14px' }} />
                                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B' }}>{data.rating}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <AccessTimeIcon sx={{ fontSize: 13, color: '#94A3B8' }} />
                                    <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{data.hours || 22}h</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <PeopleAltOutlinedIcon sx={{ fontSize: 13, color: '#94A3B8' }} />
                                    <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{(data.totalbuy || 0).toLocaleString()}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1, borderTop: '1px solid #F1F5F9' }}>
                                <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                                    ${data.price}
                                </Typography>
                                <Chip label={data.level || 'Beginner'} size="small" sx={{ fontSize: '10px', fontWeight: 600, height: '22px', background: '#F1F5F9', color: '#64748B' }} />
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

export default Featuredcourses
