import React, { useState } from 'react'
import { OutlinedInput, MenuItem, FormControl, Select, Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import arrow from '../../../Asstes/filter.svg'
import Categorycontent from './Categorycontent';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 148,
        },
    },
};

const boxStyle = {
    width: 'fit-content',
    height: 'fit-content',
};

const formControlStyle = {
    m: 0,
    height: '48px',
    width: 148,
};

const selectStyle = {
    width: 148,
    fontSize: '14px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    '.MuiSelect-select': {
        paddingRight: '24px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        display: 'block',
    },
    '.MuiSelect-icon': {
        color: '#555',
    },
};

const outlinedInputStyle = {
    height: '40px',
    fontSize: '14px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    paddingRight: '0px',
};

const menuItemStyle = {
    mr: '2%',
    fontSize: '14px',
    padding: '10px 16px',
    '&:hover': {
        backgroundColor: '#e3f2fd',
    },
    '&.Mui-selected': {
        backgroundColor: '#bbdefb',
        fontWeight: 500,
    },
};


const Categoryfiltercourse = () => {

     const data=useSelector((state)=>state.userdetail)
    const [filtervisible,setfiltervisible]=useState(true);
    const names = [
       
        'Highly rated',
        'most popular',
        'Newest'

    ];
    const [personName, setPersonName] = useState('');

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    return (
        <Box sx={{ width: '90%', mx: 'auto', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px', py: 2 }}>
            <Box sx={{display:'flex',justifyContent:'space-between',alignItems:{xs:'flex-start',sm:'center'},flexDirection:{xs:'column',sm:'row'},gap:1}}>
                <Typography sx={{ fontSize: { xs: '26px', md: '36px' }, fontWeight: 700, }}>All Courses</Typography>
                <Typography sx={{fontSize:'14px',color:'#64748B'}}>Welcome back, {data.firstname} 👋</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
                <Button onClick={()=>{setfiltervisible(prev=>!prev)}} sx={{height:'48px', display: 'flex', flexDirection: 'row',border:'1px solid #0F172A',px:3,borderRadius:'8px',justifyContent:'center',gap:'8px',alignItems:'center'  }}>
                    <img src={arrow} alt='img' style={{ width: '24px', height: '24px' }}></img>
                    <Typography sx={{height:'fit-content', fontSize: '14px', fontWeight: '500', color: '#0F172A' }}>Filter</Typography>
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:'8px' }}>
                    <Typography sx={{ height: 'fit-content', fontSize: '16px', fontWeight: 400, color: "#0F172A" }}>Sort By</Typography>
                    <Box sx={boxStyle}>
                        <FormControl sx={formControlStyle}>
                            <Select
                                displayEmpty
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput sx={outlinedInputStyle} />}
                                renderValue={(selected) =>
                                    !selected ? <em style={{ color: '#888' }}>Select</em> : selected
                                }
                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={selectStyle}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} sx={menuItemStyle}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
            </Box>
            <Box sx={{ width: '100%', height: 'fit-content' }}>
                <Categorycontent filtervisible={filtervisible} sortBy={personName} />
            </Box>
            
        </Box>
    )
}

export default Categoryfiltercourse