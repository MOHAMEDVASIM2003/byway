import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initialdata as setUserDetail } from '../../slice/Userdetailslice';
import { initialdata as setUserLearn } from '../../slice/userlearnslice';
import facebook from '../../Asstes/facebook.svg';
import google from '../../Asstes/google.svg';
import microsoft from '../../Asstes/microsoft.svg';
import Radarspinner from '../styledcomponent/Radarspinner';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontSize: '14px',
    backgroundColor: '#F8FAFC',
    '&:hover fieldset': { borderColor: '#94A3B8' },
    '&.Mui-focused fieldset': { borderColor: '#0F172A', borderWidth: '1.5px' },
  },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' },
};

const Login = () => {
  const [userdetail, setUserdetail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setErrors({});
    const newErrors = {};
    if (!userdetail) newErrors.userdetail = 'Username or email is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setShowSpinner(true);
    setIsSubmitting(true);
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:5000/user/login', { userdetail, password });
        if (response.status === 200) {
          dispatch(setUserDetail(response.data.data));
          if (response.data.datalearn) dispatch(setUserLearn(response.data.datalearn));
          setUserdetail('');
          setPassword('');
          navigate('/category');
        }
      } catch (error) {
        setErrors({ form: error.response?.data?.message || 'Login failed. Check your credentials.' });
      } finally {
        setIsSubmitting(false);
        setShowSpinner(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <>
      {showSpinner && (
        <Box sx={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(15,23,42,0.6)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999,
        }}>
          <Radarspinner />
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 700, color: '#0F172A' }}>
            Welcome back
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>
            Sign in to continue learning
          </Typography>
        </Box>

        {errors.form && (
          <Box sx={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', p: 1.5 }}>
            <Typography sx={{ color: '#DC2626', fontSize: '13px' }}>{errors.form}</Typography>
          </Box>
        )}

        <Box>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>
            Email or Username
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email or username"
            value={userdetail}
            onChange={(e) => setUserdetail(e.target.value)}
            onKeyDown={handleKeyDown}
            error={!!errors.userdetail}
            helperText={errors.userdetail}
            size="small"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Password</Typography>
            <Typography sx={{ fontSize: '12px', color: '#3B82F6', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              Forgot password?
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            error={!!errors.password}
            helperText={errors.password}
            size="small"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(p => !p)} edge="end" size="small">
                    {showPassword
                      ? <VisibilityOffIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                      : <VisibilityIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          fullWidth
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            mt: 0.5,
            py: 1.4,
            backgroundColor: '#0F172A',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1E293B' },
            '&:disabled': { backgroundColor: '#94A3B8' },
          }}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <Divider sx={{ my: 0.5 }}>
          <Typography sx={{ fontSize: '12px', color: '#94A3B8', px: 1 }}>or continue with</Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {[
            { src: facebook, alt: 'Facebook', color: '#1877F2' },
            { src: google, alt: 'Google', color: '#EA4335' },
            { src: microsoft, alt: 'Microsoft', color: '#00A4EF' },
          ].map(({ src, alt, color }) => (
            <Button
              key={alt}
              fullWidth
              variant="outlined"
              sx={{
                borderColor: '#E2E8F0',
                borderRadius: '10px',
                py: 1,
                gap: 1,
                textTransform: 'none',
                fontSize: '13px',
                color: '#374151',
                '&:hover': { borderColor: color, background: '#F8FAFC' },
              }}
            >
              <img src={src} alt={alt} style={{ width: 18, height: 18 }} />
              {alt}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Login;
