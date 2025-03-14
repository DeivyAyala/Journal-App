import  LogoutOutlined  from "@mui/icons-material/LogoutOutlined"
import MenuOutlined  from "@mui/icons-material/MenuOutlined"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth/thunks"

export const Narbar = ({drawerWhith = 240, onDrawerToggle}) => {
    const dispatch = useDispatch()

   const onLogout = () => {
        dispatch(startLogout())
   }

  return (
    <AppBar 
    position="fixed" //!Posición fija 
    sx={{
        width:{sm:`calc(100% - ${ drawerWhith }px)`},
        ml:{sm:`${ drawerWhith }px`}

    }}
    >
        <Toolbar>
            <IconButton
                color="inherit"
                edge='start'
                sx={{mr:2, display: {sm:'none'}}} // Sel icono solo aparece en pantañas pequeñas 
                onClick={onDrawerToggle}
                
            >
                <MenuOutlined/>
            </IconButton>

           <Grid container direction='row' justifyContent='space-between' alignItems='center'>    {/*  Para que sus hijos se exparsan */}
                < Typography variant="h6" noWrap component='div' > JournalApp </ Typography >

                <IconButton 
                color="error"
                onClick={ onLogout }
                >
                    <LogoutOutlined/>
                </IconButton>

            </Grid>
        </Toolbar>  

    </AppBar>
  )
}
