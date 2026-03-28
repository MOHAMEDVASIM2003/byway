import React from 'react'
import { Box } from '@mui/material'
import polygon from '../../Asstes/Polygon.svg'
import heroleft from '../../Asstes/heroleft.svg'
import herorbottom from '../../Asstes/herobottom.svg'
import herotop from '../../Asstes/herotop.svg'
import ellipse from '../../Asstes/ellipse.png';
import dots from '../../Asstes/dots.png'
const Heroimage = () => {
    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Box >
                <Box sx={{ width: '222px', height: '245px', position: 'absolute', left: '60%',top:'5%' }}>
                    <Box sx={{ width: '222px', height: '222px', borderRadius: '50%', background: '#60A5FA', position: 'relative',bottom:'-9%' }}>
                     <Box sx={{position:'relative',left:'50px',bottom:'-50px',rotate:'-90deg'}} component={'img'} src={ellipse}></Box>   
                    </Box>
                    <img src={dots} style={{width:'100px',height:'100px',position:'absolute',top:'-20%',left:'60%'}}></img>
                    <img src={herotop} style={{ width: '225px', height: '245px',position:'absolute',top:'0%',bottom:'5%',borderBottomLeftRadius:'80%',borderBottomRightRadius:'80%',left:'-1%',bottom:'0px'  }}></img>
                </Box>
                <Box sx={{ width: '222px', height: '222px', position: 'absolute', top: '30%',left:'20%' }}>
                    
                    <Box sx={{ width: '222px', height: '222px', borderRadius: '50%', background: '#F87171', position: 'relative', }}>
                        <Box sx={{position:'relative',left:'-5px',top:'110px',rotate:'0deg'}} component={'img'} src={ellipse}></Box>
                         <img src={dots} style={{width:'100px',height:'100px',position:'absolute',top:'-20%',left:'0%'}}></img>
                        <img src={heroleft} style={{ width: '222px', height: '222px',position:'absolute',left:'-10%',top:'-30%' }}></img>
                    </Box>
                    

                </Box>
                <Box sx={{ width: '222px', height: '222px', position: 'absolute', bottom: '-5%', left: '60%',background:'transpatent' }}>
                    <Box sx={{ width: '210px', height: '210px', borderRadius: '50%', background: '#FACC15', position: 'relative' }}>
                        <img src={herorbottom} style={{ width: '200px', height: '200px',borderBottomLeftRadius:'50%',borderBottomRightRadius:'50%' }}></img>
                        <Box sx={{position:'absolute',left:'-4px',bottom:'-50px',top:'98px',rotate:'-10deg'}} component={'img'} src={ellipse}></Box> 
                    </Box>
                    
                </Box>
                <Box>
                    <Box sx={{width:'35px',height:'35px',background:'black',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',position:'absolute',top:'53%',left:'60%'}}>
                        <img src={polygon} style={{width:'19px',height:'19px'}}></img>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Heroimage