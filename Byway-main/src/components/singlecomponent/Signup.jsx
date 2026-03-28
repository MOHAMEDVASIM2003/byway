import React, { useState, useCallback } from 'react';
import {
  Box, Button, TextField, Typography, InputAdornment, IconButton,
  Divider, CircularProgress, LinearProgress, Snackbar, Alert,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import debounce from 'lodash/debounce';
import facebook from '../../Asstes/facebook.svg';
import google from '../../Asstes/google.svg';
import microsoft from '../../Asstes/microsoft.svg';

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

const strengthConfig = {
  weak:   { value: 33,  color: '#EF4444', label: 'Weak' },
  medium: { value: 66,  color: '#F59E0B', label: 'Medium' },
  strong: { value: 100, color: '#10B981', label: 'Strong' },
};

const checkPasswordStrength = (password) => {
  const hasLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const score = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;
  if (score === 3) return 'strong';
  if (score >= 1) return 'medium';
  return '';
};

const Signup = ({ setloginvisible }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(debounce(async (value) => {
    if (value.length <= 5) {
      setErrors(prev => ({ ...prev, username: 'Must be more than 5 characters' }));
      return;
    }
    setIsCheckingUsername(true);
    try {
      const response = await axios.post('http://localhost:5000/user/username', { username: value });
      if (response.data.exists) {
        setErrors(prev => ({ ...prev, username: 'Username already taken' }));
      } else {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    } catch {
      setErrors(prev => ({ ...prev, username: 'Could not verify username' }));
    } finally {
      setIsCheckingUsername(false);
    }
  }, 500), []);

  const handleUsernameChange = (e) => {
    const v = e.target.value;
    setUsername(v);
    setErrors(prev => ({ ...prev, username: '' }));
    if (v) checkUsername(v);
  };

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    setErrors(prev => ({ ...prev, email: v && !valid ? 'Invalid email format' : '' }));
  };

  const handlePasswordChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    const s = checkPasswordStrength(v);
    setPasswordStrength(s);
    setErrors(prev => ({
      ...prev,
      password: v && s !== 'strong' ? 'Need 8+ chars, a number & special character' : '',
      confirmPassword: confirmPassword && v !== confirmPassword ? 'Passwords do not match' : '',
    }));
  };

  const handleConfirmChange = (e) => {
    const v = e.target.value;
    setConfirmPassword(v);
    setErrors(prev => ({ ...prev, confirmPassword: v !== password ? 'Passwords do not match' : '' }));
  };

  const handleSubmit = async () => {
    setErrors({});
    const newErrors = {};
    if (!firstname) newErrors.firstname = 'Required';
    if (!lastname) newErrors.lastname = 'Required';
    if (!username || username.length <= 5) newErrors.username = 'Must be more than 5 characters';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email required';
    if (!password || checkPasswordStrength(password) !== 'strong') newErrors.password = 'Need 8+ chars, a number & special character';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      const check = await axios.post('http://localhost:5000/user/username', { username });
      if (check.data.exists) { setErrors({ username: 'Username already taken' }); return; }

      const response = await axios.post('http://localhost:5000/user/register', {
        firstname, lastname, username, email, password,
      });
      if (response.status === 200) {
        setFirstname(''); setLastname(''); setUsername('');
        setEmail(''); setPassword(''); setConfirmPassword('');
        setPasswordStrength('');
        setSnackbar({ open: true, message: 'Account created! Please sign in.', severity: 'success' });
        setTimeout(() => setloginvisible(true), 1500);
      }
    } catch (error) {
      setErrors({ form: error.response?.data?.error || 'Registration failed. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const strength = strengthConfig[passwordStrength];

  return (
    <>
      <Snackbar open={snackbar.open} autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: '22px', fontWeight: 700, color: '#0F172A' }}>Create account</Typography>
          <Typography sx={{ fontSize: '14px', color: '#64748B', mt: 0.5 }}>Start your learning journey today</Typography>
        </Box>

        {errors.form && (
          <Box sx={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', p: 1.5 }}>
            <Typography sx={{ color: '#DC2626', fontSize: '13px' }}>{errors.form}</Typography>
          </Box>
        )}

        {/* Name row */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>First Name</Typography>
            <TextField
              fullWidth placeholder="First name" value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!errors.firstname} helperText={errors.firstname}
              size="small" sx={inputStyle}
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 17, color: '#94A3B8' }} /></InputAdornment> }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>Last Name</Typography>
            <TextField
              fullWidth placeholder="Last name" value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!errors.lastname} helperText={errors.lastname}
              size="small" sx={inputStyle}
            />
          </Box>
        </Box>

        {/* Username */}
        <Box>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>Username</Typography>
          <TextField
            fullWidth placeholder="Choose a username" value={username}
            onChange={handleUsernameChange}
            error={!!errors.username} helperText={errors.username}
            size="small" sx={inputStyle}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ fontSize: 17, color: '#94A3B8' }} /></InputAdornment>,
              endAdornment: isCheckingUsername ? <InputAdornment position="end"><CircularProgress size={14} /></InputAdornment> : null,
            }}
          />
        </Box>

        {/* Email */}
        <Box>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>Email</Typography>
          <TextField
            fullWidth placeholder="your@email.com" type="email" value={email}
            onChange={handleEmailChange}
            error={!!errors.email} helperText={errors.email}
            size="small" sx={inputStyle}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ fontSize: 17, color: '#94A3B8' }} /></InputAdornment> }}
          />
        </Box>

        {/* Password row */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>Password</Typography>
            <TextField
              fullWidth placeholder="Password" type={showPassword ? 'text' : 'password'} value={password}
              onChange={handlePasswordChange}
              error={!!errors.password} helperText={errors.password}
              size="small" sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 17, color: '#94A3B8' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(p => !p)} edge="end" size="small">
                      {showPassword ? <VisibilityOffIcon sx={{ fontSize: 16 }} /> : <VisibilityIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {password && strength && (
              <Box sx={{ mt: 0.75 }}>
                <LinearProgress variant="determinate" value={strength.value}
                  sx={{ height: 4, borderRadius: 2, backgroundColor: '#E2E8F0',
                    '& .MuiLinearProgress-bar': { backgroundColor: strength.color } }} />
                <Typography sx={{ fontSize: '11px', color: strength.color, mt: 0.4 }}>{strength.label}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#374151', mb: 0.75 }}>Confirm</Typography>
            <TextField
              fullWidth placeholder="Confirm password" type={showConfirm ? 'text' : 'password'} value={confirmPassword}
              onChange={handleConfirmChange}
              onPaste={(e) => { e.preventDefault(); setErrors(prev => ({ ...prev, confirmPassword: 'Pasting not allowed' })); }}
              error={!!errors.confirmPassword} helperText={errors.confirmPassword}
              size="small" sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ fontSize: 17, color: '#94A3B8' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(p => !p)} edge="end" size="small">
                      {showConfirm ? <VisibilityOffIcon sx={{ fontSize: 16 }} /> : <VisibilityIcon sx={{ fontSize: 16 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Button
          fullWidth onClick={handleSubmit}
          disabled={isSubmitting || isCheckingUsername}
          sx={{
            mt: 0.5, py: 1.4, backgroundColor: '#0F172A', color: '#fff',
            borderRadius: '10px', fontSize: '15px', fontWeight: 600, textTransform: 'none',
            '&:hover': { backgroundColor: '#1E293B' },
            '&:disabled': { backgroundColor: '#94A3B8' },
          }}
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </Button>

        <Divider sx={{ my: 0.5 }}>
          <Typography sx={{ fontSize: '12px', color: '#94A3B8', px: 1 }}>or sign up with</Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {[
            { src: facebook, alt: 'Facebook', color: '#1877F2' },
            { src: google, alt: 'Google', color: '#EA4335' },
            { src: microsoft, alt: 'Microsoft', color: '#00A4EF' },
          ].map(({ src, alt, color }) => (
            <Button key={alt} fullWidth variant="outlined"
              sx={{
                borderColor: '#E2E8F0', borderRadius: '10px', py: 1, gap: 1,
                textTransform: 'none', fontSize: '13px', color: '#374151',
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

export default Signup;
