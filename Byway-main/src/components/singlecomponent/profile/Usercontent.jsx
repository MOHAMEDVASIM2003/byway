import React from 'react'
import {Box} from '@mui/material'
import Messagedetail from './Messagedetail'
import Myreview from './Myreview'
import Teachers from './Teachers'
import Mycourse from './Mycourse'
import Profiledetail from './Profiledetail'
const Usercontent = (props) => {
    const { messagevisible, myreviewvisible, teachersvisible, mycoursevisible, profilevisible }=props
  return (
    <Box>
        {
            messagevisible && ( <Messagedetail/>)
        } 
        {
            myreviewvisible && (<Myreview/>)

        }
        {
            teachersvisible && (<Teachers/>)
        }
        {
            mycoursevisible && (<Mycourse/>)
        }
        {
            profilevisible && (<Profiledetail/>)
        }
    </Box>
  )
}

export default Usercontent