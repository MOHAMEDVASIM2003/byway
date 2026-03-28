import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import Userheader from '../components/wrappedcomponent/Userheader';
import Footer from '../components/wrappedcomponent/Footer';
import axios from 'axios';
import Usercontent from '../components/singlecomponent/profile/Usercontent';
import { useSelector } from 'react-redux';

const Userprofile = () => {
    const loggedInUser = useSelector((state) => state.userdetail);
    const [userdetail, setuserdetail] = useState([]);
    const [userprofile, setuserprofile] = useState([]);
    const [profilevisible, setprofilevisible] = useState(false);
    const [mycoursevisible, setmycoursevisible] = useState(true);
    const [teachersvisible, setteachersvisible] = useState(false);
    const [messagevisible, setmessagevisible] = useState(false);
    const [myreviewvisible, setmyreviewvisible] = useState(false);
    const [activeButton, setActiveButton] = useState('course'); // Default to 'course' since mycoursevisible is true initially

    const handlebutton = (section) => {
        setActiveButton(section);
        switch (section) {
            case 'profile':
                setprofilevisible(true);
                setmycoursevisible(false);
                setteachersvisible(false);
                setmessagevisible(false);
                setmyreviewvisible(false);
                break;
            case 'course':
                setprofilevisible(false);
                setmycoursevisible(true);
                setteachersvisible(false);
                setmessagevisible(false);
                setmyreviewvisible(false);
                break;
            case 'teacher':
                setprofilevisible(false);
                setmycoursevisible(false);
                setteachersvisible(true);
                setmessagevisible(false);
                setmyreviewvisible(false);
                break;
            case 'message':
                setprofilevisible(false);
                setmycoursevisible(false);
                setteachersvisible(false);
                setmessagevisible(true);
                setmyreviewvisible(false);
                break;
            case 'review':
                setprofilevisible(false);
                setmycoursevisible(false);
                setteachersvisible(false);
                setmessagevisible(false);
                setmyreviewvisible(true);
                break;
            default:
                console.warn(`Unknown section: ${section}`);
        }
    };

    useEffect(() => {
        if (!loggedInUser.username) return;
        axios.post("http://localhost:5000/user/userget", { username: loggedInUser.username })
            .then((res) => setuserdetail(res.data))
            .catch(err => console.error('Failed to fetch user:', err));
        axios.post("http://localhost:5000/user/profileget", { username: loggedInUser.username })
            .then((res) => setuserprofile(res.data))
            .catch(err => console.error('Failed to fetch profile:', err));
    }, [loggedInUser.username]);

    useEffect(() => {
        console.log(userprofile, 'hello');
    }, [userprofile]);

    // Base button style
    const baseButtonStyle = {
        width: '200px',
        textAlign: 'left', // Changed from 'start' to 'left' for explicit text alignment
        justifyContent: 'flex-start', // Ensure content is left-aligned
        px: 2,
        textTransform: 'none',
        transition: 'all 0.3s ease-in-out',
    };

    return (
        <Box>
            <Userheader />
            <Box sx={{ width: '90vw', ml: '5%', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2, gap: '10px' }}>
                    <Avatar
                        style={{ width: '160px', height: '160px' }}
                        src={`http://localhost:5000/userprofile/${userprofile.image}`}
                        alt="User Profile"
                    />
                    <Button
                        onClick={() => handlebutton('profile')}
                        sx={{
                            ...baseButtonStyle,
                            backgroundColor: activeButton === 'profile' ? '#000' : '#fff',
                            color: activeButton === 'profile' ? '#fff' : '#000',
                            '&:hover': {
                                backgroundColor: activeButton === 'profile' ? '#000' : '#C19A6B',
                                color: activeButton === 'profile' ? '#fff' : '#000',
                            },
                        }}
                    >
                        Profile
                    </Button>
                    <Button
                        onClick={() => handlebutton('course')}
                        sx={{
                            ...baseButtonStyle,
                            backgroundColor: activeButton === 'course' ? '#000' : '#fff',
                            color: activeButton === 'course' ? '#fff' : '#000',
                            '&:hover': {
                                backgroundColor: activeButton === 'course' ? '#000' : '#C19A6B',
                                color: activeButton === 'course' ? '#fff' : '#000',
                            },
                        }}
                    >
                        My Courses
                    </Button>
                    <Button
                        onClick={() => handlebutton('teacher')}
                        sx={{
                            ...baseButtonStyle,
                            backgroundColor: activeButton === 'teacher' ? '#000' : '#fff',
                            color: activeButton === 'teacher' ? '#fff' : '#000',
                            '&:hover': {
                                backgroundColor: activeButton === 'teacher' ? '#000' : '#C19A6B',
                                color: activeButton === 'teacher' ? '#fff' : '#000',
                            },
                        }}
                    >
                        Teachers
                    </Button>
                    <Button
                        onClick={() => handlebutton('message')}
                        sx={{
                            ...baseButtonStyle,
                            backgroundColor: activeButton === 'message' ? '#000' : '#fff',
                            color: activeButton === 'message' ? '#fff' : '#000',
                            '&:hover': {
                                backgroundColor: activeButton === 'message' ? '#000' : '#C19A6B',
                                color: activeButton === 'message' ? '#fff' : '#000',
                            },
                        }}
                    >
                        Message
                    </Button>
                    <Button
                        onClick={() => handlebutton('review')}
                        sx={{
                            ...baseButtonStyle,
                            backgroundColor: activeButton === 'review' ? '#000' : '#fff',
                            color: activeButton === 'review' ? '#fff' : '#000',
                            '&:hover': {
                                backgroundColor: activeButton === 'review' ? '#000' : '#C19A6B',
                                color: activeButton === 'review' ? '#fff' : '#000',
                            },
                        }}
                    >
                        My Reviews
                    </Button>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Usercontent
                        userdetail={userdetail}
                        userprofile={userprofile}
                        messagevisible={messagevisible}
                        myreviewvisible={myreviewvisible}
                        teachersvisible={teachersvisible}
                        mycoursevisible={mycoursevisible}
                        profilevisible={profilevisible}
                    />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Userprofile;