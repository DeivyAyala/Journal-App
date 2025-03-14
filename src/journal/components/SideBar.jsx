
import { Box, Divider, Drawer,  IconButton,  List,Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";
import  Close  from "@mui/icons-material/Close";

export const SideBar = ({drawerWhith = 240, openDrawer, onDrawerToggle}) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    // console.log(notes)

    


  return (
    <Box
        component='nav'
        sx={{width:{ sm: drawerWhith, flexShrink:{ sm: 0} }}}
    >
         {/* Drawer temporal para móviles */}
        <Drawer 
        variant="temporary"  //Temporary Se puede ocultar
        open={openDrawer}
        onClose={onDrawerToggle}
        sx={{
            display:{xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width:drawerWhith}
        }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    {displayName}
                </Typography>
                <IconButton onClick={onDrawerToggle} sx={{ml:'auto'}} color="error">
                    <Close/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List>
                    {
                        notes.map(note => 
                        <SideBarItem key={note.id} {...note}/>
                        )
                    }
            </List>
         </Drawer>
         
         {/* Drawer permanente en pantallas grandes */}
         <Drawer
         variant="permanent"
         sx={{
            display:{ xs: 'none', sm:'block'},
            "& .MuiDrawer-paper": {boxSizing: 'border-box', width: drawerWhith}
         }}
         open
         >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                    {
                        notes.map(note => 
                        <SideBarItem key={note.id} {...note}/>
                        )
                    }
            </List>
        </Drawer>
    </Box>
  )
}
