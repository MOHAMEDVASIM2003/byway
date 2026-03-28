import React from 'react'
import { Button,Box } from '@mui/material'
import arrow from '../../Asstes/arrow.svg'
const Authenticatebutton = (props) => {
  return (
    <Box sx={{background:'black',width:'fit-content',height:'fit-content',px:1,borderRadius:'8px',display:'flex',alignItems:'center'}}>
      <Button sx={{width:'fit-content',height:'fit-content',fontSize:'16px',fontWeight:500,color:'#FFFFFF'}}>{props.content}</Button>
      <img style={{width:'24px',height:'24px'}} src={arrow}></img>
    </Box>
  )
}

export default Authenticatebutton