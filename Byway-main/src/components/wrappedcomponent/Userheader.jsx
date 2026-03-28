import React, { useState } from 'react';
import {
  Box, Typography, Badge, Drawer, IconButton,
  List, ListItem, ListItemText, ListItemIcon,
  Divider, Menu, MenuItem, Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { initialdata } from '../../slice/Userdetailslice';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../Asstes/logo.svg';
import search from '../../Asstes/headersearch.svg';
import cart from '../../Asstes/cart.svg';
import bell from '../../Asstes/bell.svg';
import heart from '../../Asstes/heart.svg';

const allPages = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeOutlinedIcon sx={{ fontSize: 20 }} />,
    description: 'Back to landing page',
    color: '#6366F1',
    bg: '#EEF2FF',
  },
  {
    label: 'Browse Courses',
    path: '/category',
    icon: <ExploreOutlinedIcon sx={{ fontSize: 20 }} />,
    description: 'Explore all courses',
    color: '#0EA5E9',
    bg: '#E0F2FE',
  },
  {
    label: 'Shopping Cart',
    path: '/shopingcart',
    icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />,
    description: 'Your course cart',
    color: '#F59E0B',
    bg: '#FEF3C7',
    badge: true,
  },
  {
    label: 'Wishlist',
    path: '/whisliste',
    icon: <FavoriteBorderIcon sx={{ fontSize: 20 }} />,
    description: 'Saved for later',
    color: '#EF4444',
    bg: '#FEE2E2',
  },
  {
    label: 'Messages',
    path: '/indiviualmessage',
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />,
    description: 'Chat with instructors',
    color: '#10B981',
    bg: '#D1FAE5',
  },
  {
    label: 'My Profile',
    path: '/user',
    icon: <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />,
    description: 'Account & settings',
    color: '#8B5CF6',
    bg: '#EDE9FE',
  },
];

const Userheader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = useSelector((state) => state.userdetail);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [pagesAnchor, setPagesAnchor] = useState(null);
  const cartCount = data.carddata?.length || 0;
  const isLoggedIn = Boolean(data && data.username);

  const handleAvatarClick = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handlePagesOpen = (e) => setPagesAnchor(e.currentTarget);
  const handlePagesClose = () => setPagesAnchor(null);

  const handleProfile = () => { handleMenuClose(); navigate('/user'); };
  const handleLogout = () => {
    handleMenuClose();
    dispatch(initialdata({}));
    navigate('/');
  };
  const handleSignIn = () => { handleMenuClose(); navigate('/auth'); };
  const handlePageNav = (path) => {
    handlePagesClose();
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const iconBoxStyle = {
    width: '40px', height: '40px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    '&:hover': { transform: 'scale(1.15) translateY(-3px)', background: '#F1F5F9' },
  };

  return (
    <>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => navigate('/')}>
            <img src={logo} style={{ width: '28px', height: '36px' }} alt='logo' />
            <Typography sx={{ fontSize: '18px', color: '#0F172A', fontWeight: 700, letterSpacing: '-0.3px' }}>
              Byway
            </Typography>
          </Box>

          {/* Desktop middle */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '8px', flex: 1 }}>
            {/* Pages dropdown trigger */}
            <Box
              onClick={handlePagesOpen}
              sx={{
                display: 'flex', alignItems: 'center', gap: '6px',
                px: 2, py: 1, borderRadius: '10px', cursor: 'pointer',
                border: '1.5px solid',
                borderColor: Boolean(pagesAnchor) ? '#0F172A' : '#E2E8F0',
                background: Boolean(pagesAnchor) ? '#F8FAFC' : '#fff',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#94A3B8', background: '#F8FAFC' },
                flexShrink: 0,
              }}
            >
              <GridViewOutlinedIcon sx={{ fontSize: 17, color: '#334155' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Pages</Typography>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 16, color: '#64748B',
                  transform: Boolean(pagesAnchor) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </Box>

            {/* Search */}
            <Box sx={{
              flex: 1, maxWidth: '380px',
              border: '1.5px solid #E2E8F0', borderRadius: '10px',
              display: 'flex', alignItems: 'center',
              px: 1.5, py: 0.5, background: '#F8FAFC',
              '&:focus-within': { borderColor: '#3B82F6', background: '#fff' },
              transition: 'all 0.2s',
            }}>
              <img src={search} style={{ width: '18px', height: '18px', opacity: 0.5 }} alt='search' />
              <input
                placeholder='Search courses...'
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '14px', color: '#0F172A', outline: 'none', padding: '6px 8px' }}
              />
            </Box>

            <Typography
              onClick={() => navigate('/category')}
              sx={{ fontSize: '14px', fontWeight: 500, color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap', '&:hover': { color: '#3B82F6' }, transition: 'color 0.2s' }}
            >
              Teach on Byway
            </Typography>
          </Box>

          {/* Desktop right icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
            <Box onClick={() => navigate('/whisliste')} sx={{ ...iconBoxStyle, background: isActive('/whisliste') ? '#F1F5F9' : 'transparent' }}>
              <img style={{ width: '22px', height: '22px' }} src={heart} alt='wishlist' />
            </Box>
            <Box onClick={() => navigate('/shopingcart')} sx={{ ...iconBoxStyle, background: isActive('/shopingcart') ? '#F1F5F9' : 'transparent' }}>
              <Badge badgeContent={cartCount} color="error" overlap="circular"
                sx={{ '& .MuiBadge-badge': { fontSize: '10px', minWidth: '16px', height: '16px' } }}>
                <img style={{ width: '22px', height: '22px' }} src={cart} alt='cart' />
              </Badge>
            </Box>
            <Box sx={{ ...iconBoxStyle }}>
              <Badge badgeContent={cartCount} color="error" overlap="circular"
                sx={{ '& .MuiBadge-badge': { fontSize: '10px', minWidth: '16px', height: '16px' } }}>
                <img style={{ width: '22px', height: '22px' }} src={bell} alt='notifications' />
              </Badge>
            </Box>
            <Box onClick={handleAvatarClick} sx={{
              ...iconBoxStyle,
              background: isLoggedIn ? (isActive('/user') ? '#3B82F6' : '#22C55E') : '#94A3B8',
              '&:hover': { transform: 'scale(1.1)', background: isLoggedIn ? (isActive('/user') ? '#2563EB' : '#16A34A') : '#64748B' },
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>
                {isLoggedIn ? data.firstname[0].toUpperCase() : 'G'}
              </Typography>
            </Box>
          </Box>

          {/* Mobile right */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: '4px' }}>
            <Box sx={{ ...iconBoxStyle }}>
              <Badge badgeContent={cartCount} color="error" overlap="circular"
                sx={{ '& .MuiBadge-badge': { fontSize: '10px', minWidth: '16px', height: '16px' } }}>
                <img style={{ width: '22px', height: '22px' }} src={bell} alt='notifications' />
              </Badge>
            </Box>
            <Box onClick={handleAvatarClick} sx={{
              ...iconBoxStyle, background: isLoggedIn ? '#22C55E' : '#94A3B8',
              '&:hover': { transform: 'scale(1.1)', background: isLoggedIn ? '#16A34A' : '#64748B' },
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>
                {isLoggedIn ? data.firstname[0].toUpperCase() : 'G'}
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#334155' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Pages Dropdown ── */}
      <Menu
        anchorEl={pagesAnchor}
        open={Boolean(pagesAnchor)}
        onClose={handlePagesClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1, borderRadius: '14px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            border: '1px solid #E2E8F0',
            minWidth: 520,
            p: 1.5,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ px: 1.5, pb: 1.5, borderBottom: '1px solid #F1F5F9', mb: 1 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            All Pages
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#94A3B8', mt: 0.25 }}>Navigate to any section of Byway</Typography>
        </Box>

        {/* Grid of pages */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
          {allPages.map(({ label, path, icon, description, color, bg, badge }) => (
            <Box
              key={path}
              onClick={() => handlePageNav(path)}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                px: 1.5, py: 1.25, borderRadius: '10px', cursor: 'pointer',
                background: isActive(path) ? bg : 'transparent',
                border: '1.5px solid',
                borderColor: isActive(path) ? color + '40' : 'transparent',
                transition: 'all 0.15s',
                '&:hover': { background: bg, borderColor: color + '40' },
              }}
            >
              <Box sx={{
                width: 36, height: 36, borderRadius: '9px',
                background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color, flexShrink: 0,
              }}>
                {icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{label}</Typography>
                  {badge && cartCount > 0 && (
                    <Chip label={cartCount} size="small"
                      sx={{ height: 18, fontSize: '10px', background: '#EF4444', color: '#fff', '& .MuiChip-label': { px: 0.75 } }} />
                  )}
                  {isActive(path) && (
                    <Chip label="Current" size="small"
                      sx={{ height: 18, fontSize: '10px', background: color + '20', color: color, '& .MuiChip-label': { px: 0.75 } }} />
                  )}
                </Box>
                <Typography sx={{ fontSize: '11px', color: '#94A3B8', mt: 0.1 }}>{description}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Menu>

      {/* ── Profile Menu ── */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { mt: 1, borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', minWidth: 180, border: '1px solid #E2E8F0' }
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #F1F5F9' }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
            {isLoggedIn ? `${data.firstname} ${data.lastname}` : 'Guest'}
          </Typography>
          <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{isLoggedIn ? (data.email || data.username) : 'Not signed in'}</Typography>
        </Box>
        {isLoggedIn ? (
          [
            <MenuItem key="profile" onClick={handleProfile} sx={{ gap: 1.5, py: 1.2, fontSize: '14px', '&:hover': { background: '#F8FAFC' } }}>
              <PersonIcon sx={{ fontSize: '18px', color: '#334155' }} />
              My Profile
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout} sx={{ gap: 1.5, py: 1.2, fontSize: '14px', color: '#EF4444', '&:hover': { background: '#FFF1F2' } }}>
              <LogoutIcon sx={{ fontSize: '18px', color: '#EF4444' }} />
              Logout
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleSignIn} sx={{ gap: 1.5, py: 1.2, fontSize: '14px', '&:hover': { background: '#F8FAFC' } }}>
            <PersonIcon sx={{ fontSize: '18px', color: '#334155' }} />
            Sign In
          </MenuItem>
        )}
      </Menu>

      {/* ── Mobile Drawer ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={logo} style={{ width: '22px', height: '28px' }} alt='logo' />
              <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#0F172A' }}>Byway</Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small"><CloseIcon fontSize="small" /></IconButton>
          </Box>

          {/* User info */}
          <Box sx={{ mx: 2, mb: 1.5, p: 1.5, background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: '50%', background: isLoggedIn ? '#22C55E' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>
                  {isLoggedIn ? data.firstname[0].toUpperCase() : 'G'}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  {isLoggedIn ? `${data.firstname} ${data.lastname}` : 'Guest'}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#64748B' }}>{isLoggedIn ? data.username : 'Not signed in'}</Typography>
              </Box>
            </Box>
          </Box>

          <Divider />

          {/* Pages list */}
          <Typography sx={{ px: 2.5, pt: 1.5, pb: 0.5, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Pages
          </Typography>
          <List dense sx={{ px: 1, flex: 1 }}>
            {allPages.map(({ label, path, icon, color, bg, badge }) => (
              <ListItem
                button key={path}
                onClick={() => { navigate(path); setDrawerOpen(false); }}
                sx={{
                  borderRadius: '9px', mb: 0.25,
                  background: isActive(path) ? bg : 'transparent',
                  '&:hover': { background: bg },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '7px', background: isActive(path) ? bg : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive(path) ? color : '#64748B' }}>
                    {React.cloneElement(icon, { sx: { fontSize: 16 } })}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: '13px', fontWeight: isActive(path) ? 600 : 500, color: isActive(path) ? color : '#334155' }}
                />
                {badge && cartCount > 0 && (
                  <Chip label={cartCount} size="small"
                    sx={{ height: 18, fontSize: '10px', background: '#EF4444', color: '#fff', '& .MuiChip-label': { px: 0.75 } }} />
                )}
              </ListItem>
            ))}
          </List>

          <Divider />
          <List dense sx={{ px: 1, pb: 1 }}>
            {isLoggedIn ? (
              <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }} sx={{ borderRadius: '9px', '&:hover': { background: '#FFF1F2' } }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LogoutIcon sx={{ fontSize: 18, color: '#EF4444' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '13px', fontWeight: 500, color: '#EF4444' }} />
              </ListItem>
            ) : (
              <ListItem button onClick={() => { navigate('/auth'); setDrawerOpen(false); }} sx={{ borderRadius: '9px', '&:hover': { background: '#F0FDF4' } }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PersonIcon sx={{ fontSize: 18, color: '#22C55E' }} />
                </ListItemIcon>
                <ListItemText primary="Sign In" primaryTypographyProps={{ fontSize: '13px', fontWeight: 500, color: '#22C55E' }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Userheader;
