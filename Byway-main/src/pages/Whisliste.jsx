import React, { useState, useEffect } from 'react';
import { Box, Rating, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Userheader from '../components/wrappedcomponent/Userheader'
import Footer from '../components/wrappedcomponent/Footer'


const buttonStyle = {
    position: 'relative',
    height: '50px',
    width: '100%',
    backgroundColor: '#fff',
    border: '2px solid #252525',
    color: '#000',
    transition: 'all 0.5s ease-in-out',
    cursor: 'pointer',
    overflow: 'hidden',
    textTransform: 'none',
    fontWeight: 800,
    letterSpacing: '4px',
    zIndex: 1,
    '&:hover': {
        boxShadow: '1px 1px 50px #252525',
        color: 'white',
        backgroundColor: 'black',
        border: '2px solid #000',
    },
};

const removeButtonStyle = {
    ...buttonStyle,
    '&:hover': {
        boxShadow: '1px 1px 50px #ff0000',
        color: 'white',
        backgroundColor: 'red',
        border: '2px solid #ff0000',
    },
};

const buttonAfterStyle = {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000',
    borderRadius: '30px',
    height: '100%',
    width: '100%',
    zIndex: -1,
    transition: 'all 0.5s ease-in-out',
    transform: 'scale(0)',
    '&:hover': {
        transform: 'scale(1)',
    },
};

const removeButtonAfterStyle = {
    ...buttonAfterStyle,
    backgroundColor: '#ff0000',
};

const headers = () => ({
  py: 3,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap:'30px',
});


const Whisliste = () => {
    const data = useSelector((state) => state.userdetail);
    const [cartCourses, setCartCourses] = useState([]);

    const handleadd = (props) => {
        axios.post('http://localhost:5000/user/cartaddwhisliste', { username: data.username, courseid: props.courseid })
            .then(res => {
                const course = cartCourses.filter((data) => data.courseid !== props.courseid)
                setCartCourses(course)
            })
    }

    const handleRemove = (props) => {
        axios.post('http://localhost:5000/user/wishlistremove', {
            username: data.username,
            courseid: props.courseid
        })
            .then(res => {
                const updatedWishlist = cartCourses.filter(course => course.courseid !== props.courseid);
                setCartCourses(updatedWishlist);
            })
            .catch(err => {
                console.error("Failed to remove from wishlist:", err);
            });
    };

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/user/wishlistget', {
                    username: data.username,
                });
                setCartCourses(response.data);
            } catch (error) {
                console.error('Failed to fetch cart data:', error);
            }
        };

        fetchCartData();
    }, [data.username])

    useEffect(() => {
        console.log(cartCourses)
    }, [cartCourses])

    return (
        <Box>
            <Userheader />
            <Box sx={{ width: '90%', ml: '5%', py: 2 }}>
                <Box sx={{ ...headers() }}>
                    <Typography fontWeight="bold" fontSize="24px">Whisliste</Typography>

                    {/* Styled Breadcrumb Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {[
                            { label: 'Categories', path: '/category' },
                            { label: 'Details', path: '/details' },
                            { label: 'Shopping Cart', path: '/cart' }
                        ].map((item, index, arr) => (
                            <React.Fragment key={item.path}>
                                <Link
                                    to={item.path}
                                    style={{
                                        textDecoration: 'none',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        backgroundColor: window.location.pathname === item.path ? '#000' : '#fff',
                                        color: 'Shopping Cart' === item.label ? '#2563EB' : '#0F172A',
                                        transition: '0.3s',
                                        display: 'inline-block'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = window.location.pathname === item.path ? '#000' : '#fff';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    {item.label}
                                </Link>
                                {index < arr.length - 1 && (
                                    <ArrowForwardIosIcon sx={{ fontSize: '10px', color: '#E2E8F0' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
                {
                    cartCourses && cartCourses.map((data) => {
                        return (
                            <Box
                                key={data._id}
                                sx={{
                                    width: '100%',
                                    height: '40vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    mb: 2,
                                    py: 2,
                                    px: 2,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Box sx={{ width: '20vw', height: '100%' }}>
                                    <img
                                        src={`http://localhost:5000/coursethumbnail/${data.coursethumbnail}`}
                                        alt={data.coursename || 'Course Thumbnail'}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Box>
                                <Box sx={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                            {data.coursename || 'No Name'}
                                        </Typography>
                                        <Typography>${data.price}</Typography>
                                        <Typography>by {data.instructorName}</Typography>
                                        <Box sx={{ display: 'flex', gap: '10px' }}><Typography>{Math.round(data.rating)}</Typography> <Rating value={data.rating || 0} readOnly /><Typography sx={{ fontSize: '14px', fontWeight: 400 }}>22 Total Hours. 155 Lectures. All levels</Typography></Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                        <Button sx={buttonStyle} onClick={() => handleadd(data)}>
                                            <Box sx={buttonAfterStyle} />
                                            Add to cart
                                        </Button>
                                        <Button sx={removeButtonStyle} onClick={() => handleRemove(data)}>
                                            <Box sx={removeButtonAfterStyle} />
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
            <Footer />
        </Box>
    )
}

export default Whisliste