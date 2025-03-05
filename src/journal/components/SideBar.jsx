
import { Box, Divider, Drawer,  List,Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({drawerWhith = 240}) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    // console.log(notes)

    


  return (
    <Box
        component='nav'
        sx={{width:{ sm: drawerWhith, flexShrink:{ sm: 0} }}}
    >
        <Drawer 
        variant="permanent"  //Temporary Se puede ocultar
        open={true}
        sx={{
            display:{xs: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width:drawerWhith}
        }}
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
