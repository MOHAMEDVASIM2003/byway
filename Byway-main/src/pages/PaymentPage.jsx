import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { newcourse } from '../slice/userlearnslice';
import { useDispatch } from 'react-redux';
import Loading from '../components/styledcomponent/Loading';
import { useNavigate } from 'react-router-dom';
const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { username, courseid, coursename, price, thumbnail, gradient, icon, category } = location.state || {};
  const navigate=useNavigate();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [coupon, setCoupon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const discount = 10;
  const tax = 20;
  const total = price - discount + tax;

  // eslint-disable-next-line no-unused-vars
  const handlePayment = async () => {
    const res = await axios.post('http://localhost:5000/payment/create-order', {
      username,
      courseid,
      amount: total
    });

    const cashfree = new window.Cashfree(res.data.payment_session_id);
    cashfree.redirect();
  };

  const handlenewcourse = async () => {
    setIsLoading(true); // Show loading animation
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    try {
      const res = await axios.post('http://localhost:5000/learning/newcourse', {
        holdername: username,
        courseid,
      });
      if (res) {
        dispatch(newcourse(res.data.coursedata));
        setSnackbar({ open: true, message: res.data.message || 'Course added successfully!', severity: 'success' });
        setTimeout(() => navigate('/category'), 1500);
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setSnackbar({ open: true, message: 'Failed to add course', severity: 'error' });
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 4, gap: 4, position: 'relative' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(s => ({ ...s, open: false }))} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          }}
        >
          <Loading />
        </Box>
      )}

      {/* Left: Payment Form */}
      <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 2, p: 3 }}>
        <Typography variant="h6" gutterBottom>Checkout Page</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth />
          <TextField label="State/Union Territory" value={state} onChange={(e) => setState(e.target.value)} fullWidth />
        </Box>
        <Typography variant="subtitle1" gutterBottom>Payment Method</Typography>
        <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2, mb: 2 }}>
          <Typography fontWeight={600}>Credit/Debit Card</Typography>
          <TextField label="Name of Card" fullWidth sx={{ my: 1 }} />
          <TextField label="Card Number" fullWidth sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Expiry Date" fullWidth />
            <TextField label="CVC/CVV" fullWidth />
          </Box>
        </Box>
        <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
          <Typography fontWeight={600}>PayPal</Typography>
        </Box>
      </Box>

      {/* Right: Order Summary */}
      <Box sx={{ width: 350 }}>
        <Typography variant="h6">Order Details</Typography>
        <Card sx={{ display: 'flex', flexDirection: 'column', p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {thumbnail ? (
              <img src={thumbnail} alt="thumbnail" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
            ) : (
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '8px',
                background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Typography sx={{ fontSize: '32px' }}>{icon || '📚'}</Typography>
              </Box>
            )}
            <Box>
              <Typography color="primary" sx={{ fontSize: '13px' }}>{category || 'Course'}</Typography>
              <Typography fontWeight={600}>{coursename}</Typography>
              <Typography variant="body2">${price}</Typography>
            </Box>
          </Box>
        </Card>

        <TextField
          label="Apply Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 1 }}><Typography>Price: ${price}.00</Typography></Box>
        <Box sx={{ mb: 1 }}><Typography>Discount: -${discount}.00</Typography></Box>
        <Box sx={{ mb: 1 }}><Typography>Tax: ${tax}.00</Typography></Box>
        <Box sx={{ mb: 2 }}><Typography fontWeight={600}>Total: ${total}.00</Typography></Box>

        <Button fullWidth variant="contained" onClick={handlenewcourse} disabled={isLoading}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;