import { Box, Toolbar } from "@mui/material"
import { Narbar, SideBar } from "../components";
import { useState } from "react";

const drawerWhith = 280; // El ancho de los navegadores 

export const JournalLayout = ({children, isNothingSelected}) => {

  const [openDrawer, setopenDrawer] = useState(false);

  const handleDawerToggle = () =>{
    setopenDrawer(!openDrawer)
  }

  return (
    <Box sx={{display:'flex'}} className="animate__animated animate__fadeIn animate__faster" >

        {/* Narbar drawerWhith */}
        <Narbar drawerWhith={drawerWhith} onDrawerToggle={handleDawerToggle}/>

        {/* Sidebar drawerWhith */}
        <SideBar drawerWhith={drawerWhith} onDrawerToggle={handleDawerToggle} openDrawer={openDrawer} />

        <Box 
            component='main'
            sx={{flexGrow: 1, p:3,
            whith : isNothingSelected ? "100%" : {sm: `calc(100% - ${drawerWhith}px)`, maxWidth: '-webkit-fill-available'},
            ml: isNothingSelected ? 0 : {sm:`${drawerWhith}px`}
            

            }} //!FlexGrow factor de crecimiento del box
            
        >
            {/* Toolbar */}
            <Toolbar></Toolbar>

            {children}

        </Box>
         
    </Box>
  )
}
