import React from 'react'
import { Box } from '@mui/material'
import Userheader from '../components/wrappedcomponent/Userheader'
import Hero from '../components/singlecomponent/Hero'
import Topcategory from '../components/singlecomponent/Topcategory'
import Landingcount from '../components/singlecomponent/Landingcount'
import Topcourse from '../components/internalcomponent/Topcourse'
import Topinstructor from '../components/singlecomponent/Topinstructor'
import Landingcomment from '../components/singlecomponent/Landingcomment'
import Landindlast from '../components/singlecomponent/Landindlast'
import Footer from '../components/wrappedcomponent/Footer'
const Landing = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& *': {
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        }
      }
    }}>
      <Box sx={{width:'100%',display:'flex',flexDirection:'column',gap:'24px'}}>
        <Userheader />
        <Hero ></Hero>
        <Landingcount />
        <Topcategory />
        <Topcourse />
        <Topinstructor />
        <Landingcomment />
        <Landindlast />
        <Footer />
      </Box>

    </Box>
  )
}

export default Landing