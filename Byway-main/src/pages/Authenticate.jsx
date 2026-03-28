import React from 'react';
import { Box, Typography, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from '../components/singlecomponent/Login';
import Signup from '../components/singlecomponent/Signup';
import logo from '../Asstes/logo.svg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const features = [
  'Access 400+ expert-led courses',
  'Learn at your own pace, anywhere',
  'Earn certificates recognized by employers',
  'Join 30,000+ learners worldwide',
];

const stats = [
  { icon: <MenuBookIcon sx={{ fontSize: 20 }} />, value: '400+', label: 'Courses' },
  { icon: <PeopleIcon sx={{ fontSize: 20 }} />, value: '30K+', label: 'Students' },
  { icon: <SchoolIcon sx={{ fontSize: 20 }} />, value: '50+', label: 'Instructors' },
];

const Authenticate = (props) => {
  const { loginvisible, setloginvisible } = props;
  const navigate = useNavigate();
  const tab = loginvisible ? 0 : 1;

  const handleTab = (_, newVal) => {
    setloginvisible(newVal === 0);
  };

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
    }}>
      {/* Left Panel */}
      <Box sx={{
        width: { xs: '100%', md: '42%' },
        minHeight: { xs: '220px', md: '100vh' },
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 4, md: 6 },
        py: { xs: 4, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <Box sx={{
          position: 'absolute', top: -80, right: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(59,130,246,0.08)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'rgba(16,185,129,0.07)',
        }} />

        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 3, md: 5 } }}
          onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Byway" style={{ width: 32, height: 40 }} />
          <Typography sx={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Byway
          </Typography>
        </Box>

        <Typography sx={{ color: '#fff', fontSize: { xs: '24px', md: '32px' }, fontWeight: 700, lineHeight: 1.25, mb: 1.5 }}>
          Expand Your Knowledge,<br />Advance Your Career
        </Typography>
        <Typography sx={{ color: '#94A3B8', fontSize: '15px', mb: { xs: 2, md: 4 }, lineHeight: 1.7 }}>
          Join thousands of learners building real skills with world-class instructors.
        </Typography>

        {/* Features */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: { xs: 3, md: 5 } }}>
          {features.map((f) => (
            <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckCircleOutlineIcon sx={{ color: '#10B981', fontSize: 20, flexShrink: 0 }} />
              <Typography sx={{ color: '#CBD5E1', fontSize: '14px' }}>{f}</Typography>
            </Box>
          ))}
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: { xs: 3, md: 4 } }}>
          {stats.map(({ icon, value, label }) => (
            <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ color: '#3B82F6' }}>{icon}</Box>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>{value}</Typography>
              <Typography sx={{ color: '#64748B', fontSize: '12px' }}>{label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right Panel */}
      <Box sx={{
        flex: 1,
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, md: 6 },
        overflowY: 'auto',
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 480,
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}>
          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleTab}
            variant="fullWidth"
            sx={{
              borderBottom: '1px solid #E2E8F0',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '15px',
                color: '#64748B',
                py: 2,
              },
              '& .Mui-selected': { color: '#0F172A' },
              '& .MuiTabs-indicator': { backgroundColor: '#0F172A', height: 3 },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* Form content */}
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            {loginvisible
              ? <Login />
              : <Signup setloginvisible={setloginvisible} />
            }
          </Box>
        </Box>

        <Typography sx={{ mt: 3, fontSize: '13px', color: '#94A3B8', textAlign: 'center' }}>
          By continuing, you agree to Byway's Terms of Service and Privacy Policy.
        </Typography>
      </Box>
    </Box>
  );
};

export default Authenticate;
