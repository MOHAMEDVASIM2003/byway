import React from 'react'
import { Box } from '@mui/material'
import Userheader from '../components/wrappedcomponent/Userheader'
import Footer from '../components/wrappedcomponent/Footer'
import Categoryfiltercourse from '../components/singlecomponent/category/Categoryfiltercourse'
import Popularmentors from '../components/singlecomponent/category/Popularmentors'
import Featuredcourses from '../components/singlecomponent/category/Featuredcourses'

const Category = () => {
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
      <Userheader />
      <Categoryfiltercourse />
      <Popularmentors/>
      <Featuredcourses/>
      <Footer />
    </Box>
  )
}

export default Category