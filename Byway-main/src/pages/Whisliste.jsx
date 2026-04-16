import React, { useState, useEffect } from 'react';
import { Box, Rating, Typography, Button, Card, Chip, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Userheader from '../components/wrappedcomponent/Userheader'
import Footer from '../components/wrappedcomponent/Footer'
import { mockCourses } from '../data/mockData';

const Whisliste = () => {
    const data = useSelector((state) => state.userdetail);
    const [wishlistCourses, setWishlistCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistData = async () => {
            setIsLoading(true);
            try {
                if (data?.username) {
                    const response = await axios.post('http://localhost:5000/user/wishlistget', {
                        username: data.username,
                    });
                    setWishlistCourses(response.data || []);
                }
            } catch (error) {
                console.log('Backend unavailable, using mock wishlist data');
                // Use first 8 mock courses as wishlist
                setWishlistCourses(mockCourses.slice(0, 8));
            } finally {
                setIsLoading(false);
            }
        };
        fetchWishlistData();
    }, [data?.username]);

    const handleAddToCart = (course) => {
        if (data?.username) {
            axios.post('http://localhost:5000/user/cartaddwhisliste', {
                username: data.username,
                courseid: course.courseid
            })
                .then(res => {
                    handleRemoveFromWishlist(course);
                })
                .catch(err => console.error('Failed to add to cart:', err));
        } else {
            alert('Please login to add courses to cart');
        }
    };

    const handleRemoveFromWishlist = (course) => {
        if (data?.username) {
            axios.post('http://localhost:5000/user/wishlistremove', {
                username: data.username,
                courseid: course.courseid
            })
                .then(res => {
                    setWishlistCourses(wishlistCourses.filter(c => c.courseid !== course.courseid));
                })
                .catch(err => {
                    // Remove locally even if backend fails
                    setWishlistCourses(wishlistCourses.filter(c => c.courseid !== course.courseid));
                    console.error('Failed to remove from wishlist:', err);
                });
        } else {
            setWishlistCourses(wishlistCourses.filter(c => c.courseid !== course.courseid));
        }
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCourse(null);
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Userheader />
            
            <Box sx={{ flex: 1, width: '90%', mx: 'auto', py: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 700, color: '#0F172A', mb: 1 }}>
                        My Wishlist
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#64748B' }}>
                        {wishlistCourses.length} course{wishlistCourses.length !== 1 ? 's' : ''} saved in your wishlist
                    </Typography>
                </Box>

                {/* Empty State */}
                {!isLoading && wishlistCourses.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 8,
                        textAlign: 'center',
                    }}>
                        <FavoriteBorderIcon sx={{ fontSize: '64px', color: '#CBD5E1', mb: 2 }} />
                        <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#0F172A', mb: 1 }}>
                            Your wishlist is empty
                        </Typography>
                        <Typography sx={{ fontSize: '14px', color: '#64748B', mb: 3 }}>
                            Start adding courses to your wishlist and come back to enroll in them later
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                background: '#3B82F6',
                                color: 'white',
                                px: 3,
                                py: 1,
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    background: '#2563EB',
                                }
                            }}
                            component={RouterLink}
                            to="/category"
                        >
                            Explore Courses
                        </Button>
                    </Box>
                ) : (
                    <>
                        {/* Courses Grid */}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                            gap: '20px',
                        }}>
                            {wishlistCourses.map((course, index) => (
                                <Card
                                    key={course.courseid || index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: '1px solid #F1F5F9',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
                                            border: '1px solid #BFDBFE',
                                        },
                                        cursor: 'pointer',
                                        height: '100%',
                                    }}
                                    elevation={0}
                                    onClick={() => handleCourseClick(course)}
                                >
                                    {/* Course Image */}
                                    <Box sx={{
                                        width: '100%',
                                        height: '150px',
                                        background: course.coursethumbnail ? '#f1f5f9' : (course.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}>
                                        {course.coursethumbnail ? (
                                            <Box
                                                component="img"
                                                src={`http://localhost:5000/coursethumbnail/${course.coursethumbnail}`}
                                                onError={(e) => {
                                                    e.target.src = `/${course.courseimage || 'web.jpg'}`;
                                                }}
                                                alt={course.coursename}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : course.courseimage ? (
                                            <Box
                                                component="img"
                                                src={`/${course.courseimage}`}
                                                alt={course.coursename}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <Typography sx={{ fontSize: '44px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                                                {course.icon || '📚'}
                                            </Typography>
                                        )}
                                        {/* Category Badge */}
                                        {course.category && (
                                            <Chip
                                                label={course.category}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: '10px',
                                                    background: 'rgba(255,255,255,0.92)',
                                                    backdropFilter: 'blur(4px)',
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                }}
                                            />
                                        )}
                                        {/* Wishlist Icon */}
                                        <Box
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFromWishlist(course);
                                            }}
                                            sx={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'rgba(255,255,255,0.92)',
                                                backdropFilter: 'blur(4px)',
                                                borderRadius: '50%',
                                                p: 1,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    background: 'rgba(239, 68, 68, 0.9)',
                                                    '& svg': {
                                                        color: 'white',
                                                    }
                                                }
                                            }}
                                        >
                                            <FavoriteIcon sx={{ color: '#EF4444', fontSize: '20px' }} />
                                        </Box>
                                    </Box>

                                    {/* Course Info */}
                                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                        <Typography sx={{
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            color: '#0F172A',
                                            lineHeight: 1.3,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {course.coursename}
                                        </Typography>

                                        <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                            by {course.instructorname || 'Expert Instructor'}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Rating size="small" value={course.rating || 4.5} readOnly precision={0.1} sx={{ fontSize: '14px' }} />
                                            <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                                ({course.totalreview || 0})
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 'auto' }}>
                                            {course.hours || 0}h • {course.lectures || 0} lectures
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 1 }}>
                                            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                                                ${course.price || 0}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Action Buttons */}
                                    <Box sx={{ p: 2, display: 'flex', gap: '8px' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(course);
                                            }}
                                            sx={{
                                                borderColor: '#3B82F6',
                                                color: '#3B82F6',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                py: 1,
                                                '&:hover': {
                                                    borderColor: '#2563EB',
                                                    backgroundColor: 'rgba(59,130,246,0.05)',
                                                }
                                            }}
                                            startIcon={<ShoppingCartIcon sx={{ fontSize: '16px' }} />}
                                        >
                                            Add Cart
                                        </Button>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                    </>
                )}
            </Box>

            <Footer />

            {/* Course Detail Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                {selectedCourse && (
                    <>
                        <DialogTitle sx={{ fontWeight: 700, fontSize: '18px' }}>
                            {selectedCourse.coursename}
                        </DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '12px', py: 2 }}>
                            <Box
                                component="img"
                                src={`/${selectedCourse.courseimage || 'web.jpg'}`}
                                alt={selectedCourse.coursename}
                                sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                onError={(e) => {
                                    e.target.src = `http://localhost:5000/coursethumbnail/${selectedCourse.coursethumbnail}`;
                                }}
                            />
                            <Box>
                                <Typography sx={{ fontSize: '14px', color: '#64748B', mb: 1 }}>
                                    Instructor: <strong>{selectedCourse.instructorname}</strong>
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#64748B', mb: 1 }}>
                                    Category: <strong>{selectedCourse.category}</strong>
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: 1 }}>
                                    <Rating value={selectedCourse.rating || 4.5} readOnly size="small" />
                                    <Typography sx={{ fontSize: '12px', color: '#64748B' }}>
                                        {selectedCourse.rating} ({selectedCourse.totalreview || 0} reviews)
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
                                    ${selectedCourse.price}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '12px' }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={(e) => {
                                        handleAddToCart(selectedCourse);
                                        handleCloseDialog();
                                    }}
                                    sx={{ background: '#3B82F6', textTransform: 'none', fontWeight: 600 }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    onClick={(e) => {
                                        handleRemoveFromWishlist(selectedCourse);
                                        handleCloseDialog();
                                    }}
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default Whisliste;