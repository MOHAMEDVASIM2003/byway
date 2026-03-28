import React, { useState } from 'react';
import { Box, Typography, Drawer, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../Asstes/logo.svg';
import search from '../../Asstes/headersearch.svg';
import { useNavigate } from 'react-router-dom';

const Landingheader = (props) => {
  const navigate = useNavigate();
  const { setloginvisible } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlenav = (type) => {
    setloginvisible(type === 'login');
    navigate('/auth');
    setDrawerOpen(false);
  };

  return (
    <>
      <style>{`
        .fancy-btn {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          user-select: none;
          touch-action: manipulation;
          font-size: 14px;
          font-weight: 500;
        }
        .fancy-btn .shadow {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 12px;
          background: hsl(0deg 0% 0% / 0.25);
          will-change: transform;
          transform: translateY(2px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }
        .fancy-btn .edge {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          border-radius: 12px;
          background: linear-gradient(to left,
            hsl(340deg 100% 16%) 0%,
            hsl(340deg 100% 32%) 8%,
            hsl(340deg 100% 32%) 92%,
            hsl(340deg 100% 16%) 100%
          );
        }
        .fancy-btn .front {
          display: block; position: relative;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: inherit; font-weight: inherit;
          color: white;
          background: hsl(345deg 100% 47%);
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }
        .fancy-btn:hover { filter: brightness(110%); }
        .fancy-btn:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        .fancy-btn:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }
        .fancy-btn:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }
        .fancy-btn:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }
        .fancy-btn:focus:not(:focus-visible) { outline: none; }
      `}</style>

      <Box sx={{
        width: '100%',
        height: { xs: '64px', md: '72px' },
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #E2E8F0',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}>
        <Box sx={{
          width: '100%',
          px: { xs: 2, sm: 4, md: 8 },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} style={{ width: '28px', height: '36px' }} alt='logo' />
            <Typography sx={{ fontSize: '18px', color: '#0F172A', fontWeight: 700, letterSpacing: '-0.3px' }}>
              Byway
            </Typography>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', alignItems: 'center', gap: '24px', flex: 1 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer', '&:hover': { color: '#3B82F6' }, transition: 'color 0.2s' }}>
              Categories
            </Typography>

            <Box sx={{
              flex: 1, maxWidth: '420px',
              border: '1.5px solid #E2E8F0',
              borderRadius: '10px',
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              px: 1.5, py: 0.5,
              background: '#F8FAFC',
              '&:focus-within': { borderColor: '#3B82F6', background: '#fff' },
              transition: 'all 0.2s',
            }}>
              <img src={search} style={{ width: '18px', height: '18px', opacity: 0.5 }} alt='search' />
              <input
                placeholder='Search courses...'
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '14px', fontWeight: 400, color: '#0F172A', outline: 'none', padding: '6px 8px' }}
              />
            </Box>

            <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { color: '#3B82F6' }, transition: 'color 0.2s' }}>
              Teach on Byway
            </Typography>
          </Box>

          {/* Desktop buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: '12px', alignItems: 'center' }}>
            <button className="fancy-btn" onClick={() => handlenav('login')}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Log In</span>
            </button>
            <button className="fancy-btn" onClick={() => handlenav('sign')}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Sign Up</span>
            </button>
          </Box>

          {/* Mobile: buttons + hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: '8px' }}>
            <button className="fancy-btn" style={{ fontSize: '12px' }} onClick={() => handlenav('login')}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Log In</span>
            </button>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#334155' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <List>
            {['Categories', 'Teach on Byway'].map(text => (
              <ListItem key={text} button onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={text} primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }} />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem button onClick={() => handlenav('login')}>
              <ListItemText primary="Log In" primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#E11D48' }} />
            </ListItem>
            <ListItem button onClick={() => handlenav('sign')}>
              <ListItemText primary="Sign Up" primaryTypographyProps={{ fontSize: '14px', fontWeight: 600, color: '#E11D48' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Landingheader;
