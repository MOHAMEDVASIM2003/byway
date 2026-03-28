import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, MenuItem, Typography, Button, Snackbar, Alert, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profiledetail = () => {
    const data = useSelector((state) => state.userdetail);
    const fileInputRef = useRef(null);

    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [youtube, setYoutube] = useState('');
    const [facebook, setFacebook] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [saving, setSaving] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (!data.username) return;
        axios.post('http://localhost:5000/user/profileget', { username: data.username })
            .then((res) => {
                const p = res.data;
                setHeadline(p.headline || '');
                setDescription(p.description || '');
                setLanguage((p.language && p.language[0]) || '');
                const links = p.links || [];
                setWebsite(links[0] || '');
                setTwitter(links[1] || '');
                setLinkedin(links[2] || '');
                setYoutube(links[3] || '');
                setFacebook(links[4] || '');
                if (p.image) setImagePreview(`http://localhost:5000/userprofile/${p.image}`);
            })
            .catch((err) => console.error('Failed to fetch profile:', err));
    }, [data.username]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!data.username) {
            setSnackbar({ open: true, message: 'Please log in first', severity: 'warning' });
            return;
        }
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('holdername', data.username);
            formData.append('headline', headline);
            formData.append('description', description);
            formData.append('language', language);
            formData.append('links', JSON.stringify([website, twitter, linkedin, youtube, facebook]));
            if (imageFile) formData.append('image', imageFile);

            const res = await axios.post('http://localhost:5000/user/profile', formData);
            setSnackbar({ open: true, message: res.data.message || 'Profile saved!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: err.response?.data?.error || 'Failed to save profile', severity: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const fieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontSize: '14px',
        },
    };

    return (
        <Box sx={{ width: '100%', py: 4, display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

            {/* Basic Info */}
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Basic Info</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>First Name</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={data.firstname || ''}
                            disabled
                            size="small"
                            sx={fieldStyle}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>Last Name</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={data.lastname || ''}
                            disabled
                            size="small"
                            sx={fieldStyle}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>Headline</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="e.g. Web Developer | React Enthusiast"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        size="small"
                        sx={fieldStyle}
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>Description</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Tell others a bit about yourself..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={fieldStyle}
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>Language</Typography>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        size="small"
                        sx={fieldStyle}
                    >
                        <MenuItem value="">Select language</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="ar">Arabic</MenuItem>
                    </TextField>
                </Box>
            </Box>

            {/* Profile Image */}
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Profile Image</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                        src={imagePreview}
                        sx={{ width: 100, height: 100, border: '2px solid #e0e0e0' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography sx={{ fontSize: '13px', color: '#64748B' }}>
                            JPEG, JPG, PNG or GIF — max 5MB
                        </Typography>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => fileInputRef.current.click()}
                            sx={{ textTransform: 'none', width: 'fit-content', borderColor: '#0F172A', color: '#0F172A' }}
                        >
                            {imagePreview ? 'Change Image' : 'Upload Image'}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Links */}
            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Social Links</Typography>
                {[
                    { label: 'Website', value: website, setter: setWebsite, placeholder: 'https://yourwebsite.com' },
                    { label: 'X (Twitter)', value: twitter, setter: setTwitter, placeholder: 'https://twitter.com/yourhandle' },
                    { label: 'LinkedIn', value: linkedin, setter: setLinkedin, placeholder: 'https://linkedin.com/in/yourprofile' },
                    { label: 'YouTube', value: youtube, setter: setYoutube, placeholder: 'https://youtube.com/yourchannel' },
                    { label: 'Facebook', value: facebook, setter: setFacebook, placeholder: 'https://facebook.com/yourprofile' },
                ].map(({ label, value, setter, placeholder }) => (
                    <Box key={label}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: 0.5 }}>{label}</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            size="small"
                            sx={fieldStyle}
                        />
                    </Box>
                ))}
            </Box>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        backgroundColor: '#0F172A',
                        color: '#fff',
                        textTransform: 'none',
                        px: 4,
                        py: 1.5,
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '15px',
                        '&:hover': { backgroundColor: '#1e293b' },
                        '&:disabled': { backgroundColor: '#94a3b8' },
                    }}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </Box>
        </Box>
    );
};

export default Profiledetail;
