import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import logo from '../../Asstes/logo.svg';
import facebook from '../../Asstes/facebook.svg';
import google from '../../Asstes/google.svg';
import microsoft from '../../Asstes/microsoft.svg';
import twitter from '../../Asstes/twitter.png';
import github from '../../Asstes/github.png';

const FooterLink = ({ children }) => (
  <Typography sx={{
    fontSize: '14px', color: '#94A3B8', cursor: 'pointer',
    '&:hover': { color: '#fff', transform: 'translateX(4px)' },
    transition: 'all 0.2s ease',
    display: 'inline-block',
  }}>
    {children}
  </Typography>
);

const SocialIcon = ({ src, alt }) => (
  <Box sx={{
    width: '36px', height: '36px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': { background: '#3B82F6', transform: 'translateY(-3px)' },
  }}>
    <img src={src} alt={alt} style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
  </Box>
);

const Footer = () => (
  <Box sx={{ background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', pt: { xs: 5, md: 7 }, pb: 3 }}>
    <Box sx={{
      width: '90%', maxWidth: '1200px', mx: 'auto',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1.5fr' },
      gap: { xs: '32px', md: '40px' },
    }}>
      {/* Brand */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: { xs: '1 / -1', sm: '1 / -1', md: 'auto' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src={logo} style={{ width: '28px', height: '36px' }} alt='logo' />
          <Typography sx={{ fontSize: '20px', color: '#fff', fontWeight: 700 }}>Byway</Typography>
        </Box>
        <Typography sx={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7, maxWidth: '280px' }}>
          Empowering learners through accessible and engaging online education. Your journey to mastery starts here.
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <SocialIcon src={facebook} alt="Facebook" />
          <SocialIcon src={github} alt="GitHub" />
          <SocialIcon src={google} alt="Google" />
          <SocialIcon src={twitter} alt="Twitter" />
          <SocialIcon src={microsoft} alt="Microsoft" />
        </Box>
      </Box>

      {/* Get Help */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#F1F5F9', mb: 1 }}>Get Help</Typography>
        {['Contact Us', 'Latest Articles', 'FAQ', 'Support Center'].map(t => <FooterLink key={t}>{t}</FooterLink>)}
      </Box>

      {/* Programs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#F1F5F9', mb: 1 }}>Programs</Typography>
        {['Web Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity'].map(t => <FooterLink key={t}>{t}</FooterLink>)}
      </Box>

      {/* Contact */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#F1F5F9', mb: 1 }}>Contact Us</Typography>
        {[
          { icon: '📍', text: '123 Main Street, Anytown, CA 12345' },
          { icon: '📞', text: '+(123) 456-7890' },
          { icon: '✉️', text: 'bywayedu@webkul.in' },
        ].map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: '14px' }}>{icon}</Typography>
            <Typography sx={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>{text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mt: { xs: 4, md: 6 }, mx: { xs: 0, md: '5%' } }} />
    <Box sx={{ textAlign: 'center', pt: 3 }}>
      <Typography sx={{ fontSize: '13px', color: '#475569' }}>
        © {new Date().getFullYear()} Byway. All rights reserved. Built with ❤️ for learners everywhere.
      </Typography>
    </Box>
  </Box>
);

export default Footer;
